import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AvatarGuia({ mensaje = "¡Hola, Explorador!", subtitulo = "¿A qué planeta viajaremos hoy?" }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHideTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowTooltip(false), 5000);
  };

  useEffect(() => {
    startHideTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [mensaje]);

  const handleToggle = () => {
    if (!showTooltip) {
      setShowTooltip(true);
      startHideTimer();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      setShowTooltip(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 relative mr-12"
            role="status"
            aria-live="polite"
          >
            <div className="bg-surface-container-highest py-3 px-6 rounded-3xl border border-tertiary/30 text-on-surface shadow-xl backdrop-blur-sm whitespace-nowrap">
              <p className="font-headline font-bold text-lg">{mensaje}</p>
              {subtitulo && <p className="text-sm">{subtitulo}</p>}
            </div>
            <span className="absolute -bottom-3 right-8 border-8 border-transparent border-t-surface-container-highest" aria-hidden="true"></span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-label={showTooltip ? "Ocultar mensaje de la estrella guía" : "Mostrar mensaje de la estrella guía"}
        aria-expanded={showTooltip}
        className="relative flex items-center justify-center cursor-pointer bg-transparent border-none p-0 focus:ring-4 focus:ring-tertiary/50 rounded-full outline-none"
      >
        <img
          src="/personaje-epm.png"
          alt="Estrella Guía – Personaje asistente"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] animate-float"
        />
      </button>
    </div>
  );
}
