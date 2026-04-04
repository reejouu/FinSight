'use client';
import React, { useState } from 'react';
import { Zap, Search, Bell, Clock, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
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
    <div className="flex flex-1 overflow-hidden min-h-0 px-6 py-5 gap-5">

      {/* Centre column */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0 gap-4 overflow-hidden">

        {/* Page header row */}
        <div className="flex items-start justify-between flex-shrink-0" style={{ height: '52px' }}>
          <div>
            <h1 className="text-white text-[22px] font-bold leading-tight">Dashboard</h1>
            <p className="text-[#8B899A] text-[13px] mt-1">
              Manage your payments and transaction in one click
            </p>
          </div>
          {/* Add Widget — only in centre column, NOT in right panel */}
          <button
            className="flex items-center gap-1.5 text-sm text-white/70 px-4 py-2 rounded-full flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}>
            + Add Widget
          </button>
        </div>

        {/* Row 1 */}
        <div className="flex gap-4 flex-shrink-0" style={{ height: '265px' }}>
          <TotalBalanceCard />
          <TransactionChart />
        </div>

        {/* Row 2 */}
        <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
          <FinancialGoals />
          <AllActivity />
        </div>

      </div>

      {/* Right panel — fixed width */}
      <div className="flex flex-col gap-4 flex-shrink-0 overflow-hidden" style={{ width: '310px' }}>
        <YourCard />
        <RecentTransactions />
      </div>

    </div>
  );
}

export default function DashboardLayout({ activeTab, setActiveTab, onGoHome }: { activeTab: string, setActiveTab: (tab: string) => void, onGoHome?: () => void }) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden pt-3 sm:pt-4 px-3 sm:px-6" style={{ background: '#0D0B14' }}>


      {/* ── Background Glow ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 55% 0%, rgba(90,50,180,0.22) 0%, transparent 65%)' }}
      />

      {/* ── TOP NAVBAR BAR ── */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onGoHome={onGoHome} />

      {/* ── BODY BELOW NAVBAR ── */}
      <div className="flex flex-1 overflow-hidden min-h-0 w-full justify-center z-10 relative">
        <div
          className="flex w-full overflow-hidden min-h-0 relative"
          style={{ maxWidth: '1440px' }}
        >
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'Activity' ? <ActivityContent /> : activeTab === 'Insights' ? <InsightsPage /> : activeTab === 'Accounts' ? <AccountsPage /> : <ContentArea />}
        </div>
      </div>

    </div>
  )
}
