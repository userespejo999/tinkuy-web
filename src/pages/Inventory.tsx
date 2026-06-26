import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Skeleton } from '../components/Skeleton';
import { fetchInventory } from '../services/api';
import { InventoryResponse } from '../types';
import { useAuth } from '../context/AuthContext';
import { Package, AlertTriangle, CheckCircle, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

export const Inventory = () => {
  const { storeId } = useAuth();
  const [inventory, setInventory] = useState<InventoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;
    const loadData = async () => {
      try {
        const data = await fetchInventory(storeId);
        setInventory(data);
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [storeId]);

  const getStockStatus = (quantity: number) => {
    if (quantity <= 3) return { color: 'text-red-400', icon: AlertTriangle, label: 'Crítico' };
    if (quantity <= 8) return { color: 'text-amber-400', icon: AlertTriangle, label: 'Bajo' };
    return { color: 'text-green-400', icon: CheckCircle, label: 'OK' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <Package size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Inventario completo</h2>
          </div>
          <button
            onClick={() => {}}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all opacity-60 cursor-not-allowed"
            title="Demo: funcionalidad no implementada"
          >
            <Plus size={18} />
            <span>Agregar producto</span>
          </button>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Producto</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Precio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Actualizado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventory?.inventory.map((item, index) => {
                  const status = getStockStatus(item.stockQuantity);
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.tr 
                      key={item.inventoryId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[var(--border-subtle)]/50 hover:bg-[var(--accent-primary)]/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                            {item.productName.charAt(0)}
                          </div>
                          <span className="font-medium text-[var(--text-primary)]">{item.productName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-bold ${status.color}`}>{item.stockQuantity}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-[var(--accent-primary)]">S/. {item.price.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 text-xs font-medium ${status.color}`}>
                          <StatusIcon size={14} />
                          <span>{status.label}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-[var(--text-muted)]">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => {}}
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors cursor-not-allowed opacity-50"
                            title="Ver detalle"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {}}
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-not-allowed opacity-50"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => {}}
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-not-allowed opacity-50"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
