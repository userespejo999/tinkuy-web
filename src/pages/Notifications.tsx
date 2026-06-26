import { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ShoppingCart, AlertTriangle, Camera, Check, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
  reservation: { icon: ShoppingCart, color: 'bg-blue-100 text-blue-600', label: 'Reserva' },
  stock: { icon: Camera, color: 'bg-green-100 text-green-600', label: 'Stock' },
  alert: { icon: AlertTriangle, color: 'bg-red-100 text-red-600', label: 'Alerta' },
  camera: { icon: Camera, color: 'bg-purple-100 text-purple-600', label: 'Cámara' },
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
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Total notificaciones</h3>
          <p className="text-2xl font-bold mt-1">{notifications.length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-500">No leídas</h3>
          <p className="text-2xl font-bold mt-1 text-red-500">{unreadCount}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Leídas</h3>
          <p className="text-2xl font-bold mt-1">{notifications.length - unreadCount}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'all' ? 'bg-navy-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'unread' ? 'bg-navy-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              No leídas {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
              >
                <Check size={16} />
                <span>Marcar todas como leídas</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} />
                <span>Limpiar todo</span>
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No hay notificaciones</p>
              <p className="text-sm mt-1">Las notificaciones aparecerán aquí cuando ocurran eventos</p>
            </div>
          </Card>
        ) : (
          filtered.map((notification) => {
            const Icon = typeConfig[notification.type].icon;
            const colorClass = typeConfig[notification.type].color;
            const typeLabel = typeConfig[notification.type].label;

            return (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={`${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${colorClass} flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                          <Badge status={notification.type === 'alert' ? 'offline' : notification.type === 'reservation' ? 'pending' : 'online'} />
                          <span className="text-xs text-gray-400">({typeLabel})</span>
                        </div>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium"
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
