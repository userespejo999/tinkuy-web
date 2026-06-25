export interface InventoryItem {
  inventoryId: string;
  productName: string;
  stockQuantity: number;
  price: number;
  updatedAt: string;
}

export interface InventoryResponse {
  storeId: string;
  storeName: string;
  cameraStatus: 'online' | 'offline';
  lastSyncAt: string;
  inventory: InventoryItem[];
}

export interface DetectedProduct {
  producto: string;
  cantidad_estimada: number;
}

export interface Detection {
  detectionId: string;
  createdAt: string;
  detectedProducts: DetectedProduct[];
  rawImageUrl?: string;
}

export interface DetectionsResponse {
  storeId: string;
  detections: Detection[];
}

export interface Reservation {
  reservationId: string;
  reservationCode: string;
  productName: string;
  userName: string;
  status: 'pending' | 'completed' | 'cancelled' | 'expired';
  expiresAt: string;
}

export interface ReservationsResponse {
  storeId: string;
  reservations: Reservation[];
}

export interface AuthState {
  token: string | null;
  storeId: string | null;
  storeName: string | null;
}

export interface LoginResponse {
  token: string;
  storeId: string;
  storeName: string;
}