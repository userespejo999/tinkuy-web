# Technical Design: StockLink Vision — Merchant Web Panel

## 1. Technical Approach
The merchant web panel is a **mock-first**, **contract-driven** React application built with Vite, TypeScript, and Tailwind CSS. It strictly adheres to the API contract defined in `PROMPT-BASE.md` and uses static JSON mocks for development. The architecture prioritizes simplicity, visual polish, and seamless integration with the backend.

Key principles:
- **Mock-first**: All development starts with static JSON mocks matching the API contract exactly.
- **Contract-driven**: No frontend-only fields or endpoints; every feature maps directly to `PROMPT-BASE.md`.
- **Visual polish**: Navy/teal theme, Framer Motion animations, and skeleton loaders for a professional look.
- **Minimal state**: React Context for auth, `useState`/`useEffect` for page data, and Zustand only if necessary.

## 2. Architecture Decisions

### Decision: State Management
**Choice**: React Context + `useState`/`useEffect` (Zustand only if needed)
**Alternatives considered**: Zustand, Redux, Jotai
**Rationale**: The app has minimal state requirements (auth, inventory, detections, reservations). React Context is sufficient for auth, and `useState`/`useEffect` are adequate for page-level data. Zustand would add unnecessary complexity for this scope.

### Decision: Data Fetching
**Choice**: `useEffect` + `fetch` (with mock toggle)
**Alternatives considered**: React Query, SWR
**Rationale**: The app has simple data fetching needs (4 endpoints, no mutations). `useEffect` + `fetch` is lightweight and sufficient. A mock toggle (`VITE_API_BASE_URL`) allows seamless switching between mock and real API.

### Decision: Styling
**Choice**: Tailwind CSS
**Alternatives considered**: styled-components, CSS modules, vanilla CSS
**Rationale**: Tailwind provides rapid development, consistent theming (navy/teal), and utility-first styling without the overhead of CSS-in-JS. It integrates well with Framer Motion for animations.

### Decision: Routing
**Choice**: React Router v6
**Alternatives considered**: TanStack Router
**Rationale**: React Router v6 is the industry standard for React applications. It provides simple route protection (AuthGuard) and nested layouts, which are sufficient for this app.

### Decision: Mock Strategy
**Choice**: Static JSON files (`src/mocks/`)
**Alternatives considered**: MSW (Mock Service Worker), custom mock service
**Rationale**: Static JSON files are the simplest solution for this scope. They match the API contract exactly and require no additional dependencies or setup.

### Decision: Animation Library
**Choice**: Framer Motion
**Alternatives considered**: CSS transitions, React Spring
**Rationale**: Framer Motion provides declarative animations with minimal code. It integrates seamlessly with React and Tailwind, enabling micro-interactions (e.g., skeleton loaders, toast notifications) for visual polish.

## 3. Data Flow

### Auth Flow
```
LoginForm → POST /api/auth/login → AuthContext (token) → AuthGuard → Protected Routes
```

### Data Fetching Flow
```
Page Component → useEffect → fetch (mock/real) → useState → Render
```

### Shared State
```
AuthContext (JWT token)
│
├── Sidebar (active route)
├── Header (store name)
└── AuthGuard (route protection)
```

## 4. File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/mocks/auth.json` | New | Mock response for `POST /api/auth/login` |
| `src/mocks/inventory.json` | New | Mock response for `GET /api/stores/{storeId}/inventory` |
| `src/mocks/detections.json` | New | Mock response for `GET /api/stores/{storeId}/detections?limit=10` |
| `src/mocks/reservations.json` | New | Mock response for `GET /api/stores/{storeId}/reservations` |
| `src/context/AuthContext.tsx` | New | Auth state and token storage |
| `src/components/Card.tsx` | New | Reusable card component |
| `src/components/Button.tsx` | New | Reusable button component |
| `src/components/Badge.tsx` | New | Reusable badge component (status, camera) |
| `src/components/Skeleton.tsx` | New | Reusable skeleton loader |
| `src/components/Layout.tsx` | New | App layout (Sidebar + Header + content) |
| `src/pages/Login.tsx` | New | JWT login with split-screen design |
| `src/pages/Dashboard.tsx` | New | KPI cards and camera status |
| `src/pages/Inventory.tsx` | New | Inventory table |
| `src/pages/Cameras.tsx` | New | Detection history and camera status |
| `src/pages/Reservations.tsx` | New | Reservations list |
| `src/services/api.ts` | New | API client with fetch wrapper and mock toggle |
| `src/App.tsx` | New | Router setup with AuthGuard |
| `src/main.tsx` | Modify | Add AuthContext provider |
| `tailwind.config.js` | Modify | Navy/teal theme configuration |

## 5. Interfaces / Contracts

### Auth
```typescript
interface AuthState {
  token: string | null;
  storeId: string | null;
  storeName: string | null;
}

interface LoginResponse {
  token: string;
  storeId: string;
  storeName: string;
}
```

### Inventory
```typescript
interface InventoryItem {
  inventoryId: string;
  productName: string;
  stockQuantity: number;
  price: number;
  updatedAt: string; // ISO 8601
}

interface InventoryResponse {
  storeId: string;
  storeName: string;
  cameraStatus: 'online' | 'offline';
  lastSyncAt: string; // ISO 8601
  inventory: InventoryItem[];
}
```

### Detection
```typescript
interface DetectedProduct {
  producto: string;
  cantidad_estimada: number;
}

interface Detection {
  detectionId: string;
  createdAt: string; // ISO 8601
  detectedProducts: DetectedProduct[];
  rawImageUrl?: string;
}

interface DetectionsResponse {
  storeId: string;
  detections: Detection[];
}
```

### Reservation
```typescript
interface Reservation {
  reservationId: string;
  reservationCode: string;
  productName: string;
  userName: string;
  status: 'pending' | 'completed' | 'cancelled' | 'expired';
  expiresAt: string; // ISO 8601
}

interface ReservationsResponse {
  storeId: string;
  reservations: Reservation[];
}
```

## 6. Testing Strategy

| Layer | What to Test | Approach |
|-------|--------------|----------|
| Unit | Components (Card, Button, Badge, Skeleton) | Vitest + React Testing Library |
| Unit | AuthContext | Vitest + React Testing Library |
| Integration | API client (mock/real toggle) | Vitest + MSW (optional) |
| E2E | Login flow | Playwright (optional) |
| E2E | Navigation and data fetching | Playwright (optional) |

## 7. Migration / Rollout
No migration required. The merchant panel is a new project with no dependencies on existing systems.

## 8. Open Questions
- Should we implement a refresh token mechanism if the JWT expires during a session? (Current contract does not specify this.)
- Is there a need for real-time updates (e.g., WebSockets) for camera detections or reservations? (Current contract does not include this.)