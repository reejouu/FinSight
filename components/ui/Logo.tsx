import React from 'react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      <svg className="h-[65%] max-h-[44px] w-auto shrink-0" viewBox="256 36 168 168" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet">
        <defs>
          <linearGradient id="iconBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9B7BFF"/>
            <stop offset="100%" stopColor="#4C1D95"/>
          </linearGradient>
          <linearGradient id="b1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.25"/>
          </linearGradient>
          <linearGradient id="b2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="b3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.18"/>
          </linearGradient>
          <linearGradient id="b4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.3"/>
          </linearGradient>
        </defs>

        <rect x="256" y="36" width="168" height="168" rx="36" fill="url(#iconBg)" style={{ stroke: 'none', color: 'rgb(255, 255, 255)' }}/>

        <rect x="274" y="148" width="26" height="48" rx="5" fill="url(#b1)"/>
        <rect x="308" y="122" width="26" height="74" rx="5" fill="url(#b2)"/>
        <rect x="342" y="136" width="26" height="60" rx="5" fill="url(#b3)"/>
        <rect x="376" y="96" width="26" height="100" rx="5" fill="url(#b4)"/>

        <polyline points="287,144 321,118 355,130 389,92" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95"/>

        <circle cx="287" cy="144" r="5" fill="white" opacity="0.95"/>
        <circle cx="321" cy="118" r="5" fill="white" opacity="0.95"/>
        <circle cx="355" cy="130" r="5" fill="white" opacity="0.95"/>
        <circle cx="389" cy="92" r="6.5" fill="white"/>
        <circle cx="389" cy="92" r="12" fill="white" opacity="0.15"/>
        <circle cx="389" cy="92" r="18" fill="white" opacity="0.06"/>
      </svg>
      
      {/* HTML separated typographic styling for sharper text rendering */}
      <div className="flex flex-col justify-center">
        <span className="text-white font-[800] text-xl tracking-tight leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          FinSight
        </span>
      </div>
    </div>
  );
}