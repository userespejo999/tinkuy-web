import { useState } from 'react';
import { Bell, Check, ShoppingCart, AlertTriangle, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'reservation' | 'stock' | 'alert' | 'camera';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
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
];

const typeConfig = {
  reservation: { icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
  stock: { icon: Camera, color: 'bg-green-100 text-green-600' },
  alert: { icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  camera: { icon: Camera, color: 'bg-purple-100 text-purple-600' },
};

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Bell size={24} className="text-navy-500" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-teal-500 hover:text-teal-600 flex items-center space-x-1"
                >
                  <Check size={16} />
                  <span>Marcar todas</span>
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No hay notificaciones</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = typeConfig[notification.type].icon;
                  const colorClass = typeConfig[notification.type].color;

                  return (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.isRead ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-full ${colorClass} flex-shrink-0`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-800">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
