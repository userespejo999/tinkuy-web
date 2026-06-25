interface BadgeProps {
  status: 'online' | 'offline' | 'pending' | 'unknown' | 'completed' | 'cancelled' | 'expired';
  className?: string;
}

export const Badge = ({ status, className = '' }: BadgeProps) => {
  const statusClasses = {
    online: 'bg-green-100 text-green-800',
    offline: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    unknown: 'bg-gray-100 text-gray-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    expired: 'bg-orange-100 text-orange-800',
  };

  const statusText = {
    online: 'En línea',
    offline: 'Fuera de línea',
    pending: 'Pendiente',
    unknown: 'Desconocido',
    completed: 'Completado',
    cancelled: 'Cancelado',
    expired: 'Expirado',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]} ${className}`}>
      {statusText[status]}
    </span>
  );
};