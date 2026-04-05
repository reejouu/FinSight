'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { goals } from '@/lib/data';
import { glassCard } from '@/lib/styles';

export default function FinancialGoals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemCount, setItemCount] = useState(3);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        // Adjust the divisor (e.g. 70px) to determine how many items naturally fit perfectly.
        const count = Math.max(3, Math.floor(height / 70));
        setItemCount(count);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col p-5 rounded-2xl overflow-hidden relative md:h-full md:flex-shrink-0 md:w-[480px]" style={{ ...glassCard }}>
      {/* header */}
      <div className="flex justify-between items-center mb-5 flex-shrink-0 z-10 relative">
        <h3 className="text-white text-[15px] font-medium tracking-wide">Financial Goals</h3>
        <button className="text-[#5A5870] hover:text-white transition-colors"><ChevronRight size={18} /></button>
      </div>
      {/* goal rows */}
      <div ref={containerRef} className="flex flex-col md:flex-1 md:min-h-0 md:overflow-y-auto hide-scroll gap-0 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {goals.map((goal, idx) => (
          <div key={idx} className="flex items-center gap-3 border-b border-white/5 last:border-0 flex-shrink-0 py-3">
            <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90 absolute inset-0">
                <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" fill="none" />
                <circle cx="20" cy="20" r="16" stroke={goal.color} strokeWidth="3.5" fill="none" strokeDasharray="100.5" strokeDashoffset={100.5 - (100.5 * goal.percent) / 100} strokeLinecap="round" />
              </svg>
              <span className="text-[9px] font-bold text-white relative z-10">{goal.percent}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white">{goal.name}</h4>
              <p className="text-[11px] text-[#8B899A]">{goal.deadline}</p>
            </div>
            <div className="text-right flex-shrink-0 w-16">
              <p className="text-[10px] text-white/50 mb-0.5">Saved Up</p>
              <p className="text-[13px] font-bold text-white leading-none">{goal.saved}</p>
            </div>
            <div className="text-right flex-shrink-0 w-16">
              <p className="text-[10px] text-white/50 mb-0.5">Goal</p>
              <p className="text-[13px] font-bold text-white leading-none">{goal.goal}</p>
            </div>
          </div>
        ))}
      </div>
      {/* pagination */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5 flex-shrink-0">
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
