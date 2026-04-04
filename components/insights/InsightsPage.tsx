"use client";

import React from 'react';
import BudgetHealthStrip from './BudgetHealthStrip';
import SavingsRateChart from './SavingsRateChart';
import SpendingHeatmap from './SpendingHeatmap';
import SmartObservations from './SmartObservations';
import CashFlowTimeline from './CashFlowTimeline';
import AIAssistantPanel from './AIAssistantPanel';

export default function InsightsPage() {
  const [activeRange, setActiveRange] = React.useState<'This Month' | 'Last 3M' | 'This Year'>('This Month');

  return (
    <div className="flex flex-1 overflow-hidden min-h-0 px-6 py-5 gap-5">
      {/* Left Column (Scrolls) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Header */}
        <div className="flex items-start justify-between flex-shrink-0" style={{ height: '52px' }}>
          <div>
            <h1 className="text-white text-[22px] font-bold leading-tight">Insights</h1>
            <p className="text-[#8B899A] text-[13px] mt-1">AI-powered analysis of your financial behaviour</p>
          </div>
          
          <div className="flex items-center rounded-full p-0.5 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
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
        
        <div className="flex gap-4">
          <div className="w-[55%] flex flex-col"><SavingsRateChart range={activeRange} /></div>
          <div className="w-[45%] flex flex-col"><SpendingHeatmap range={activeRange} /></div>
        </div>

        <div className="flex gap-4">
          <div className="w-[55%] flex flex-col"><SmartObservations range={activeRange} /></div>
          <div className="w-[45%] flex flex-col"><CashFlowTimeline range={activeRange} /></div>
        </div>
      </div>

      {/* Right Column (Fixed AI Assistant Panel) */}
      <div className="flex flex-col flex-shrink-0 min-h-0 overflow-hidden" style={{ width: '360px' }}>
        <AIAssistantPanel />
      </div>
    </div>
  );
}
