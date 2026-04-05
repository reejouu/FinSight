import React from 'react';
import { glassCard } from '@/lib/styles';

export default function TotalBalanceCard() {
  return (
    <div className="flex flex-col rounded-2xl p-5 flex-shrink-0 overflow-hidden w-full md:w-[380px]" style={{ ...glassCard }}>
      <h3 className="text-white text-[15px] font-medium tracking-wide mb-4">Total Balance</h3>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-white text-3xl font-bold tracking-tight leading-none">$54,689</span>
        <span className="text-white/40 text-lg font-bold leading-none mb-0.5">.99</span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full mb-1 ml-1"
          style={{ background: 'rgba(79,201,164,0.15)', color: '#4FC9A4' }}>
          ↑ +16.5%
        </span>
      </div>
      <div className="flex gap-2 mb-4">
        <button className="flex-1 py-2 rounded-full border border-white/15 text-white text-sm hover:bg-white/5 transition-colors">Deposit</button>
        <button className="flex-1 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ background: '#7C5CFC' }}>Transfer</button>
      </div>
      <div className="mt-auto">
        <div className="h-px bg-white/5 mb-3" />
        <div className="flex justify-between mb-3">
          <div>
            <p className="text-[#8B899A] text-[11px] mb-0.5">Main Balance</p>
            <p className="text-white text-sm font-semibold">$14,756.00</p>
          </div>
          <div className="text-right">
            <p className="text-[#8B899A] text-[11px] mb-0.5">Credit Balance</p>
            <p className="text-white text-sm font-semibold">$14,756.00</p>
          </div>
        </div>
        <div className="flex gap-1 mb-1.5">
          {[true, false, false, false, false].map((filled, i) => (
            <div key={i} className="h-1 flex-1 rounded-full"
              style={{ background: filled ? '#7C5CFC' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
        <div className="flex justify-between">
          <span className="text-[#8B899A] text-[10px]">$1,569.00 credit spent</span>
          <span className="text-[#8B899A] text-[10px]">34%</span>
        </div>
      </div>
    </div>
  );
}
