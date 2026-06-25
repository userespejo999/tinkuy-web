import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(emailOrPhone, password);
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-50">
        <Card className="w-full max-w-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-navy-500 mb-6">Iniciar sesión</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Correo o teléfono
              </label>
              <input
                id="emailOrPhone"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </form>
        </Card>
      </div>

      {/* Right: Branding */}
      <div className="hidden md:flex flex-1 bg-navy-500 text-white items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Conecta tu tienda al mundo digital</h2>
          <p className="text-lg text-gray-300">
            StockLink Vision usa inteligencia artificial para gestionar tu inventario en tiempo real.
          </p>
        </div>
      </div>
    </div>
  );
};