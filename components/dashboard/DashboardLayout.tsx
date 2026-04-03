import React from 'react';
import { Zap, Search, Bell, Clock, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import TotalBalanceCard from '@/components/dashboard/TotalBalanceCard';
import TransactionChart from '@/components/dashboard/TransactionChart';
import FinancialGoals from '@/components/dashboard/FinancialGoals';
import AllActivity from '@/components/dashboard/AllActivity';
import YourCard from '@/components/dashboard/YourCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';

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

export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden pt-3 sm:pt-4 px-3 sm:px-6" style={{ background: '#0D0B14' }}>


      {/* ── Background Glow ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 55% 0%, rgba(90,50,180,0.22) 0%, transparent 65%)' }}
      />

      {/* ── TOP NAVBAR BAR — full width, own row, frosted ── */}
      <header
        className="flex-shrink-0 flex items-center w-full px-6 py-3 z-20 relative"
        style={{
          height: '64px',
        }}
      >
        {/* Logo — left-pinned */}
        <div className="flex items-center gap-2 flex-shrink-0 mr-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#7C5CFC' }}>
            <Zap size={15} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">FinSight</span>
        </div>

        {/* Tab pill — centered absolutely so it doesn't shift with user info width */}
        <div className="flex-1 flex justify-center">
          <div
            className="flex items-center rounded-full p-1 gap-0.5"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {['Overview','Activity','Manage','Card','Account'].map(tab => (
              <button key={tab}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${tab === 'Overview'
                    ? 'bg-white text-[#0D0B14]'
                    : 'text-[#8B899A] hover:text-white'
                  }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Icons + user — right-pinned */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-6">
          {[Search, Bell, Clock].map((Icon, i) => (
            <button key={i}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#8B899A] hover:text-white transition-colors flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Icon size={15} />
            </button>
          ))}
          <div className="flex items-center gap-2 pl-2 flex-shrink-0"
            style={{
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              marginLeft: '4px',
              paddingLeft: '12px',
            }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: '#7C5CFC' }}>DR</div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-medium leading-tight whitespace-nowrap">Darlene Robertson</span>
              <span className="text-[#8B899A] text-[10px] leading-tight">felicia.reid@gmail.com</span>
            </div>
            <ChevronDown size={13} className="text-[#8B899A] flex-shrink-0" />
          </div>
        </div>
      </header>

      {/* ── BODY BELOW NAVBAR ── */}
      <div className="flex flex-1 overflow-hidden min-h-0 w-full justify-center z-10 relative">
        <div
          className="flex w-full overflow-hidden min-h-0"
          style={{ maxWidth: '1440px' }}
        >
          <Sidebar />
          <ContentArea />
        </div>
      </div>

    </div>
  )
}
