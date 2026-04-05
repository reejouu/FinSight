'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Download, Plus, ChevronDown } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';


interface ActivityHeaderProps {
  activeToggle: any;
  setActiveToggle: (toggle: any) => void;
  toggleOptions: any;
  setModalOpen: (open: boolean) => void;
}

export default function ActivityHeader({
  activeToggle,
  setActiveToggle,
  toggleOptions,
  setModalOpen
}: ActivityHeaderProps) {
  const { role, setRole } = useFinanceStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [hasViewedAdmin, setHasViewedAdmin] = useState(false);


  useEffect(() => {
    if (role === 'Admin') {
            setHasViewedAdmin(true);
    }
  }, [role]);


  


  

  
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const exportCSV = () => {
    console.log('Exporting CSV...');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between flex-shrink-0 gap-3" style={{ minHeight: '52px' }}>
      <div className="flex-shrink-0">
        <h1 className="text-white text-xl md:text-[22px] font-bold leading-tight">Transactions</h1>
        <p className="text-[#8B899A] text-[12px] md:text-[13px] mt-1">
          Track and manage all your financial activity
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            {activeToggle} <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div 
              className="absolute top-full mt-2 right-0 w-32 rounded-xl py-1 z-50 shadow-xl border border-white/10"
              style={{ background: 'rgba(30, 28, 41, 0.95)', backdropFilter: 'blur(12px)' }}
            >
              {toggleOptions.map((v: any) => (
                <button 
                  key={v}
                  onClick={() => {
                    setActiveToggle(v);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors
                    ${activeToggle === v
                      ? 'text-[#7C5CFC] bg-white/5'
                      : 'text-[#8B899A] hover:text-white hover:bg-white/5'
                    }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-white/10 mx-1 hidden md:block"></div>

        

        {role === 'Admin' && (
          <button onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-white font-medium px-4 py-2 rounded-full flex-shrink-0 hover:opacity-90"
            style={{ background: '#7C5CFC' }}>
            <Plus size={13} /> Add Transaction
          </button>
        )}

         {role === 'Admin' && (
          <button onClick={exportCSV}
            className="flex items-center gap-1.5 text-xs text-white/70 px-3 py-2 rounded-full flex-shrink-0 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <Download size={13} /> Export CSV
          </button>
        )}

        <div className="flex items-center rounded-full p-0.5 flex-shrink-0 relative"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
          {(['Viewer','Admin'] as const).map(r => (
            <button key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap
                ${role === r
                  ? 'bg-white/10 text-white'
                  : 'text-[#8B899A] hover:text-white'
                }`}>
              {r}
            </button>
          ))}
          
          {role === 'Viewer' && !hasViewedAdmin && (
            <div className="absolute top-[calc(100%+8px)] right-0 whitespace-nowrap bg-[rgba(124,92,252,0.15)] text-[#A78BFA] border border-[rgba(124,92,252,0.3)] px-3 py-1.5 rounded-lg text-[11px] font-medium z-50 pointer-events-none shadow-lg hidden sm:block">
              Switch to Admin to manage transactions
              <div className="absolute -top-[5px] right-6 w-2.5 h-2.5 bg-[rgba(30,28,41,0.95)] border-t border-l border-[rgba(124,92,252,0.3)] transform rotate-45" style={{ background: '#1d1b26' }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}