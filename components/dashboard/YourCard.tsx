'use client';
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { cardsData } from '@/lib/data';

export default function YourCard() {
  const [angle, setAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);

  // Derive active index safely handling negative angles
  const activeIndex = ((Math.round(angle / 180) % 2) + 2) % 2;

  const handleSwap = (direction: number) => {
    if (isAnimatingRef.current) return;
    setIsAnimating(true);
    isAnimatingRef.current = true;
    setAngle(prev => prev + direction * 180);
    setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
    }, 800); // match slower CSS duration
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 20) {
      handleSwap(e.deltaY > 0 ? 1 : -1);
    }
  };

  // Shared inner content for identical structure
  const CardContent = ({ number, opacity, type }: { number: string, opacity: string, type: string }) => (
    <div className="absolute inset-0 p-4 flex flex-col justify-between w-full h-full">
      {/* Decorative Waves Overlay - Kept subtle */}
      <svg className={`absolute inset-0 w-full h-full pointer-events-none ${opacity}`} preserveAspectRatio="none" viewBox="0 0 300 200">
        <path d="M0,50 Q60,10 120,60 T240,60 T300,40 L300,200 L0,200 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <path d="M-50,100 Q40,60 100,110 T220,110 T350,90 L350,200 L-50,200 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <path d="M0,150 Q80,110 140,160 T260,160 T300,140" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      </svg>

      {/* 3D Glass & Lighting Overlays */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 flex justify-between items-start w-full">
        <div className="w-8 h-6 rounded-md bg-gradient-to-br from-[#FFE380] via-[#D1A43A] to-[#80631F] flex flex-col justify-evenly p-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.3)] border-[0.5px] border-black/20 z-10 relative overflow-hidden">
          <div className="h-[1px] w-full bg-black/30 shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
          <div className="h-[1px] w-full bg-black/30 shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
          <div className="h-[1px] w-full bg-black/30 shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
        </div>
        {type === 'VISA' ? (
          <svg viewBox="0 0 262.3 85" className="h-5 w-auto drop-shadow-md fill-white">
            <path d="M170.9,0c-18.6,0-35.3,9.7-35.3,27.5c0,20.5,29.5,21.9,29.5,32.1c0,4.3-5,8.2-13.4,8.2c-12,0-21-5.4-21-5.4l-3.8,18c0,0,10.3,4.6,24.1,4.6c20.4,0,36.4-10.1,36.4-28.3c0-21.6-29.6-23-29.6-32.5c0-3.4,4.1-7.1,12.5-7.1c9.5,0,17.3,3.9,17.3,3.9l3.8-17.4C191.3,3.6,182.8,0,170.9,0L170.9,0z M0.5,1.3L0,3.9c0,0,7.8,1.4,14.9,4.3c9.1,3.3,9.7,5.2,11.3,11.1l16.7,64.3h22.4L99.6,1.3H77.3l-22.1,56l-9-47.5c-0.8-5.4-5-8.5-10.2-8.5C36,1.3,0.5,1.3,0.5,1.3z M108.6,1.3L91.1,83.6h21.3l17.4-82.3L108.6,1.3L108.6,1.3z M227.2,1.3c-5.1,0-7.8,2.7-9.8,7.5l-31.2,74.8h22.3l4.3-12.5H240l2.6,12.5h19.7L245.2,1.3L227.2,1.3L227.2,1.3z M230.1,23.6l6.6,30.9H219L230.1,23.6L230.1,23.6z" />
          </svg>
        ) : (
          <svg viewBox="0 0 116.5 72" className="h-7 w-auto drop-shadow-md">
            <rect x="42.5" y="7.7" fill="#FF5F00" width="31.5" height="56.6" />
            <path fill="#EB001B" d="M44.5,36c0-11,5.1-21.5,13.7-28.3C42.6-4.6,20-1.9,7.7,13.8C-4.6,29.4-1.9,52,13.8,64.3 c13.1,10.3,31.4,10.3,44.5,0C49.6,57.5,44.5,47,44.5,36z" />
            <path fill="#F79E1B" d="M116.5,36c0,19.9-16.1,36-36,36c-8.1,0-15.9-2.7-22.2-7.7c15.6-12.3,18.3-34.9,6-50.6c-1.8-2.2-3.8-4.3-6-6 c15.6-12.3,38.3-9.6,50.5,6.1C113.8,20.1,116.5,27.9,116.5,36z" />
            <path fill="#F79E1B" d="M113.1,58.3v-1.2h0.5v-0.2h-1.2v0.2h0.5v1.2H113.1z M115.4,58.3v-1.4H115l-0.4,1l-0.4-1h-0.4v1.4h0.3v-1.1 l0.4,0.9h0.3l0.4-0.9v1.1H115.4z" />
          </svg>
        )}
      </div>
      
      <div className="relative z-10 text-white flex items-center justify-start gap-1 sm:gap-2 overflow-hidden w-full">
        <span className="text-[18px] leading-none transform translate-y-0.5 drop-shadow-sm">****</span>
        <span className="text-[18px] leading-none transform translate-y-0.5 drop-shadow-sm">****</span>
        <span className="text-[18px] leading-none transform translate-y-0.5 drop-shadow-sm">****</span>
        <span className="font-sans font-medium text-[15px] tracking-widest ml-0.5 drop-shadow-sm">{number}</span>
      </div>
    </div>
  );

  const activeCard = cardsData[activeIndex];

  return (
    <GlassCard className="flex flex-col flex-shrink-0 rounded-2xl p-4">
      {/* Title & Add button */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">Your Card</span>
        <button className="flex items-center text-white/80 hover:text-white transition-colors text-xs font-medium gap-1 whitespace-nowrap">
          <span className="text-base leading-none">+</span> Add Card
        </button>
      </div>

      <div className={`text-white text-[10px] font-medium px-2 py-0.5 rounded-full self-start mb-4 transition-colors duration-500 ease-in-out ${activeIndex === 0 ? 'bg-[#5330C4]' : 'bg-[#16A34A]'}`}>
        {activeCard.pill}
      </div>

      {/* Cards Stack */}
      <div 
        className="relative h-[160px] mb-5 w-full flex-shrink-0 flex items-center"
        style={{ perspective: '800px' }}
        onWheel={handleWheel}
      >
        <div 
          className="w-full h-[140px] absolute"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.4, 1)',
            // Zero tilt on the container. The ferris wheel spins perfectly straight.
            // Explicitly setting transform box around the exact height (140px) fixes the shifting issue!
            transform: `translateZ(-30px) rotateX(${angle}deg)`
          }}
        >
          {cardsData.map((card, idx) => {
            const isFront = activeIndex === idx;
            const baseAngle = idx * 180;
            return (
              <div 
                key={card.id}
                className="absolute top-0 w-full h-[140px] rounded-xl overflow-hidden border-[0.5px] border-white/20"
                style={{ 
                  background: card.gradient,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, box-shadow',
                  transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.4, 1), box-shadow 0.8s ease',
                  // Counter rotation perfectly flattens the card. 
                  // Shift the front card down slightly and back card significantly up to create a pronounced peek!
                  transform: `rotateX(${baseAngle}deg) translateZ(30px) rotateX(${-baseAngle - angle}deg) translateY(${isFront ? 15 : -18}px) scale(${isFront ? 1 : 0.94})`,
                  boxShadow: isFront 
                    ? '0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1.5px 2px rgba(255,255,255,0.4), inset 0 -1.5px 2px rgba(0,0,0,0.2)' 
                    : '0 5px 15px -5px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.2)',
                }}
              >
                <CardContent number={card.number} opacity={card.opacity} type={card.type} />

                {/* Dark Overlay for back card to give depth */}
                <div 
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-800 ease-in-out"
                  style={{ opacity: isFront ? 0 : 0.45 }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Info and Arrows */}
      <div className="flex items-center justify-between mb-5 px-1 flex-shrink-0">
        <div className="flex flex-col min-w-0">
          <div className="text-white text-[13px] tracking-widest mb-1 font-sans truncate transition-all duration-300">
            {activeCard.fullNumber}
          </div>
          <div className="text-[#8B899A] text-[12px] truncate transition-all duration-300">
            {activeCard.name}
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0 ml-2">
          <button onClick={() => handleSwap(-1)} className={`transition-colors ${activeIndex === 0 ? 'text-white' : 'text-white/40 hover:text-white/80'}`}>
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button onClick={() => handleSwap(1)} className={`transition-colors ${activeIndex === 1 ? 'text-white' : 'text-white/40 hover:text-white/80'}`}>
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Daily Limits Footer */}
      <div className="mt-auto px-1 flex-shrink-0">
        <p className="text-[#8B899A] text-[11px] mb-2">Daily Transaction Limits</p>
        <div className="flex gap-1.5 w-full mb-2">
          {/* We dynamically map 6 segments to simulate a progress bar. Active card percentage controls how many are highlighted */}
          {[...Array(6)].map((_, i) => {
            const threshold = (i + 1) * (100 / 6);
            const isFilled = activeCard.percent >= threshold || (i === 0 && activeCard.percent > 0);
            return (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-colors duration-500 ease-in-out ${isFilled ? (activeIndex === 0 ? 'bg-[#5330C4]' : 'bg-[#16A34A]') : 'bg-white/10'}`} 
                style={{ flex: isFilled ? 1.5 : 1 }}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-[#8B899A] truncate pr-2">
            <span className="text-white font-medium transition-all duration-300">{activeCard.spent}</span> spent of {activeCard.limit}
          </span>
          <span className="text-[#8B899A] flex-shrink-0 transition-all duration-300">{activeCard.percent}%</span>
        </div>
      </div>
    </GlassCard>
  );
}
