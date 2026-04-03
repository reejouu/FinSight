import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { transactions } from '@/lib/data';

interface Transaction {
  id: string;
  name: string;
  reference: string;
  category: string;
  categoryBg: string;
  categoryColor: string;
  date: string;
  time: string;
  type: string;
  amount: number;
  status: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface FinanceStore {
  transactions: Transaction[];
  filters: {
    search: string;
    category: string;
    type: 'All' | 'Income' | 'Expense';
    month: string;
  };
  role: 'Viewer' | 'Admin';
  currentPage: number;
  pageSize: number;

  setRole: (role: 'Viewer' | 'Admin') => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updates: Partial<Transaction>) => void;
  setPage: (page: number) => void;

  getFilteredTransactions: () => Transaction[];
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set: any, get: any) => ({
      transactions: transactions,
      filters: {
        search: '',
        category: 'all',
        type: 'All' as 'All' | 'Income' | 'Expense',
        month: 'all',
      },
      role: 'Admin' as 'Viewer' | 'Admin',
      currentPage: 1,
      pageSize: 10,

      setRole: (role: 'Viewer' | 'Admin') => set({ role }),
      setFilter: (key: string, value: string) =>
        set((state: FinanceStore) => ({
          filters: { ...state.filters, [key]: value },
          currentPage: 1, // reset page on filter change
        })),
      clearFilters: () =>
        set({
          filters: { search: '', category: 'all', type: 'All', month: 'all' },
          currentPage: 1,
        }),
      addTransaction: (tx: Transaction) =>
        set((state: FinanceStore) => ({ transactions: [tx, ...state.transactions] })),
      deleteTransaction: (id: string) =>
        set((state: FinanceStore) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
      editTransaction: (id: string, updates: Partial<Transaction>) =>
        set((state: FinanceStore) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        })),
      setPage: (page: number) => set({ currentPage: page }),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter((tx: Transaction) => {
          const matchSearch = tx.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                              tx.reference.toLowerCase().includes(filters.search.toLowerCase());
          const matchCat = filters.category === 'all' || tx.category.toLowerCase() === filters.category.toLowerCase();
          const matchType = filters.type === 'All' || tx.type === filters.type;
          
          // Simplified month matching based on date format "24 May 2026"
          const matchMonth = filters.month === 'all' || tx.date.toLowerCase().includes(filters.month.toLowerCase());
          
          return matchSearch && matchCat && matchType && matchMonth;
        });
      },
    }),
    { name: 'finsight-store' }
  )
);
