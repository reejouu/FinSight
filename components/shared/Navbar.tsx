import React from 'react';
import { Search, Bell, Clock, ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGoHome?: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onGoHome }: NavbarProps) {
  return (
    <header
      className="flex-shrink-0 flex items-center justify-between w-full px-6 py-3 z-20 relative"
      style={{ height: '64px' }}
    >
      {/* Logo — left-pinned */}
      <div className="flex items-center flex-shrink-0 cursor-pointer w-[250px]" onClick={() => onGoHome && onGoHome()}>
        <Logo className="h-14 w-auto -ml-3" />
      </div>

      {/* Tab pill — centered absolutely so it doesn't shift with user info width */}
      <div className="flex justify-center shrink-0">
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
              onClick={() => tab === 'Home' && onGoHome ? onGoHome() : setActiveTab(tab)}
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

      {/* Icons + user — right-pinned */}
      <div className="flex items-center justify-end gap-2 shrink-0 w-[200px]">
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
    </header>
  );
}
