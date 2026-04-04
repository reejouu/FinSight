export const mockAccounts = [
  {
    id: 'sbi-savings',
    bank: 'State Bank of India',
    type: 'Savings',
    number: '4821',
    balance: 82450.00,
    monthChange: 12100,
    transactionCount: 18,
    trend: [71200, 71800, 71500, 72100, 71900, 72300, 82100, 82450],
    color: '#7C5CFC', // purple
    isPrimary: true,
  },
  {
    id: 'union-basic',
    bank: 'Union Bank of India',
    type: 'Basic',
    number: '9012',
    balance: 145000.00,
    monthChange: 5000,
    transactionCount: 8,
    trend: [144200, 144400, 144500, 144600, 144700, 144800, 144900, 145000],
    color: '#4FC9A4', // teal
    isPrimary: false,
  },
];

export const mockTransactions = {
  'sbi-savings': [
    { id: 1, date: 'Apr 04', desc: 'Reliance Fresh', category: 'Groceries', amount: -6500.20 },
    { id: 2, date: 'Apr 03', desc: 'Direct Deposit - Salary', category: 'Income', amount: 84200.00 },
    { id: 3, date: 'Apr 02', desc: 'Hotstar Subscription', category: 'Entertainment', amount: -299.00 },
    { id: 4, date: 'Apr 01', desc: 'Ola Ride', category: 'Transport', amount: -240.50 },
    { id: 5, date: 'Mar 30', desc: 'Cafe Coffee Day', category: 'Food & Drink', amount: -450.40 },
  ],
  'union-basic': [
    { id: 1, date: 'Apr 01', desc: 'Interest Payment', category: 'Interest', amount: 1450.20 },
    { id: 2, date: 'Mar 15', desc: 'Auto Transfer', category: 'Transfer', amount: 5000.00 },
    { id: 3, date: 'Mar 01', desc: 'Interest Payment', category: 'Interest', amount: 1420.10 },
    { id: 4, date: 'Feb 15', desc: 'Auto Transfer', category: 'Transfer', amount: 5000.00 },
    { id: 5, date: 'Feb 01', desc: 'Interest Payment', category: 'Interest', amount: 1395.50 },
  ]
};
