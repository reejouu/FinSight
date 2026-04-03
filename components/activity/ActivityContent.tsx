'use client';
import React, { useState } from 'react';
import { 
  Download, Plus, TrendingUp, TrendingDown, PiggyBank, Activity, 
  Search, X, ChevronsUpDown, SearchX, Eye, Pencil, Trash2, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { glassCard } from '@/lib/styles';

const CATEGORIES = ['Shopping', 'Entertainment', 'Platform', 'Workspace', 'Transfer', 'Food'];

export default function ActivityContent() {
  const { 
    transactions, filters, role, currentPage, pageSize,
    setRole, setFilter, clearFilters, addTransaction, 
    deleteTransaction, setPage, getFilteredTransactions
  } = useFinanceStore();

  const [modalOpen, setModalOpen] = useState(false);
  
  // Sort state
  const [sortKey, setSortKey] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
                            (filters.month !== 'all' ? 1 : 0);

  // Derived stats
  const totalIncome = transactions.filter((t: any) => t.type === 'Income').reduce((sum: number, t: any) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t: any) => t.type === 'Expense').reduce((sum: number, t: any) => sum + t.amount, 0);
  const netSavings = totalIncome - totalExpense;

  const stats = [
    {
      label: 'Total Income',
      value: `$${totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '+8.2%',
      positive: true,
      icon: TrendingUp,
      iconColor: '#4FC9A4',
      iconBg: 'rgba(79,201,164,0.12)',
    },
    {
      label: 'Total Expenses',
      value: `$${totalExpense.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '+3.1%',
      positive: false,
      icon: TrendingDown,
      iconColor: '#F87171',
      iconBg: 'rgba(248,113,113,0.12)',
    },
    {
      label: 'Net Savings',
      value: `$${netSavings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '+12.4%',
      positive: true,
      icon: PiggyBank,
      iconColor: '#7C5CFC',
      iconBg: 'rgba(124,92,252,0.12)',
    },
    {
      label: 'Transactions',
      value: transactions.length.toString(),
      change: '6 this week',
      positive: true,
      icon: Activity,
      iconColor: '#F5A623',
      iconBg: 'rgba(245,166,35,0.12)',
    },
  ];

  const exportCSV = () => {
    console.log('Exporting CSV...');
  };

  // Add Transaction Form State
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    time: '',
    category: CATEGORIES[0],
    type: 'Expense',
    status: 'Completed',
  });

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
    setModalOpen(false);
    setFormData({ ...formData, name: '', amount: '', date: '', time: '' });
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0 px-6 py-5 gap-4 overflow-hidden">
      
      {/* Row 1: Page header */}
      <div className="flex items-start justify-between flex-shrink-0" style={{ height: '52px' }}>
        <div>
          <h1 className="text-white text-[22px] font-bold leading-tight">Transactions</h1>
          <p className="text-[#8B899A] text-[13px] mt-1">
            Track and manage all your financial activity
          </p>
        </div>

        {/* Role switcher + Export — right side */}
        <div className="flex items-center gap-2 flex-shrink-0">

          <div className="flex items-center rounded-full p-0.5 flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
            {(['Viewer','Admin'] as const).map(r => (
              <button key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap
                  ${role === r
                    ? 'bg-[#7C5CFC] text-white'
                    : 'text-[#8B899A] hover:text-white'
                  }`}>
                {r}
              </button>
            ))}
          </div>

          {role === 'Admin' && (
            <button onClick={exportCSV}
              className="flex items-center gap-1.5 text-xs text-white/70 px-3 py-2 rounded-full flex-shrink-0 hover:text-white"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Download size={13} /> Export CSV
            </button>
          )}

          {role === 'Admin' && (
            <button onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 text-xs text-white font-medium px-4 py-2 rounded-full flex-shrink-0 hover:opacity-90"
              style={{ background: '#7C5CFC' }}>
              <Plus size={13} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Summary strip */}
      <div className="flex gap-3 flex-shrink-0">
        {stats.map((stat, i) => (
          <div key={i} className="flex-1 flex items-center gap-3 p-4 rounded-2xl" style={glassCard}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: stat.iconBg }}>
              <stat.icon size={18} style={{ color: stat.iconColor }} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#8B899A] text-xs mb-0.5">{stat.label}</span>
              <span className="text-white text-lg font-bold leading-tight">{stat.value}</span>
              <span className={`text-[10px] mt-0.5 ${stat.positive ? 'text-[#4FC9A4]' : 'text-[#F87171]'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Filter bar */}
      <div className="flex items-center gap-3 flex-shrink-0 p-3 rounded-2xl" style={glassCard}>
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

        <div className="w-px h-5 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} />

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
      </div>

      {/* Row 4: Transaction Table */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden rounded-2xl" style={glassCard}>
        {/* Table header */}
        <div className="flex-shrink-0 px-5 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <table className="w-full table-fixed">
            <colgroup>
              <col style={{ width: '4%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '9%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left pb-2">
                  <input type="checkbox" className="accent-[#7C5CFC] w-3.5 h-3.5" />
                </th>
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
                <th className="text-right pb-2 text-[#8B899A] text-xs font-medium">Actions</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable table body */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5"
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
                <col style={{ width: '4%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '9%' }} />
              </colgroup>
              <tbody>
                {currentTransactions.map((tx) => (
                  <tr key={tx.id}
                    className="group border-b transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                    <td className="py-3.5">
                      <input type="checkbox" className="accent-[#7C5CFC] w-3.5 h-3.5" />
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                          style={{ background: tx.iconBg, color: tx.iconColor }}>
                          {tx.icon}
                        </div>
                        <div className="min-w-0 pr-2">
                          <p className="text-white text-sm font-medium truncate">{tx.name}</p>
                          <p className="text-[#5A5870] text-[11px] truncate">{tx.reference}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium"
                        style={{ background: tx.categoryBg, color: tx.categoryColor }}>
                        {tx.category}
                      </span>
                    </td>

                    <td className="py-3.5">
                      <p className="text-white text-sm">{tx.date}</p>
                      <p className="text-[#5A5870] text-[11px]">{tx.time}</p>
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap"
                        style={tx.type === 'Income'
                          ? { background: 'rgba(79,201,164,0.12)', color: '#4FC9A4' }
                          : { background: 'rgba(248,113,113,0.10)', color: '#F87171' }
                        }>
                        {tx.type === 'Income' ? '↑' : '↓'} {tx.type}
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span className={`text-sm font-semibold ${tx.type === 'Income' ? 'text-[#4FC9A4]' : 'text-white'}`}>
                        {tx.type === 'Income' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px]"
                        style={{ color: tx.status === 'Completed' ? '#4FC9A4' : tx.status === 'Pending' ? '#F5A623' : '#F87171' }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'currentColor' }} />
                        {tx.status}
                      </span>
                    </td>

                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-white hover:bg-white/5 transition-all">
                          <Eye size={13} />
                        </button>
                        {role === 'Admin' && (
                          <>
                            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-[#7C5CFC] hover:bg-[#7C5CFC]/10 transition-all">
                              <Pencil size={13} />
                            </button>
                            <button onClick={() => deleteTransaction(tx.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-all">
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table footer */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[#8B899A] text-xs">
            Showing {filteredTransactions.length === 0 ? 0 : startIdx + 1}–{endIdx} of {filteredTransactions.length} transactions
          </span>
          <div className="flex items-center gap-1.5">
            <button onClick={prevPage} disabled={page === 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] disabled:opacity-30 hover:text-white hover:bg-white/5 transition-all">
              <ChevronLeft size={13} />
            </button>
            {pageNumbers.map(n => (
              <button key={n} onClick={() => setPage(n)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-all"
                style={n === page ? { background: '#7C5CFC', color: 'white' } : { color: '#8B899A', background: 'transparent' }}>
                {n}
              </button>
            ))}
            <button onClick={nextPage} disabled={page === totalPages || totalPages === 0}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8B899A] disabled:opacity-30 hover:text-white hover:bg-white/5 transition-all">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="w-[460px] flex flex-col rounded-2xl p-6" style={glassCard}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-white font-bold text-base">Add Transaction</h2>
                <p className="text-[#8B899A] text-xs mt-0.5">Fill in the transaction details</p>
              </div>
              <button onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[#5A5870] hover:text-white hover:bg-white/5">
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Description</label>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} placeholder="e.g. Netflix" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Amount ($)</label>
                <input value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none" type="number"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} placeholder="0.00" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Date</label>
                <input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none" type="date"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Time</label>
                <input value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none" type="time"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {CATEGORIES.map(c => <option key={c} value={c} style={{background:'#1C1929'}}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Income','Expense'].map(c => <option key={c} value={c} style={{background:'#1C1929'}}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Completed','Pending','Failed'].map(c => <option key={c} value={c} style={{background:'#1C1929'}}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B899A] text-xs">Reference</label>
                <input disabled className="w-full px-3 py-2 rounded-xl text-white/50 text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }} placeholder="auto-generated" />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-sm text-[#8B899A] hover:text-white transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                Cancel
              </button>
              <button onClick={submitTransaction}
                className="flex-1 py-2.5 rounded-xl text-sm text-white font-medium hover:opacity-90"
                style={{ background: '#7C5CFC' }}>
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}