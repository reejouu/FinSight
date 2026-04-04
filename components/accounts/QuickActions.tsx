import React from 'react';
import { Send, FileText, Link as LinkIcon, Download } from 'lucide-react';
import { glassCard } from '@/lib/styles';

const actions = [
  {
    icon: <Send size={18} color="#4FC9A4" />,
    title: 'Transfer',
    description: 'Move funds',
    bg: '#4FC9A415',
  },
  {
    icon: <FileText size={18} color="#F5B546" />,
    title: 'Statements',
    description: 'View & download',
    bg: '#F5B54615',
  },
  {
    icon: <LinkIcon size={18} color="#7C5CFC" />,
    title: 'Link Account',
    description: 'Add new bank',
    bg: '#7C5CFC15',
  },
  {
    icon: <Download size={18} color="#FF6B6B" />,
    title: 'Download Report',
    description: 'Export PDF/CSV',
    bg: '#FF6B6B15',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {actions.map((action, i) => (
        <div key={i} className="flex flex-col items-start justify-center gap-2 p-4 rounded-2xl cursor-pointer border border-white/5 hover:bg-white/[0.03] transition-all group" style={{...glassCard, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform" style={{ background: action.bg, border: `1px solid ${action.bg.replace('15', '30')}` }}>
            {action.icon}
          </div>
          <div className="flex flex-col mt-1">
            <h3 className="text-white text-[13px] font-semibold leading-tight">{action.title}</h3>
            <p className="text-[#8B899A] text-[10px] mt-0.5">{action.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
