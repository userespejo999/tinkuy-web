import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Cameras } from './pages/Cameras';
import { Reservations } from './pages/Reservations';
import { Notifications } from './pages/Notifications';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={(
            <AuthGuard>
              <Layout>
                <Dashboard />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          path="/inventario"
          element={(
            <AuthGuard>
              <Layout>
                <Inventory />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          path="/cameras"
          element={(
            <AuthGuard>
              <Layout>
                <Cameras />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          path="/reservas"
          element={(
            <AuthGuard>
              <Layout>
                <Reservations />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          path="/notificaciones"
          element={(
            <AuthGuard>
              <Layout>
                <Notifications />
              </Layout>
            </AuthGuard>
          )}
        />
      </Routes>
    </AuthProvider>
  );
}