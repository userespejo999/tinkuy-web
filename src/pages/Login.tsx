import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

export const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex bg-[var(--bg-primary)]">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.08)_0%,transparent_60%)]" />
        
        <motion.div 
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-3xl p-8 md:p-10 border border-[var(--border-glass)] shadow-2xl">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">StockLink Vision</h1>
                <p className="text-sm text-[var(--text-muted)]">Panel de comerciantes</p>
              </div>
            </div>
            
            {error && (
              <motion.div 
                className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="emailOrPhone" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Correo o teléfono
                </label>
                <input
                  id="emailOrPhone"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] transition-all"
                  placeholder="admin@stocklink.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] transition-all pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-[var(--text-muted)]">
                Demo: admin@stocklink.com / password
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Branding */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.2)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(251,191,36,0.15)_0%,transparent_50%)]" />
        
        <motion.div 
          className="relative z-10 max-w-md mx-auto text-center flex flex-col justify-center px-12"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-2xl shadow-orange-500/40 flex items-center justify-center">
              <Sparkles size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Conecta tu tienda al mundo digital
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            StockLink Vision usa inteligencia artificial para gestionar tu inventario en tiempo real.
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">AI</div>
              <div className="text-xs text-gray-400 mt-1">Detección</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">24/7</div>
              <div className="text-xs text-gray-400 mt-1">Monitoreo</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">Real</div>
              <div className="text-xs text-gray-400 mt-1">Tiempo</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
