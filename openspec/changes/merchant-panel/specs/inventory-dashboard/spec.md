# inventory-dashboard Specification

## Purpose
Displays a read-only inventory dashboard for merchants, showing stock levels, prices, and camera status from the `GET /api/stores/{storeId}/inventory` endpoint.

## Requirements

### Requirement: Inventory Data Fetch
The system MUST fetch inventory data from `GET /api/stores/{storeId}/inventory` on page load.

#### Scenario: Successful Data Fetch
- GIVEN the merchant is authenticated and on the Dashboard (Inicio) or Inventario screen
- WHEN the page loads
- THEN the system MUST call `GET /api/stores/{storeId}/inventory`
- AND display the returned inventory data in KPI cards and the inventory table
- AND display the camera status (`cameraStatus`) and last sync time (`lastSyncAt`)

#### Scenario: Failed Data Fetch
- GIVEN the merchant is authenticated and on the Dashboard (Inicio) or Inventario screen
- WHEN the page loads and the API request fails
- THEN the system MUST display an error message "Error al cargar inventario. Inténtalo nuevamente."
- AND show skeleton loaders for KPI cards and the inventory table

---

### Requirement: KPI Cards Display
The system MUST display KPI cards summarizing inventory status.

#### Scenario: KPI Cards Rendering
- GIVEN inventory data is successfully fetched
- WHEN the Dashboard (Inicio) screen renders
- THEN the system MUST display the following KPI cards:
  - Total de productos en stock (sum of `stockQuantity` for all items)
  - Precio promedio (average of `price` for all items)
  - Última actualización (`lastSyncAt` in human-readable format)

#### Scenario: KPI Cards Loading State
- GIVEN the inventory data is being fetched
- WHEN the Dashboard (Inicio) screen is loading
- THEN the system MUST display skeleton loaders for all KPI cards

---

### Requirement: Inventory Table Display
The system MUST display a table of inventory items with stock levels and prices.

#### Scenario: Inventory Table Rendering
- GIVEN inventory data is successfully fetched
- WHEN the Inventario screen renders
- THEN the system MUST display a table with the following columns:
  - Producto (`productName`)
  - Stock (`stockQuantity`)
  - Precio (`price`)
  - Última actualización (`updatedAt` in human-readable format)

#### Scenario: Inventory Table Empty State
- GIVEN the inventory data is successfully fetched but contains no items
- WHEN the Inventario screen renders
- THEN the system MUST display a message "No hay productos en inventario."

#### Scenario: Inventory Table Loading State
- GIVEN the inventory data is being fetched
- WHEN the Inventario screen is loading
- THEN the system MUST display skeleton loaders for all table rows

---

### Requirement: Camera Status Display
The system MUST display the camera status and last sync time from the inventory endpoint.

#### Scenario: Camera Status Online
- GIVEN the `cameraStatus` field is `"online"`
- WHEN the Dashboard (Inicio) or Inventario screen renders
- THEN the system MUST display a green badge with the text "Cámara en línea"
- AND display the last sync time (`lastSyncAt` in human-readable format)

#### Scenario: Camera Status Offline
- GIVEN the `cameraStatus` field is `"offline"`
- WHEN the Dashboard (Inicio) or Inventario screen renders
- THEN the system MUST display a red badge with the text "Cámara fuera de línea"
- AND display the last sync time (`lastSyncAt` in human-readable format)

#### Scenario: Camera Status Unknown
- GIVEN the `cameraStatus` field is missing or invalid
- WHEN the Dashboard (Inicio) or Inventario screen renders
- THEN the system MUST display a gray badge with the text "Estado de cámara desconocido"