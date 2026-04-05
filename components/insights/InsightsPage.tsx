"use client";

import React from 'react';
import BudgetHealthStrip from './BudgetHealthStrip';
import SavingsRateChart from './SavingsRateChart';
import SpendingHeatmap from './SpendingHeatmap';
import SmartObservations from './SmartObservations';
import CashFlowTimeline from './CashFlowTimeline';
import AIAssistantPanel from './AIAssistantPanel';
import { Sparkles, X } from 'lucide-react';

export default function InsightsPage() {
  const [activeRange, setActiveRange] = React.useState<'This Month' | 'Last 3M' | 'This Year'>('This Month');
  const [isAIOpen, setAIOpen] = React.useState(false);

  return (
    <div className="flex flex-col xl:flex-row flex-1 overflow-y-auto xl:overflow-hidden min-h-0 px-4 md:px-6 py-4 md:py-5 gap-4 md:gap-5"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Main Content Area */}
      <div className="flex-shrink-0 xl:flex-1 overflow-visible xl:overflow-y-auto overflow-x-hidden flex flex-col gap-4 md:pr-2" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-0 flex-shrink-0 md:h-[52px]">
          <div>
            <h1 className="text-white text-xl md:text-[22px] font-bold leading-tight">Insights</h1>
            <p className="text-[#8B899A] text-xs md:text-[13px] mt-1">AI-powered analysis of your financial behaviour</p>
          </div>
          
          <div className="flex items-center rounded-full p-0.5 flex-shrink-0 flex-wrap" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
            {(['This Month', 'Last 3M', 'This Year'] as const).map(range => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeRange === range ? 'bg-[#7C5CFC] text-white' : 'text-[#8B899A] hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics Sections */}
        <BudgetHealthStrip range={activeRange} />
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[55%] flex flex-col"><SavingsRateChart range={activeRange} /></div>
          <div className="w-full md:w-[45%] flex flex-col"><SpendingHeatmap range={activeRange} /></div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[55%] flex flex-col"><SmartObservations range={activeRange} /></div>
          <div className="w-full md:w-[45%] flex flex-col"><CashFlowTimeline range={activeRange} /></div>
        </div>
      </div>

      {/* Right Column (Fixed AI Assistant Panel on desktop) */}
      <div className="hidden xl:flex flex-col flex-shrink-0 min-h-0 overflow-hidden w-[360px]">
        <AIAssistantPanel />
      </div>

      {/* Mobile Floating AI Button */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        <button 
           onClick={() => setAIOpen(!isAIOpen)}
           className={`w-14 h-14 rounded-2xl bg-[#7C5CFC] flex items-center justify-center shadow-[0_8px_30px_rgba(124,92,252,0.4)] transition-all duration-300 hover:-translate-y-1 ${isAIOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        >
          <Sparkles className="text-white" size={24} />
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#4FC9A4] animate-ping" />
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#4FC9A4] border-2 border-[#7C5CFC]" />
        </button>
      </div>

      {/* Mobile AI Overlay Panel */}
      <div 
        className={`xl:hidden fixed inset-0 z-50 bg-[#00000080] backdrop-blur-sm transition-opacity duration-300 ${isAIOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setAIOpen(false)}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 h-[85vh] p-4 pt-2 bg-[#121019] rounded-t-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out flex flex-col ${isAIOpen ? 'translate-y-0' : 'translate-y-full'}`} 
          onClick={e => e.stopPropagation()}
        >
           {/* Handle Bar */}
           <div className="flex justify-center pt-2 pb-4">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
           </div>
           
           <div className="relative flex-1 min-h-0">
             <AIAssistantPanel />
             
             {/* Mobile Close Button overlayed inside the panel */}
             <button 
                onClick={() => setAIOpen(false)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all backdrop-blur-md"
             >
                <X size={16} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
