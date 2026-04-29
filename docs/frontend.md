# ChainWork — Frontend Architecture

> **Next.js 16 · React 19 · TypeScript · Tailwind CSS v4**

---

## 1. Overview

The ChainWork frontend is built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**. It uses a dark-mode-first Web3 aesthetic with glassmorphism, gradient CTAs, and Material Symbols icons.

---

## 2. Design System

### Color Palette (`app/globals.css`)

| Token                         | Value       | Usage                        |
| ----------------------------- | ----------- | ---------------------------- |
| `--color-primary`             | `#c0c1ff`   | Primary actions, CTA         |
| `--color-primary-container`   | `#8083ff`   | Active states                |
| `--color-secondary`           | `#d9b9ff`   | Secondary accents            |
| `--color-secondary-container` | `#6600c0`   | Gradient endpoints           |
| `--color-tertiary`            | `#4edea3`   | Success, live indicators     |
| `--color-background`          | `#121315`   | App background               |
| `--color-surface-container`   | `#1f2021`   | Card backgrounds             |
| `--color-on-surface`          | `#e3e2e3`   | Primary text                 |
| `--color-error`               | `#ffb4ab`   | Error states                 |

### Typography
- **Inter** — Primary UI font (`next/font/google`)
- **Space Mono** — Monospace for hashes, amounts
- **Material Symbols Outlined** — Icon system

### Design Patterns
- Dark mode first with `backdrop-blur-xl` glassmorphism
- Gradient CTAs: `from-primary to-secondary-container`
- Bento grid layouts with `grid-cols-12`
- Micro-animations: `animate-pulse`, `hover:scale-[1.02]`
- Material Design 3 color naming conventions

---

## 3. Page Map & Routing

| Route                        | File                                | Description                          |
| ---------------------------- | ----------------------------------- | ------------------------------------ |
| `/`                          | `app/page.tsx`                      | Landing — Hero, features, CTA        |
| `/marketplace`               | `app/marketplace/page.tsx`          | Job listing with sidebar filters     |
| `/create-job`                | `app/create-job/page.tsx`           | Multi-step job creation form         |
| `/job/[id]`                  | `app/job/[id]/page.tsx`             | Job detail with apply action         |
| `/dashboard/client`          | `app/dashboard/client/page.tsx`     | Client mandates & escrowed capital   |
| `/dashboard/freelancer`      | `app/dashboard/freelancer/page.tsx` | Freelancer earnings & proposals      |
| `/messaging`                 | `app/messaging/page.tsx`            | P2P messaging interface              |
| `/notifications`             | `app/notifications/page.tsx`        | Activity feed                        |
| `/transactions`              | `app/transactions/page.tsx`         | Financial audit trail                |
| `/reviews`                   | `app/reviews/page.tsx`              | On-chain reputation protocol         |
| `/portfolio`                 | `app/portfolio/page.tsx`            | Freelancer project showcase          |
| `/settings`                  | `app/settings/page.tsx`             | Profile, wallet, theme preferences   |

---

## 4. Component Architecture

### Layout Components

- **`app/layout.tsx`** — Root layout with Inter font, global nav bar (fixed top), Connect Wallet CTA, "Mainnet Live" badge
- **`SideNavBar.tsx`** — Client component with `usePathname()` active state, 9 nav items, Help/Logout actions
- **`Footer.tsx`** — Multi-column footer with links, newsletter signup

### Atomic UI Components (`app/components/ui/`)

| Component             | Description                         |
| --------------------- | ----------------------------------- |
| `ChatMessage.tsx`     | Message bubble with avatar, attachments |
| `NetworkSelector.tsx` | Blockchain network radio picker     |
| `NotificationItem.tsx`| Notification list item with icon    |
| `PortfolioCard.tsx`   | Bento grid portfolio card (S/M/L)  |
| `RatingCard.tsx`      | Review card with star ratings       |
| `Toast.tsx`           | Ephemeral notification              |
| `TransactionRow.tsx`  | Table row for transaction history   |

---

## 5. Key Pages Detail

### Landing Page (`/`)
- Hero with animated gradient blobs, "Work Without Trust Issues" headline
- Feature Bento Grid: Escrow, Multi-chain, Zero Fees, Wallet Login
- 4-step How It Works: Post → Fund → Deliver → Release
- CTA section with dot-grid background

### Marketplace (`/marketplace`)
- Fixed sidebar with keyword search, network checkboxes (ETH/SOL/MATIC), budget slider, category dropdown
- Responsive job card grid (1/2/3 columns)
- Mobile bottom nav with FAB create button

### Create Job (`/create-job`)
- Two-column: form + live preview sidebar
- Steps: Job Identity (title, rich text) → Network & Budget (USDC, timeline, chain selector)
- "Submit to Blockchain" with gas fee display

### Dashboards
- **Client**: Stats bento (jobs, active, funds locked), active mandates table, analytics cards
- **Freelancer**: Earnings, contracts, applied jobs, recommended feed, proposal list, profile strength ring

### Messaging
- Three-panel: sidebar nav, conversation list, active chat
- Chat features: file attachments, timestamps, online indicators, emoji support

### Transactions
- Volume stats, network filter tabs, searchable table
- Network distribution bars, export (PDF/CSV/Email)

### Reviews & Portfolio
- Trust score (998), average rating (4.9), tier badge
- Portfolio bento grid with project cards, skill progress bars, achievements

### Settings
- Tab navigation: Profile, Notifications, Security, Wallet, Preferences
- Role toggle (Freelancer/Client), theme selector (Obsidian/Prism)
- Wallet vault: connected wallets with balances, link/unlink

---

## 6. State Management

### Current State
Static/mock data with React `useState`/`useEffect` for interactivity.

### Planned Contexts
- `AuthProvider` — JWT, user data, login/logout
- `WalletProvider` — Connection, signing, public key
- `EscrowProvider` — On-chain escrow state
- `JobProvider` — CRUD, filters, proposals

---

## 7. API Integration

### Backend REST API (`localhost:5000`)

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| POST   | `/api/auth/register`       | Create user account        |
| POST   | `/api/auth/login`          | Email/username login       |
| POST   | `/api/auth/challenge`      | Wallet challenge nonce     |
| POST   | `/api/auth/verify`         | Wallet signature verify    |
| GET    | `/api/jobs`                | List jobs                  |
| POST   | `/api/jobs`                | Create job                 |
| GET    | `/api/jobs/:id`            | Job details                |
| POST   | `/api/jobs/:id/proposals`  | Submit proposal            |

### Blockchain SDK

| Function               | Description                   |
| ---------------------- | ----------------------------- |
| `EscrowClient.initializeSol()` | Create SOL escrow     |
| `EscrowClient.releaseSol()`    | Release to freelancer |
| `EscrowClient.cancelSol()`     | Cancel and refund     |

---

## 8. Development

```bash
npm run dev    # localhost:3000
npm run build  # Production build
npm run start  # Serve production
```

### Responsive Breakpoints

| Size     | Width     | Behavior                         |
| -------- | --------- | -------------------------------- |
| Mobile   | < 768px   | Single column, bottom nav        |
| Tablet   | 768-1024  | 2-column, collapsible sidebar    |
| Desktop  | > 1024px  | Full multi-column, fixed sidebar |
| Wide     | > 1536px  | 3-column job grid                |
