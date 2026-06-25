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

  const login = async (emailOrPhone: string, password: string) => {
    const response: LoginResponse = await apiLogin(emailOrPhone, password);
    localStorage.setItem('stocklink-vision-token', response.token);
    localStorage.setItem('stocklink-vision-store-id', response.storeId);
    localStorage.setItem('stocklink-vision-store-name', response.storeName);
    setAuthState({
      token: response.token,
      storeId: response.storeId,
      storeName: response.storeName,
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