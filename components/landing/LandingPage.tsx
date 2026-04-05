import React from 'react';
import LiquidEther from '@/components/ui/LiquidEther';
import Navbar from '@/components/shared/Navbar';
import BorderGlow from '@/components/ui/BorderGlow';

export default function LandingPage({ onEnter, onTabSelect }: { onEnter: () => void, onTabSelect: (tab: string) => void }) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden pt-3 sm:pt-4 px-3 sm:px-6 relative" style={{ background: '#0D0B14' }}>
      {/* Background Component */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="z-20 w-full max-w-[1440px] mx-auto">
        <Navbar activeTab="Home" setActiveTab={onTabSelect} onGoHome={() => onTabSelect('Home')} />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center pointer-events-auto px-4 sm:px-6 -translate-y-12 md:-translate-y-8">
        <h1
          className="text-[clamp(2.25rem,8vw,84px)] font-bold text-white tracking-tight mb-4 sm:mb-6 md:mb-8 leading-[1.05]"
          style={{ fontFamily: 'var(--font-custom)' }}
        >
          Master your money <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r inline-block pb-2 from-[#9B8CFA] via-[#FF9FFC] to-[#E4B1F0]">effortlessly.</span>
        </h1>
        <p className="text-[#8B899A] text-base sm:text-lg md:text-xl font-medium mb-6 sm:mb-8 md:mb-10 max-w-[700px] mx-auto">
          Smart tracking, AI insights, and total control — in one dashboard.
        </p>

        {/* Stats Bar */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-sm sm:text-base md:text-lg leading-none mb-1">$57,450</span>
            <span className="text-[#5A5870] text-[10px] sm:text-xs uppercase tracking-wider font-semibold">tracked</span>
          </div>
          <span className="text-[#2A2840]">·</span>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-sm sm:text-base md:text-lg leading-none mb-1">48</span>
            <span className="text-[#5A5870] text-[10px] sm:text-xs uppercase tracking-wider font-semibold">transactions</span>
          </div>
          <span className="text-[#2A2840]">·</span>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-sm sm:text-base md:text-lg leading-none mb-1">AI-powered</span>
            <span className="text-[#5A5870] text-[10px] sm:text-xs uppercase tracking-wider font-semibold">insights</span>
          </div>
        </div>
        
        {/* CTAs — always horizontal */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 relative z-50">
          <button 
            onClick={onEnter}
            className="rounded-full px-5 sm:px-8 py-2.5 sm:py-3 bg-[#7C5CFC] text-white text-sm sm:text-base font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(124,92,252,0.3)]"
          >
            Enter Dashboard
          </button>
          
          <button 
            className="rounded-full px-5 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-white/20 text-white/70 text-sm sm:text-base font-semibold transition-colors hover:bg-white/10 hover:text-white hover:border-white/30"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
