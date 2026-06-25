const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('stocklink-vision-token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Mock toggle for development
export const isMock = !import.meta.env.VITE_API_BASE_URL;

export const login = async (emailOrPhone: string, password: string) => {
  if (isMock) {
    return await import('../mocks/auth.json').then(res => res.default);
  }
  return fetchWithAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ emailOrPhone, password }),
  });
};

export const fetchInventory = async (storeId: string) => {
  if (isMock) {
    return await import('../mocks/inventory.json').then(res => res.default);
  }
  return fetchWithAuth(`/stores/${storeId}/inventory`);
};

export const fetchDetections = async (storeId: string) => {
  if (isMock) {
    return await import('../mocks/detections.json').then(res => res.default);
  }
  return fetchWithAuth(`/stores/${storeId}/detections?limit=10`);
};

export const fetchReservations = async (storeId: string) => {
  if (isMock) {
    return await import('../mocks/reservations.json').then(res => res.default);
  }
  return fetchWithAuth(`/stores/${storeId}/reservations`);
};