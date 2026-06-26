import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { fetchReservations } from '../services/api';
import { ReservationsResponse } from '../types';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, Tag, Clock } from 'lucide-react';

export const Reservations = () => {
  const { storeId } = useAuth();
  const [reservations, setReservations] = useState<ReservationsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;
    const loadData = async () => {
      try {
        const data = await fetchReservations(storeId);
        setReservations(data);
      } catch (err) {
        console.error('Failed to fetch reservations:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [storeId]);

  return (
    <Card>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
          <Calendar size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Reservas</h2>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4">
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  <div className="flex items-center space-x-1"><Tag size={14}/><span>Código</span></div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Producto</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  <div className="flex items-center space-x-1"><User size={14}/><span>Cliente</span></div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  <div className="flex items-center space-x-1"><Clock size={14}/><span>Vencimiento</span></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations?.reservations.map((reservation, index) => (
                <motion.tr 
                  key={reservation.reservationId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[var(--border-subtle)]/50 hover:bg-[var(--accent-primary)]/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-mono font-semibold text-[var(--accent-primary)]">{reservation.reservationCode}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                        {reservation.productName.charAt(0)}
                      </div>
                      <span className="font-medium text-[var(--text-primary)]">{reservation.productName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[var(--text-secondary)]">{reservation.userName}</td>
                  <td className="py-4 px-4">
                    <Badge status={reservation.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-[var(--text-muted)]">
                    {new Date(reservation.expiresAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
