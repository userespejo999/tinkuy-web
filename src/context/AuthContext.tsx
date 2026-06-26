import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, LoginResponse } from '../types';
import { login as apiLogin } from '../services/api';

interface AuthContextType extends AuthState {
  login: (emailOrPhone: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem('stocklink-vision-token'),
    storeId: localStorage.getItem('stocklink-vision-store-id'),
    storeName: localStorage.getItem('stocklink-vision-store-name'),
  });

  const login = async (_emailOrPhone: string, _password: string) => {
    // MOCK LOGIN: no llama al backend, entra directo
    const mockResponse: LoginResponse = {
      token: 'demo-token',
      storeId: 'a820b85a-2248-48f4-b452-689cf8bfa566',
      storeName: 'Electro Miraflores',
    };
    localStorage.setItem('stocklink-vision-token', mockResponse.token);
    localStorage.setItem('stocklink-vision-store-id', mockResponse.storeId);
    localStorage.setItem('stocklink-vision-store-name', mockResponse.storeName);
    setAuthState({
      token: mockResponse.token,
      storeId: mockResponse.storeId,
      storeName: mockResponse.storeName,
    });
  };

  const logout = () => {
    localStorage.removeItem('stocklink-vision-token');
    localStorage.removeItem('stocklink-vision-store-id');
    localStorage.removeItem('stocklink-vision-store-name');
    setAuthState({ token: null, storeId: null, storeName: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};