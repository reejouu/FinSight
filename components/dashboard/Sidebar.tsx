import React from 'react';
import { Zap, LayoutGrid, BarChart2, ArrowLeftRight, Receipt, Users, LogOut } from 'lucide-react';

const NAV_ICONS = [LayoutGrid, BarChart2, ArrowLeftRight, Receipt, Users];

export default function Sidebar() {
  return (
    <aside
      className="flex flex-col items-center flex-shrink-0 py-5 pl-3 pr-2"
      style={{ width: '76px' }}
    >
      {/* Glass pill — slightly inset from left edge */}
      <div
        className="flex flex-col items-center rounded-2xl py-3 px-1.5 gap-1 flex-1 w-full"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {NAV_ICONS.map((Icon, i) => (
          <button key={i}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0
              ${i === 0 ? 'text-[#7C5CFC]' : 'text-[#5A5870] hover:text-white hover:bg-white/5'}`}
            style={i === 0 ? { background: 'rgba(124,92,252,0.15)' } : {}}>
            <Icon size={17} />
          </button>
        ))}
        <div className="flex-1" />
        <button className="w-10 h-10 rounded-xl flex items-center justify-center
          text-[#5A5870] hover:text-white hover:bg-white/5 transition-all flex-shrink-0">
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
