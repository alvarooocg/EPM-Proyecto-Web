import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import SuccessScreen from '../components/SuccessScreen';
import { AnimatePresence } from 'motion/react';

const PHASES = [
  { label: 'Inhala...', duration: 4000, scale: 'scale-150' },
  { label: 'Aguanta...', duration: 2000, scale: 'scale-150' },
  { label: 'Exhala...', duration: 4000, scale: 'scale-100' },
  { label: 'Pausa...', duration: 2000, scale: 'scale-100' },
];

export default function MundoTranquilo() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const currentPhase = PHASES[phaseIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhaseIndex(prev => (prev + 1) % PHASES.length);
    }, currentPhase.duration);
    return () => clearTimeout(timer);
  }, [phaseIndex, currentPhase.duration]);

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface overflow-hidden">
      <header className="w-full flex items-center justify-between mb-8 z-10 pt-2" role="banner">
        <NavigationButton to="/me-relajo" label="Volver a Me Relajo" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full relative" aria-label="Ejercicio de respiración guiada">
        <div className="w-full max-w-xl mx-auto bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl p-4 mt-4 absolute top-0 z-20 backdrop-blur-sm">
          <p className="text-center text-on-surface-variant text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Para el tutor: Acompaña al niño a seguir el ritmo de la animación para realizar respiraciones profundas.
          </p>
        </div>

        {/* Círculo animado sincronizado con la fase de respiración */}
        <div
          aria-hidden="true"
          className={`w-64 h-64 rounded-full border-2 border-primary/40 flex items-center justify-center relative ambient-glow-primary transition-transform duration-1000 ease-in-out ${currentPhase.scale}`}
        >
          <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md">
            <span className="material-symbols-outlined text-6xl text-primary" aria-hidden="true">air</span>
          </div>
        </div>

        {/* Instrucción accesible — anunciada por el lector de pantalla al cambiar */}
        <p
          aria-live="assertive"
          aria-atomic="true"
          className="mt-12 text-xl text-on-surface-variant font-medium"
        >
          {currentPhase.label}
        </p>
      </main>

      {/* Decorative stars */}
      <div className="absolute top-1/4 left-1/4 text-primary/30 animate-pulse text-2xl" aria-hidden="true">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-secondary/30 animate-pulse delay-700 text-3xl" aria-hidden="true">✨</div>

      <AnimatePresence>
        {showSuccess && (
          <SuccessScreen
            mensaje="¡Lo lograste! Ahora tu cuerpo y tu mente están mucho más tranquilos."
            onContinue={() => navigate('/me-relajo')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
