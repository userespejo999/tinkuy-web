# StockLink Vision — Frontend (Panel del Comercio)

> Panel web React para comerciantes. Consume la API REST del backend para mostrar inventario en tiempo real, estado de cámaras y reservas.

---

## Prerrequisitos

- [Node.js](https://nodejs.org/) v18+ (recomendado v20 LTS)
- npm (viene con Node.js)
- El backend corriendo (ver [SETUP.md del backend](https://github.com/tu-org/tinkuy-api/blob/main/SETUP.md))

Verifica tu instalación:
```bash
node -v   # Debe mostrar v18+ o v20+
npm -v    # Debe mostrar 9+
```

---

## 1. Clonar y entrar al proyecto

```bash
git clone <url-de-tu-repo-frontend>
cd Tinkuy-web
```

---

## 2. Instalar dependencias

```bash
npm install
```

Esto instala: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Recharts, React Router, Lucide React.

---

## 3. Configurar variables de entorno

El proyecto incluye un archivo `.env` preconfigurado. Revisa que esté así:

```bash
# Modo MOCK (desarrollo sin backend — usa datos estáticos)
VITE_API_BASE_URL=

# Modo REAL (cuando el backend esté listo)
# Descomenta la línea de abajo y comenta la de arriba
# VITE_API_BASE_URL=http://localhost:5124/api
```

> **Nota:** El backend del equipo corre en `http://localhost:5124`. Si tu backend usa otro puerto, cámbialo aquí.

---

## 4. Correr el proyecto

```bash
npm run dev
```

El panel levanta en **`http://localhost:3000`**.

---

## 5. Verificar que todo funciona

1. Abre `http://localhost:3000` en tu navegador
2. Debes ver la pantalla de **Login**
3. Ingresa cualquier correo y contraseña (modo mock acepta todo)
4. Debes entrar al **Dashboard** con datos de prueba
5. Navega por: **Inicio / Inventario / Cámaras / Reservas**

Si ves datos en todas las pantallas, el frontend está listo.

---

## 6. Conectar con el backend real

Cuando tu compañero del backend confirme que la API está corriendo:

1. Abre el archivo `.env`
2. Comenta la línea del mock:
   ```env
   # VITE_API_BASE_URL=
   ```
3. Descomenta la línea del backend:
   ```env
   VITE_API_BASE_URL=http://localhost:5124/api
   ```
4. **Reinicia** el servidor frontend (Ctrl+C, luego `npm run dev`)
5. Prueba el login con credenciales reales del backend

> **Importante:** Vite solo lee `.env` al arrancar. Siempre reinicia después de cambiar esta variable.

---

## Estructura de archivos clave

```
src/
├── mocks/              # Datos estáticos para desarrollo sin backend
│   ├── auth.json
│   ├── inventory.json
│   ├── detections.json
│   └── reservations.json
├── services/
│   └── api.ts          # Cliente HTTP + toggle mock/real
├── context/
│   └── AuthContext.tsx # JWT token + estado de sesión
├── components/         # Componentes reutilizables
│   ├── Layout.tsx      # Sidebar + Header + contenido
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── Badge.tsx
│   └── Skeleton.tsx
├── pages/              # Pantallas principales
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Inventory.tsx
│   ├── Cameras.tsx
│   └── Reservations.tsx
└── types/
    └── index.ts        # Interfaces TypeScript (coinciden con API contract)
```

---

## Referencia rápida de endpoints consumidos

| Método | Endpoint | Usado en pantalla |
|---|---|---|
| POST | `/api/auth/login` | Login |
| GET | `/api/stores/{storeId}/inventory` | Dashboard, Inventario, Cámaras |
| GET | `/api/stores/{storeId}/reservations` | Reservas |
| GET | `/api/stores/{storeId}/detections?limit=10` | Cámaras |

Contrato API completo: `PROMPT-BASE.md` en la raíz del proyecto.

---

## Comandos útiles

```bash
npm run dev      # Levantar servidor de desarrollo (localhost:3000)
npm run build    # Compilar para producción (genera dist/)
npm run preview  # Previsualizar build de producción
npm run lint     # Revisar código con ESLint
```

---

## Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| `Cannot find module` | Dependencias no instaladas | Corre `npm install` |
| Pantalla en blanco | Error de compilación | Revisa la terminal, corre `npm run dev` de nuevo |
| CORS error | Backend no acepta localhost:3000 | Pide a tu compañero del backend que habilite CORS para `http://localhost:3000` |
| Datos no cargan | `.env` apunta al backend caído | Verifica que el backend esté corriendo en el puerto correcto |
| Login no funciona | Token JWT expirado | Borra `localStorage` en DevTools → Application → Local Storage → Clear |
