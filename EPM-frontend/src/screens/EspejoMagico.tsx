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
      <header className="w-full flex items-center justify-between mb-8 max-w-4xl mx-auto">
        <NavigationButton to="/relacion" label="Volver a Relación" />
        <div className="flex gap-2">
          <Link to="/selector-emociones" aria-label="Ir a selector de emociones" state={{ transitionType: 'push' }} className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-secondary">
            <span className="material-symbols-outlined">mood</span>
          </Link>
          <Link to="/evolucion-planeta" aria-label="Ir a evolución de planeta" state={{ transitionType: 'push' }} className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:text-secondary">
            <span className="material-symbols-outlined">public</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        
        {/* Espejo central */}
        <div className="relative w-64 h-80 md:w-80 md:h-[400px] mb-12">
          {/* Marco del espejo */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-[4rem] md:rounded-[5rem] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-4 border-yellow-200 flex items-center justify-center p-4">
            {/* Cristal del espejo */}
            <div className="w-full h-full bg-blue-50/80 rounded-[3rem] md:rounded-[4rem] border-2 border-blue-200/50 shadow-inner flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">

              {/* Brillos del espejo */}
              <div className="absolute -top-10 -left-10 w-32 h-64 bg-white/40 rotate-45 blur-md pointer-events-none"></div>

              {/* Reflejo (Emoción seleccionada o estado inicial) */}
              {emotion ? (
                <div className="text-8xl md:text-9xl animate-bouncy-spring drop-shadow-lg">
                  {emotions.find(e => e.id === emotion)?.emoji}
                </div>
              ) : (
                <div className="flex flex-col items-center text-on-surface-variant/40">
                  <span className="material-symbols-outlined text-6xl">face</span>
                  <p className="mt-2 font-medium">Tu reflejo</p>
                </div>
              )}
            </div>
          </div>
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

      <AnimatePresence>
        {showSuccess && (
          <SuccessScreen
            mensaje="¡Te has mirado al espejo y reconocido tu emoción!"
            onContinue={() => navigate('/relacion')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}