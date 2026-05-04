import { Link } from 'react-router-dom';

export default function EspejoMagico() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface relative overflow-hidden">
      <header className="w-full flex items-center justify-between mb-8 z-10 relative">
        <Link to="/relacion" state={{ transitionType: 'push_back' }} className="flex items-center gap-2 text-on-surface hover:text-secondary bouncy-hover">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          <span className="font-medium">Volver</span>
        </Link>
        <div className="flex gap-4">
          <Link
            to="/selector-emociones"
            state={{ transitionType: 'push' }}
            aria-label="Ir al selector de emociones"
            className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-secondary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">emoji_emotions</span>
          </Link>
          <Link
            to="/evolucion-planeta"
            state={{ transitionType: 'push' }}
            aria-label="Ver evolución del planeta"
            className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-secondary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">star</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center z-10 relative">
        <h1 className="font-headline font-bold text-4xl text-center mb-12 text-secondary">El Espejo Mágico</h1>

        <div className="w-72 h-96 bg-surface-container-low rounded-[40px] border-8 border-secondary-container relative flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
           <div className="w-40 h-40 rounded-full border-4 border-dashed border-secondary/50 flex items-center justify-center">
             <span className="material-symbols-outlined text-6xl text-on-surface-variant" aria-hidden="true">face</span>
           </div>

           {/* Magic sparkles */}
           <span className="material-symbols-outlined absolute top-6 right-6 text-tertiary animate-pulse" aria-hidden="true">auto_awesome</span>
           <span className="material-symbols-outlined absolute bottom-12 left-6 text-tertiary animate-pulse" style={{ animationDelay: '0.5s' }} aria-hidden="true">auto_awesome</span>
        </div>

        <p className="mt-8 text-xl text-on-surface-variant font-medium text-center max-w-sm">Mírate en el espejo. ¿Cómo te sientes hoy?</p>
      </main>

      <Link
        to="/relacion"
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
