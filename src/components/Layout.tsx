import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Video, Calendar, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { NotificationBell } from './NotificationBell';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const { storeName, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Inicio', icon: <Home size={20} /> },
    { path: '/inventario', label: 'Inventario', icon: <Package size={20} /> },
    { path: '/cameras', label: 'Cámaras', icon: <Video size={20} /> },
    { path: '/reservas', label: 'Reservas', icon: <Calendar size={20} /> },
    { path: '/notificaciones', label: 'Notificaciones', icon: <Bell size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-navy-500 text-white rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 w-64 bg-navy-500 text-white h-full transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4 border-b border-navy-600">
          <h1 className="text-xl font-bold">StockLink Vision</h1>
          <p className="text-sm text-gray-300 mt-1">{storeName}</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-2 rounded-md ${isActive ? 'bg-navy-600' : 'hover:bg-navy-600'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button onClick={logout} variant="secondary" className="w-full">
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy-500">
            {navItems.find((item) => item.path === pathname)?.label || 'Inicio'}
          </h2>
          <NotificationBell />
        </header>
        {children}
      </main>
    </div>
  );
};