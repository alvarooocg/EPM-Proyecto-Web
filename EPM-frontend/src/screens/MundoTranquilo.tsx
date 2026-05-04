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
    <div className="min-h-screen w-full flex flex-col p-6 bg-[#0b1b36] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      <header className="w-full flex items-center justify-between mb-8 z-10 relative">
        <Link to="/me-relajo" state={{ transitionType: 'push_back' }} className="flex items-center gap-2 text-on-surface hover:text-primary bouncy-hover">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          <span className="font-medium">Volver</span>
        </Link>
        <div className="flex gap-4">
          <Link
            to="/evolucion-planeta"
            state={{ transitionType: 'push' }}
            aria-label="Ver evolución del planeta"
            className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-primary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">star</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center z-10 relative">
        <h1 className="font-headline font-bold text-4xl text-center mb-12 text-primary">Respira Conmigo</h1>

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

      <Link
        to="/me-relajo"
        state={{ transitionType: 'push_back' }}
        aria-label="Volver al inicio de la actividad"
        className="absolute bottom-8 left-8 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity"
      >
        <span className="material-symbols-outlined text-3xl" aria-hidden="true">home</span>
        <span className="text-xs">Inicio Actividad</span>
      </Link>
    </div>
  );
}
