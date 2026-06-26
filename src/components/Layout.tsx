import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Video, Calendar, Bell, Menu, X, Sun, Moon, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import { NotificationBell } from './NotificationBell';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const { storeName, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Inicio', icon: <Home size={20} />, disabled: false },
    { path: '/inventario', label: 'Inventario', icon: <Package size={20} />, disabled: false },
    { path: '/cameras', label: 'Cámaras', icon: <Video size={20} />, disabled: false },
    { path: '/reservas', label: 'Reservas', icon: <Calendar size={20} />, disabled: true },
    { path: '/notificaciones', label: 'Notificaciones', icon: <Bell size={20} />, disabled: false },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 w-72 h-full transform transition-transform duration-300 ease-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ background: 'var(--bg-sidebar)' }}
      >
        {/* Glass overlay on sidebar */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 to-transparent pointer-events-none" />
        
        <div className="relative p-6 border-b border-white/15">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c2410c] to-[#7c2d12] flex items-center justify-center shadow-lg shadow-black/20">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">StockLink</h1>
              <p className="text-xs text-orange-200/80 font-medium">Vision</p>
            </div>
          </div>
          <p className="text-sm text-white/60 mt-3 truncate">{storeName}</p>
        </div>

        <nav className="relative p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path && !item.disabled;
            if (item.disabled) {
              return (
                <div
                  key={item.path}
                  className="flex items-center space-x-3 p-3 rounded-xl opacity-35 cursor-not-allowed select-none"
                  title="Función premium — disponible próximamente"
                >
                  <span className="text-white/40">{item.icon}</span>
                  <span className="font-medium text-white/40">{item.label}</span>
                  <span className="ml-auto inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                    <Lock size={10} className="text-white/60" />
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">PRO</span>
                  </span>
                </div>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-white/20 text-white border border-white/25 shadow-lg shadow-black/10'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-lg shadow-white/30" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button onClick={logout} variant="secondary" className="w-full bg-white/10 hover:bg-white/15 text-white/90 border border-white/15">
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative bg-[var(--bg-primary)]">

        {/* Header */}
        <header className="sticky top-0 z-20 glass border-b border-[var(--border-subtle)] px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold gradient-text">
              {navItems.find((item) => item.path === pathname)?.label || 'Inicio'}
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl glass hover:shadow-glow transition-all duration-300"
                title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-[var(--text-secondary)]" />
                ) : (
                  <Sun size={20} className="text-orange-400" />
                )}
              </button>
              <NotificationBell />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="relative p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
