import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { fetchInventory, fetchDetections } from '../services/api';
import { InventoryResponse, DetectionsResponse } from '../types';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

  // Prepare chart data
  const chartData = inventory?.inventory.map((item) => ({
    name: item.productName,
    stock: item.stockQuantity,
  })) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI Cards */}
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Productos totales</h3>
          {loading ? (
            <Skeleton className="h-8 w-20 mt-2" />
          ) : (
            <p className="text-2xl font-bold mt-1">{inventory?.inventory.length || 0}</p>
          )}
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Precio promedio</h3>
          {loading ? (
            <Skeleton className="h-8 w-20 mt-2" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              S/. {inventory ? (inventory.inventory.reduce((sum, item) => sum + item.price, 0) / inventory.inventory.length).toFixed(2) : '0.00'}
            </p>
          )}
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Última sincronización</h3>
          {loading ? (
            <Skeleton className="h-8 w-32 mt-2" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              {inventory?.lastSyncAt ? new Date(inventory.lastSyncAt).toLocaleString() : 'Nunca'}
            </p>
          )}
        </Card>
      </div>

      {/* Camera Status */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Estado de la cámara</h3>
        {loading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <Badge status={inventory?.cameraStatus || 'unknown'} />
        )}
      </Card>

      {/* Recent Inventory */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Inventario reciente</h3>
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
            {inventory?.inventory.slice(0, 3).map((item) => (
              <div key={item.inventoryId} className="flex justify-between items-center">
                <span className="font-medium">{item.productName}</span>
                <span className="text-gray-600">Stock: {item.stockQuantity}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Search Trends Chart */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Tendencias de búsqueda</h3>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={256}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#1ABC9C" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};