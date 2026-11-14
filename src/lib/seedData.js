export const INITIAL_MEMBERS = [
  { id: 'mem_1', name: 'Elder James Nyandwaro', email: 'james@mtwapa.sda', phone: '+254 712 345 678', status: 'Active', role: 'Elder', gender: 'Male' },
  { id: 'mem_2', name: 'Monicah Bonareri', email: 'monicah@mtwapa.sda', phone: '+254 722 987 654', status: 'Active', role: 'Treasurer', gender: 'Female' },
  { id: 'mem_3', name: 'Sister Mary Otieno', email: 'mary@example.com', phone: '+254 733 112 233', status: 'Active', role: 'Member', gender: 'Female' },
];

export const INITIAL_MINISTRIES = [
  { id: 'min_1', name: 'Sabbath School Department', leader: 'Elder James Nyandwaro', membersCount: 120, schedule: 'Saturdays 9:00 AM' },
  { id: 'min_2', name: 'Pathfinders & Adventurers', leader: 'Youth Director', membersCount: 45, schedule: 'Saturdays 2:30 PM' },
  { id: 'min_3', name: 'Dorcas Welfare Ministry', leader: 'Monicah Bonareri', membersCount: 30, schedule: 'Sundays 2:00 PM' },
];

export const INITIAL_TRANSACTIONS = [
  { id: 'tx_1', type: 'income', category: 'Tithe', amount: 12500, payment_method: 'M-Pesa', reference: 'MPESA-789421', description: 'Tithe collection', date: '2026-11-07', status: 'completed' },
  { id: 'tx_2', type: 'income', category: 'Local Church Budget', amount: 8400, payment_method: 'Cash', reference: 'CASH-002', description: 'Church budget offering', date: '2026-11-07', status: 'completed' },
];

export const INITIAL_ANNOUNCEMENTS = [
  { id: 'ann_1', title: 'Quarterly Communion Sabbath', channel: 'SMS & WhatsApp', audience: 'All Members', message: 'Join us this Sabbath for Holy Communion and foot washing.', date: '2026-11-07', status: 'sent', recipientsCount: 142 }
];

export function seedDatabaseIfEmpty() {
  if (!localStorage.getItem('cmp_members')) localStorage.setItem('cmp_members', JSON.stringify(INITIAL_MEMBERS));
  if (!localStorage.getItem('cmp_ministries')) localStorage.setItem('cmp_ministries', JSON.stringify(INITIAL_MINISTRIES));
  if (!localStorage.getItem('cmp_transactions')) localStorage.setItem('cmp_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
  if (!localStorage.getItem('cmp_announcements')) localStorage.setItem('cmp_announcements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
}
