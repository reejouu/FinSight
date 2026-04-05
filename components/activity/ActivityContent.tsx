'use client';
import React, { useState } from 'react';
import { activityStatsData } from '@/lib/data';
import { TrendingUp, TrendingDown, PiggyBank, Activity } from 'lucide-react';

import ActivityHeader from './ActivityHeader';
import ActivityStats from './ActivityStats';
import ActivityTransactions from './ActivityTransactions';
import AddTransactionModal from './AddTransactionModal';

export default function ActivityContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeToggle, setActiveToggle] = useState<keyof typeof activityStatsData>('Last 7 Days');
  const [toggleOptions] = useState(['Last 7 Days', 'Last 30 Days', 'Last 1 Year', 'All'] as const);

  // Derived stats based on toggle
  const getStatsForToggle = () => {
    return activityStatsData[activeToggle];
  };

  const toggleData = getStatsForToggle();
  const netSavings = toggleData.income - toggleData.expense;

  const stats = [
    {
      label: 'Total Income',
      value: `$${toggleData.income.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: toggleData.incomeChange,
      positive: !toggleData.incomeChange.startsWith('-'),
      icon: TrendingUp,
      iconColor: '#4FC9A4',
      iconBg: 'rgba(79,201,164,0.12)',
    },
    {
      label: 'Total Expenses',
      value: `$${toggleData.expense.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: toggleData.expenseChange,
      positive: toggleData.expenseChange.startsWith('-'), // decrease in expense is positive
      icon: TrendingDown,
      iconColor: '#F87171',
      iconBg: 'rgba(248,113,113,0.12)',
    },
    {
      label: 'Net Savings',
      value: `$${netSavings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: toggleData.savingsChange,
      positive: !toggleData.savingsChange.startsWith('-'),
      icon: PiggyBank,
      iconColor: '#7C5CFC',
      iconBg: 'rgba(124,92,252,0.12)',
    },
    {
      label: 'Transactions',
      value: toggleData.txCount,
      change: toggleData.txChange,
      positive: true,
      icon: Activity,
      iconColor: '#F5A623',
      iconBg: 'rgba(245,166,35,0.12)',
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0 px-4 md:px-6 py-4 md:py-5 gap-4 overflow-y-auto md:overflow-hidden">
      <ActivityHeader 
        activeToggle={activeToggle}
        setActiveToggle={setActiveToggle}
        toggleOptions={toggleOptions}
        setModalOpen={setModalOpen}
      />
      
      <ActivityStats stats={stats} />

      <ActivityTransactions />

      <AddTransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}