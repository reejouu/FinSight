"use client";

import React from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { insightsTransactions } from '@/lib/insightsMockData';
import { ShoppingBag, Ticket, Pizza, Briefcase } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const ICONS: Record<string, React.ElementType> = {
  Shopping: ShoppingBag,
  Entertainment: Ticket,
  Food: Pizza,
  Workspace: Briefcase,
};

const CATEGORY_COLORS: Record<string, string> = {
  Shopping: '#F87171',
  Entertainment: '#E879A0',
  Workspace: '#10B981',
  Food: '#F43F5E',
  Platform: '#2DD4BF',
  Other: '#4FC9A4',
};

export default function BudgetHealthStrip({ range }: { range: string }) {
  const { budgets} = useFinanceStore();
  const transactions = insightsTransactions;

  // Compute spent amount per category (filter to Expense type for current month)
  const spentByCategory = React.useMemo(() => {
    const acc: Record<string, number> = {};
    for (const tx of transactions) {
      // Filter for 'Apr 2026' to only show this month's budget usage
      if (tx.type === 'Expense' && tx.date.includes('Apr 2026')) {
        const cat = tx.category || 'Other';
        acc[cat] = (acc[cat] || 0) + tx.amount;
      }
    }
    return acc;
  }, [transactions, range]);

  // Merge with budget caps
  const categoriesData = Object.entries(budgets).map(([cat, limit]) => {
    const spent = spentByCategory[cat] || 0;
    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
    let status = 'On track';
    // Base color by category explicitly
    const baseColor = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Other;
    let color = baseColor; 
    let statusColor = baseColor;
    
    if (percentage >= 90) {
      status = 'Critical';
      statusColor = '#F87171'; // red status text
      color = '#F87171'; // Turn bar red if critical
    } else if (percentage >= 70) {
      status = 'Watch';
      statusColor = '#F5A623'; // amber status
    }
    
    return { name: cat, spent, limit, percentage, status, color, statusColor, baseColor };
  });

  // Sort by spent descending, take top 3
  const top3 = categoriesData.sort((a, b) => b.spent - a.spent).slice(0, 3);

  return (
    <div className="flex gap-4">
      {top3.map((cat, i) => {
        const Icon = ICONS[cat.name] || ShoppingBag;
        return (
          <GlassCard 
            key={i} 
            className="flex-1 flex flex-col p-4 rounded-2xl gap-3 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
          >
            {/* Subtle background glow */}
            <div 
              className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
              style={{ background: `radial-gradient(circle at top right, ${cat.baseColor}10, transparent 60%)` }}
            />

            <div className="flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5"
                  style={{ color: cat.baseColor }}
                >
                  <Icon size={16} />
                </div>
                <span className="text-white text-sm font-medium">{cat.name}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide uppercase transition-colors" 
                    style={{ backgroundColor: `${cat.statusColor}20`, color: cat.statusColor }}>
                {cat.status}
              </span>
            </div>
            
            <div className="z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-white text-xl font-bold">${cat.spent.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                <span className="text-[#8B899A] text-xs">of ${cat.limit} budget</span>
              </div>
            </div>

            <div className="z-10 flex flex-col gap-1.5 mt-1">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${Math.min(cat.percentage, 100)}%`, backgroundColor: cat.color }} 
                />
              </div>
              <div className="flex justify-between text-[#8B899A] text-[11px]">
                 <span>${Math.max(cat.limit - cat.spent, 0).toLocaleString()} remaining</span>
                 <span style={{ color: cat.color }} className="font-medium">{cat.percentage.toFixed(0)}%</span>
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
