"use client";

import React, { useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { insightsTransactions } from '@/lib/insightsMockData';
import { AlertCircle, CheckCircle2, Info, Clock, TrendingDown, Calendar } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function SmartObservations({ range }: { range: string }) {
  const { budgets} = useFinanceStore();
  const transactions = insightsTransactions;

    const observations = useMemo(() => {
    let pendingCount = 0;
    let pendingAmount = 0;
    
    let totalIncome = 0;
    let totalExpense = 0;

    const spentByCategory: Record<string, number> = {};
    const spentByDayOfWeek: Record<string, number> = {
      'Sunday': 0, 'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0, 'Friday': 0, 'Saturday': 0
    };
    const dayCounts: Record<string, Set<string>> = {
      'Sunday': new Set(), 'Monday': new Set(), 'Tuesday': new Set(), 'Wednesday': new Set(), 'Thursday': new Set(), 'Friday': new Set(), 'Saturday': new Set()
    };
    
    // Filter for current month's insights context
    const currentMonthTransactions = transactions.filter(tx => tx.date.includes('Apr 2026'));

    currentMonthTransactions.forEach(tx => {
      if (tx.type === 'Expense') {
        totalExpense += tx.amount;
        
        const cat = tx.category || 'Other';
        spentByCategory[cat] = (spentByCategory[cat] || 0) + tx.amount;
        
        const d = new Date(tx.date);
        if (!isNaN(d.getTime())) {
          const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
          spentByDayOfWeek[dayName] += tx.amount;
          dayCounts[dayName].add(d.toLocaleDateString('en-US'));
        }
      } else if (tx.type === 'Income') {
        totalIncome += tx.amount;
      }

      if (tx.status === 'Pending') {
        pendingCount++;
        pendingAmount += tx.amount;
      }
    });

    const obs = [];

    // Highest Spending Day of the Week
    let highestDayName = '';
    let highestDayAvg = 0;

    for (const [day, total] of Object.entries(spentByDayOfWeek)) {
      const count = dayCounts[day].size || 1; // avoid division by zero
      const avg = total / count;
      if (avg > highestDayAvg) {
        highestDayAvg = avg;
        highestDayName = day;
      }
    }

    if (highestDayAvg > 0) {
      obs.push({
        title: 'Highest Spend Day',
        desc: `You tend to spend the most on ${highestDayName}s — averaging $${highestDayAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })} per day.`,
        tag: 'Info',
        Icon: Calendar,
        color: '#7C5CFC'
      });
    }

    // Budget Warning
    let closestCat = { name: '', percentage: 0 };
    Object.entries(budgets).forEach(([cat, limit]) => {
      const spent = spentByCategory[cat] || 0;
      const pct = limit > 0 ? (spent / limit) * 100 : 0;
      if (pct > closestCat.percentage) {
        closestCat = { name: cat, percentage: pct };
      }
    });
    
    if (closestCat.percentage >= 90) {
      obs.push({
        title: 'Critical Budget Status',
        desc: `${closestCat.name} is at ${closestCat.percentage.toFixed(0)}% of its limit.`,
        tag: 'Warning',
        Icon: AlertCircle,
        color: '#F87171'
      });
    } else if (closestCat.percentage > 70) {
      obs.push({
        title: 'Approaching Budget Limit',
        desc: `${closestCat.name} spending is getting close to your limit.`,
        tag: 'Warning',
        Icon: AlertCircle,
        color: '#F5A623'
      });
    } else {
      obs.push({
        title: 'Budgets On Track',
        desc: `All tracked categories are well under their limits.`,
        tag: 'Positive',
        Icon: CheckCircle2,
        color: '#4FC9A4'
      });
    }

    // Savings Rate
    if (totalIncome > 0) {
      const rate = ((totalIncome - totalExpense) / totalIncome) * 100;
      obs.push({
        title: `${rate.toFixed(1)}% Savings Rate`,
        desc: `You saved $${(totalIncome - totalExpense).toLocaleString()} out of $${totalIncome.toLocaleString()} earned.`,
        tag: rate >= 20 ? 'Positive' : 'Info',
        Icon: rate >= 20 ? TrendingDown : AlertCircle,
        color: rate >= 20 ? '#4FC9A4' : '#F5A623'
      });
    }

    // Pending Total
    if (pendingCount > 0) {
      obs.push({
        title: 'Pending Transactions',
        desc: `You have ${pendingCount} pending transaction(s) totaling $${pendingAmount.toLocaleString()}.`,
        tag: 'Pending',
        Icon: Clock,
        color: '#8B899A'
      });
    }

    // Verdict
    if (totalIncome > totalExpense) {
      obs.push({
        title: 'Positive Cash Flow',
        desc: `Your net cash flow is positive this period. Keep it up!`,
        tag: 'Positive',
        Icon: CheckCircle2,
        color: '#4FC9A4'
      });
    } else {
      obs.push({
        title: 'Negative Cash Flow',
        desc: `You spent $${(totalExpense - totalIncome).toLocaleString()} more than you earned.`,
        tag: 'Warning',
        Icon: AlertCircle,
        color: '#F87171'
      });
    }

    return obs.slice(0, 5);
  }, [transactions, budgets, range]);

  return (
    <GlassCard className="flex flex-col p-4 rounded-2xl h-[360px]">
      <h3 className="text-white text-sm font-bold mb-4">Smart Observations</h3>
      
      <div className="flex flex-col gap-3 flex-grow overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {observations.map((o, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group transition-colors">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${o.color}20` }}>
              <o.Icon size={14} style={{ color: o.color }} />
            </div>
            <div className="flex flex-col flex-grow min-w-0 pr-2">
              <span className="text-white text-sm font-bold truncate">{o.title}</span>
              <p className="text-[#8B899A] text-xs leading-relaxed">{o.desc}</p>
            </div>
            <div className="flex-shrink-0 self-start">
              <span 
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: `${o.color}20`, color: o.color }}
              >
                {o.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
