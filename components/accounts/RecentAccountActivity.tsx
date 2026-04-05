'use client';
import React, { useState } from 'react';
import { glassCard } from '@/lib/styles';

const transactions = {
  sbi: [
    { id: 1, date: 'May 20', description: 'Reliance Fresh', category: 'Groceries', amount: -6500.50, type: 'expense' },
    { id: 2, date: 'May 19', description: 'Direct Deposit - Employer', category: 'Income', amount: 84250.00, type: 'income' },
    { id: 3, date: 'May 18', description: 'Ola Rides', category: 'Transport', amount: -350.90, type: 'expense' },
    { id: 4, date: 'May 17', description: 'Hotstar Subscription', category: 'Entertainment', amount: -299.00, type: 'expense' },
    { id: 5, date: 'May 15', description: 'Cafe Coffee Day', category: 'Dining', amount: -450.40, type: 'expense' }
  ],
  union: [
    { id: 1, date: 'May 21', description: 'Interest Payment', category: 'Interest', amount: 1240.50, type: 'income' },
    { id: 2, date: 'May 15', description: 'Transfer from NEFT', category: 'Transfer', amount: 15500.00, type: 'income' },
    { id: 3, date: 'May 01', description: 'Monthly Maintenance Fee', category: 'Fees', amount: -150.00, type: 'expense' },
    { id: 4, date: 'Apr 25', description: 'ATM Withdrawal - HDFC', category: 'Cash', amount: -5000.00, type: 'expense' },
    { id: 5, date: 'Apr 15', description: 'Transfer to FD', category: 'Transfer', amount: -25000.00, type: 'expense' }
  ]
};

export default function RecentAccountActivity() {
  const [activeTab, setActiveTab] = useState<'sbi' | 'union'>('sbi');
  const currentTransactions = transactions[activeTab];

  return (
    <div className="flex flex-col flex-1 p-5 rounded-2xl min-h-0 border border-white/5" style={{ ...glassCard, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 mb-5 flex-shrink-0 relative">
        <h3 className="text-white text-[15px] font-semibold">Recent Account Activity</h3>
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl shadow-inner border border-white/5 self-start md:self-auto" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'sbi' ? 'bg-[#7C5CFC] text-white shadow-md' : 'text-[#8B899A] hover:text-white hover:bg-white/10'}`}
            onClick={() => setActiveTab('sbi')}
          >
            SBI Savings
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'union' ? 'bg-[#4FC9A4] text-white shadow-md' : 'text-[#8B899A] hover:text-white hover:bg-white/10'}`}
            onClick={() => setActiveTab('union')}
          >
            Union Basic
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto pr-1 md:pr-2" style={{ scrollbarWidth: 'none' }}>
        {currentTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center py-3 border-b border-white/5 last:border-0 gap-2 md:gap-0">
            <span className="text-[#5A5870] text-[10px] md:text-xs w-10 md:w-12 flex-shrink-0">{tx.date}</span>
            <span className="text-white text-[13px] md:text-sm flex-1 truncate pr-2 md:pr-4">{tx.description}</span>
            <span className="hidden sm:inline-block text-[9px] md:text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-white/5 text-[#8B899A] mr-2 md:mr-4">{tx.category}</span>
            <span className={`text-[13px] md:text-sm font-medium text-right flex-shrink-0 ${tx.type === 'income' ? 'text-[#4FC9A4]' : 'text-white'}`}>
              {tx.type === 'income' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
