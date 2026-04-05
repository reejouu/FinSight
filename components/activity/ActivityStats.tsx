'use client';
import React from 'react';
import { TrendingUp, TrendingDown, PiggyBank, Activity } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface StatItem {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

interface ActivityStatsProps {
  stats: StatItem[];
}

export default function ActivityStats({ stats }: ActivityStatsProps) {
  return (
    <div className="grid grid-cols-2 md:flex gap-3 flex-shrink-0">
      {stats.map((stat, i) => (
        <GlassCard key={i} className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-3 p-3 md:p-4 rounded-2xl overflow-hidden">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: stat.iconBg }}>
            <stat.icon size={16} style={{ color: stat.iconColor }} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[#8B899A] text-[11px] md:text-xs mb-0.5 truncate">{stat.label}</span>
            <span className="text-white text-sm md:text-lg font-bold leading-tight truncate">{stat.value}</span>
            <span className={`text-[10px] mt-0.5 ${stat.positive ? 'text-[#4FC9A4]' : 'text-[#F87171]'}`}>
              {stat.change}
            </span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}