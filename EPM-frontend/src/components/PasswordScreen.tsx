import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Stars } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PasswordScreenProps {
  onSuccess: () => void;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const CORRECT_PASSWORD = 'epm2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setError(false);
        onSuccess();
      } else {
        setError(true);
        setPassword('');
        setTimeout(() => setError(false), 2000);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#010113] overflow-hidden" role="dialog" aria-modal="true" aria-label="Pantalla de acceso al universo EPM">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Stars/Dust particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full bg-opacity-40"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-1px bg-gradient-to-b from-white/20 to-white/5 rounded-3xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] m-4"
      >
        <div className="bg-[#05051e]/80 p-8 md:p-12 rounded-[23px] flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 ring-1 ring-white/20"
          >
            <ShieldCheck className="w-10 h-10 text-white" aria-hidden="true" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight text-center">Acceso Galáctico</h1>
          <p className="text-zinc-400 text-center mb-10 text-sm md:text-base">
            Bienvenido explorador. Introduce la contraseña para entrar al universo EPM.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6" aria-label="Formulario de acceso">
            <div className="relative group">
              <label htmlFor="epm-password" className="sr-only">Contraseña de acceso</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" aria-hidden="true">
                <Lock className={`w-5 h-5 transition-colors duration-300 ${error ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-indigo-400'}`} aria-hidden="true" />
              </div>
              <input
                id="epm-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de acceso"
                disabled={loading}
                aria-invalid={error}
                aria-describedby={error ? 'password-error' : undefined}
                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-14 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg`}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !password}
                aria-label={loading ? 'Verificando contraseña...' : 'Entrar al universo EPM'}
                className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl transition-all flex items-center justify-center shadow-lg active:scale-95 focus:ring-4 focus:ring-indigo-500/50 outline-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                ) : (
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  id="password-error"
                  role="alert"
                  className="text-center text-sm font-medium text-red-400 flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                  Contraseña incorrecta, inténtalo de nuevo
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-12 flex items-center gap-2 text-zinc-600 text-xs uppercase tracking-widest font-semibold" aria-hidden="true">
            <Stars className="w-3 h-3" />
            <span>EPM 2026 OFFICIAL ACCESS</span>
            <Stars className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordScreen;
