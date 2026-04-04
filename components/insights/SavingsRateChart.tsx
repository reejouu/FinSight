"use client";

import React, { useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { insightsTransactions } from '@/lib/insightsMockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';

export default function SavingsRateChart({ range }: { range: string }) {
  const {} = useFinanceStore();
  const transactions = insightsTransactions;

  const data = useMemo(() => {
    // Generate last 6 months
    const now = new Date();
    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        name: d.toLocaleString('en-US', { month: 'short' }),
        income: 0,
        expense: 0,
        rate: 0
      };
    }).reverse();

    // Group transactions
    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      for (const m of months) {
        if (m.name === txDate.toLocaleString('en-US', { month: 'short' })) {
          if (tx.type === 'Income') m.income += tx.amount;
          else if (tx.type === 'Expense') m.expense += tx.amount;
        }
      }
    });
    
    // Calculate savings rate
    months.forEach(m => {
      if (m.income > 0) {
        m.rate = ((m.income - m.expense) / m.income) * 100;
      } else {
        m.rate = 0;
      }
    });

    return months;
  }, [transactions, range]);

  const latestRate = data[data.length - 1]?.rate || 0;
  const isHealthy = latestRate >= 20;

  return (
    <GlassCard className="flex flex-col p-4 rounded-2xl h-[280px]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-sm font-bold">Savings Rate Trend</h3>
          <p className="text-[#8B899A] text-xs mt-1">Last 6 months progression</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium" 
             style={{ backgroundColor: isHealthy ? 'rgba(79,201,164,0.12)' : 'rgba(248,113,113,0.12)', color: isHealthy ? '#4FC9A4' : '#F87171' }}>
          {latestRate.toFixed(1)}% Current Rate
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FC9A4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4FC9A4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F87171" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8B899A', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8B899A', fontSize: 11 }} tickFormatter={(val) => `${val}%`} />
            <Tooltip
              contentStyle={{ background: '#1C1929', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff', fontWeight: 600 }}
              formatter={(value: any) => [`${(Number(value) || 0).toFixed(1)}%`, 'Savings Rate']}
            />
            <ReferenceLine y={20} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Recommended (20%)', fill: '#8B899A', fontSize: 10 }} />
            <Area 
              type="monotone" 
              dataKey="rate" 
              stroke={isHealthy ? '#4FC9A4' : '#F87171'} 
              strokeWidth={3}
              fillOpacity={1} 
              fill={isHealthy ? "url(#colorHealthy)" : "url(#colorWarning)"} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}