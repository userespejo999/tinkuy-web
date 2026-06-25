import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { fetchDetections } from '../services/api';
import { DetectionsResponse } from '../types';

export const Cameras = () => {
  const [detections, setDetections] = useState<DetectionsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDetections('a1b2c3-uuid');
        setDetections(data);
      } catch (err) {
        console.error('Failed to fetch detections:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Camera Status */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Estado de la cámara</h2>
        {loading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <Badge status={detections?.detections.length ? 'online' : 'offline'} />
        )}
      </Card>

      {/* Detection History */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Historial de detecciones</h2>
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
            {detections?.detections.map((detection) => (
              <div key={detection.detectionId} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">
                    Detección #{detection.detectionId.slice(0, 8)}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(detection.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="space-y-1">
                  {detection.detectedProducts.map((product, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-sm text-gray-700">{product.producto}</span>
                      <span className="text-sm font-medium">Cantidad: {product.cantidad_estimada}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Camera Image Placeholder */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Vista en tiempo real</h2>
        <div className="bg-gray-100 rounded-md h-64 flex items-center justify-center">
          <p className="text-gray-500">Imagen de la cámara (placeholder)</p>
        </div>
      </Card>
    </div>
  );
};