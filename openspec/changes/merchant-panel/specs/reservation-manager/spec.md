# reservation-manager Specification

## Purpose
Displays a list of reservations for merchants, enabling them to track pending, completed, cancelled, and expired reservations.

## Requirements

### Requirement: Reservations Fetch
The system MUST fetch reservations from `GET /api/stores/{storeId}/reservations` on page load.

#### Scenario: Successful Reservations Fetch
- GIVEN the merchant is authenticated and on the Reservas screen
- WHEN the page loads
- THEN the system MUST call `GET /api/stores/{storeId}/reservations`
- AND display the returned reservations in a list

#### Scenario: Failed Reservations Fetch
- GIVEN the merchant is authenticated and on the Reservas screen
- WHEN the page loads and the API request fails
- THEN the system MUST display an error message "Error al cargar reservas. Inténtalo nuevamente."
- AND show skeleton loaders for the reservations list

---

### Requirement: Reservations Display
The system MUST display a list of reservations with key details.

#### Scenario: Reservations Rendering
- GIVEN reservations are successfully fetched
- WHEN the Reservas screen renders
- THEN the system MUST display a list of reservations with the following details:
  - Código de reserva (`reservationCode`)
  - Producto (`productName`)
  - Cliente (`userName`)
  - Estado (`status` as a colored badge)
  - Vencimiento (`expiresAt` in human-readable format)

#### Scenario: Status Badges
- GIVEN a reservation with `status` field
- WHEN the Reservas screen renders
- THEN the system MUST display the following badges:
  - `pending`: Yellow badge with text "Pendiente"
  - `completed`: Green badge with text "Completada"
  - `cancelled`: Red badge with text "Cancelada"
  - `expired`: Gray badge with text "Expirada"
  - Invalid status: Gray badge with text "Desconocido"

#### Scenario: Reservations Empty State
- GIVEN the reservations are successfully fetched but contain no items
- WHEN the Reservas screen renders
- THEN the system MUST display a message "No hay reservas activas."

#### Scenario: Reservations Loading State
- GIVEN the reservations are being fetched
- WHEN the Reservas screen is loading
- THEN the system MUST display skeleton loaders for all reservation items