'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/shared/Sidebar';
import TotalBalanceCard from '@/components/dashboard/TotalBalanceCard';
import TransactionChart from '@/components/dashboard/TransactionChart';
import FinancialGoals from '@/components/dashboard/FinancialGoals';
import AllActivity from '@/components/dashboard/AllActivity';
import YourCard from '@/components/dashboard/YourCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ActivityContent from '@/components/activity/ActivityContent';
import InsightsPage from '@/components/insights/InsightsPage';
import AccountsPage from '@/components/accounts/AccountsPage';
import Navbar from '@/components/shared/Navbar';

function ContentArea() {
  return (
    <div className="flex-1 min-h-0 min-w-0 overflow-y-auto md:overflow-hidden">

      {/* ── MOBILE LAYOUT — single column, full-width tiles ── */}
      <div className="md:hidden flex flex-col gap-4 px-4 py-4 pb-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Dashboard</h1>
            <p className="text-[#8B899A] text-[12px] mt-0.5">Manage your payments and transactions</p>
          </div>
          <button
            className="flex items-center gap-1 text-xs text-white/70 px-3 py-1.5 rounded-full flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            + Add Widget
          </button>
        </div>

        <TotalBalanceCard />
        <TransactionChart />
        <FinancialGoals />
        <AllActivity />
        <YourCard />
        <RecentTransactions />
      </div>

      {/* ── DESKTOP LAYOUT (original, unchanged) ── */}
      <div className="hidden md:flex h-full px-6 py-5 gap-5">
        <div className="flex flex-col flex-1 min-w-0 min-h-0 gap-4 overflow-hidden">
          <div className="flex items-start justify-between flex-shrink-0" style={{ height: '52px' }}>
            <div>
              <h1 className="text-white text-[22px] font-bold leading-tight">Dashboard</h1>
              <p className="text-[#8B899A] text-[13px] mt-1">Manage your payments and transaction in one click</p>
            </div>
            <button
              className="flex items-center gap-1.5 text-sm text-white/70 px-4 py-2 rounded-full flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
              + Add Widget
            </button>
          </div>
          <div className="flex gap-4 flex-shrink-0" style={{ height: '265px' }}>
            <TotalBalanceCard />
            <TransactionChart />
          </div>
          <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
            <FinancialGoals />
            <AllActivity />
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-shrink-0 overflow-hidden" style={{ width: '310px' }}>
          <YourCard />
          <RecentTransactions />
        </div>
      </div>

    </div>
  );
}

export default function DashboardLayout({ activeTab, setActiveTab, onGoHome }: { activeTab: string, setActiveTab: (tab: string) => void, onGoHome?: () => void }) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden pt-3 sm:pt-4 px-3 sm:px-6" style={{ background: '#0D0B14' }}>
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 55% 0%, rgba(90,50,180,0.22) 0%, transparent 65%)' }}
      />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onGoHome={onGoHome} />
      <div className="flex flex-1 overflow-hidden min-h-0 w-full justify-center z-10 relative">
        <div className="flex w-full overflow-hidden min-h-0 relative" style={{ maxWidth: '1440px' }}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'Activity' ? <ActivityContent /> : activeTab === 'Insights' ? <InsightsPage /> : activeTab === 'Accounts' ? <AccountsPage /> : <ContentArea />}
        </div>
      </div>
    </div>
  )
}
