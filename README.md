# FinSight — Financial Intelligence Dashboard

**Live Demo:** [fin-sight-eosin.vercel.app](https://fin-sight-eosin.vercel.app)

FinSight is a modern personal finance dashboard built with Next.js 15, Tailwind CSS, and Zustand. It gives users a comprehensive view of their financial health through a glassmorphic UI, dynamic data visualizations, and an integrated AI financial assistant.

## Features

- **Dashboard Overview** — Track balance, income, expenses, spending trends, and financial goals in one view
- **Transactions Management** — Full table with search, category/type/date filtering, column sorting, and pagination
- **Role-Based UI** — Viewer and Admin roles with a live toggle; Admin unlocks add, edit, delete, and CSV export
- **Insights Page** — Budget health tracking, 28-day spending heatmap, savings rate trend, and auto-computed financial observations
- **AI Financial Assistant** — Ask natural language questions about your finances; the assistant reads your actual transaction data and responds with specific, number-backed answers
- **Accounts Page** — Multi-account view with balance sparklines and asset distribution
- **Mobile Responsiveness** — Fully optimized for small viewports with stackable components, scalable charts, and dynamic overlays like the retractable FinSight AI chat
- **Persistent State** — All transactions and settings survive page refresh via localStorage

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS, custom glassmorphism |
| State | Zustand with persist middleware |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## AI Assistant Setup

Add one of the following to `.env.local`:

```env
# Option 1
ANTHROPIC_API_KEY=your_api_key_here

# Option 2
GEMINI_API_KEY=your_api_key_here
```

The assistant supports two AI providers interchangeably. Without a key, it falls back to contextual static responses — all other features remain fully functional.

## Project Structure

```
app/
├── api/chat/route.ts    # AI streaming endpoint
└── insights/            # Insights page route
components/
├── dashboard/           # Sidebar, Navbar, DashboardLayout, balance card, charts, goals
├── activity/            # Transaction table, filters, add/edit modal
├── insights/            # Budget bars, heatmap, AI assistant panel
├── accounts/            # Account cards, sparklines, asset distribution
├── landing/             # Landing page components
├── shared/              # Shared UI like Navbar
└── ui/                  # Reusable UI components (Badge, GlassCard, etc.)
store/
└── useFinanceStore.ts   # Zustand store — transactions, filters, role, budgets
hooks/
└── useAIChat.ts         # Streaming AI chat hook
```

## Role-Based UI

| Feature | Viewer | Admin |
|---|---|---|
| View & filter transactions | ✓ | ✓ |
| Add transaction | ✗ | ✓ |
| Edit / Delete transaction | ✗ | ✓ |
| Export CSV | ✗ | ✓ |