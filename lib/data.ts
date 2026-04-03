export const chartData = [
  { name: 'Jan', spending: 1200, earnings: 800 },
  { name: 'Feb', spending: 8000, earnings: 3000 },
  { name: 'Mar', spending: 14000, earnings: 5000 },
  { name: 'Apr', spending: 24230, earnings: 8220 },
  { name: 'May', spending: 20000, earnings: 9000 },
  { name: 'Jun', spending: 17000, earnings: 10000 },
  { name: 'Jul', spending: 21000, earnings: 11500 },
  { name: 'Aug', spending: 19000, earnings: 12000 },
  { name: 'Sept', spending: 22000, earnings: 13500 },
];

export const goals = [
  { name: 'Buy new Macbook Pro', deadline: '24 May 2026', saved: '$1,300', goal: '$2,500', color: '#7C5CFC', percent: 75 },
  { name: 'Buy new iPhone Pro', deadline: '12 Aug 2026', saved: '$650', goal: '$1,200', color: '#4FC9A4', percent: 50 },
  { name: 'Buy new iPad Pro', deadline: '05 Nov 2026', saved: '$400', goal: '$1,100', color: '#E879A0', percent: 35 },
  { name: 'Buy new Mac Studio', deadline: '10 Dec 2026', saved: '$1,200', goal: '$4,000', color: '#F5A623', percent: 28 },
];

export const activityData = [
  { name: 'Shopping', value: 35, color: '#E879A0' },
  { name: 'Entertainment', value: 25, color: '#4FC9A4' },
  { name: 'Platform', value: 20, color: '#F5A623' },
  { name: 'Workspace', value: 20, color: '#7C5CFC' },
];

export interface Transaction {
  id: string;
  name: string;
  reference: string;
  category: string;
  categoryBg: string;
  categoryColor: string;
  date: string;
  time: string;
  type: string;
  amount: number;
  status: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export const transactions: Transaction[] = [
  { id: '1',  name: 'Apple Pay',    reference: 'TXN-2024-001', category: 'Platform',      categoryBg: 'rgba(124,92,252,0.12)', categoryColor: '#7C5CFC', date: '24 May 2026', time: '12:00 PM', type: 'Income',  amount: 345.00, status: 'Completed', icon: '/icons/apple.png', iconBg: 'rgba(255,255,255,0.06)', iconColor: '#fff' },
  { id: '2',  name: 'Google Pay',   reference: 'TXN-2024-002', category: 'Platform',      categoryBg: 'rgba(124,92,252,0.12)', categoryColor: '#7C5CFC', date: '23 May 2026', time: '01:23 PM', type: 'Expense', amount: 124.90, status: 'Completed', icon: '/icons/google.png', iconBg: 'rgba(66,133,244,0.15)',  iconColor: '#4285F4' },
  { id: '3',  name: 'PayPal',       reference: 'TXN-2024-003', category: 'Transfer',      categoryBg: 'rgba(79,201,164,0.12)', categoryColor: '#4FC9A4', date: '22 May 2026', time: '02:40 PM', type: 'Income',  amount: 890.00, status: 'Completed', icon: '/icons/paypal.png', iconBg: 'rgba(0,48,135,0.2)',    iconColor: '#4FC9A4' },
  { id: '4',  name: 'Figma',        reference: 'TXN-2024-004', category: 'Workspace',     categoryBg: 'rgba(245,166,35,0.12)',  categoryColor: '#F5A623', date: '21 May 2026', time: '04:12 PM', type: 'Expense', amount: 15.00,  status: 'Completed', icon: '/icons/figma.png', iconBg: 'rgba(242,78,30,0.15)',  iconColor: '#F24E1E' },
  { id: '5',  name: 'Spotify',      reference: 'TXN-2024-005', category: 'Entertainment', categoryBg: 'rgba(232,121,160,0.12)', categoryColor: '#E879A0', date: '20 May 2026', time: '05:30 PM', type: 'Expense', amount: 9.99,   status: 'Completed', icon: '/icons/spotify.png', iconBg: 'rgba(29,185,84,0.15)',  iconColor: '#1DB954' },
  { id: '6',  name: 'YouTube',      reference: 'TXN-2024-006', category: 'Entertainment', categoryBg: 'rgba(232,121,160,0.12)', categoryColor: '#E879A0', date: '19 May 2026', time: '08:45 PM', type: 'Expense', amount: 11.99,  status: 'Completed', icon: '/icons/youtube.png', iconBg: 'rgba(255,0,0,0.15)',    iconColor: '#FF4444' },
  { id: '7',  name: 'Amazon',       reference: 'TXN-2024-007', category: 'Shopping',      categoryBg: 'rgba(248,113,113,0.12)', categoryColor: '#F87171', date: '18 May 2026', time: '10:15 AM', type: 'Expense', amount: 234.50, status: 'Completed', icon: 'A', iconBg: 'rgba(255,153,0,0.15)',  iconColor: '#FF9900' },
  { id: '8',  name: 'Salary',       reference: 'TXN-2024-008', category: 'Transfer',      categoryBg: 'rgba(79,201,164,0.12)', categoryColor: '#4FC9A4', date: '17 May 2026', time: '09:00 AM', type: 'Income',  amount: 4200.00,status: 'Completed', icon: 'S', iconBg: 'rgba(79,201,164,0.15)', iconColor: '#4FC9A4' },
  { id: '9',  name: 'Netflix',      reference: 'TXN-2024-009', category: 'Entertainment', categoryBg: 'rgba(232,121,160,0.12)', categoryColor: '#E879A0', date: '16 May 2026', time: '11:00 PM', type: 'Expense', amount: 15.99,  status: 'Completed', icon: 'N', iconBg: 'rgba(229,9,20,0.15)',   iconColor: '#E50914' },
  { id: '10', name: 'Uber Eats',    reference: 'TXN-2024-010', category: 'Food',          categoryBg: 'rgba(245,166,35,0.12)',  categoryColor: '#F5A623', date: '15 May 2026', time: '07:30 PM', type: 'Expense', amount: 42.80,  status: 'Completed', icon: 'U', iconBg: 'rgba(30,30,30,0.4)',    iconColor: '#fff' },
  { id: '11', name: 'Freelance',    reference: 'TXN-2024-011', category: 'Transfer',      categoryBg: 'rgba(79,201,164,0.12)', categoryColor: '#4FC9A4', date: '14 May 2026', time: '03:00 PM', type: 'Income',  amount: 1200.00,status: 'Pending',   icon: 'F', iconBg: 'rgba(124,92,252,0.15)', iconColor: '#7C5CFC' },
  { id: '12', name: 'Adobe CC',     reference: 'TXN-2024-012', category: 'Workspace',     categoryBg: 'rgba(245,166,35,0.12)',  categoryColor: '#F5A623', date: '13 May 2026', time: '12:00 PM', type: 'Expense', amount: 54.99,  status: 'Completed', icon: 'A', iconBg: 'rgba(255,0,0,0.12)',    iconColor: '#FF0000' },
  { id: '13', name: 'Zara',         reference: 'TXN-2024-013', category: 'Shopping',      categoryBg: 'rgba(248,113,113,0.12)', categoryColor: '#F87171', date: '12 May 2026', time: '02:15 PM', type: 'Expense', amount: 178.00, status: 'Completed', icon: 'Z', iconBg: 'rgba(255,255,255,0.06)', iconColor: '#fff' },
  { id: '14', name: 'Dividend',     reference: 'TXN-2024-014', category: 'Transfer',      categoryBg: 'rgba(79,201,164,0.12)', categoryColor: '#4FC9A4', date: '10 May 2026', time: '09:45 AM', type: 'Income',  amount: 320.00, status: 'Completed', icon: 'D', iconBg: 'rgba(79,201,164,0.15)', iconColor: '#4FC9A4' },
  { id: '15', name: 'Electricity',  reference: 'TXN-2024-015', category: 'Workspace',     categoryBg: 'rgba(245,166,35,0.12)',  categoryColor: '#F5A623', date: '08 May 2026', time: '11:00 AM', type: 'Expense', amount: 98.40,  status: 'Completed', icon: 'E', iconBg: 'rgba(245,166,35,0.15)', iconColor: '#F5A623' },
  { id: '16', name: 'Notion',       reference: 'TXN-2024-016', category: 'Workspace',     categoryBg: 'rgba(245,166,35,0.12)',  categoryColor: '#F5A623', date: '07 May 2026', time: '10:00 AM', type: 'Expense', amount: 16.00,  status: 'Completed', icon: 'N', iconBg: 'rgba(255,255,255,0.06)', iconColor: '#fff' },
  { id: '17', name: 'Starbucks',    reference: 'TXN-2024-017', category: 'Food',          categoryBg: 'rgba(245,166,35,0.12)',  categoryColor: '#F5A623', date: '06 May 2026', time: '08:20 AM', type: 'Expense', amount: 12.40,  status: 'Completed', icon: 'S', iconBg: 'rgba(0,112,74,0.2)',    iconColor: '#00704A' },
  { id: '18', name: 'Steam',        reference: 'TXN-2024-018', category: 'Entertainment', categoryBg: 'rgba(232,121,160,0.12)', categoryColor: '#E879A0', date: '05 May 2026', time: '09:00 PM', type: 'Expense', amount: 59.99,  status: 'Pending',   icon: 'S', iconBg: 'rgba(23,126,164,0.2)',  iconColor: '#1B8FBF' },
  { id: '19', name: 'Stripe Payout',reference: 'TXN-2024-019', category: 'Transfer',      categoryBg: 'rgba(79,201,164,0.12)', categoryColor: '#4FC9A4', date: '03 May 2026', time: '06:00 PM', type: 'Income',  amount: 2100.00,status: 'Completed', icon: 'S', iconBg: 'rgba(99,91,255,0.2)',   iconColor: '#635BFF' },
  { id: '20', name: 'Swiggy',       reference: 'TXN-2024-020', category: 'Food',          categoryBg: 'rgba(245,166,35,0.12)',  categoryColor: '#F5A623', date: '01 May 2026', time: '08:00 PM', type: 'Expense', amount: 28.60,  status: 'Failed',    icon: 'S', iconBg: 'rgba(252,88,0,0.2)',    iconColor: '#FC5800' },
];

export const cardsData = [
  {
    id: 0,
    type: 'VISA',
    number: '2345',
    fullNumber: '1264  5243  6214  2345',
    name: 'Cameron Williamson',
    spent: '$5,569.00',
    limit: '$32,999.99',
    percent: 34,
    gradient: 'linear-gradient(120deg, #44328A 0%, #4D3D94 40%, #6150C2 80%, #725DDE 100%)',
    opacity: 'opacity-25',
    pill: 'Premium'
  },
  {
    id: 1,
    type: 'Mastercard',
    number: '9876',
    fullNumber: '9876  5432  1234  9876',
    name: 'Alexander Arnold',
    spent: '$2,140.50',
    limit: '$10,000.00',
    percent: 21,
    gradient: 'linear-gradient(120deg, #14532D 0%, #16A34A 50%, #22C55E 100%)',
    opacity: 'opacity-25',
    pill: 'Business'
  }
];
