import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { fetchInventory, fetchDetections } from '../services/api';
import { InventoryResponse, DetectionsResponse } from '../types';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Package, TrendingUp, Clock, Camera } from 'lucide-react';

// Animated counter hook
const useCountUp = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (end === 0) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return count;
};

export const Dashboard = () => {
  const { storeId } = useAuth();
  const [inventory, setInventory] = useState<InventoryResponse | null>(null);
  const [detections, setDetections] = useState<DetectionsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;
    const loadData = async () => {
      try {
        const [inventoryData, detectionsData] = await Promise.all([
          fetchInventory(storeId),
          fetchDetections(storeId),
        ]);
        setInventory(inventoryData);
        setDetections(detectionsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [storeId]);

  const totalProducts = inventory?.inventory.length || 0;
  const avgPrice = inventory ? inventory.inventory.reduce((sum, item) => sum + item.price, 0) / inventory.inventory.length : 0;
  
  const animatedTotal = useCountUp(totalProducts);
  const animatedAvg = useCountUp(Math.floor(avgPrice));

  const chartData = inventory?.inventory.map((item) => ({
    name: item.productName,
    stock: item.stockQuantity,
  })) || [];

  const barColors = ['#f97316', '#fbbf24', '#fb923c', '#fcd34d', '#ea580c', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card delay={0}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Productos totales</p>
              {loading ? (
                <Skeleton className="h-10 w-24 mt-2" />
              ) : (
                <motion.p 
                  className="text-3xl font-bold text-[var(--text-primary)] mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {animatedTotal}
                </motion.p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </Card>
        
        <Card delay={0.1}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Precio promedio</p>
              {loading ? (
                <Skeleton className="h-10 w-24 mt-2" />
              ) : (
                <motion.p 
                  className="text-3xl font-bold gradient-text mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  S/. {animatedAvg}
                </motion.p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </Card>
        
        <Card delay={0.2}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Última sincronización</p>
              {loading ? (
                <Skeleton className="h-10 w-32 mt-2" />
              ) : (
                <p className="text-lg font-semibold text-[var(--text-primary)] mt-1">
                  {inventory?.lastSyncAt 
                    ? new Date(inventory.lastSyncAt).toLocaleTimeString() 
                    : 'Nunca'}
                </p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Camera Status */}
      <Card delay={0.3}>
        <div className="flex items-center space-x-3 mb-4">
          <Camera size={20} className="text-[var(--accent-primary)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Estado de la cámara</h3>
        </div>
        {loading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <Badge status={inventory?.cameraStatus || 'unknown'} />
        )}
      </Card>

      {/* Recent Inventory */}
      <Card delay={0.4}>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Inventario reciente</h3>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {inventory?.inventory.slice(0, 5).map((item, index) => (
              <motion.div 
                key={item.inventoryId} 
                className="flex justify-between items-center p-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)]/5 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                    {item.productName.charAt(0)}
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">{item.productName}</span>
                </div>
                <span className="text-[var(--accent-primary)] font-semibold">Stock: {item.stockQuantity}</span>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Search Trends Chart */}
      <Card delay={0.5}>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Tendencias de stock</h3>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: 'var(--text-muted)' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Bar dataKey="stock" radius={[8, 8, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};
