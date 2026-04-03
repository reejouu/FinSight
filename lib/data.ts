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

export const transactions = [
  { name: 'Apple Pay', type: 'Transfer', time: '1 hour ago', amount: '$170', iconStr: '', image: '/icons/apple.png' },
  { name: 'Google Pay', type: 'Payment', time: '2 hours ago', amount: '$250', iconStr: 'G', image: '/icons/google.png' },
  { name: 'PayPal', type: 'Refund', time: '3 hours ago', amount: '$90', iconStr: 'P', image: '/icons/paypal.png' },
  { name: 'Figma', type: 'Transfer', time: '4 hours ago', amount: '$50', iconStr: 'F', image: '/icons/figma.png' },
  { name: 'Spotify', type: 'Transfer', time: '5 hours ago', amount: '$20', iconStr: 'S', image: '/icons/spotify.png' },
  { name: 'Youtube', type: 'Transfer', time: '5 hours ago', amount: '$30', iconStr: 'Y', image: '/icons/youtube.png' },
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
