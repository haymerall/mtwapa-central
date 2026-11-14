/**
 * Mtwapa Central SDA Platform - Safaricom Daraja 2.0 STK Push Callback Controller
 * Endpoint: POST /api/v1/payments/mpesa/callback
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handleMpesaCallback(req, res) {
  try {
    const callbackData = req.body;

    // Validate Safaricom payload structure
    if (!callbackData?.Body?.stkCallback) {
      console.error('Invalid M-Pesa callback payload received:', JSON.stringify(callbackData));
      return res.status(400).json({ ResultCode: 1, ResultDesc: 'Invalid Payload Structure' });
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callbackData.Body.stkCallback;

    console.log(`[M-Pesa Webhook] Processing CheckoutID: ${CheckoutRequestID} | ResultCode: ${ResultCode}`);

    // Case 1: Payment Failed or Cancelled by User
    if (ResultCode !== 0) {
      console.warn(`[M-Pesa Payment Failed] CheckoutID: ${CheckoutRequestID} | Reason: ${ResultDesc}`);
      
      // Optionally log audit trail or notify member of failure
      await prisma.auditLog.create({
        data: {
          action: 'MPESA_PAYMENT_FAILED',
          userName: 'System Webhook',
          details: `STK Push failed for CheckoutID ${CheckoutRequestID}: ${ResultDesc}`,
          ip: req.ip || '127.0.0.1',
          severity: 'WARNING'
        }
      });

      return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }

    // Case 2: Payment Successful - Extract Metadata Items
    const items = CallbackMetadata?.Item || [];
    const getMetadataValue = (name) => {
      const found = items.find(item => item.Name === name);
      return found ? found.Value : null;
    };

    const amount = getMetadataValue('Amount');
    const mpesaReceiptNumber = getMetadataValue('MpesaReceiptNumber');
    const transactionDateRaw = getMetadataValue('TransactionDate'); // Format: YYYYMMDDHHmmss
    const phoneNumber = String(getMetadataValue('PhoneNumber') || '');

    if (!mpesaReceiptNumber) {
      console.error('[M-Pesa Error] Missing MpesaReceiptNumber in success callback metadata.');
      return res.status(422).json({ ResultCode: 1, ResultDesc: 'Missing Receipt Number' });
    }

    // Check for duplicate transaction processing (Idempotency)
    const existingTx = await prisma.transaction.findUnique({
      where: { reference: mpesaReceiptNumber }
    });

    if (existingTx) {
      console.log(`[M-Pesa Duplicate] Transaction ${mpesaReceiptNumber} already recorded.`);
      return res.status(200).json({ ResultCode: 0, ResultDesc: 'Already Processed' });
    }

    // Find member by phone number if registered in database
    const member = await prisma.member.findFirst({
      where: { phone: { contains: phoneNumber.slice(-9) } } // Match last 9 digits of Kenyan phone
    });

    // Record verified transaction in PostgreSQL ledger
    const newTransaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type: 'INCOME',
        category: 'Tithe & Offerings (M-Pesa)',
        description: `Automated M-Pesa STK Push from ${phoneNumber}`,
        paymentMethod: 'M-Pesa Daraja',
        reference: mpesaReceiptNumber,
        memberId: member ? member.id : null,
        approvedBy: 'Automated Daraja Gateway'
      }
    });

    // Record audit log entry
    await prisma.auditLog.create({
      data: {
        action: 'MPESA_PAYMENT_VERIFIED',
        userName: member ? member.name : `Phone: ${phoneNumber}`,
        details: `Successfully processed M-Pesa receipt ${mpesaReceiptNumber} for KSh ${amount}`,
        ip: req.ip || '127.0.0.1',
        severity: 'INFO'
      }
    });

    console.log(`[M-Pesa Success] Recorded receipt ${mpesaReceiptNumber} | Amount: KSh ${amount}`);

    // Respond back to Safaricom Daraja server to acknowledge receipt
    return res.status(200).json({ ResultCode: 0, ResultDesc: 'Success' });

  } catch (error) {
    console.error('[M-Pesa Webhook Error]:', error);
    return res.status(500).json({ ResultCode: 1, ResultDesc: 'Internal Server Error' });
  }
}
