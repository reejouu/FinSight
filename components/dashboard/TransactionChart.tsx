"use client";
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { chartData } from '@/lib/data';
import { glassCard } from '@/lib/styles';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 p-3 rounded-2xl border border-white/5 shadow-2xl" 
           style={{ background: 'rgba(30, 28, 41, 0.85)', backdropFilter: 'blur(12px)' }}>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-[10px] h-[10px] rounded-full border-[2.5px]" 
                 style={{ borderColor: entry.color, background: 'transparent' }} />
            <span className="text-white text-xs font-medium">
              ${entry.value >= 1000 ? (entry.value / 1000).toFixed(3) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TransactionChart() {
  return (
    <div className="flex-1 flex flex-col rounded-2xl p-5 min-w-0 overflow-hidden relative" 
         style={{ background: 'linear-gradient(180deg, rgba(30, 28, 41, 0.6) 0%, rgba(20, 18, 28, 0.9) 100%)', border: '1px solid rgba(255,255,255,0.03)' }}>
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-shrink-0 mb-4 z-10 relative">
        <h3 className="text-white text-[15px] font-medium tracking-wide">Transaction Overview</h3>
        <button className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors">
          This Years <ChevronDown size={14} className="text-white/70" />
        </button>
      </div>

      {/* Value & Legend Row */}
      <div className="flex items-end justify-between flex-shrink-0 mb-3 z-10 relative">
        <div className="flex items-baseline gap-[1px]">
          <span className="text-white text-3xl font-bold tracking-tight leading-none">$34,123</span>
          <span className="text-white/40 text-lg font-bold leading-none">.90</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/80 font-medium mb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#4FC9A4' }}/>
            Spending
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#7C5CFC' }}/>
            Earnings
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px] md:flex-1 md:h-auto min-h-0 w-full relative z-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#7C5CFC" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="gEarn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4FC9A4" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#4FC9A4" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#8B899A', fontSize: 11, fontWeight: 500 }}
              axisLine={false} 
              tickLine={false} 
              dy={5} 
              interval="preserveStartEnd"
              padding={{ left: 5, right: 5 }}
            />
            <YAxis 
              tick={{ fill: '#8B899A', fontSize: 11, fontWeight: 500 }} 
              axisLine={false} 
              tickLine={false}
              tickFormatter={v => v === 0 ? '0' : `${v/1000}k`}
              domain={[0, 'dataMax + 5000']}
              dx={-2}
              width={45}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#8B899A', strokeWidth: 1.5, strokeDasharray: '4 4' }}
            />
            <Area 
              type="monotone" 
              dataKey="spending"
              stroke="#7C5CFC" 
              strokeWidth={2} 
              fill="url(#gSpend)" 
              activeDot={{ r: 4, strokeWidth: 0, fill: '#7C5CFC' }}
            />
            <Area 
              type="monotone" 
              dataKey="earnings"
              stroke="#4FC9A4" 
              strokeWidth={2} 
              fill="url(#gEarn)" 
              activeDot={{ r: 4, strokeWidth: 0, fill: '#4FC9A4' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
