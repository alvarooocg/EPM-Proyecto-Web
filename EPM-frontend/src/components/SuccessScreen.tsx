import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface SuccessScreenProps {
  mensaje: string;
  onContinue: () => void;
}

export default function SuccessScreen({ mensaje, onContinue }: SuccessScreenProps) {
  const continueRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the continue button when the success screen appears
  useEffect(() => {
    continueRef.current?.focus();
  }, []);

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-surface/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Actividad completada con éxito"
    >
      <div
        className="w-full max-w-lg bg-surface-container-high rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl border border-outline-variant/30"
        role="alert"
        aria-live="assertive"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 relative"
        >
          {/* Confetti effect */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <motion.span animate={{ y: -60, x: -60, opacity: 0 }} transition={{ duration: 1 }} className="absolute text-2xl">✨</motion.span>
            <motion.span animate={{ y: -80, x: 20, opacity: 0 }} transition={{ duration: 1, delay: 0.1 }} className="absolute text-2xl">🎉</motion.span>
            <motion.span animate={{ y: -50, x: 70, opacity: 0 }} transition={{ duration: 1, delay: 0.2 }} className="absolute text-2xl">⭐</motion.span>
          </div>
          <img src="/personaje-epm.png" alt="Estrella Principal celebrando" className="w-40 h-40 object-contain drop-shadow-xl" />
        </motion.div>

        <h2 className="text-3xl font-headline font-bold text-primary mb-4">¡Felicidades!</h2>
        <p className="text-xl text-on-surface-variant font-medium mb-8">
          {mensaje}
        </p>

        <button
          ref={continueRef}
          onClick={onContinue}
          className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-xl bouncy-hover shadow-lg flex items-center gap-2 focus:ring-4 focus:ring-primary/50 outline-none"
        >
          Continuar
          <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
