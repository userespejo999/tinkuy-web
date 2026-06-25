# StockLink API — Guía de setup rápido

## Prerequisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/) corriendo en `localhost:5432`
- `dotnet-ef` instalado globalmente:
  ```bash
  dotnet tool install --global dotnet-ef
  ```

---

## 1. Clonar y entrar al proyecto

```bash
git clone <url-del-repo>
cd TinkuyAPI/StockLinkApi
```

---

## 2. Crear la base de datos

En psql o pgAdmin:
```sql
CREATE DATABASE stocklink_db;
\c stocklink_db
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

---

## 3. Crear `appsettings.Development.json`

Este archivo **no está en el repo** (tiene credenciales). Créalo manualmente en `StockLinkApi/`:

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=stocklink_db;Username=postgres;Password=TU_PASSWORD"
  },
  "GeminiApiKey": "TU_API_KEY",
  "UseMockVision": true
}
```

> `UseMockVision: true` → no necesita API key de Gemini para correr.  
> `UseMockVision: false` → usa Gemini real. API key en [aistudio.google.com/apikey](https://aistudio.google.com/apikey) (gratis).

---

## 4. Aplicar migraciones

```bash
dotnet ef database update
```

---

## 5. Correr el proyecto

```bash
dotnet run
```

El servidor levanta en **`http://localhost:5124`**.  
Al iniciar carga automáticamente datos de prueba (3 tiendas, 12 productos, inventario).

---

## 6. Verificar que todo funciona

```bash
# Desde la raíz del repo (TinkuyAPI/)
powershell -ExecutionPolicy Bypass -File .\validate-endpoints.ps1
```

Debe mostrar **12/12 PASS**.

---

## Referencia rápida de endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/products/search?q=cargador&lat=-12.08&lng=-77.03` | Buscar productos |
| GET | `/api/stores/{storeId}/inventory` | Inventario de tienda |
| POST | `/api/reservations` | Crear reserva |
| GET | `/api/reservations/{id}` | Ver reserva |
| GET | `/api/stores/{storeId}/reservations` | Reservas de tienda |
| GET | `/api/stores/{storeId}/detections` | Detecciones de cámara |
| POST | `/api/internal/vision/detect` | Detectar productos con IA |

Documentación completa: `API-Docs.md`  
Colección Postman: importa `StockLink.postman_collection.json`
