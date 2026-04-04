'use client';
import React, { useState } from 'react';
import { CreditCard, Eye, EyeOff, Copy, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { cardsData } from '@/lib/data';

export default function CreditCardSummary() {
  const [showNumber, setShowNumber] = useState(false);
  const [copied, setCopied] = useState(false);
  const primaryCard = cardsData[0];
  const cardNumber = primaryCard.fullNumber;

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className="flex flex-col gap-3 h-full">
       <GlassCard className="p-4 rounded-2xl flex flex-col flex-1">
         <div className="flex justify-between items-center mb-3">
           <h3 className="text-white text-[14px] font-semibold">Card Details</h3>
           <button className="text-[#8B899A] hover:text-white transition-colors text-[11px] font-medium bg-white/5 px-2 py-1 rounded-lg">View All</button>
         </div>

         {/* Physical Card Representation */}
         <div className={`relative rounded-[14px] p-4 overflow-hidden group transition-all duration-500 shadow-xl border border-white/20 shrink-0 h-[160px]`}
              style={{
                background: primaryCard.gradient,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1.5px 2px rgba(255,255,255,0.4), inset 0 -1.5px 2px rgba(0,0,0,0.2)'
              }}>
            
            {/* Decorative Waves Overlay */}
             <svg className={`absolute inset-0 w-full h-full pointer-events-none ${primaryCard.opacity}`} preserveAspectRatio="none" viewBox="0 0 300 200">
               <path d="M0,50 Q60,10 120,60 T240,60 T300,40 L300,200 L0,200 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
               <path d="M-50,100 Q40,60 100,110 T220,110 T350,90 L350,200 L-50,200 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
               <path d="M0,150 Q80,110 140,160 T260,160 T300,140" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
             </svg>
            
            {/* 3D Glass & Lighting Overlays */}
            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 flex flex-col h-full justify-between">
               <div className="flex justify-between items-start w-full">
                  <div className="w-8 h-6 rounded-md bg-gradient-to-br from-[#FFE380] via-[#D1A43A] to-[#80631F] flex flex-col justify-evenly p-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.3)] border-[0.5px] border-black/20 z-10 relative overflow-hidden">
                     <div className="h-[1px] w-full bg-black/30 shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
                     <div className="h-[1px] w-full bg-black/30 shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
                     <div className="h-[1px] w-full bg-black/30 shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
                  </div>
                  <div className="flex items-center opacity-90 drop-shadow-md">
                     {primaryCard.type === 'VISA' ? (
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
               </div>
               
               <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between relative">
                     <div className="relative z-10 text-white flex items-center justify-start gap-1 sm:gap-2 overflow-hidden w-full">
                       <span className="text-[17px] leading-none transform translate-y-0.5 drop-shadow-sm font-mono tracking-[3px]">
                         {showNumber ? cardNumber.split('  ')[0] : "****"}
                       </span>
                       <span className="text-[17px] leading-none transform translate-y-0.5 drop-shadow-sm font-mono tracking-[3px]">
                         {showNumber ? cardNumber.split('  ')[1] : "****"}
                       </span>
                       <span className="text-[17px] leading-none transform translate-y-0.5 drop-shadow-sm font-mono tracking-[3px]">
                         {showNumber ? cardNumber.split('  ')[2] : "****"}
                       </span>
                       <span className="font-mono font-medium text-[16px] tracking-widest ml-0.5 drop-shadow-sm">{primaryCard.number}</span>
                     </div>
                     <button onClick={() => setShowNumber(!showNumber)} className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all shrink-0 z-20 absolute right-0 top-0">
                        {showNumber ? <EyeOff size={14} /> : <Eye size={14} />}
                     </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4 w-full">
                     <div className="flex flex-col">
                        <span className="text-white/60 text-[9px] uppercase tracking-wider mb-0.5 font-medium">Cardholder</span>
                        <span className="text-white text-xs font-medium tracking-wide uppercase drop-shadow-sm">{primaryCard.name}</span>
                     </div>
                     <div className="flex gap-4">
                        <div className="flex flex-col items-start px-2 border-l border-white/10">
                           <span className="text-white/60 text-[9px] uppercase tracking-wider mb-0.5 font-medium">Exp</span>
                           <span className="text-white text-xs font-medium tracking-wide drop-shadow-sm">12/28</span>
                        </div>
                        <div className="flex flex-col items-start px-2 border-l border-white/10">
                           <span className="text-white/60 text-[9px] uppercase tracking-wider mb-0.5 font-medium">CVV</span>
                           <span className="text-white text-xs font-medium tracking-wide drop-shadow-sm">{showNumber ? '123' : '***'}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Card Info Details */}
         <div className="bg-white/[0.02] rounded-xl p-3 border border-white/5 mt-4 mb-3 flex flex-col gap-2.5 shadow-inner flex-shrink-0">
            <div className="flex justify-between items-center group">
              <span className="text-[#8B899A] text-[11px]">Card Status</span>
              <span className="text-white text-[11px] font-semibold flex items-center gap-1.5 bg-[#4FC9A4] bg-opacity-10 px-2 py-0.5 rounded border border-[#4FC9A4] border-opacity-20 shadow-[0_0_10px_rgba(79,201,164,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC9A4] animate-pulse"></span> Active
              </span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="flex justify-between items-center">
              <span className="text-[#8B899A] text-[11px]">Available Credit</span>
              <span className="text-[#4FC9A4] text-[13px] font-bold drop-shadow-sm">$27,430.99</span>
            </div>
         </div>

         <button className="w-full py-2.5 rounded-xl border border-white/10 text-white/80 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all flex justify-center items-center gap-2 mt-auto">
            + Add card details
         </button>
      </GlassCard>
    </div>
  );
}
