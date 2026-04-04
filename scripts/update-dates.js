const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../lib/data.ts');
let content = fs.readFileSync(dataFile, 'utf-8');

const today = new Date();
const datesArray = [];
for (let i = 0; i < 28; i++) {
  const d = new Date(today);
  d.setDate(today.getDate() - i);
  // NextJS/App format matching: '24 May 2026' -> '14 Jan 2024'
  const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  datesArray.push(dateStr);
}

// Randomly cluster to create high-spend days
const highSpendDay1 = datesArray[2];
const highSpendDay2 = datesArray[12];

let idx = 0;
content = content.replace(/(date:\s*')([0-9]{1,2} [A-Za-z]+ [0-9]{4})(')/g, (match, p1, p2, p3) => {
  idx++;
  let d = datesArray[idx % datesArray.length];
  if (idx % 5 === 0) d = highSpendDay1;
  else if (idx % 7 === 0) d = highSpendDay2;
  return `${p1}${d}${p3}`;
});

fs.writeFileSync(dataFile, content);
