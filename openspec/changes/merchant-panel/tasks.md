# Tasks: StockLink Vision — Merchant Web Panel

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 480 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium

## Phase 1: Foundation
- [x] 1.1 Scaffold Vite + React + TypeScript project with Tailwind CSS
- [x] 1.2 Configure Tailwind theme (navy/teal) and fonts (Inter/Poppins)
- [x] 1.3 Create mock JSON files (`auth.json`, `inventory.json`, `detections.json`, `reservations.json`) matching API contract
- [x] 1.4 Implement API client (`api.ts`) with mock toggle via `VITE_API_BASE_URL`
- [x] 1.5 Set up React Router v6 with basic routes and AuthGuard

## Phase 2: Core Components
- [x] 2.1 Create reusable `Card` component with Framer Motion animations
- [x] 2.2 Create reusable `Button` component (primary/secondary variants)
- [x] 2.3 Create reusable `Badge` component (status/camera variants)
- [x] 2.4 Create reusable `Skeleton` component for loading states
- [x] 2.5 Create `Layout` component (Sidebar + Header + content area)

## Phase 3: Auth
- [x] 3.1 Implement `AuthContext` for JWT token storage and auth state
- [x] 3.2 Create `Login` page with split-screen layout (credentials left, branding right)
- [x] 3.3 Implement `AuthGuard` for protected routes
- [x] 3.4 Modify `main.tsx` to include `AuthContext` provider

## Phase 4: Pages
- [x] 4.1 Create `Dashboard` page with KPI cards and camera status
- [x] 4.2 Create `Inventory` page with inventory table
- [x] 4.3 Create `Cameras` page with detection history and camera status
- [x] 4.4 Create `Reservations` page with reservations list

## Phase 5: Integration & Polish
- [x] 5.1 Set up Framer Motion micro-interactions (skeleton loaders)
- [x] 5.2 Implement responsive design for all pages
- [x] 5.3 Test mock → real API toggle (`VITE_API_BASE_URL`)
- [x] 5.4 Verify all mock JSON shapes match `PROMPT-BASE.md` exactly