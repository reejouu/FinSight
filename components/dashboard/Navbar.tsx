"use client";
import React, { useState } from 'react';
import { Search, Bell, Clock, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Activity', 'Manage', 'Card', 'Account'];

  return (
    <div className="flex items-center gap-3 flex-shrink-0 px-1 py-1">
      {/* Tab pill bar — centered, does NOT stretch full width */}
      <div className="flex items-center rounded-full border border-white/10 p-1 flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 whitespace-nowrap
              ${activeTab === tab
                ? 'bg-white text-[#0D0B14] font-semibold'
                : 'text-[#8B899A] hover:text-white'
              }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Push icons + user to the right */}
      <div className="flex-1" />

      {/* Icon buttons */}
      {[Search, Bell, Clock].map((Icon, i) => (
        <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
          border border-white/10 text-[#8B899A] hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <Icon size={15} />
        </button>
      ))}

      {/* User info */}
      <div className="flex items-center gap-2 flex-shrink-0 pl-1">
        <div className="w-8 h-8 rounded-full bg-[#7C5CFC] flex items-center justify-center
          text-white text-xs font-bold flex-shrink-0">SA</div>
        <div className="flex flex-col min-w-0">
          <span className="text-white text-xs font-medium leading-tight whitespace-nowrap">Sayan Adhikary</span>
          <span className="text-[#8B899A] text-[10px] leading-tight whitespace-nowrap">sayanadhikary2017@gmail.com</span>
        </div>
        <ChevronDown size={14} className="text-[#8B899A] flex-shrink-0" />
      </div>
    </div>
  );
}
