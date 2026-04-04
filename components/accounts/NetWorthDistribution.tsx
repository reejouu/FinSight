'use client';
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { mockAccounts } from '@/lib/accountsData';

export default function NetWorthDistribution() {
  const totalNetWorth = mockAccounts.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <GlassCard className="rounded-2xl p-5 flex flex-col flex-shrink-0">
       <h3 className="text-white text-[15px] font-medium tracking-wide mb-4 flex-shrink-0">Asset Distribution</h3>
       
       {/* Progress Bar flex-shrink-0 */}
       <div className="w-full h-2.5 rounded-full flex-shrink-0 overflow-hidden flex mb-4 relative z-0">
         {mockAccounts.map((acc) => {
           const percentage = (acc.balance / totalNetWorth) * 100;
           return (
             <div key={acc.id} style={{ width: `${percentage}%`, background: acc.color }} className="h-full z-10 transition-all"></div>
           );
         })}
       </div>
       
       {/* Legends min-h-0 allows scroll if extremely squeezed */}
       <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
         {mockAccounts.map((acc) => {
           const percentage = (acc.balance / totalNetWorth) * 100;
           return (
             <div key={acc.id} className="flex justify-between items-center flex-shrink-0">
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-sm" style={{ background: acc.color }}></span>
                 <span className="text-[#8B899A] text-[11px] font-medium">{acc.bank}</span>
               </div>
               <div className="text-right">
                 <span className="text-white text-[13px] font-bold tracking-tight inline-block min-w-[70px]">
                   ${(acc.balance).toLocaleString(undefined, {minimumFractionDigits: 0})}
                 </span>
                 <span className="text-[#5A5870] text-[11px] ml-2 font-medium inline-block min-w-[40px] text-right">
                   {percentage.toFixed(1)}%
                 </span>
               </div>
             </div>
           );
         })}
       </div>
    </GlassCard>
  );
}
