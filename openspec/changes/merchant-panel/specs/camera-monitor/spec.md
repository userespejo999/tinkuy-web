# camera-monitor Specification

## Purpose
Displays camera status and detection history for merchants, enabling real-time monitoring of inventory updates via AI vision.

## Requirements

### Requirement: Camera Status Display
The system MUST display the camera status and last sync time from the `GET /api/stores/{storeId}/inventory` endpoint.

#### Scenario: Camera Status Online
- GIVEN the `cameraStatus` field is `"online"`
- WHEN the Cámaras screen renders
- THEN the system MUST display a green badge with the text "Cámara en línea"
- AND display the last sync time (`lastSyncAt` in human-readable format)

#### Scenario: Camera Status Offline
- GIVEN the `cameraStatus` field is `"offline"`
- WHEN the Cámaras screen renders
- THEN the system MUST display a red badge with the text "Cámara fuera de línea"
- AND display the last sync time (`lastSyncAt` in human-readable format)

#### Scenario: Camera Status Unknown
- GIVEN the `cameraStatus` field is missing or invalid
- WHEN the Cámaras screen renders
- THEN the system MUST display a gray badge with the text "Estado de cámara desconocido"

---

### Requirement: Detection History Fetch
The system MUST fetch detection history from `GET /api/stores/{storeId}/detections?limit=10` on page load.

#### Scenario: Successful Detection History Fetch
- GIVEN the merchant is authenticated and on the Cámaras screen
- WHEN the page loads
- THEN the system MUST call `GET /api/stores/{storeId}/detections?limit=10`
- AND display the returned detection history in a list

#### Scenario: Failed Detection History Fetch
- GIVEN the merchant is authenticated and on the Cámaras screen
- WHEN the page loads and the API request fails
- THEN the system MUST display an error message "Error al cargar historial de detecciones. Inténtalo nuevamente."
- AND show skeleton loaders for the detection history list

---

### Requirement: Detection History Display
The system MUST display the 10 most recent detections in a list.

#### Scenario: Detection History Rendering
- GIVEN detection history is successfully fetched
- WHEN the Cámaras screen renders
- THEN the system MUST display a list of detections with the following details:
  - Fecha y hora (`createdAt` in human-readable format)
  - Lista de productos detectados (`detectedProducts` array)
  - Cantidad estimada para cada producto

#### Scenario: Detection History Empty State
- GIVEN the detection history is successfully fetched but contains no items
- WHEN the Cámaras screen renders
- THEN the system MUST display a message "No hay detecciones recientes."

#### Scenario: Detection History Loading State
- GIVEN the detection history is being fetched
- WHEN the Cámaras screen is loading
- THEN the system MUST display skeleton loaders for all detection history items

---

### Requirement: Image with Bounding Boxes Overlay
The system MUST display an image with bounding boxes overlay for the most recent detection.

#### Scenario: Image with Bounding Boxes
- GIVEN detection history is successfully fetched and contains at least one detection
- WHEN the Cámaras screen renders
- THEN the system MUST display an image with bounding boxes overlay for the most recent detection
- AND label each bounding box with the product name and estimated quantity

#### Scenario: No Image Available
- GIVEN detection history is successfully fetched but no image is available (`rawImageUrl` is missing or invalid)
- WHEN the Cámaras screen renders
- THEN the system MUST display a placeholder message "Imagen no disponible."