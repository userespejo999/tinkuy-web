interface BadgeProps {
  status: 'online' | 'offline' | 'pending' | 'unknown' | 'completed' | 'cancelled' | 'expired';
  className?: string;
}

export const Badge = ({ status, className = '' }: BadgeProps) => {
  const statusConfig = {
    online: { 
      bg: 'bg-green-500/20', 
      text: 'text-green-400', 
      border: 'border-green-500/30',
      label: 'En línea',
      pulse: true 
    },
    offline: { 
      bg: 'bg-red-500/20', 
      text: 'text-red-400', 
      border: 'border-red-500/30',
      label: 'Fuera de línea',
      pulse: false 
    },
    pending: { 
      bg: 'bg-amber-500/20', 
      text: 'text-amber-400', 
      border: 'border-amber-500/30',
      label: 'Pendiente',
      pulse: false 
    },
    unknown: { 
      bg: 'bg-gray-500/20', 
      text: 'text-gray-400', 
      border: 'border-gray-500/30',
      label: 'Desconocido',
      pulse: false 
    },
    completed: { 
      bg: 'bg-green-500/20', 
      text: 'text-green-400', 
      border: 'border-green-500/30',
      label: 'Completada',
      pulse: false 
    },
    cancelled: { 
      bg: 'bg-red-500/20', 
      text: 'text-red-400', 
      border: 'border-red-500/30',
      label: 'Cancelada',
      pulse: false 
    },
    expired: { 
      bg: 'bg-orange-500/20', 
      text: 'text-orange-400', 
      border: 'border-orange-500/30',
      label: 'Expirada',
      pulse: false 
    },
  };

  const config = statusConfig[status] || statusConfig.unknown;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${className}`}>
      {config.pulse && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      )}
      {config.label}
    </span>
  );
};
