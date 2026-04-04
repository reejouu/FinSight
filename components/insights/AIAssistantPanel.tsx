"use client";

import React from 'react';
import { useAIChat } from '@/hooks/useAIChat';
import { Sparkles, RotateCcw, Send } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const SUGGESTIONS = [
  "Where am I spending the most this month?",
  "Am I on track to save money this month?",
  "Which subscriptions should I consider cancelling?",
  "Give me a summary of my finances this month"
];

export default function AIAssistantPanel() {
  const { messages, input, setInput, isLoading, sendMessage, clearChat, bottomRef } = useAIChat();

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  return (
    <GlassCard className="flex flex-col flex-1 rounded-2xl overflow-hidden h-full">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg bg-[rgba(124,92,252,0.2)] flex items-center justify-center">
            <Sparkles size={16} className="text-[#7C5CFC]" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#4FC9A4] animate-ping" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#4FC9A4]" />
          </div>
          <div>
            <h2 className="text-white text-sm font-bold leading-tight">FinSight AI</h2>
            <p className="text-[#4FC9A4] text-[10px] font-semibold mt-0.5 tracking-wider">Your personal finance assistant</p>
          </div>
        </div>
        <button onClick={clearChat} className="text-[#5A5870] hover:text-white transition-colors" title="Clear Chat">
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 text-sm" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {messages.length === 0 ? (
          <div className="m-auto mt-10 w-full">
            <p className="text-[#5A5870] text-center mb-4">Try asking:</p>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="px-4 py-2.5 rounded-full border border-white/10 text-[#8B899A] hover:bg-white/5 hover:text-white transition-colors text-left text-xs whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[rgba(124,92,252,0.2)] flex items-center justify-center shrink-0 mr-3 mt-1">
                  <Sparkles size={16} className="text-[#7C5CFC]" />
                </div>
              )}
              
              <div 
                className={`max-w-[85%] px-4 py-3 leading-relaxed rounded-2xl ${
                  m.role === 'user' 
                    ? 'bg-[#7C5CFC] text-white rounded-br-sm' 
                    : 'bg-[rgba(255,255,255,0.06)] border border-white/10 text-white/90 rounded-bl-sm'
                }`}
              >
                {m.content}
                {m.streaming && <span className="inline-block w-1 h-3 ml-1 bg-white/50 animate-pulse mb-[-2px]" />}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} className="h-2 shrink-0" />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/10 px-5 py-4">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about your finances..."
            className="w-full bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-2xl text-white placeholder-[#5A5870] px-4 py-3 pr-12 outline-none focus:border-white/20 transition-colors disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 w-8 h-8 rounded-xl bg-[#7C5CFC] flex items-center justify-center text-white disabled:opacity-50 disabled:bg-white/10 transition-colors"
          >
            <Send size={14} className={isLoading ? "opacity-0" : ""} />
          </button>
        </form>
        <p className="text-center text-[#3A3850] text-[10px] mt-3">
          Reads your actual transaction data · Responses may vary
        </p>
      </div>
    </GlassCard>
  );
}