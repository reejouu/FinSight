'use client';
import React, { useState } from 'react';
import { Search, Bell, Clock, ChevronDown, Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGoHome?: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onGoHome }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    if (tab === 'Home' && onGoHome) {
      onGoHome();
    } else {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="flex-shrink-0 flex items-center justify-between w-full px-4 sm:px-6 py-3 z-20 relative"
      style={{ height: '64px' }}
    >
      {/* Logo — left-pinned */}
      <div className="flex items-center flex-shrink-0 cursor-pointer md:w-[250px]" onClick={() => onGoHome && onGoHome()}>
        <Logo className="h-14 w-auto -ml-3" />
      </div>

      {/* Tab pill — centered, hidden on mobile */}
      <div className="hidden md:flex justify-center shrink-0">
        <div
          className="flex items-center rounded-full p-2 gap-2"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {['Home','Overview','Activity','Insights','Accounts'].map(tab => (
            <button key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${activeTab === tab
                  ? 'bg-white text-[#0D0B14]'
                  : 'text-[#8B899A] hover:text-white'
                }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Icons + user — right-pinned, hidden on mobile */}
      <div className="hidden md:flex items-center justify-end gap-2 shrink-0 w-[200px]">
        {activeTab !== 'Home' && [Search, Bell, Clock].map((Icon, i) => (
          <button key={i}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#8B899A] hover:text-white transition-colors flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Icon size={15} />
          </button>
        ))}
        <div className="flex items-center gap-2 pl-2 flex-shrink-0"
          style={activeTab !== 'Home' ? {
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            marginLeft: '4px',
            paddingLeft: '12px',
          } : undefined}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: '#7C5CFC' }}>SA</div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-xs font-medium leading-tight whitespace-nowrap">Sayan Adhikary</span>
            <span className="text-[#8B899A] text-[10px] leading-tight">sayanadhikary2017@gmail.com</span>
          </div>
          <ChevronDown size={13} className="text-[#8B899A] flex-shrink-0" />
        </div>
      </div>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white transition-colors"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile slide-down menu — absolutely positioned to overlay, not push content */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="mx-3 mt-2 rounded-2xl p-4 flex flex-col gap-3"
          style={{
            background: 'rgba(22, 19, 32, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Nav tabs */}
          <div className="flex flex-col gap-1">
            {['Home','Overview','Activity','Insights','Accounts'].map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${activeTab === tab
                    ? 'bg-white/10 text-white'
                    : 'text-[#8B899A] hover:text-white hover:bg-white/5'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: '#7C5CFC' }}>SA</div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-medium leading-tight">Sayan Adhikary</span>
              <span className="text-[#8B899A] text-[10px] leading-tight">sayanadhikary2017@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
