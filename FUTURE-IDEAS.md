# StockLink Vision — Ideas Futuras (No Prioridad Demo)

> **ADVERTENCIA**: Todo lo listado aquí REQUIERE nuevos endpoints en el backend o cambios al contrato API (`PROMPT-BASE.md`). NO implementar sin acuerdo de los 3 desarrolladores.

---

## 1. Panel de Configuración del Comercio
- **settings-panel**: Editar perfil de tienda (nombre, dirección, teléfono, categoría)
- **camera-registration**: Registrar nuevas cámaras, asignarlas a pasillos/anaqueles
- Requiere: `PUT /api/stores/{storeId}`, `POST /api/cameras`, etc.

## 2. Gestión Avanzada de Reservas
- Cambiar estado de reserva (`pending` → `completed` / `cancelled`)
- Notificaciones push/email al cliente cuando la reserva esté lista
- Requiere: `PATCH /api/reservations/{id}`, servicio de notificaciones

## 3. Auto-Refresh de JWT
- Interceptor que detecta 401 y refresca el token automáticamente
- Requiere: endpoint `POST /api/auth/refresh` en el backend

## 4. Zustand para Estado Global
- Si el panel crece (más pantallas, más datos compartidos), migrar de React Context a Zustand
- Beneficio: menos re-renders, mejor performance con datos grandes

## 5. Hooks Personalizados Reutilizables
- `usePolling`: Polling genérico con debounce, exponential backoff, cleanup
- `useAuth`: Hook que encapsula login/logout/check de token
- `useInventory`: Hook con caché, invalidación, y optimistic updates

## 6. Alertas y Notificaciones Avanzadas
- Toast cuando el stock de un producto baja de umbral
- Alerta cuando la cámara pasa a `offline`
- Requiere: WebSockets o Server-Sent Events (SSE) del backend

## 7. Gráficos y Analíticas
- Tendencias de stock a lo largo del tiempo (línea de tiempo)
- Productos más reservados (top 10)
- Horarios pico de reservas
- Requiere: endpoints de reportes agregados en el backend

## 8. Modo Oscuro (Dark Mode)
- Toggle global de tema claro/oscuro
- Tailwind lo facilita con `dark:` variantes

## 9. Internacionalización (i18n)
- Soporte para español e inglés
- Librería recomendada: `react-i18next`

## 10. Gestión de Múltiples Tiendas
- Si un comerciante tiene más de una tienda, selector de tienda activa
- Requiere: `GET /api/user/stores`, relación user:stores en BD

## 11. Exportar Inventario
- Descargar inventario como CSV/Excel
- Requiere: `GET /api/stores/{storeId}/inventory/export`

## 12. Vista de Cámara en Tiempo Real (WebRTC/WS)
- Stream de video en vivo desde la Raspberry Pi
- Actualmente es solo imagen estática con overlay — esto sería en vivo
- Requiere: WebSocket server, WebRTC, o intervalos muy cortos de captura

---

## Regla de Oro para Ideas Futuras

**Antes de implementar CUALQUIERA de estas ideas:**
1. Revisar si el backend YA tiene el endpoint necesario
2. Si NO existe, proponerlo al equipo y actualizar `PROMPT-BASE.md` PRIMERO
3. Solo después de que los 3 estén de acuerdo, implementar en el frontend

> **La fricción entre frontend y backend se evita respetando el contrato.**
