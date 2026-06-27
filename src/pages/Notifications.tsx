import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ShoppingCart, AlertTriangle, Camera, Check, Trash2, Bell } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';

interface Notification {
  id: string;
  type: 'reservation' | 'stock' | 'alert' | 'camera';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'reservation',
    title: 'Nueva reserva',
    message: 'Carlos M. reservó Cargador USB-C 65W — Código: SL-4821',
    time: 'Hace 2 min',
    isRead: false,
  },
  {
    id: '2',
    type: 'camera',
    title: 'Stock actualizado',
    message: 'La cámara detectó 8 unidades de Foco LED 12W',
    time: 'Hace 5 min',
    isRead: false,
  },
  {
    id: '3',
    type: 'alert',
    title: 'Stock bajo',
    message: 'Power Bank 10000mAh solo tiene 2 unidades',
    time: 'Hace 15 min',
    isRead: false,
  },
  {
    id: '4',
    type: 'reservation',
    title: 'Reserva completada',
    message: 'Ana R. recogió su Foco LED 12W — Código: SL-4822',
    time: 'Hace 1 hora',
    isRead: true,
  },
  {
    id: '5',
    type: 'stock',
    title: 'Producto reabastecido',
    message: 'Cable HDMI 2m ahora tiene 15 unidades en stock',
    time: 'Hace 3 horas',
    isRead: true,
  },
];

const typeConfig = {
  reservation: { icon: ShoppingCart, gradient: 'from-blue-500 to-indigo-500', label: 'Reserva' },
  stock: { icon: Camera, gradient: 'from-green-500 to-emerald-500', label: 'Stock' },
  alert: { icon: AlertTriangle, gradient: 'from-red-500 to-orange-500', label: 'Alerta' },
  camera: { icon: Camera, gradient: 'from-purple-500 to-pink-500', label: 'Cámara' },
};

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'unread' 
    ? notifications.filter((n) => !n.isRead) 
    : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      <PageBanner title="Centro de notificaciones" subtitle="Mantente al día con tu negocio" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card delay={0}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Total notificaciones</p>
              <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{notifications.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30">
              <Bell size={24} className="text-white" />
            </div>
          </div>
        </Card>
        <Card delay={0.1}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">No leídas</p>
              <p className="text-3xl font-bold text-red-400 mt-1">{unreadCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </Card>
        <Card delay={0.2}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Leídas</p>
              <p className="text-3xl font-bold text-green-400 mt-1">{notifications.length - unreadCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
              <Check size={24} className="text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card delay={0.3}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'secondary'}
              onClick={() => setFilter('unread')}
            >
              No leídas {unreadCount > 0 && `(${unreadCount})`}
            </Button>
          </div>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button variant="ghost" onClick={markAllAsRead}>
                <Check size={16} className="mr-2" />
                Marcar todas
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" onClick={clearAll}>
                <Trash2 size={16} className="mr-2" />
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <div className="p-8 text-center">
              <Bell size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
              <p className="text-lg text-[var(--text-primary)] font-semibold">No hay notificaciones</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">Las notificaciones aparecerán aquí cuando ocurran eventos</p>
            </div>
          </Card>
        ) : (
          filtered.map((notification, index) => {
            const Icon = typeConfig[notification.type].icon;
            const gradient = typeConfig[notification.type].gradient;
            const typeLabel = typeConfig[notification.type].label;

            return (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`${!notification.isRead ? 'border-l-4 border-l-[var(--accent-primary)]' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-[var(--text-primary)]">{notification.title}</h3>
                          <Badge status={notification.type === 'alert' ? 'offline' : notification.type === 'reservation' ? 'pending' : 'online'} />
                          <span className="text-xs text-[var(--text-muted)]">({typeLabel})</span>
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">{notification.time}</span>
                      </div>
                      <p className="text-[var(--text-secondary)] mt-1">{notification.message}</p>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="mt-3 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] font-semibold transition-colors"
                        >
                          Marcar como leída
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
