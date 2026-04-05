'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Search, X, ChevronsUpDown, SearchX, Eye, Pencil, Trash2, 
  ChevronLeft, ChevronRight, Check, X as XIcon
} from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import GlassCard from '@/components/ui/GlassCard';

const CATEGORIES = ['Shopping', 'Entertainment', 'Platform', 'Workspace', 'Transfer', 'Food'];

export default function ActivityTransactions() {
  const { 
    transactions, filters, role, currentPage, pageSize,
    setFilter, clearFilters, deleteTransaction, editTransaction, setPage, getFilteredTransactions
  } = useFinanceStore();

  const [sortKey, setSortKey] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const startEdit = (tx: any) => {
    setEditingId(tx.id);
    setEditForm(tx);
  };

  const saveEdit = () => {
    if (editingId) {
      editTransaction(editingId, editForm);
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const filteredTransactions = getFilteredTransactions();

  // Basic sorting
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aVal = a[sortKey as keyof typeof a];
    let bVal = b[sortKey as keyof typeof b];

    if (sortKey === 'amount') {
      aVal = a.amount;
      bVal = b.amount;
    } else if (sortKey === 'date') {
      aVal = new Date(a.date).getTime();
      bVal = new Date(b.date).getTime();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / pageSize) || 1;
  const page = Math.min(currentPage, totalPages);
  
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, sortedTransactions.length);
  const currentTransactions = sortedTransactions.slice(startIdx, endIdx);

  // Smart Pagination
  const maxPagesToShow = 5;
  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const visiblePageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc'); // Default to desc on new key
    }
  };

  const prevPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);

  const activeFilterCount = (filters.search ? 1 : 0) + 
                            (filters.category !== 'all' ? 1 : 0) + 
                            (filters.type !== 'All' ? 1 : 0) + 
                            0; // month filter removed

  return (
    <>
      <GlassCard className="flex flex-wrap items-center gap-2 md:gap-3 flex-shrink-0 p-3 rounded-2xl">
        <div className="flex items-center gap-2 flex-1 rounded-xl px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Search size={14} className="text-[#5A5870] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#5A5870]"
          />
          {filters.search && (
            <button onClick={() => setFilter('search', '')}>
              <X size={13} className="text-[#5A5870] hover:text-white" />
            </button>
          )}
        </div>

        <div className="w-px h-5 flex-shrink-0 hidden md:block" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Category filter */}
        <select value={filters.category} onChange={e => setFilter('category', e.target.value)}
          className="bg-transparent text-[#8B899A] text-sm outline-none cursor-pointer px-2 py-1.5
            rounded-xl hover:text-white transition-colors flex-shrink-0"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
          <option value="all" style={{ background: '#1C1929' }}>All Categories</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c.toLowerCase()} style={{ background: '#1C1929' }}>{c}</option>
          ))}
        </select>

        {/* Type filter */}
        <div className="flex items-center rounded-xl p-0.5 flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['All','Income','Expense'].map(type => (
            <button key={type}
              onClick={() => setFilter('type', type)}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all whitespace-nowrap
                ${filters.type === type
                  ? type === 'Income'
                    ? 'bg-[#4FC9A4]/20 text-[#4FC9A4]'
                    : type === 'Expense'
                      ? 'bg-[#F87171]/20 text-[#F87171]'
                      : 'bg-white/10 text-white'
                  : 'text-[#5A5870] hover:text-white'
                }`}>
              {type}
            </button>
          ))}
        </div>

        {/* Date range picker */}
        <select value={filters.month} onChange={e => setFilter('month', e.target.value)}
          className="bg-transparent text-[#8B899A] text-sm outline-none cursor-pointer px-2 py-1.5 rounded-xl flex-shrink-0"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
          <option value="all" style={{ background: '#1C1929' }}>All Time</option>
          <option value="may" style={{ background: '#1C1929' }}>May 2026</option>
          <option value="apr" style={{ background: '#1C1929' }}>April 2026</option>
        </select>

        {/* Active filter count */}
        {activeFilterCount > 0 && (
          <button onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl flex-shrink-0"
            style={{ background: 'rgba(124,92,252,0.15)', color: '#7C5CFC', border: '1px solid rgba(124,92,252,0.2)' }}>
            <X size={11} />
            Clear ({activeFilterCount})
          </button>
        )}
      </GlassCard>

      <GlassCard className="flex flex-col flex-shrink-0 md:flex-shrink md:flex-1 md:min-h-0 overflow-hidden rounded-2xl">
        {/* Desktop table header */}
        <div className="flex-shrink-0 px-5 py-3 hidden md:block"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <table className="w-full table-fixed">
            <colgroup>
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              {role === 'Admin' && <col style={{ width: '14.32%' }} />}
              </colgroup>
            <thead>
              <tr>
                {[
                  { key: 'name',     label: 'Description' },
                  { key: 'category', label: 'Category' },
                  { key: 'date',     label: 'Date' },
                  { key: 'type',     label: 'Type' },
                  { key: 'amount',   label: 'Amount' },
                  { key: 'status',   label: 'Status' },
                ].map(col => (
                  <th key={col.key} onClick={() => toggleSort(col.key)} className="text-left pb-2 cursor-pointer select-none group">
                    <span className="flex items-center gap-1 text-[#8B899A] text-xs font-medium group-hover:text-white transition-colors">
                      {col.label}
                      <ChevronsUpDown size={11} className={`transition-colors ${sortKey === col.key ? 'text-[#7C5CFC]' : 'text-[#3A3850]'}`} />
                    </span>
                  </th>
                ))}
                {role === "Admin" && <th className="text-right pb-2 text-[#8B899A] text-xs font-medium">Actions</th>}
              </tr>
            </thead>
          </table>
        </div>

        {/* ── MOBILE CARD LAYOUT ── */}
        <div className="md:hidden flex flex-col px-4 py-2">
          {currentTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <SearchX size={22} className="text-[#5A5870]" />
              </div>
              <p className="text-white text-sm font-medium">No transactions found</p>
              <p className="text-[#5A5870] text-xs">Try adjusting your filters</p>
              <button onClick={clearFilters}
                className="text-xs px-4 py-2 rounded-full mt-1 hover:bg-white/5 transition-colors"
                style={{ background: 'rgba(124,92,252,0.15)', color: '#7C5CFC', border: '1px solid rgba(124,92,252,0.2)' }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {currentTransactions.map((tx) => {
                const isEditing = editingId === tx.id;
                
                return (
                <div key={tx.id} className="flex flex-col p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  
                  {isEditing ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <select value={editForm.category || ''} onChange={e => setEditForm({...editForm, category: e.target.value})} className="bg-transparent text-white text-[11px] border border-white/20 rounded px-1.5 py-1.5 outline-none focus:border-[#7C5CFC] flex-1 min-w-0">
                          {CATEGORIES.map(c => <option className="bg-[#1C1929]" key={c} value={c}>{c}</option>)}
                        </select>
                        <select value={editForm.type || ''} onChange={e => setEditForm({...editForm, type: e.target.value})} className="bg-transparent text-white text-[11px] border border-white/20 rounded px-1.5 py-1.5 outline-none focus:border-[#7C5CFC] flex-1 min-w-0">
                           <option className="bg-[#1C1929]" value="Income">Income</option>
                           <option className="bg-[#1C1929]" value="Expense">Expense</option>
                        </select>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-white font-medium pl-1 text-sm">$</span>
                        <input type="number" value={editForm.amount || 0} onChange={e => setEditForm({...editForm, amount: parseFloat(e.target.value) || 0})} className="bg-transparent text-white text-sm font-semibold border border-white/20 rounded px-2 py-1 outline-none focus:border-[#7C5CFC] flex-1 min-w-0 w-16" />
                        <select value={editForm.status || ''} onChange={e => setEditForm({...editForm, status: e.target.value})} className="bg-transparent text-white text-[11px] border border-white/20 rounded px-1.5 py-1.5 outline-none focus:border-[#7C5CFC] flex-1 min-w-0">
                          <option className="bg-[#1C1929]" value="Completed">Completed</option>
                          <option className="bg-[#1C1929]" value="Pending">Pending</option>
                          <option className="bg-[#1C1929]" value="Failed">Failed</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-1">
                        <button onClick={saveEdit} className="flex-1 py-1.5 rounded-lg flex items-center justify-center text-[#4FC9A4] transition-all border border-[#4FC9A4]/30 bg-[#4FC9A4]/10 font-medium text-xs">Save</button>
                        <button onClick={cancelEdit} className="w-10 py-1.5 rounded-lg flex items-center justify-center text-[#F87171] transition-all border border-[#F87171]/30 bg-[#F87171]/10"><XIcon size={14} /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold overflow-hidden"
                          style={{ background: tx.iconBg, color: tx.iconColor }}>
                          {tx.icon.startsWith('/') ? (
                            <Image src={tx.icon} alt={tx.name} width={20} height={20} className={`object-contain ${['Netflix', 'Amazon', 'Starbucks'].includes(tx.name) ? 'scale-[1.35]' : ''}`} />
                          ) : tx.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[13px] font-medium truncate">{tx.name}</p>
                          <div className="flex items-center flex-wrap gap-1.5 mt-0.5">
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-medium whitespace-nowrap"
                              style={{ background: tx.categoryBg, color: tx.categoryColor }}>{tx.category}</span>
                            <span className="text-[#5A5870] text-[10px] whitespace-nowrap">{tx.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0 ml-1">
                          <p className={`text-[13px] font-semibold ${tx.type === 'Income' ? 'text-[#4FC9A4]' : 'text-white'}`}>
                            {tx.type === 'Income' ? '+' : '-'}${tx.amount.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-1 text-[9px] mt-1 font-medium"
                            style={{ color: tx.status === 'Completed' ? '#4FC9A4' : tx.status === 'Pending' ? '#F5A623' : '#F87171' }}>
                            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'currentColor' }} />
                            {tx.status}
                          </div>
                        </div>
                      </div>

                      {role === 'Admin' && (
                        <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-white/5">
                          <button onClick={() => startEdit(tx)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-white hover:bg-white/10 transition-all bg-white/5">
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => deleteTransaction(tx.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-all bg-white/5">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── DESKTOP TABLE BODY ── */}
        <div className="hidden md:block flex-1 overflow-y-auto min-h-0 px-5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {currentTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <SearchX size={22} className="text-[#5A5870]" />
              </div>
              <p className="text-white text-sm font-medium">No transactions found</p>
              <p className="text-[#5A5870] text-xs">Try adjusting your filters or search query</p>
              <button onClick={clearFilters}
                className="text-xs px-4 py-2 rounded-full mt-1 hover:bg-white/5 transition-colors"
                style={{ background: 'rgba(124,92,252,0.15)', color: '#7C5CFC', border: '1px solid rgba(124,92,252,0.2)' }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <table className="w-full table-fixed">
              <colgroup>
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              <col style={{ width: role === 'Admin' ? '14.28%' : '16.66%' }} />
              {role === 'Admin' && <col style={{ width: '14.32%' }} />}
              </colgroup>
              <tbody>
                {currentTransactions.map((tx) => {
                  const isEditing = editingId === tx.id;
                  
                  return (
                  <tr key={tx.id}
                    className="group border-b transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>


                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold overflow-hidden"
                          style={{ background: tx.iconBg, color: tx.iconColor }}>
                          {tx.icon.startsWith('/') ? (
                            <Image src={tx.icon} alt={tx.name} width={20} height={20} className={`object-contain ${['Netflix', 'Amazon', 'Starbucks'].includes(tx.name) ? 'scale-[1.35]' : ''}`} />
                          ) : (
                            tx.icon
                          )}
                        </div>
                        <div className="min-w-0 pr-2">
                          <p className="text-white text-sm font-medium truncate">{tx.name}</p>
                          <p className="text-[#5A5870] text-[11px] truncate">{tx.reference}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      {isEditing ? (
                        <select 
                          value={editForm.category || ''} 
                          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                          className="bg-transparent text-white text-[11px] border border-white/20 rounded md:border-b md:border-t-0 md:border-l-0 md:border-r-0 md:rounded-none px-1 outline-none focus:border-[#7C5CFC] w-full max-w-[90px] h-[22px]"
                        >
                          {CATEGORIES.map(c => <option className="bg-[#1C1929]" key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium"
                          style={{ background: tx.categoryBg, color: tx.categoryColor }}>
                          {tx.category}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5">
                      {isEditing ? (
                        <div className="flex flex-col gap-1">
                          <input type="text" value={editForm.date || ''} onChange={e => setEditForm({...editForm, date: e.target.value})} className="bg-transparent text-white text-[12px] border border-white/20 rounded md:border-b md:border-t-0 md:border-l-0 md:border-r-0 md:rounded-none px-1 outline-none focus:border-[#7C5CFC] w-full max-w-[85px] h-[20px]" placeholder="24 May 2026" />
                          <input type="text" value={editForm.time || ''} onChange={e => setEditForm({...editForm, time: e.target.value})} className="bg-transparent text-[#8B899A] text-[10px] border border-white/20 rounded md:border-b md:border-t-0 md:border-l-0 md:border-r-0 md:rounded-none px-1 outline-none focus:border-[#7C5CFC] w-full max-w-[85px] h-[18px] mt-1" placeholder="10:00 AM" />
                        </div>
                      ) : (
                        <>
                          <p className="text-white text-sm">{tx.date}</p>
                          <p className="text-[#5A5870] text-[11px]">{tx.time}</p>
                        </>
                      )}
                    </td>

                    <td className="py-3.5">
                      {isEditing ? (
                        <select 
                          value={editForm.type || ''} 
                          onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                          className="bg-transparent text-white text-[11px] border border-white/20 rounded md:border-b md:border-t-0 md:border-l-0 md:border-r-0 md:rounded-none px-1 outline-none focus:border-[#7C5CFC] w-full max-w-[90px] h-[22px]"
                        >
                          <option className="bg-[#1C1929]" value="Income">Income</option>
                          <option className="bg-[#1C1929]" value="Expense">Expense</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap"
                          style={tx.type === 'Income'
                            ? { background: 'rgba(79,201,164,0.12)', color: '#4FC9A4' }
                            : { background: 'rgba(248,113,113,0.10)', color: '#F87171' }
                          }>
                          {tx.type === 'Income' ? '↑' : '↓'} {tx.type}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5">
                      {isEditing ? (
                        <div className="flex items-center">
                          <span className="text-white mr-1">$</span>
                          <input type="number" value={editForm.amount || 0} onChange={e => setEditForm({...editForm, amount: parseFloat(e.target.value) || 0})} className="bg-transparent text-white text-[13px] font-semibold border border-white/20 rounded md:border-b md:border-t-0 md:border-l-0 md:border-r-0 md:rounded-none px-1 outline-none focus:border-[#7C5CFC] w-full max-w-[80px] h-[22px] ml-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                      ) : (
                        <span className={`text-sm font-semibold ${tx.type === 'Income' ? 'text-[#4FC9A4]' : 'text-white'}`}>
                          {tx.type === 'Income' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5">
                      {isEditing ? (
                        <select 
                          value={editForm.status || ''} 
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          className="bg-transparent text-white text-[11px] border border-white/20 rounded md:border-b md:border-t-0 md:border-l-0 md:border-r-0 md:rounded-none px-1 outline-none focus:border-[#7C5CFC] w-full max-w-[90px] h-[22px]"
                        >
                          <option className="bg-[#1C1929]" value="Completed">Completed</option>
                          <option className="bg-[#1C1929]" value="Pending">Pending</option>
                          <option className="bg-[#1C1929]" value="Failed">Failed</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px]"
                          style={{ color: tx.status === 'Completed' ? '#4FC9A4' : tx.status === 'Pending' ? '#F5A623' : '#F87171' }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: 'currentColor' }} />
                          {tx.status}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 text-right flex-shrink-0">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={saveEdit} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#4FC9A4] hover:bg-[#4FC9A4]/20 transition-all border border-[#4FC9A4]/30 bg-[#4FC9A4]/10">
                            <Check size={13} />
                          </button>
                          <button onClick={cancelEdit} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#F87171] hover:bg-[#F87171]/20 transition-all border border-[#F87171]/30 bg-[#F87171]/10">
                            <XIcon size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className={`flex items-center justify-end gap-1 transition-opacity ${role === 'Admin' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-white hover:bg-white/5 transition-all">
                            <Eye size={13} />
                          </button>
                          {role === 'Admin' && (
                            <>
                              <button onClick={() => startEdit(tx)} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-white hover:bg-white/10 transition-all bg-white/5 mx-0.5">
                                <Pencil size={13} />
                              </button>
                              <button onClick={() => deleteTransaction(tx.id)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-all">
                                <Trash2 size={13} />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>

                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-5 py-3 gap-3 md:gap-0 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[#5A5870] text-[11px] md:text-xs">
            Showing <span className="text-white">{startIdx + 1}-{endIdx}</span> of <span className="text-white">{filteredTransactions.length}</span> transactions
          </p>

          <div className="flex items-center gap-1">
            <button onClick={prevPage} disabled={page === 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:hover:bg-transparent">
              <ChevronLeft size={14} />
            </button>
            {startPage > 1 && (
              <>
                <button onClick={() => setPage(1)} className="text-[#8B899A] hover:text-white hover:bg-white/5 w-7 h-7 rounded-lg text-xs font-medium">1</button>
                {startPage > 2 && <span className="text-[#5A5870] text-xs">...</span>}
              </>
            )}
            {visiblePageNumbers.map(num => (
              <button key={num} onClick={() => setPage(num)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-all
                  ${num === page ? 'bg-[#7C5CFC] text-white' : 'text-[#8B899A] hover:text-white hover:bg-white/5'}`}>
                {num}
              </button>
            ))}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span className="text-[#5A5870] text-xs">...</span>}
                <button onClick={() => setPage(totalPages)} className="text-[#8B899A] hover:text-white hover:bg-white/5 w-7 h-7 rounded-lg text-xs font-medium">{totalPages}</button>
              </>
            )}
            <button onClick={nextPage} disabled={page === totalPages}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:hover:bg-transparent">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </GlassCard>
    </>
  );
}