# merchant-auth Specification

## Purpose
Provides JWT-based authentication for merchants using the StockLink Vision web panel. Enables secure login, token storage, and route protection without refresh token complexity.

## Requirements

### Requirement: JWT Login
The system MUST authenticate merchants using a JWT token returned by the `POST /api/auth/login` endpoint.

#### Scenario: Successful Login
- GIVEN valid credentials (username and password)
- WHEN the merchant submits the login form
- THEN the system MUST call `POST /api/auth/login` with the credentials
- AND store the returned JWT token in localStorage
- AND redirect to the Dashboard (Inicio) screen

#### Scenario: Failed Login
- GIVEN invalid credentials (username or password)
- WHEN the merchant submits the login form
- THEN the system MUST display an error message "Credenciales inválidas"
- AND NOT store any token in localStorage
- AND NOT redirect to any protected route

#### Scenario: Network Error During Login
- GIVEN a network error occurs during the login request
- WHEN the merchant submits the login form
- THEN the system MUST display an error message "Error de conexión. Inténtalo nuevamente."
- AND NOT store any token in localStorage

---

### Requirement: Token Storage
The system MUST store the JWT token in localStorage under the key `stocklink-vision-token`.

#### Scenario: Token Persistence
- GIVEN a JWT token is received after successful login
- WHEN the merchant refreshes the browser or closes and reopens it
- THEN the system MUST retain the token in localStorage
- AND allow access to protected routes without requiring re-login

#### Scenario: Token Absence
- GIVEN no JWT token exists in localStorage
- WHEN the merchant attempts to access a protected route
- THEN the system MUST redirect to the Login screen

---

### Requirement: AuthGuard
The system MUST protect all routes except `/login` by checking for the presence of a JWT token in localStorage.

#### Scenario: Protected Route Access with Token
- GIVEN a JWT token exists in localStorage
- WHEN the merchant navigates to any route other than `/login`
- THEN the system MUST allow access to the requested route

#### Scenario: Protected Route Access without Token
- GIVEN no JWT token exists in localStorage
- WHEN the merchant navigates to any route other than `/login`
- THEN the system MUST redirect to the Login screen

---

### Requirement: Mock Login
The system MUST support a mock login mode for development and demo purposes.

#### Scenario: Mock Login Toggle
- GIVEN the environment variable `VITE_API_BASE_URL` is set to a mock URL
- WHEN the merchant submits the login form with any non-empty credentials
- THEN the system MUST return a static JWT token
- AND store the token in localStorage
- AND redirect to the Dashboard (Inicio) screen

#### Scenario: Mock Login Error Simulation
- GIVEN the environment variable `VITE_API_BASE_URL` is set to a mock URL
- WHEN the merchant submits the login form with empty credentials
- THEN the system MUST simulate a failed login
- AND display an error message "Credenciales inválidas"