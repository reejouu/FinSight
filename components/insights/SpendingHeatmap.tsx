"use client";

import React, { useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { insightsTransactions } from '@/lib/insightsMockData';
import GlassCard from '@/components/ui/GlassCard';

export default function SpendingHeatmap({ range }: { range: string }) {
  const {} = useFinanceStore();
  const transactions = insightsTransactions;

  const { cells, maxSpend } = useMemo(() => {
    const today = new Date();
    const days = [];
    const dateMap = new Map<string, number>();

    // Calculate last 28 days
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toLocaleDateString('en-US');
      dateMap.set(key, 0);
      days.push({ date: d, key, spend: 0 });
    }

    // Populate spend
    let max = 0;
    transactions.forEach(tx => {
      if (tx.type === 'Expense') {
        const txDateStr = new Date(tx.date).toLocaleDateString('en-US');
        if (dateMap.has(txDateStr)) {
          const current = dateMap.get(txDateStr)! + tx.amount;
          dateMap.set(txDateStr, current);
          if (current > max) max = current;
        }
      }
    });

    // Merge computed spend into array
    const mappedDays = days.map(d => {
      d.spend = dateMap.get(d.key) || 0;
      return d;
    });

    return { cells: mappedDays, maxSpend: max };
  }, [transactions, range]);

  return (
    <GlassCard className="flex flex-col p-4 rounded-2xl h-[280px]">
      <h3 className="text-white text-sm font-bold mb-4">Spending Heatmap</h3>
      
      <div className="flex-1 w-full flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] text-[#5A5870]">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <span key={i}>{day}</span>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2 flex-grow">
          {cells.map((cell, i) => {
            const opacity = maxSpend === 0 ? 0.08 : 0.08 + (cell.spend / maxSpend) * 0.82;
            
            return (
              <div 
                key={i} 
                className="rounded-md w-full h-full relative group cursor-pointer transition-colors duration-200"
                style={{ 
                  backgroundColor: cell.spend > 0 ? `rgba(124,92,252, ${opacity})` : 'rgba(255,255,255,0.04)' 
                }}
                title={`${cell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}\nSpent: $${cell.spend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
              >
                {/* Custom tooltip could go here if native title isn't sufficient */}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-[#5A5870] text-[10px]">
        <span>Low</span>
        <div className="flex gap-0.5">
          {[0.1, 0.3, 0.5, 0.7, 0.9].map((o, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(124,92,252, ${o})` }} />
          ))}
        </div>
        <span>High</span>
      </div>
    </GlassCard>
  );
}