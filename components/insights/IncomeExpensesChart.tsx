"use client";

import React, { useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { insightsTransactions } from '@/lib/insightsMockData';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';

export default function IncomeExpensesChart({ range }: { range: string }) {
  const {} = useFinanceStore();
  const transactions = insightsTransactions;

  const data = useMemo(() => {
    // Generate last 6 months
    const now = new Date();
    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        name: d.toLocaleString('en-US', { month: 'short' }),
        Income: 0,
        Expense: 0,
        net: 0
      };
    }).reverse();

    // Group transactions
    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      for (const m of months) {
        if (m.name === txDate.toLocaleString('en-US', { month: 'short' })) {
          if (tx.type === 'Income') m.Income += tx.amount;
          else if (tx.type === 'Expense') m.Expense += tx.amount;
        }
      }
    });
    
    // Calculate net
    months.forEach(m => {
      m.net = m.Income - m.Expense;
    });

    return months;
  }, [transactions, range]);

  const lastMonth = data[4] || { net: 0 };
  const thisMonth = data[5] || { net: 0 };
  
  const netChange = lastMonth.net > 0 
    ? ((thisMonth.net - lastMonth.net) / lastMonth.net) * 100 
    : 0;

  const isUp = netChange >= 0;

  return (
    <GlassCard className="flex flex-col p-4 rounded-2xl h-[280px]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-sm font-bold">Income vs Expenses</h3>
          <p className="text-[#8B899A] text-xs mt-1">Last 6 months breakdown</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium" 
             style={{ backgroundColor: isUp ? 'rgba(79,201,164,0.12)' : 'rgba(248,113,113,0.12)', color: isUp ? '#4FC9A4' : '#F87171' }}>
          {isUp ? '↑' : '↓'} Savings {isUp ? 'up' : 'down'} {Math.abs(netChange).toFixed(1)}% MoM
        </div>
      </div>
      
      {/* Custom HTML Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-[#8B899A] text-[11px]">
          <div className="w-2 h-2 rounded-sm bg-[#7C5CFC]" /> Income
        </div>
        <div className="flex items-center gap-1.5 text-[#8B899A] text-[11px]">
          <div className="w-2 h-2 rounded-sm bg-[#F87171]" /> Expenses
        </div>
      </div>

      <div className="flex-1 min-h-0 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={14} barGap={4}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8B899A', fontSize: 11 }} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              contentStyle={{ background: '#1d1b26', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12, padding: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="Income" fill="#7C5CFC" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="#F87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}