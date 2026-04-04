import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
  className?: string;
}

export default function Badge({ children, color = '#7C5CFC', bgColor = 'rgba(124,92,252,0.12)', className = '' }: BadgeProps) {
  return (
    <span 
      className={`px-2 py-0.5 rounded text-[11px] font-medium leading-none ${className}`}
      style={{ color, backgroundColor: bgColor }}
    >
      {children}
    </span>
  );
}
