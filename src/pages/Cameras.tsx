import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { fetchDetections } from '../services/api';
import { DetectionsResponse } from '../types';
import { useAuth } from '../context/AuthContext';
import { Camera, Eye, Hash, Package } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';

export const Cameras = () => {
  const { storeId } = useAuth();
  const [detections, setDetections] = useState<DetectionsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;
    const loadData = async () => {
      try {
        const data = await fetchDetections(storeId);
        setDetections(data);
      } catch (err) {
        console.error('Failed to fetch detections:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [storeId]);

  return (
    <div className="space-y-6">
      <PageBanner title="Monitoreo de cámaras" subtitle="Detección inteligente en tiempo real" />

      {/* Camera Status */}
      <Card delay={0}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
            <Camera size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Estado de la cámara</h2>
        </div>
        {loading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <Badge status={detections?.detections.length ? 'online' : 'offline'} />
        )}
      </Card>

      {/* Detection History */}
      <Card delay={0.1}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
            <Eye size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Historial de detecciones</h2>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {detections?.detections.map((detection, index) => (
              <motion.div 
                key={detection.detectionId} 
                className="border border-[var(--border-subtle)]/50 rounded-xl p-4 hover:border-[var(--accent-primary)]/30 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <Hash size={14} className="text-[var(--accent-primary)]" />
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      Detección #{detection.detectionId.slice(0, 8)}
                    </h3>
                  </div>
                  <span className="text-sm text-[var(--text-muted)]">
                    {new Date(detection.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  {detection.detectedProducts.map((product, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-[var(--bg-secondary)]">
                      <div className="flex items-center space-x-2">
                        <Package size={14} className="text-[var(--accent-primary)]" />
                        <span className="text-sm text-[var(--text-secondary)]">{product.producto}</span>
                      </div>
                      <span className="text-sm font-semibold text-[var(--accent-primary)]">Cantidad: {product.cantidad_estimada}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Camera Image Placeholder */}
      <Card delay={0.2}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
            <Camera size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Vista en tiempo real</h2>
        </div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl h-64 flex items-center justify-center overflow-hidden border border-[var(--border-subtle)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
          <div className="text-center z-10">
            <Camera size={48} className="mx-auto text-[var(--text-muted)] mb-3" />
            <p className="text-[var(--text-muted)] font-medium">Vista de cámara en vivo</p>
            <p className="text-xs text-[var(--text-muted)]/60 mt-1">Placeholder para stream RTSP/WebRTC</p>
          </div>
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
