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
    <div className="flex gap-3 flex-shrink-0">
      {stats.map((stat, i) => (
        <GlassCard key={i} className="flex-1 flex items-center gap-3 p-4 rounded-2xl">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: stat.iconBg }}>
            <stat.icon size={18} style={{ color: stat.iconColor }} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[#8B899A] text-xs mb-0.5">{stat.label}</span>
            <span className="text-white text-lg font-bold leading-tight">{stat.value}</span>
            <span className={`text-[10px] mt-0.5 ${stat.positive ? 'text-[#4FC9A4]' : 'text-[#F87171]'}`}>
              {stat.change}
            </span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}