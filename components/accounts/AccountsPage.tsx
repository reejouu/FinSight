'use client';
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Plus, ArrowUpRight } from 'lucide-react';
import { mockAccounts } from '@/lib/accountsData';
import AccountCard from './AccountCard';
import RecentAccountActivity from './RecentAccountActivity';
import QuickActions from './QuickActions';

import CreditCardSummary from './CreditCardSummary';

export default function AccountsPage() {
  const totalNetWorth = mockAccounts.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div className="flex flex-col xl:flex-row flex-1 overflow-y-auto xl:overflow-hidden min-h-0 px-4 md:px-6 py-4 md:py-5 gap-4 md:gap-5"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      
      {/* Main Content Column */}
      <div className="flex-1 overflow-visible xl:overflow-hidden flex flex-col gap-4 md:pr-2 flex-shrink-0 xl:flex-shrink"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Page header row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-0 flex-shrink-0 md:h-[48px]">
          <div>
            <h1 className="text-white text-xl md:text-[22px] font-bold leading-tight">Accounts & Cards</h1>
            <p className="text-[#8B899A] text-xs md:text-[13px] mt-1">
              Manage your connected bank accounts and credit cards
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 border border-white/10 bg-white/5 text-white/70 text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0">
              <Plus size={16} /> Add New Account
            </button>
          </div>
        </div>

        {/* Row 1 — Account cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-shrink-0 items-start">
          {mockAccounts.slice(0, 2).map((acc) => (
             <AccountCard key={acc.id} acc={acc} />
          ))}
        </div>
        
        {/* Row 2 - Recent Activity & Quick Actions */}
        <div className="flex flex-col xl:flex-row flex-shrink-0 xl:flex-shrink xl:flex-1 gap-4 xl:min-h-0 xl:overflow-hidden pb-2 mb-2 xl:pb-4 xl:mb-0">
          {/* Section 3 - Recent Activity */}
          <div className="flex flex-col flex-1 min-w-0 h-[400px] xl:h-full flex-shrink-0 xl:flex-shrink">
             <RecentAccountActivity />
          </div>

          {/* QuickActions as Section 2 */}
          <div className="w-full xl:w-[300px] flex-shrink-0 xl:h-full">
            <QuickActions />
          </div>
        </div>
      </div>

      {/* Right Column (Fixed Width on Desktop) */}
      <div className="flex flex-col gap-4 flex-shrink-0 w-full xl:w-[310px] xl:min-h-0 overflow-visible xl:overflow-hidden pb-4">
        
        {/* Unified Net Worth & Asset Distribution */}
        <GlassCard className="p-4 rounded-2xl flex flex-col flex-shrink-0">
           {/* Net Worth Section */}
           <div className="flex justify-between items-start">
             <div>
               <div className="text-[#8B899A] text-[11px] font-semibold mb-1 uppercase tracking-wider">Total Net Worth</div>
               <div className="flex items-baseline gap-2 mb-2">
                 <span className="text-white text-2xl font-bold leading-none tracking-tight">${(totalNetWorth).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
               </div>
             </div>
             <div className="flex items-center text-[10px] font-bold text-[#4FC9A4] bg-[#4FC9A4]/10 px-2 py-1 rounded-md mb-2 shadow-sm border border-[#4FC9A4]/20">
               <ArrowUpRight size={10} className="mr-0.5" /> +4.2%
             </div>
           </div>

           {/* Divider */}
           <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent w-full my-3"></div>

           {/* Asset Distribution */}
           <h3 className="text-white text-[12px] font-semibold mb-3">Asset Distribution</h3>
           
           <div className="w-full h-2 rounded-full overflow-hidden flex mb-3 shadow-inner bg-black/20">
              <div className="h-full bg-[#7C5CFC] transition-all duration-1000" style={{ width: '36.3%' }}></div>
              <div className="h-full bg-[#4FC9A4] transition-all duration-1000" style={{ width: '63.7%' }}></div>
           </div>
           
           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs group">
                 <div className="flex items-center gap-2 text-white">
                    <div className="w-2 h-2 rounded-full bg-[#7C5CFC] shadow-[0_0_8px_#7C5CFC80]"></div> 
                    <span className="font-medium group-hover:text-[#7C5CFC] transition-colors">State Bank of India</span>
                 </div>
                 <div className="flex flex-col items-end leading-tight">
                    <span className="text-white font-semibold">$82,450.00</span>
                    <span className="text-[#8B899A] text-[10px] font-medium tracking-wide">36.3%</span>
                 </div>
              </div>
              <div className="flex justify-between items-center text-xs group">
                 <div className="flex items-center gap-2 text-white">
                    <div className="w-2 h-2 rounded-full bg-[#4FC9A4] shadow-[0_0_8px_#4FC9A480]"></div> 
                    <span className="font-medium group-hover:text-[#4FC9A4] transition-colors">Union Bank</span>
                 </div>
                 <div className="flex flex-col items-end leading-tight">
                    <span className="text-white font-semibold">$145,000.00</span>
                    <span className="text-[#8B899A] text-[10px] font-medium tracking-wide">63.7%</span>
                 </div>
              </div>
           </div>
        </GlassCard>

        {/* Credit Card Details Section */}
        <div className="flex flex-col flex-1 min-h-0 shrink-0">
           <CreditCardSummary />
        </div>

      </div>

    </div>
  );
}
