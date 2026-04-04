'use client';
import React from 'react';
import { glassCard } from '@/lib/styles';
import { Landmark, MoreHorizontal, ArrowUpRight, ArrowRightLeft } from 'lucide-react';

const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 -10 100 120" className="w-16 h-8 overflow-visible" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export default function AccountCard({ acc }: { acc: any }) {
  // Create richer glowing variables based on the bank's base color
  const isPurple = acc.color === '#7C5CFC';
  const ambientGlow = isPurple ? 'rgba(124, 92, 252, 0.15)' : 'rgba(79, 201, 164, 0.15)';

  return (
    <div className="flex flex-col rounded-2xl p-5 flex-1 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 shadow-2xl"
         style={{ 
            background: 'linear-gradient(135deg, rgba(20,18,28,0.95) 0%, rgba(14,12,20,0.95) 100%)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: `0 10px 40px -10px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.05), inset 0 0 30px 0 ${ambientGlow}`
         }}>
      {/* Modern Dot Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
      
      {/* Intense Ambient colored orbs for tech vibe */}
      <div className="absolute -top-20 -right-20 w-64 h-64 blur-[60px] rounded-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{ background: acc.color }}></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 blur-[60px] rounded-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700" style={{ background: acc.color }}></div>

      {/* Animated Top Border Glowing Line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] opacity-40 group-hover:opacity-100 group-hover:left-0 group-hover:right-0 transition-all duration-700" style={{ background: `linear-gradient(90deg, transparent 0%, ${acc.color} 50%, transparent 100%)` }}></div>

      {/* Top Row */}
      <div className="flex justify-between items-start relative z-10 mb-2">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner" style={{ background: `${acc.color}15`, border: `1px solid ${acc.color}30` }}>
             <Landmark size={14} color={acc.color} />
           </div>
           <div className="flex flex-col ml-1">
             <h3 className="text-white text-[14px] font-semibold leading-tight">{acc.bank}</h3>
             <span className="text-[#8B899A] text-[9px] uppercase font-semibold tracking-wider mt-0.5">{acc.type}</span>
           </div>
        </div>
        <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#5A5870] hover:text-white hover:bg-white/5 transition-colors flex-shrink-0">
          <MoreHorizontal size={14} />
        </button>
      </div>
      
      {/* Row 2 */}
      <div className="flex justify-between items-center mb-3 mt-1">
        <p className="text-[#5A5870] font-mono text-[11px] tracking-[2px]">•••• •••• •••• {acc.number}</p>
        {acc.isPrimary && (
          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md mb-0.5 shadow-[0_0_10px_rgba(79,201,164,0.2)]" style={{ background: '#4FC9A415', color: '#4FC9A4' }}>Primary</span>
        )}
      </div>

      {/* Balance & Sparkline */}
      <div className="flex justify-between items-end mb-3">
        <div className="flex items-baseline gap-1">
          <h2 className="text-white text-[24px] font-bold tracking-tight leading-none drop-shadow-md">
            ${(Math.floor(acc.balance)).toLocaleString()}
          </h2>
          <span className="text-white/40 text-[13px] font-bold leading-none">
            .{(acc.balance % 1).toFixed(2).substring(2)}
          </span>
        </div>
        <Sparkline data={acc.trend} color={acc.color} />
      </div>
      
      {/* Stats */}
      <div className="flex items-center gap-2 mb-3">
         <span className="text-[11px] font-medium px-2 py-1 rounded-full flex items-center gap-1"
            style={{ background: 'rgba(79,201,164,0.15)', color: '#4FC9A4' }}>
            <ArrowUpRight size={10} /> +${acc.monthChange.toLocaleString()} this month
         </span>
         <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-white/5 text-[#8B899A] flex items-center gap-1">
            {acc.transactionCount} transactions
         </span>
      </div>

      <div className="h-px bg-white/5 my-2"></div>

      {/* Actions */}
      <div className="flex gap-2 justify-start mt-1">
        <button className="px-4 py-1.5 rounded-xl border border-white/10 text-white/60 text-sm hover:text-white hover:bg-white/5 transition-colors">Deposit</button>
        <button className="px-4 py-1.5 rounded-xl border border-white/10 text-white/60 text-sm hover:text-white hover:bg-white/5 transition-colors">Withdraw</button>
      </div>
    </div>
  );
}
