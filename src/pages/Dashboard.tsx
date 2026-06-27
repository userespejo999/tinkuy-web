import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import { fetchDashboard } from '../services/api';
import { DashboardData } from '../mocks/dashboard';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';
import {
  DollarSign, ShoppingCart, AlertTriangle, Camera,
  Package, Video, Calendar, Download, Lock, ArrowRight,
} from 'lucide-react';

// Animated counter hook
const useCountUp = (end: number, duration: number = 1200) => {
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
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const d = await fetchDashboard();
        setData(d);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const revenueAnimated = useCountUp(data?.todayRevenue || 0);
  const salesAnimated = useCountUp(data?.todaySales || 0);

  const topColors = ['#f97316', '#fb923c', '#fbbf24', '#fcd34d', '#fde68a'];

  const handleExport = () => {
    alert('Reporte exportado exitosamente 📄');
  };

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card delay={0}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Ingresos hoy</p>
              {loading ? <Skeleton className="h-10 w-28 mt-2" /> : (
                <motion.p
                  className="text-3xl font-bold gradient-text mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  S/. {revenueAnimated.toLocaleString()}
                </motion.p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </Card>

        <Card delay={0.1}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Ventas hoy</p>
              {loading ? <Skeleton className="h-10 w-20 mt-2" /> : (
                <motion.p
                  className="text-3xl font-bold text-[var(--text-primary)] mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {salesAnimated}
                </motion.p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30">
              <ShoppingCart size={24} className="text-white" />
            </div>
          </div>
        </Card>

        <Card delay={0.2}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Stock crítico</p>
              {loading ? <Skeleton className="h-10 w-16 mt-2" /> : (
                <motion.p
                  className="text-3xl font-bold text-red-400 mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {data?.criticalStockCount}
                </motion.p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </Card>

        <Card delay={0.3}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Cámara IA</p>
              {loading ? <Skeleton className="h-10 w-24 mt-2" /> : (
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold border border-green-500/30">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    En línea
                  </span>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{data?.lastCameraScan}</p>
                </div>
              )}
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
              <Camera size={24} className="text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card delay={0.4}>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Ingresos últimos 7 días</h3>
          {loading ? <Skeleton className="h-64 w-full" /> : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data?.revenueLast7Days}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--text-muted)' }} tickFormatter={(v) => `S/.${v}`} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                  }}
                  formatter={(value: number) => [`S/. ${value}`, 'Ingresos']}
                />
                <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card delay={0.5}>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Top 5 productos más vendidos</h3>
          {loading ? <Skeleton className="h-64 w-full" /> : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data?.topProducts} layout="vertical">
                <XAxis type="number" tick={{ fill: 'var(--text-muted)' }} />
                <YAxis dataKey="name" type="category" width={140} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'sold' ? `${value} unidades` : `S/. ${value}`,
                    name === 'sold' ? 'Vendidas' : 'Ingresos',
                  ]}
                />
                <Bar dataKey="sold" radius={[0, 8, 8, 0]}>
                  {data?.topProducts.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={topColors[index % topColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Alerts + Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Alerts */}
        <Card delay={0.6}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={18} className="text-red-400" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Alertas de stock</h3>
            </div>
            <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
              {data?.stockAlerts.length} productos
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {data?.stockAlerts.map((alert, index) => (
                <motion.div
                  key={alert.productName}
                  className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
                      {alert.productName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)] text-sm">{alert.productName}</p>
                      <p className="text-xs text-[var(--text-muted)]">Mínimo: {alert.threshold}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-400">{alert.currentStock} restantes</span>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card delay={0.7}>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Accesos rápidos</h3>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/inventario')}
              className="glass-hover p-4 rounded-xl border border-[var(--border-subtle)] text-left group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 w-fit mb-3 shadow-lg shadow-orange-500/20">
                <Package size={20} className="text-white" />
              </div>
              <p className="font-semibold text-[var(--text-primary)] text-sm">Inventario</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Ver stock completo</p>
              <ArrowRight size={14} className="text-[var(--accent-primary)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/cameras')}
              className="glass-hover p-4 rounded-xl border border-[var(--border-subtle)] text-left group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 w-fit mb-3 shadow-lg shadow-purple-500/20">
                <Video size={20} className="text-white" />
              </div>
              <p className="font-semibold text-[var(--text-primary)] text-sm">Cámaras</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Vista en tiempo real</p>
              <ArrowRight size={14} className="text-[var(--accent-primary)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => alert('Disponible en plan PRO 🔒')}
              className="glass-hover p-4 rounded-xl border border-[var(--border-subtle)] text-left group opacity-60"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 w-fit mb-3 shadow-lg shadow-blue-500/20 relative">
                <Calendar size={20} className="text-white" />
                <Lock size={10} className="absolute -top-1 -right-1 text-amber-400 bg-slate-900 rounded-full p-0.5" />
              </div>
              <p className="font-semibold text-[var(--text-primary)] text-sm">Reservas</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Gestión de reservas</p>
              <span className="inline-flex items-center mt-2 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] font-bold text-amber-400 uppercase">PRO</span>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              className="glass-hover p-4 rounded-xl border border-[var(--border-subtle)] text-left group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 w-fit mb-3 shadow-lg shadow-green-500/20">
                <Download size={20} className="text-white" />
              </div>
              <p className="font-semibold text-[var(--text-primary)] text-sm">Exportar</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Descargar reporte</p>
              <ArrowRight size={14} className="text-[var(--accent-primary)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </Card>
      </div>

      {/* Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card delay={0.8}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={18} className="text-[var(--accent-primary)]" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Últimas transacciones</h3>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {data?.recentTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)]/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                      {tx.productName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)] text-sm">{tx.productName}</p>
                      <p className="text-xs text-[var(--text-muted)]">{tx.id} · {tx.quantity} unid.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--accent-primary)] text-sm">S/. {tx.total.toFixed(2)}</p>
                    <p className="text-xs text-[var(--text-muted)]">{tx.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Detections */}
        <Card delay={0.9}>
          <div className="flex items-center space-x-2 mb-4">
            <Camera size={18} className="text-purple-400" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Últimas detecciones IA</h3>
          </div>
          <div className="space-y-3">
            <motion.div
              className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">Detección #det001</span>
                <span className="text-xs text-[var(--text-muted)]">Hace 5 min</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">La cámara detectó automáticamente:</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-[var(--text-primary)]">· Cargador USB-C 65W — <span className="font-semibold">8 unidades</span></p>
                <p className="text-sm text-[var(--text-primary)]">· Foco LED 12W — <span className="font-semibold">15 unidades</span></p>
              </div>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">Detección #det002</span>
                <span className="text-xs text-[var(--text-muted)]">Hace 37 min</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">La cámara detectó automáticamente:</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-[var(--text-primary)]">· Coca-Cola 500ml — <span className="font-semibold">50 unidades</span></p>
                <p className="text-sm text-[var(--text-primary)]">· Papas Lay&apos;s Original — <span className="font-semibold">30 unidades</span></p>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </div>
  );
};
