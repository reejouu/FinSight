'use client';
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Check, AlertTriangle } from 'lucide-react';

export default function SecurityOverview() {
  return (
    <GlassCard className="rounded-2xl p-5 flex flex-col flex-1 min-h-0">
       <h3 className="text-white text-[15px] font-medium tracking-wide mb-3 flex-shrink-0">Security Overview</h3>
       
       <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-[#5A5870]" />
              <span className="text-[#8B899A] text-xs">Two-factor auth</span>
            </div>
            <span className="text-white text-xs font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC9A4]"></span> Enabled
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-[#5A5870]" />
              <span className="text-[#8B899A] text-xs">Last login</span>
            </div>
            <span className="text-white text-xs font-semibold">2 hrs ago</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-[#F5A623]" />
              <span className="text-[#8B899A] text-xs text-white/90">Linked devices</span>
            </div>
            <span className="text-white text-xs font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span> 3 active
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-[#5A5870]" />
              <span className="text-[#8B899A] text-xs">Password</span>
            </div>
            <span className="text-white text-xs font-semibold">Changed 30d ago</span>
          </div>
       </div>
       
       <button className="mt-3 w-full text-xs text-white flex-shrink-0 font-medium py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
               style={{ background: 'rgba(255,255,255,0.02)' }}
               onClick={() => alert('Review Security coming soon')}
               >
         Review Security
       </button>
    </GlassCard>
  );
}
