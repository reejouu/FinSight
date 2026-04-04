"use client";

import React, { useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { insightsTransactions } from '@/lib/insightsMockData';
import GlassCard from '@/components/ui/GlassCard';

export default function CashFlowTimeline({ range }: { range: string }) {
  const {} = useFinanceStore();
  const transactions = insightsTransactions;

  const data = useMemo(() => {
    // 8 most recent
    const sorted = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);
    
    let max = 0;
    sorted.forEach(tx => { if (tx.amount > max) max = tx.amount; });

    return sorted.map(tx => ({
      ...tx,
      pct: max > 0 ? (tx.amount / max) * 100 : 0
    }));
  }, [transactions, range]);

  return (
    <GlassCard className="flex flex-col p-4 rounded-2xl h-[360px] relative">
      <h3 className="text-white text-sm font-bold mb-4">Cash Flow Timeline</h3>
      
      <div className="flex flex-col flex-1 relative mt-[20px]">
        {/* Center label header */}
        <div className="absolute -top-7 w-full flex justify-center text-[10px] text-[#5A5870]">
          <div className="flex justify-between w-[200px]">
            <span className="text-left w-1/2">Expenses</span>
            <span className="text-right w-1/2">Income</span>
          </div>
        </div>

        {/* Center vertical divider */}
        <div className="absolute left-1/2 top-0 bottom-4 w-px bg-white/10 -translate-x-1/2" />

        <div className="flex flex-col h-full justify-between gap-1 py-2">
          {data.map((tx, i) => {
            const isExpense = tx.type === 'Expense';
            return (
              <div key={tx.id || i} className="flex items-center w-full h-6 group">
                <div className="w-14 shrink-0 text-right pr-2 text-[10px] text-[#5A5870]">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>

                <div className="flex-1 flex px-1">
                  <div className="flex-1 flex justify-end">
                    {isExpense && (
                      <div 
                        className="h-2 rounded-l-full bg-[#F87171]/50 self-center transition-all group-hover:bg-[#F87171]/80" 
                        style={{ width: `${tx.pct}%` }} 
                      />
                    )}
                  </div>
                  
                  {/* Gap around center line */}
                  <div className="w-2 shrink-0" />
                  
                  <div className="flex-1 flex justify-start">
                    {!isExpense && (
                      <div 
                        className="h-2 rounded-r-full bg-[#4FC9A4]/50 self-center transition-all group-hover:bg-[#4FC9A4]/80" 
                        style={{ width: `${tx.pct}%` }} 
                      />
                    )}
                  </div>
                </div>

                <div className="w-14 shrink-0 pl-2 text-left text-[10px] text-[#8B899A] truncate" title={tx.name}>
                  {tx.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}