import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleMpesaCallback } from './controllers/mpesaController.js';

// Load environment variables (e.g., DATABASE_URL, PORT, MPESA_CONSUMER_KEY)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' })); // Restrict in production to specific frontend domains
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Safaricom M-Pesa Daraja 2.0 Webhook Route
app.post('/api/v1/payments/mpesa/callback', handleMpesaCallback);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Mtwapa Central SDA Backend running on http://localhost:${PORT}`);
  console.log(`📡 M-Pesa Webhook listening at POST http://localhost:${PORT}/api/v1/payments/mpesa/callback`);
});
