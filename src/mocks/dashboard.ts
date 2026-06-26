export interface DailyRevenue {
  day: string;
  amount: number;
}

export interface TopProduct {
  name: string;
  sold: number;
  revenue: number;
}

export interface RecentTransaction {
  id: string;
  productName: string;
  quantity: number;
  total: number;
  time: string;
}

export interface StockAlert {
  productName: string;
  currentStock: number;
  threshold: number;
}

export interface DashboardData {
  todayRevenue: number;
  todaySales: number;
  criticalStockCount: number;
  cameraStatus: 'online' | 'offline';
  lastCameraScan: string;
  revenueLast7Days: DailyRevenue[];
  topProducts: TopProduct[];
  recentTransactions: RecentTransaction[];
  stockAlerts: StockAlert[];
}

export const dashboardMock: DashboardData = {
  todayRevenue: 1245.0,
  todaySales: 32,
  criticalStockCount: 4,
  cameraStatus: 'online',
  lastCameraScan: 'Hace 5 min',
  revenueLast7Days: [
    { day: 'Lun', amount: 890 },
    { day: 'Mar', amount: 1120 },
    { day: 'Mié', amount: 750 },
    { day: 'Jue', amount: 1340 },
    { day: 'Vie', amount: 1560 },
    { day: 'Sáb', amount: 1890 },
    { day: 'Dom', amount: 1245 },
  ],
  topProducts: [
    { name: 'Cargador USB-C 65W', sold: 48, revenue: 2160 },
    { name: 'Foco LED 12W', sold: 35, revenue: 630 },
    { name: 'Coca-Cola 500ml', sold: 120, revenue: 300 },
    { name: 'Hub USB 4 puertos', sold: 22, revenue: 660 },
    { name: 'Audífonos Bluetooth', sold: 18, revenue: 900 },
  ],
  recentTransactions: [
    { id: 'TX-4821', productName: 'Cargador USB-C 65W', quantity: 2, total: 90.0, time: '14:32' },
    { id: 'TX-4822', productName: 'Foco LED 12W', quantity: 3, total: 54.0, time: '14:15' },
    { id: 'TX-4823', productName: 'Coca-Cola 500ml', quantity: 6, total: 15.0, time: '13:58' },
    { id: 'TX-4824', productName: 'Hub USB 4 puertos', quantity: 1, total: 30.0, time: '13:42' },
    { id: 'TX-4825', productName: 'Audífonos Bluetooth', quantity: 1, total: 50.0, time: '13:20' },
    { id: 'TX-4826', productName: 'Papas Lay\'s Original', quantity: 4, total: 12.0, time: '12:55' },
  ],
  stockAlerts: [
    { productName: 'Cargador USB-C 65W', currentStock: 3, threshold: 5 },
    { productName: 'Hub USB 4 puertos', currentStock: 2, threshold: 5 },
    { productName: 'Audífonos Bluetooth', currentStock: 4, threshold: 8 },
    { productName: 'Jabón Dove', currentStock: 1, threshold: 5 },
  ],
};
