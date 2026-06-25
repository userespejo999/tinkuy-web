# StockLink Vision — Contrato Técnico (BD + API)
**Documento base para desacoplar a los 3 desarrolladores. Definido jueves 24, válido para todo el hackatón.**

Regla de oro: **nadie modifica este contrato sin avisar a los otros 2.** Si algo no calza durante la integración, se ajusta aquí primero, luego en el código.

---

## 1. Modelo de Base de Datos (PostgreSQL)

### Diagrama de entidades y relaciones

```
users ──┐
         │ 1:N
         ▼
reservations ──N:1──▶ inventory ──N:1──▶ products
                          │
                          │ N:1
                          ▼
                       stores ──1:N──▶ cameras ──1:N──▶ detections
```

### Tablas

#### `stores` (tiendas/comercios)
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR(150) | ej. "Tech Store Lince" |
| category | VARCHAR(50) | ferretería, farmacia, tecnología, etc. |
| address | VARCHAR(255) | |
| latitude | DOUBLE PRECISION | para búsqueda geolocalizada |
| longitude | DOUBLE PRECISION | |
| phone | VARCHAR(20) | |
| created_at | TIMESTAMP | default now() |

> Índice espacial recomendado: extensión `PostGIS` o, si no hay tiempo, cálculo de distancia por fórmula Haversine directo en la query SQL (más rápido de implementar en 2 días).

#### `cameras` (dispositivos de captura)
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| store_id | UUID FK → stores.id | |
| status | VARCHAR(20) | `online` / `offline` |
| last_sync_at | TIMESTAMP | se actualiza con cada detección |
| created_at | TIMESTAMP | default now() |

#### `products` (catálogo)
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR(150) | ej. "Cargador USB-C 65W" |
| category | VARCHAR(50) | |
| created_at | TIMESTAMP | default now() |

> Para el demo, este catálogo puede ser pequeño y curado a mano (10-15 productos), no necesita ser genérico. Así la IA solo tiene que reconocer ese set conocido.

#### `inventory` (stock por tienda — la tabla que la cámara actualiza)
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| store_id | UUID FK → stores.id | |
| product_id | UUID FK → products.id | |
| stock_quantity | INT | actualizado por IA o manual |
| price | NUMERIC(10,2) | |
| updated_at | TIMESTAMP | se actualiza con cada detección |

> Constraint único recomendado: `(store_id, product_id)` para evitar duplicados.

#### `detections` (historial de detecciones de IA — auditoría + efecto WOW)
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| camera_id | UUID FK → cameras.id | |
| raw_image_url | VARCHAR(500) | opcional, si guardan la imagen |
| detected_products | JSONB | resultado crudo de la IA, ej. `[{"producto":"Cargador USB-C 65W","cantidad_estimada":8}]` |
| created_at | TIMESTAMP | default now() |

> Esta tabla es clave para el pitch: pueden mostrar "aquí está el log de lo que la cámara detectó en cada captura" como prueba de que la IA realmente está funcionando.

#### `users` (clientes finales)
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR(150) | |
| phone | VARCHAR(20) | |
| created_at | TIMESTAMP | default now() |

> Para el demo, autenticación puede ser mínima (sin password real, o un mock de login). No es el foco del jurado.

#### `reservations` (reservas del cliente)
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users.id | |
| inventory_id | UUID FK → inventory.id | |
| reservation_code | VARCHAR(20) | ej. "SL-4821", mostrado al usuario |
| status | VARCHAR(20) | `pending` / `completed` / `cancelled` / `expired` |
| expires_at | TIMESTAMP | ej. now() + 30 min |
| created_at | TIMESTAMP | default now() |

---

## 2. Contrato de API (REST, JSON)

Base URL durante desarrollo: `http://localhost:5000/api`

Todos los endpoints devuelven JSON. Mientras el backend real no esté listo, **cada dev mockea estas mismas respuestas exactas** en su propia capa (archivo `.json` estático, `json-server`, o un mock en memoria).

---

### 2.1 — Consumidor: MOBILE (app del cliente)

#### `GET /api/products/search`
Busca productos disponibles cerca de una ubicación.

**Query params:** `q` (texto a buscar), `lat`, `lng`, `radiusKm` (opcional, default 5)

```http
GET /api/products/search?q=cargador&lat=-12.046&lng=-77.042&radiusKm=5
```

**Response 200:**
```json
{
  "query": "cargador",
  "results": [
    {
      "inventoryId": "8f14e3-uuid",
      "storeId": "a1b2c3-uuid",
      "storeName": "Tech Store Lince",
      "storeAddress": "Av. Arequipa 1234, Lince",
      "productId": "p001-uuid",
      "productName": "Cargador USB-C 65W",
      "stockQuantity": 8,
      "price": 45.00,
      "distanceMeters": 350,
      "lastUpdatedAt": "2026-06-25T18:02:00Z"
    },
    {
      "inventoryId": "9g25f4-uuid",
      "storeId": "d4e5f6-uuid",
      "storeName": "Multiservicios Perú",
      "storeAddress": "Jr. Lampa 567, Cercado",
      "productId": "p001-uuid",
      "productName": "Cargador USB-C 65W",
      "stockQuantity": 5,
      "price": 42.00,
      "distanceMeters": 700,
      "lastUpdatedAt": "2026-06-25T17:55:00Z"
    }
  ]
}
```

#### `POST /api/reservations`
Crea una reserva sobre un ítem de inventario específico.

**Request:**
```json
{
  "userId": "u001-uuid",
  "inventoryId": "8f14e3-uuid"
}
```

**Response 201:**
```json
{
  "reservationId": "r001-uuid",
  "reservationCode": "SL-4821",
  "status": "pending",
  "storeName": "Tech Store Lince",
  "storeAddress": "Av. Arequipa 1234, Lince",
  "productName": "Cargador USB-C 65W",
  "price": 45.00,
  "expiresAt": "2026-06-25T19:30:00Z"
}
```

**Posible error 409** (si el stock ya no está disponible al momento de reservar):
```json
{
  "error": "OUT_OF_STOCK",
  "message": "El producto ya no está disponible en esta tienda"
}
```

#### `GET /api/reservations/{id}`
Consulta el estado de una reserva (para la pantalla de confirmación).

**Response 200:** mismo shape que el `POST` anterior.

---

### 2.2 — Consumidor: WEB (panel del comercio)

#### `GET /api/stores/{storeId}/inventory`
Devuelve el inventario actual de una tienda (lo que ve el dueño en su dashboard).

**Response 200:**
```json
{
  "storeId": "a1b2c3-uuid",
  "storeName": "Tech Store Lince",
  "cameraStatus": "online",
  "lastSyncAt": "2026-06-25T18:02:00Z",
  "inventory": [
    {
      "inventoryId": "8f14e3-uuid",
      "productName": "Cargador USB-C 65W",
      "stockQuantity": 8,
      "price": 45.00,
      "updatedAt": "2026-06-25T18:02:00Z"
    },
    {
      "inventoryId": "8f14e4-uuid",
      "productName": "Foco LED 12W",
      "stockQuantity": 15,
      "price": 18.00,
      "updatedAt": "2026-06-25T18:02:00Z"
    }
  ]
}
```

#### `GET /api/stores/{storeId}/reservations`
Lista las reservas activas hechas sobre el inventario de esa tienda.

**Response 200:**
```json
{
  "storeId": "a1b2c3-uuid",
  "reservations": [
    {
      "reservationId": "r001-uuid",
      "reservationCode": "SL-4821",
      "productName": "Cargador USB-C 65W",
      "userName": "Carlos M.",
      "status": "pending",
      "expiresAt": "2026-06-25T19:30:00Z"
    }
  ]
}
```

#### `GET /api/stores/{storeId}/detections?limit=10`
Devuelve el historial reciente de detecciones de la cámara (para mostrar el "efecto WOW" en vivo durante el pitch).

**Response 200:**
```json
{
  "storeId": "a1b2c3-uuid",
  "detections": [
    {
      "detectionId": "det001-uuid",
      "createdAt": "2026-06-25T18:02:00Z",
      "detectedProducts": [
        { "producto": "Cargador USB-C 65W", "cantidad_estimada": 8 },
        { "producto": "Foco LED 12W", "cantidad_estimada": 15 }
      ]
    }
  ]
}
```

---

### 2.3 — Consumidor interno: BACKEND ↔ MÓDULO DE IA

Este es el contrato **entre el backend y la pieza de visión artificial** (puede ser una función interna del mismo backend, o un microservicio separado que llama a Gemini Vision). El dev de Backend+IA es responsable de ambos lados, pero conviene fijar este contrato igual para que pueda mockear el lado de IA mientras ajusta el prompt de Gemini.

#### `POST /api/internal/vision/detect`
Recibe una imagen de un anaquel y devuelve los productos detectados.

**Request:**
```json
{
  "cameraId": "cam001-uuid",
  "imageBase64": "<string base64 de la imagen>"
}
```

**Response 200:**
```json
{
  "cameraId": "cam001-uuid",
  "detectedProducts": [
    { "producto": "Cargador USB-C 65W", "cantidad_estimada": 8 },
    { "producto": "Foco LED 12W", "cantidad_estimada": 15 },
    { "producto": "Power Bank 10000mAh", "cantidad_estimada": 4 }
  ]
}
```

> Este JSON es exactamente el que se guarda en `detections.detected_products` y el que se usa para actualizar `inventory.stock_quantity` haciendo match por nombre de producto contra la tabla `products`.

---

## 3. Cómo se desacoplan los 3 con esto

- **Mobile** no necesita esperar al backend: crea un archivo `mock-search-response.json` y `mock-reservation-response.json` con exactamente los shapes de arriba, y construye toda la UI contra eso.
- **Web** hace lo mismo con `mock-inventory-response.json`, `mock-reservations-response.json` y `mock-detections-response.json`.
- **Backend+IA** construye el endpoint real de `/api/internal/vision/detect` primero probando con prompts a Gemini Vision, y en paralelo expone los endpoints `/api/products/search`, `/api/reservations`, `/api/stores/{id}/inventory`, etc. contra la base de datos real — sin esperar a que mobile o web tengan UI lista.

Cuando todos tengan su parte funcionando contra el mock, se hace el primer "enchufe" real: mobile y web cambian su URL base de mock a `http://localhost:5000/api` y prueban contra el backend real. Si algo no calza exactamente con este documento, se corrige aquí primero y luego en el código — nunca al revés.
