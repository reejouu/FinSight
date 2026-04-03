"use client";
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { activityData } from '@/lib/data';
import { glassCard } from '@/lib/styles';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 shadow-2xl" 
           style={{ background: 'rgba(30, 28, 41, 0.9)', backdropFilter: 'blur(12px)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: payload[0].payload.color }} />
        <span className="text-white text-[11px] font-medium">{payload[0].name}: {payload[0].value}%</span>
      </div>
    );
  }
  return null;
};

export default function AllActivity() {
  return (
    <div className="flex flex-col h-full p-5 rounded-2xl min-w-0 flex-1 relative" style={glassCard}>
      <div className="flex justify-between items-center mb-4 flex-shrink-0 z-10 relative">
        <h3 className="text-white text-[15px] font-medium tracking-wide">All Activity</h3>
        <button className="text-[#5A5870] hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
      </div>

      {/* donut fills remaining space, centered */}
      <div className="flex-1 flex items-center justify-center min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={false}
              isAnimationActive={true}
              animationEasing="ease-out"
              animationDuration={300}
            />
            <Pie 
              data={activityData} 
              cx="50%" 
              cy="50%" 
              innerRadius={60} 
              outerRadius={80} 
              paddingAngle={4} 
              dataKey="value" 
              stroke="none"
              isAnimationActive={true}
            >
              {activityData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  className="hover:opacity-80 transition-opacity duration-300 outline-none"
                />
              ))}
            </Pie>
            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" fill="#8B899A" fontSize="11" fontWeight="500">
              Total
            </text>
            <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              $450.90
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 flex-shrink-0">
        {activityData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-white/70">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
