import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import SuccessScreen from '../components/SuccessScreen';
import { AnimatePresence } from 'motion/react';

export default function EspejoMagico() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [emotion, setEmotion] = useState<string | null>(null);

  const emotions = [
    { id: 'feliz', emoji: '😊', label: 'Feliz', color: 'text-tertiary', border: 'border-tertiary/40', bg: 'bg-tertiary/10' },
    { id: 'triste', emoji: '😢', label: 'Triste', color: 'text-secondary', border: 'border-secondary/40', bg: 'bg-secondary/10' },
    { id: 'enojado', emoji: '😠', label: 'Enojado', color: 'text-error', border: 'border-error/40', bg: 'bg-error/10' },
    { id: 'asustado', emoji: '😨', label: 'Asustado', color: 'text-[#9c27b0]', border: 'border-[#9c27b0]/40', bg: 'bg-[#9c27b0]/10' },
  ];

  const handleEmotionSelect = (emotionType: string) => {
    setEmotion(emotionType);
    setTimeout(() => setShowSuccess(true), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface">
      <header className="w-full flex items-center justify-between mb-8 max-w-4xl mx-auto pt-2" role="banner">
        <NavigationButton to="/relacion" label="Volver a Relación" />
        <nav className="flex gap-2" aria-label="Navegación secundaria">
          <Link to="/selector-emociones" aria-label="Ir a selector de emociones" state={{ transitionType: 'push' }} className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-secondary focus:ring-4 focus:ring-secondary/50 outline-none">
            <span className="material-symbols-outlined" aria-hidden="true">mood</span>
          </Link>
          <Link to="/evolucion-planeta" aria-label="Ir a evolución de planeta" state={{ transitionType: 'push' }} className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-secondary focus:ring-4 focus:ring-secondary/50 outline-none">
            <span className="material-symbols-outlined" aria-hidden="true">public</span>
          </Link>
        </nav>
      </header>

      <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center" aria-label="Espejo mágico de emociones">

        {/* Espejo central */}
        <div className="w-72 h-96 bg-surface-container-low rounded-[40px] border-8 border-secondary-container relative flex items-center justify-center overflow-hidden mb-12">
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
           <div className="w-40 h-40 rounded-full border-4 border-dashed border-secondary/50 flex items-center justify-center">
             <span className="material-symbols-outlined text-6xl text-on-surface-variant" aria-hidden="true">face</span>
           </div>

           {/* Magic sparkles */}
           <span className="material-symbols-outlined absolute top-6 right-6 text-tertiary animate-pulse" aria-hidden="true">auto_awesome</span>
           <span className="material-symbols-outlined absolute bottom-12 left-6 text-tertiary animate-pulse" style={{ animationDelay: '0.5s' }} aria-hidden="true">auto_awesome</span>
        </div>

        <p className="mt-8 text-xl text-on-surface-variant font-medium text-center max-w-sm">Mírate en el espejo. ¿Cómo te sientes hoy?</p>

        {/* Botones de emociones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-10">
          {emotions.map((e) => (
            <button
              key={e.id}
              onClick={() => handleEmotionSelect(e.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 ${e.bg} ${e.border} bouncy-hover group transition-all`}
            >
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{e.emoji}</span>
              <span className={`font-bold ${e.color}`}>{e.label}</span>
            </button>
          ))}
        </div>

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