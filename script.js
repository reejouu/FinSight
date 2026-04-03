const fs = require('fs');
const path = require('path');

const files = {
  'lib/data.ts': `
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
  { name: 'Apple Pay', type: 'Transfer', time: '12:00 PM', amount: '+$345.00', icon: '', color: '#1C1929', textColor: '#FFFFFF' },
  { name: 'Google Pay', type: 'Payment', time: '01:23 PM', amount: '-$124.90', icon: 'G', color: '#1C1929', textColor: '#4285F4' },
  { name: 'PayPal', type: 'Transfer', time: '02:40 PM', amount: '+$890.00', icon: 'P', color: '#1C1929', textColor: '#003087' },
  { name: 'Figma', type: 'Payment', time: '04:12 PM', amount: '-$15.00', icon: 'F', color: '#1C1929', textColor: '#F24E1E' },
  { name: 'Spotify', type: 'Payment', time: '05:30 PM', amount: '-$9.99', icon: 'S', color: '#1C1929', textColor: '#1DB954' },
  { name: 'Youtube', type: 'Payment', time: '08:45 PM', amount: '-$11.99', icon: 'Y', color: '#1C1929', textColor: '#FF0000' },
];

export const cardInfo = {
  number: '1264  5243  6214  2345',
  masked: '**** **** **** 2345',
  name: 'Cameron Williamson',
  spent: '$5,569.00',
  limit: '$32,999.99',
  percent: 34
};
`,
  'components/dashboard/Navbar.tsx': `
"use client";
import React, { useState } from 'react';
import { Search, Bell, Clock, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Activity', 'Manage', 'Card', 'Account'];

  return (
    <header className="flex items-center justify-between z-10 px-6 pt-4 pb-2">
      <div className="flex-1" />
      
      {/* Tab Group */}
      <div className="flex items-center bg-[#161320] rounded-full p-1 border border-white/10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={\`px-5 py-1.5 rounded-full text-sm transition-colors \${
              activeTab === tab ? 'bg-white text-[#0D0B14] font-semibold' : 'text-[#8B899A] hover:text-white'
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-end gap-2">
        <button className="w-9 h-9 rounded-full bg-[#1C1929] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"><Search size={16} /></button>
        <button className="w-9 h-9 rounded-full bg-[#1C1929] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"><Bell size={16} /></button>
        <button className="w-9 h-9 rounded-full bg-[#1C1929] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"><Clock size={16} /></button>
        
        <div className="flex items-center pl-2 gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[#7C5CFC] flex items-center justify-center text-white font-bold text-sm">
            DR
          </div>
          <div className="flex flex-col text-xs leading-tight">
            <span className="font-semibold text-white">Darlene Robertson</span>
            <span className="text-[#8B899A]">felicia.reid@gmail.com</span>
          </div>
          <ChevronDown size={14} className="text-[#5A5870] ml-1" />
        </div>
      </div>
    </header>
  );
}
`,
  'components/dashboard/TotalBalanceCard.tsx': `
import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function TotalBalanceCard() {
  return (
    <div className="w-[30%] min-w-[280px] h-full bg-[#161320] rounded-2xl border border-white/[0.07] p-4 flex flex-col hover:border-white/10 transition-colors">
      <p className="text-[#8B899A] text-[13px] mb-2">Total Balance</p>
      
      <div className="flex items-end gap-3 mb-4">
        <h2 className="text-[32px] font-bold text-white leading-none">
          $54,689.<span className="text-xl font-bold opacity-80">99</span>
        </h2>
        <div className="flex items-center gap-1 bg-[#4FC9A4]/15 text-[#4FC9A4] text-xs font-medium px-2 py-0.5 rounded-full mb-1">
          <TrendingUp size={12} />
          <span>+16.5%</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="flex-1 border border-white/20 bg-transparent py-1.5 rounded-full text-sm text-white hover:bg-white/5 transition-colors">Deposit</button>
        <button className="flex-1 bg-[#7C5CFC] py-1.5 rounded-full text-sm font-medium text-white hover:bg-[#7C5CFC]/90 transition-colors">Transfer</button>
      </div>

      <hr className="border-white/5 mb-3" />

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-[#8B899A] text-xs mb-1">Main Balance</p>
          <p className="text-white font-bold text-sm">$14,756.00</p>
        </div>
        <div>
          <p className="text-[#8B899A] text-xs mb-1">Credit Balance</p>
          <p className="text-white font-bold text-sm">$14,756.00</p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="w-full flex h-1.5 gap-1 mb-2">
          <div className="h-full bg-[#7C5CFC] flex-1 rounded-full"></div>
          <div className="h-full bg-white/10 w-1/5 rounded-full"></div>
          <div className="h-full bg-white/10 w-1/5 rounded-full"></div>
          <div className="h-full bg-white/10 w-1/5 rounded-full"></div>
          <div className="h-full bg-white/10 w-1/5 rounded-full"></div>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#8B899A]">$1,569.00 credit spent</span>
          <span className="text-white font-semibold">34%</span>
        </div>
      </div>
    </div>
  );
}
`,
  'components/dashboard/TransactionChart.tsx': `
"use client";
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { chartData } from '../../lib/data';

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1929] border border-white/10 rounded-lg p-2 shadow-xl flex flex-col gap-1 relative z-50 text-xs">
        <p className="text-white font-medium mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#7C5CFC]"></div>
          <span className="text-[#8B899A]">Spending:</span>
          <span className="text-white font-bold">\${payload[0].value.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4FC9A4]"></div>
          <span className="text-[#8B899A]">Earnings:</span>
          <span className="text-white font-bold">\${payload[1].value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function TransactionChart() {
  return (
    <div className="flex-1 h-full min-h-0 bg-[#161320] rounded-2xl border border-white/[0.07] p-4 flex flex-col hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[#8B899A] text-[13px]">Transaction Overview</p>
        <button className="bg-[#1C1929] border border-white/10 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
          This Years <ChevronDown size={14} />
        </button>
      </div>
      
      <div className="flex items-center gap-6 mb-2">
        <h2 className="text-[28px] font-bold text-white">$34,123.90</h2>
        <div className="flex items-center gap-4 text-xs text-[#8B899A] font-medium">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#7C5CFC]" /> Spending</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#4FC9A4]" /> Earnings</div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FC9A4" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#4FC9A4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8B899A', fontSize: 11 }} dy={5} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8B899A', fontSize: 11 }} tickFormatter={(val) => val === 0 ? '0' : \`\${val/1000}k\`} />
            <Tooltip content={<CustomTooltip />} />
            
            <Area type="monotone" dataKey="earnings" stroke="#4FC9A4" fill="url(#colorEarnings)" strokeWidth={2} fillOpacity={1} />
            <Area type="monotone" dataKey="spending" stroke="#7C5CFC" fill="url(#colorSpending)" strokeWidth={2} fillOpacity={1} activeDot={{ r: 5, fill: '#7C5CFC', stroke: '#fff', strokeWidth: 2 }} />
            
            {/* Custom annotations can be done via reference dots if desired */}
            <ReferenceDot x="Apr" y={24230} r={4} fill="#7C5CFC" stroke="white" strokeWidth={2} />
            <ReferenceDot x="Apr" y={8220} r={4} fill="#4FC9A4" stroke="white" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        {/* Floating Labels for custom dots */}
        <div className="absolute top-[10%] left-[38%] bg-[#1C1929] border border-white/10 px-2 py-0.5 rounded text-white text-[10px] shadow-sm transform -translate-x-1/2 -translate-y-full">$24,230</div>
        <div className="absolute top-[65%] left-[38%] bg-[#1C1929] border border-white/10 px-2 py-0.5 rounded text-white text-[10px] shadow-sm transform -translate-x-1/2 -translate-y-full">$8,220</div>
      </div>
    </div>
  );
}
`,
  'components/dashboard/FinancialGoals.tsx': `
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { goals } from '../../lib/data';

export default function FinancialGoals() {
  return (
    <div className="flex-[1.4] h-full bg-[#161320] rounded-2xl border border-white/[0.07] p-4 flex flex-col hover:border-white/10 transition-colors overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-white">Financial Goals</h3>
        <button className="text-[#5A5870] hover:text-white transition-colors"><ChevronRight size={18} /></button>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
        {goals.map((goal, idx) => (
          <div key={idx} className="flex items-center gap-3 h-14 bg-white/[0.02] px-2 rounded-lg hover:bg-white/[0.04] transition-colors">
            <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90 absolute inset-0">
                <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" fill="none" />
                <circle cx="20" cy="20" r="16" stroke={goal.color} strokeWidth="3.5" fill="none" strokeDasharray="100.5" strokeDashoffset={100.5 - (100.5 * goal.percent) / 100} strokeLinecap="round" />
              </svg>
              <span className="text-[9px] font-bold text-white relative z-10">{goal.percent}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white truncate">{goal.name}</h4>
              <p className="text-[11px] text-[#8B899A]">{goal.deadline}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-white/50 mb-0.5">Saved Up</p>
              <p className="text-[13px] font-bold text-white leading-none">{goal.saved}</p>
            </div>
            <div className="text-right ml-2 w-14 flex-shrink-0">
              <p className="text-[10px] text-white/50 mb-0.5">Goal</p>
              <p className="text-[13px] font-bold text-white leading-none">{goal.goal}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
        <p className="text-[11px] text-[#8B899A]">Showing 1 to 4 of 8 entries</p>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center text-[#8B899A] hover:text-white"><ChevronLeft size={14} /></button>
          <button className="w-6 h-6 flex items-center justify-center rounded-full bg-[#7C5CFC] text-white text-xs font-medium">1</button>
          <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white hover:bg-white/20 text-xs font-medium transition-colors">2</button>
          <button className="w-6 h-6 flex items-center justify-center text-[#8B899A] hover:text-white"><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}
`,
  'components/dashboard/AllActivity.tsx': `
"use client";
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { activityData } from '../../lib/data';

export default function AllActivity() {
  return (
    <div className="flex-1 h-full bg-[#161320] rounded-2xl border border-white/[0.07] p-4 flex flex-col hover:border-white/10 transition-colors">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-white">All Activity</h3>
        <button className="text-[#5A5870] hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={activityData} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={3} dataKey="value" stroke="none">
              {activityData.map((entry, index) => (
                <Cell key={\`cell-\${index}\`} fill={entry.color} />
              ))}
            </Pie>
            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" fill="#8B899A" fontSize="11" fontWeight="500">
              Total
            </text>
            <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              $450.90
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-2 mt-2 px-2">
        {activityData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-white/70">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
  'components/dashboard/YourCard.tsx': `
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cardInfo } from '../../lib/data';

export default function YourCard() {
  return (
    <div className="bg-[#161320] rounded-2xl border border-white/[0.07] p-4 flex flex-col hover:border-white/10 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-white">Your Card</h3>
        <a href="#" className="text-xs font-medium text-white hover:text-[#7C5CFC] transition-colors">+ Add Card</a>
      </div>

      <div className="bg-[#7C5CFC] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full self-start mb-2">
        Premium
      </div>

      {/* Credit Card Visual */}
      <div className="relative h-[160px] rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-inner mb-3" style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E06030 30%, #9B59D0 70%, #6B3FA0 100%)' }}>
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative flex justify-between items-start z-10 w-full">
          <span className="opacity-0">Space</span>
          <span className="text-white font-bold italic text-lg tracking-wider">VISA</span>
        </div>
        
        <div className="relative z-10 flex justify-between items-end w-full">
          <div className="w-8 h-6 rounded-sm bg-amber-200/60 border border-amber-100/40 flex flex-col justify-evenly p-0.5 pb-1">
            <div className="h-[1px] w-full bg-black/20" />
            <div className="h-[1px] w-full bg-black/20" />
            <div className="h-[1px] w-full bg-black/20" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 px-1">
        <button className="text-[#8B899A] hover:text-white"><ChevronLeft size={16} /></button>
        <div className="flex flex-col items-center">
          <div className="text-white text-[14px] font-mono tracking-wide mb-0.5 flex gap-2">
            <span>1264</span><span>5243</span><span>6214</span>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-[#8B899A]">
            <span className="text-[10px]">‹</span>
            <span>2345</span>
            <span className="text-[10px]">›</span>
          </div>
        </div>
        <button className="text-[#8B899A] hover:text-white"><ChevronRight size={16} /></button>
      </div>

      <div>
        <p className="text-[#8B899A] text-[11px] mb-1.5">Daily Transaction Limits</p>
        <div className="w-full h-1.5 bg-[#1C1929] rounded-full overflow-hidden mb-1.5">
          <div className="h-full bg-[#7C5CFC]" style={{ width: \`\${cardInfo.percent}%\` }}></div>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-[#8B899A]">{cardInfo.spent} spent of {cardInfo.limit}</span>
          <span className="text-white font-medium">{cardInfo.percent}%</span>
        </div>
      </div>
    </div>
  );
}
`,
  'components/dashboard/RecentTransactions.tsx': `
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { transactions } from '../../lib/data';

export default function RecentTransactions() {
  return (
    <div className="flex-1 min-h-0 bg-[#161320] rounded-2xl border border-white/[0.07] p-4 flex flex-col hover:border-white/10 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-white">Recent Transaction</h3>
        <button className="text-[#5A5870] hover:text-white transition-colors"><ChevronRight size={16} /></button>
      </div>
      
      <div className="flex flex-col gap-2 overflow-hidden min-h-0 -mx-1">
        {transactions.map((tx, idx) => (
          <div key={idx} className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-[#1C1929] flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:bg-white/10 transition-colors" style={{ color: tx.textColor }}>
              {tx.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-medium truncate leading-tight mb-0.5">{tx.name}</p>
              <p className="text-[#8B899A] text-[10px] leading-none">{tx.time}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={\`text-[13px] font-semibold leading-tight mb-0.5 \${tx.amount.startsWith('+') ? 'text-white' : 'text-white/90'}\`}>{tx.amount}</p>
              <p className="text-[#8B899A] text-[10px] leading-none">{tx.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
  'components/dashboard/DashboardLayout.tsx': `
import React from 'react';
import { Zap, LayoutGrid, BarChart2, ArrowLeftRight, Receipt, Users, LogOut, Plus } from 'lucide-react';
import Navbar from './Navbar';
import TotalBalanceCard from './TotalBalanceCard';
import TransactionChart from './TransactionChart';
import FinancialGoals from './FinancialGoals';
import AllActivity from './AllActivity';
import YourCard from './YourCard';
import RecentTransactions from './RecentTransactions';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0D0B14] relative">
      
      {/* Background glow in main area */}
      <div className="absolute inset-0 pointer-events-none z-0 left-[72px]"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 55% 0%, rgba(90,50,180,0.22) 0%, transparent 65%)' }}
      />

      {/* Sidebar */}
      <aside className="w-[72px] flex-shrink-0 h-full flex flex-col items-center py-5 bg-[#110F1C] border-r border-white/5 z-10">
        <div className="text-white mb-auto h-9 w-9 flex items-center justify-center rounded-xl relative group">
          <div className="absolute inset-0 bg-[#7C5CFC] opacity-20 rounded-xl"></div>
          <Zap size={18} className="fill-white text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="flex flex-col gap-6 text-[#5A5870] items-center mt-6 mb-auto">
          <button className="text-[#7C5CFC] hover:text-white transition-colors"><LayoutGrid size={22} /></button>
          <button className="hover:text-white transition-colors"><BarChart2 size={22} /></button>
          <button className="hover:text-white transition-colors"><ArrowLeftRight size={22} /></button>
          <button className="hover:text-white transition-colors"><Receipt size={22} /></button>
          <button className="hover:text-white transition-colors"><Users size={22} /></button>
        </div>

        <button className="mt-auto text-[#5A5870] hover:text-white transition-colors">
          <LogOut size={22} />
        </button>
      </aside>

      {/* Main scroll area text-white */}
      <main className="flex-1 flex flex-col overflow-hidden h-full z-10 text-white min-w-0">
        <Navbar />
        
        {/* Dashboard grid — fixed height, no overflow */}
        <div className="flex-1 overflow-hidden px-6 pb-4 pt-3 flex flex-col gap-3 min-h-0">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-[26px] font-bold text-white leading-tight">Dashboard</h1>
              <p className="text-[#8B899A] text-[13px]">Manage your payments and transaction in one click</p>
            </div>
            <button className="flex items-center gap-2 bg-[#1C1929] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-white hover:bg-white/10 transition-colors">
              <Plus size={14} /> <span>Add Widget</span>
            </button>
          </div>

          <div className="flex gap-3 flex-1 min-h-0">
            <TotalBalanceCard />
            <TransactionChart />
          </div>
          
          <div className="flex gap-3" style={{ height: '280px' }}>
            <FinancialGoals />
            <AllActivity />
          </div>

        </div>
      </main>

      {/* Right panel */}
      <aside className="w-[268px] flex-shrink-0 h-full flex flex-col overflow-hidden border-l border-white/5 py-4 px-4 gap-3 bg-transparent z-10 text-white">
        <YourCard />
        <RecentTransactions />
      </aside>
      
    </div>
  );
}
`,
  'app/page.tsx': `
import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function Home() {
  return <DashboardLayout />;
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullpath = path.join(process.cwd(), filepath);
  fs.mkdirSync(path.dirname(fullpath), { recursive: true });
  fs.writeFileSync(fullpath, content.trim() + '\n');
  console.log('Created ' + filepath);
}
