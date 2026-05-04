import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function EvolucionPlaneta() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface relative overflow-hidden">
       {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <header className="w-full flex items-center justify-between mb-8 z-10 relative pt-2" role="banner">
        <h1 className="font-headline font-bold text-2xl">Evolución por Planeta</h1>
        <NavigationButton to="/" label="Volver a El Universo" />
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-12 z-10 relative" aria-label="Progreso del Planeta Relación">
        <div className="w-full flex flex-col lg:flex-row items-center gap-12">
            
            {/* Visual Planet Status */}
            <div className="flex-1 flex flex-col items-center">
               <div className="w-64 h-64 rounded-full border-4 border-secondary/50 flex items-center justify-center relative ambient-glow-secondary bg-gradient-to-br from-secondary-container to-surface">
                 <span className="material-symbols-outlined text-8xl text-secondary animate-pulse-glow">diversity_3</span>
                 {/* Progress ring around planet */}
                 <svg viewBox="0 0 36 36" className="circular-chart absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] transform -rotate-90">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle stroke-secondary"
                      strokeDasharray="75, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                 </svg>
               </div>
               <h2 className="font-headline font-bold text-3xl mt-8">Planeta Relación</h2>
               <p className="text-secondary font-medium">Nivel 3 - Conectado</p>
            </div>

            {/* Stats list */}
            <div className="flex-1 w-full space-y-4">
              <div className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                     <span className="material-symbols-outlined">schedule</span>
                   </div>
                   <div>
                     <p className="text-sm text-on-surface-variant">Tiempo Invertido</p>
                     <p className="font-bold text-xl">12h 45m</p>
                   </div>
                 </div>
              </div>

              <div className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-tertiary/20 text-tertiary flex items-center justify-center">
                     <span className="material-symbols-outlined">emoji_emotions</span>
                   </div>
                   <div>
                     <p className="text-sm text-on-surface-variant">Actividades Completadas</p>
                     <p className="font-bold text-xl">24</p>
                   </div>
                 </div>
              </div>
              
              <div className="flex pt-4 gap-4">
                {/* Links requested in Navigation Spec */}
                <Link to="/dashboard" state={{ transitionType: 'none' }} className="flex-1 items-center justify-center text-center bg-primary text-on-primary py-3 rounded-xl font-medium bouncy-hover inline-flex gap-2">
                   <span className="material-symbols-outlined text-sm">pie_chart</span>
                   <span>Resumen Diario</span>
                </Link>
                 <Link to="/configuracion" aria-label="Ir a configuración" state={{ transitionType: 'none' }} className="w-12 items-center justify-center flex bg-surface-container-highest border border-outline-variant/50 rounded-xl bouncy-hover text-on-surface">
                   <span className="material-symbols-outlined">settings</span>
                </Link>
                 <Link to="/logros" aria-label="Ver logros" state={{ transitionType: 'none' }} className="w-12 items-center justify-center flex bg-surface-container-highest border border-outline-variant/50 rounded-xl bouncy-hover text-on-surface text-tertiary">
                   <span className="material-symbols-outlined">emoji_events</span>
                </Link>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
