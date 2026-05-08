import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import { useSessionProgress } from '../context/SessionProgressContext';
import { computeAchievements } from '../utils/achievements';

export default function LogrosGalacticos() {
  const { progress } = useSessionProgress();
  const logros = computeAchievements(progress);

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface relative">
      <header className="w-full flex items-center justify-between mb-8 max-w-4xl mx-auto z-10 relative pt-2" role="banner">
        <h1 className="font-headline font-bold text-3xl text-tertiary flex items-center gap-3">
          <span className="material-symbols-outlined text-4xl" aria-hidden="true">workspace_premium</span>
          Mis Logros Galácticos
        </h1>
        <Link to="/" state={{ transitionType: 'push_back' }} aria-label="Volver al inicio" className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface">
          <span className="material-symbols-outlined" aria-hidden="true">home</span>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto z-10 relative" aria-label="Lista de logros">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list">
            {logros.map((logro, index) => (
              <div 
                key={index}
                role="listitem"
                aria-label={`${logro.title}: ${logro.desc}${logro.unlocked ? ' – Desbloqueado' : ' – Bloqueado'}`}
                className={`bg-surface-container glass-panel rounded-3xl p-6 flex items-start gap-4 border ${logro.unlocked ? 'border-tertiary/30' : 'border-outline-variant/20 opacity-70 grayscale'}`}
              >
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${logro.bgColor}`} aria-hidden="true">
                    <span className={`material-symbols-outlined text-3xl ${logro.color}`}>{logro.icon}</span>
                 </div>
                 <div>
                    <h3 className="font-bold text-lg mb-1">{logro.title}</h3>
                    <p className="text-sm text-on-surface-variant">{logro.desc}</p>
                    
                    {logro.unlocked ? (
                      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-tertiary bg-tertiary/10 px-2 py-1 rounded-md w-fit">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">check_circle</span>
                        DESBLOQUEADO
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-md w-fit" aria-hidden="true">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        BLOQUEADO
                      </div>
                    )}
                 </div>
              </div>
            ))}
         </div>
      </main>
    </div>
  );
}
