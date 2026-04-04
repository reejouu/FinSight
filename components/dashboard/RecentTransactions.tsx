'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { transactions } from '@/lib/data';
import GlassCard from '@/components/ui/GlassCard';

export default function RecentTransactions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemCount, setItemCount] = useState(3);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        // Assume around 60-75px is the ideal height for each transaction item.
        // If container height is roughly 250px, round down to find how many items fit without fractions.
        const count = Math.max(3, Math.floor(height / 70));
        setItemCount(count);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Dampen the scroll distance per mouse wheel tick by half 
      // and animate the scroll so it's smooth instead of jumping abruptly.
      // This stops shorter normal widths from flying past 2+ items.
      container.scrollBy({ top: e.deltaY * 0.5, behavior: 'smooth' });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <GlassCard className="flex flex-col flex-1 p-4 rounded-2xl min-h-0 overflow-hidden">
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <h3 className="font-semibold text-white">Recent Transaction</h3>
        <ChevronRight size={14} className="text-[#8B899A]"/>
      </div>
      
      <div ref={containerRef} className="flex flex-col gap-0 overflow-y-auto flex-1 min-h-0 hide-scroll scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {transactions.slice(0, 6).map((tx, idx) => (
          <div key={idx} className="flex items-center gap-3 border-b border-white/5 last:border-0 flex-shrink-0 group"
            style={{ height: `${100 / itemCount}%` }}>
            <div className="relative w-[38px] h-[38px] bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 font-bold overflow-hidden"
              style={{ color: tx.iconColor || '#fff' }}>
              {tx.icon.startsWith('/') ? (
                <Image src={tx.icon} alt={tx.name} fill className={`object-contain p-2 ${['Netflix', 'Amazon', 'Starbucks'].includes(tx.name) ? 'scale-[1.35]' : ''}`} />
              ) : (
                tx.icon
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13.5px] font-medium truncate leading-tight mb-1">{tx.name}</p>
              <p className="text-[#8B899A] text-[11px] leading-none">{tx.time}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-white text-[13.5px] font-semibold leading-tight mb-1">
                {tx.type === 'Income' ? '+' : '-'}${tx.amount.toFixed(0)}
              </p>
              <p className="text-[#8B899A] text-[11px] leading-none">{tx.type}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
