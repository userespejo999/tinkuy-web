import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Eye, EyeOff } from 'lucide-react';

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
          className="w-full max-w-xl relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-3xl p-12 md:p-14 border border-[var(--border-glass)] shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <img
                src="/images/logo-tinkuy.png"
                alt="Tinkuy"
                className="h-24 w-auto mb-4"
              />
              <h1 className="text-3xl font-bold gradient-text">Tinkuy</h1>
              <p className="text-base text-[var(--text-muted)] mt-1">Panel de comerciantes</p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="emailOrPhone" className="block text-base font-medium text-[var(--text-secondary)] mb-3">
                  Correo o teléfono
                </label>
                <input
                  id="emailOrPhone"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-5 py-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] transition-all"
                  placeholder="admin@tinkuy.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-base font-medium text-[var(--text-secondary)] mb-3">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] transition-all pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                Demo: admin@tinkuy.com / password
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Video only */}
      <div className="hidden lg:block w-5/12 relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/login-bg.mp4" type="video/mp4" />
        </video>

        {/* Bottom gradient for slogan readability */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent z-10" />

        {/* Slogan at bottom, aligned with character feet but not too low */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-start pb-20 pl-10 pr-8">
          <p className="text-white text-xl md:text-3xl font-bold text-left leading-snug drop-shadow-xl">
            Tu negocio merece crecer<br />
            <span className="text-amber-300">y el primer paso comienza aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
};
