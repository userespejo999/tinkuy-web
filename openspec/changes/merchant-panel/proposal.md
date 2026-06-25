# Proposal: StockLink Vision — Merchant Web Panel

## Intent

Build the merchant web panel (panel del comercio) for StockLink Vision. The frontend consumes the EXACT API contract defined in `PROMPT-BASE.md` — no extra endpoints, no deviated shapes. JWT login as specified by the team. Visual polish for the business jury, but strictly within the API contract boundaries to avoid friction with the backend developer.

## Scope

### In Scope
- JWT login with split-screen layout (credentials left, branding right) — uses ONLY the auth contract agreed with the backend team
- Dashboard (Inicio): KPI cards from `GET /api/stores/{storeId}/inventory`, camera status badge from same endpoint
- Inventario screen: inventory table from `GET /api/stores/{storeId}/inventory` with stock levels and prices
- Cámaras screen: detection history from `GET /api/stores/{storeId}/detections?limit=10`, camera status from inventory endpoint
- Reservas screen: reservation list from `GET /api/stores/{storeId}/reservations` with status display
- Mock-first: static JSON mocks matching PROMPT-BASE.md exact shapes — one-line toggle to real API
- Visual polish: navy/teal theme, Framer Motion micro-interactions, skeleton loaders, toast notifications

### Out of Scope
- Mobile consumer app (separate project, handled by teammate)
- Backend AI vision processing (handled by backend teammate, mocked at contract level)
- User registration or password reset flows (not in API contract)
- Store profile editing or camera registration (no endpoints in contract)
- Real payment or POS integration
- Any endpoint, field, or behavior NOT in `PROMPT-BASE.md`

## Capabilities

### New Capabilities
- `merchant-auth`: JWT login with split-screen design, token storage in localStorage. No refresh token complexity — the contract specifies minimal auth.
- `inventory-dashboard`: Read-only inventory view from `GET /api/stores/{storeId}/inventory`, KPI cards. No write operations.
- `camera-monitor`: Camera status from inventory endpoint (`cameraStatus`, `lastSyncAt`), detection history from `GET /api/stores/{storeId}/detections?limit=10`. Read-only.
- `reservation-manager`: List reservations from `GET /api/stores/{storeId}/reservations`. Display-only for the demo (no status update endpoint in contract).

### Modified Capabilities
- None

## Approach

- **Stack**: Vite + React + TypeScript, Tailwind CSS, Framer Motion, Lucide React icons, Recharts. Zustand ONLY if needed (start with React Context to avoid over-engineering).
- **Visual**: Navy `#2C3E50` primary, teal `#1ABC9C` accent, Inter/Poppins fonts, 8px grid, card-based layout with subtle shadows
- **Architecture**: `AppLayout` → `Sidebar` + `Header` + content area; reusable `Card`, `Button`, `Badge`, `Skeleton` components
- **Mock-first**: `src/mocks/` with static JSON matching API contract EXACTLY — same field names, same types, same nesting; toggle via `VITE_API_BASE_URL`
- **Routing**: React Router v6 with protected routes (simple AuthGuard — check token exists)
- **State**: React Context for auth (minimal). `useState` + `useEffect` for page data (keep it simple).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/mocks/` | New | Static JSON fixtures matching API contract exactly |
| `src/context/` | New | AuthContext (minimal JWT storage) |
| `src/components/` | New | Reusable: Card, Button, Badge, Skeleton, Layout |
| `src/pages/` | New | Login, Dashboard, Inventario, Cámaras, Reservas |
| `src/services/` | New | API client with fetch wrapper, mock toggle via env var |
| `src/App.tsx` | New | Router setup with simple AuthGuard |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| API contract drift between mock and real backend | Medium | STRICT rule: mock JSON field names/types match contract exactly; never add frontend-only fields |
| Adding frontend requirements that backend must implement | High | Review every feature against `PROMPT-BASE.md`; if no endpoint exists, it doesn't go in |
| JWT implementation mismatch | Low | Use simple token storage; backend decides expiry/refresh strategy |

## Rollback Plan

- Delete `src/` folder entirely — pure new build with no side effects
- Remove `openspec/changes/merchant-panel/` — no persistence touched
- No database migrations or backend changes required

## Dependencies

- Backend team: MUST implement endpoints exactly as specified in `PROMPT-BASE.md`
- Frontend team: MUST NOT request endpoints, fields, or behaviors outside the contract
- None blocking — mock-first means panel builds fully before backend integration

## Success Criteria

- [ ] Login screen renders with split-screen layout matching WEB_1.png
- [ ] Dashboard displays inventory cards from `GET /api/stores/{storeId}/inventory` with camera status
- [ ] Inventario page shows full inventory table matching API contract shape
- [ ] Cámaras page shows detection history from `GET /api/stores/{storeId}/detections?limit=10`
- [ ] Reservas page lists reservations from `GET /api/stores/{storeId}/reservations`
- [ ] All mock JSON shapes match `PROMPT-BASE.md` exactly (same field names, types, nesting)
- [ ] Toggle `VITE_API_BASE_URL` switches mock → real API seamlessly
- [ ] No frontend-only fields or endpoints required from backend