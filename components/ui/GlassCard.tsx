import React, { HTMLAttributes } from 'react';
import { glassCard } from '@/lib/styles';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '', style, ...props }: GlassCardProps) {
  return (
    <div 
      className={className}
      style={{ ...glassCard, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
