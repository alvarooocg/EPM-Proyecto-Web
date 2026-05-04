import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function LogrosGalacticos() {
  const logros = [
    { title: 'Primer Contacto', desc: 'Visitaste el primer planeta.', icon: 'rocket_launch', color: 'text-tertiary', bgColor: 'bg-tertiary/20', unlocked: true },
    { title: 'Buscador de Paz', desc: 'Completaste 5 actividades en el Planeta Calma.', icon: 'self_improvement', color: 'text-primary', bgColor: 'bg-primary/20', unlocked: true },
    { title: 'Maestro de Emociones', desc: 'Reconociste 10 emociones.', icon: 'sentiment_satisfied', color: 'text-secondary', bgColor: 'bg-secondary/20', unlocked: true },
    { title: 'Viajero Frecuente', desc: 'Jugaste por 7 días seguidos.', icon: 'military_tech', color: 'text-tertiary', bgColor: 'bg-tertiary/20', unlocked: false },
    { title: 'Guardián del Secreto', desc: 'Usaste la Maleta Mágica 3 veces.', icon: 'luggage', color: 'text-primary', bgColor: 'bg-primary/20', unlocked: false },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface relative">
      <header className="w-full flex items-center justify-between mb-8 max-w-4xl mx-auto z-10 relative">
        <h1 className="font-headline font-bold text-3xl text-tertiary flex items-center gap-3">
          <span className="material-symbols-outlined text-4xl">workspace_premium</span>
          Mis Logros Galácticos
        </h1>
        <NavigationButton to="/" label="Volver a El Universo" />
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto z-10 relative">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {logros.map((logro, index) => (
              <div 
                key={index} 
                className={`bg-surface-container glass-panel rounded-3xl p-6 flex items-start gap-4 border ${logro.unlocked ? 'border-tertiary/30' : 'border-outline-variant/20 opacity-60 grayscale'}`}
              >
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${logro.bgColor}`}>
                    <span className={`material-symbols-outlined text-3xl ${logro.color}`}>{logro.icon}</span>
                 </div>
                 <div>
                    <h3 className="font-bold text-lg mb-1">{logro.title}</h3>
                    <p className="text-sm text-on-surface-variant">{logro.desc}</p>
                    
                    {!logro.unlocked && (
                      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-md w-fit">
                        <span className="material-symbols-outlined text-sm">lock</span> BLOQUEADO
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
