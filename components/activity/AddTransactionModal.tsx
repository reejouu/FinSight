'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';

const CATEGORIES = ['Shopping', 'Entertainment', 'Platform', 'Workspace', 'Transfer', 'Food'];

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { addTransaction } = useFinanceStore();

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    time: '',
    category: CATEGORIES[0],
    type: 'Expense',
    status: 'Completed',
  });

  if (!isOpen) return null;

  const submitTransaction = () => {
    if (!formData.name || !formData.amount || !formData.date || !formData.time) return;

    let categoryBg = 'rgba(255,255,255,0.06)';
    let categoryColor = '#fff';
    switch (formData.category) {
      case 'Shopping': categoryBg = 'rgba(248,113,113,0.12)'; categoryColor = '#F87171'; break;
      case 'Entertainment': categoryBg = 'rgba(232,121,160,0.12)'; categoryColor = '#E879A0'; break;
      case 'Workspace': categoryBg = 'rgba(245,166,35,0.12)'; categoryColor = '#F5A623'; break;
      case 'Platform': categoryBg = 'rgba(124,92,252,0.12)'; categoryColor = '#7C5CFC'; break;
      case 'Transfer': categoryBg = 'rgba(79,201,164,0.12)'; categoryColor = '#4FC9A4'; break;
      case 'Food': categoryBg = 'rgba(245,166,35,0.12)'; categoryColor = '#F5A623'; break;
    }

    const tx = {
      id: Date.now().toString(),
      name: formData.name,
      reference: `TXN-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      category: formData.category,
      categoryBg,
      categoryColor,
      date: new Date(formData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: formData.time,
      type: formData.type,
      amount: parseFloat(formData.amount),
      status: formData.status,
      icon: formData.name.charAt(0).toUpperCase(),
      iconBg: categoryBg,
      iconColor: categoryColor,
    };

    addTransaction(tx);
    onClose();
    setFormData({ ...formData, name: '', amount: '', date: '', time: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
        style={{ background: 'rgba(30, 28, 41, 0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg font-bold">Add Transaction</h3>
          <button onClick={onClose} className="text-[#8B899A] hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[#8B899A] text-xs font-medium pl-1">Description</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 text-white text-sm outline-none px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC]/50 transition-colors"
                placeholder="e.g. Netflix Subscription" />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[#8B899A] text-xs font-medium pl-1">Amount ($)</label>
              <input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-white/5 text-white text-sm outline-none px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC]/50 transition-colors"
                placeholder="0.00" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[#8B899A] text-xs font-medium pl-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/5 text-white text-sm outline-none px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC]/50 transition-colors">
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1C1929]">{c}</option>)}
              </select>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[#8B899A] text-xs font-medium pl-1">Type</label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-white/5 text-white text-sm outline-none px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC]/50 transition-colors">
                <option value="Expense" className="bg-[#1C1929]">Expense</option>
                <option value="Income" className="bg-[#1C1929]">Income</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[#8B899A] text-xs font-medium pl-1">Date</label>
              <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-white/5 text-[#8B899A] text-sm outline-none px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC]/50 transition-colors" />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[#8B899A] text-xs font-medium pl-1">Time</label>
              <input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-white/5 text-[#8B899A] text-sm outline-none px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC]/50 transition-colors" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-white/10">
            <button onClick={onClose}
              className="text-xs font-medium px-4 py-2 rounded-xl text-[#8B899A] hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={submitTransaction}
              className="text-xs font-medium px-6 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: '#7C5CFC', boxShadow: '0 4px 14px rgba(124,92,252,0.3)' }}>
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}