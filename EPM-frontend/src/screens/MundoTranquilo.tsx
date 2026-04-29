import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function MundoTranquilo() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-[#0b1b36] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      <header className="w-full flex items-center justify-between mb-8 z-10 relative">
        <Link to="/me-relajo" state={{ transitionType: 'push_back' }} className="flex items-center gap-2 text-on-surface hover:text-primary bouncy-hover">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-medium">Volver</span>
        </Link>
        <div className="flex gap-4">
          <Link to="/evolucion-planeta" aria-label="Ir a evolución de planeta" state={{ transitionType: 'push' }} className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-primary">
            <span className="material-symbols-outlined">star</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center z-10 relative">
        <h1 className="font-headline font-bold text-4xl text-center mb-12 text-primary">Respira Conmigo</h1>
        
        <div className="w-64 h-64 rounded-full border-2 border-primary/40 flex items-center justify-center relative ambient-glow-primary animate-pulse-glow">
          <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md">
            <span className="material-symbols-outlined text-6xl text-primary animate-float">air</span>
          </div>
        </div>

        <p className="mt-12 text-xl text-on-surface-variant font-medium">Inhala profundo...</p>
      </main>
      
      {/* Navigation button required by spec */}
      <Link to="/me-relajo" state={{ transitionType: 'push_back' }} className="absolute bottom-8 left-8 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
        <span className="material-symbols-outlined text-3xl">home</span>
        <span className="text-xs">Inicio Actividad</span>
      </Link>
    </div>
  );
}
