import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';

// Type definitions for Activity states
type ActivityMode = 'menu' | 'activity1' | 'activity2';

// --- Activity 1 Component: ¿Qué siente mi amigo? ---
function QueSienteMiAmigo({ onBack }: { onBack: () => void }) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // The target emotion is sad
  const targetEmotion = 'triste';
  const friendFace = "😢";
  
  const options = [
    { id: 'contento', emoji: '😀', label: 'Contento' },
    { id: 'triste', emoji: '😢', label: 'Triste' },
    { id: 'enfadado', emoji: '😠', label: 'Enfadado' },
    { id: 'sorprendido', emoji: '😲', label: 'Sorprendido' }
  ];

  const handleSelect = (id: string) => {
    setSelectedEmotion(id);
    setShowFeedback(true);
    if (id === targetEmotion) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
      // Automatically hide feedback after a delay if incorrect
      setTimeout(() => setShowFeedback(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-on-surface-variant hover:text-secondary drop-shadow-sm font-medium">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Menú
        </button>
        <h2 className="text-2xl font-headline font-bold text-secondary">¿Qué siente mi amigo?</h2>
      </div>

      <div className="bg-surface-container glass-panel rounded-3xl p-8 border border-outline-variant/30 flex flex-col items-center text-center w-full relative overflow-hidden shadow-sm">
        
        <p className="text-lg md:text-xl text-on-surface mb-8 font-medium">
          Observa a nuestro amigo astronauta. ¿Cómo crees que se siente hoy?
        </p>

        {/* Character with looping animation */}
        <motion.div 
          className="text-8xl md:text-9xl mb-12 drop-shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {friendFace}
        </motion.div>

        {/* Emotion Options */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !isSuccess && handleSelect(opt.id)}
              disabled={showFeedback && isSuccess}
              className={clsx(
                "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 bouncy-hover bg-background",
                selectedEmotion === opt.id && showFeedback
                  ? (isSuccess ? "border-green-500 bg-green-50 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-red-400 bg-red-50")
                  : "border-outline-variant/50 hover:border-secondary/50 hover:bg-secondary/10 shadow-sm"
              )}
            >
              <span className="text-5xl">{opt.emoji}</span>
              <span className="font-bold text-lg text-on-surface">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-surface/80 backdrop-blur-sm rounded-3xl"
            >
              {isSuccess ? (
                <div className="bg-green-100 p-8 rounded-3xl border-2 border-green-500 shadow-xl flex flex-col items-center text-center">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <img src="/personaje-epm.png" alt="Estrella" className="w-32 h-32 object-contain drop-shadow-md mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">¡Lo lograste!</h3>
                  <p className="text-green-800 font-medium">Has reconocido que tu amigo está triste. ¡Eres muy empático!</p>
                  <button onClick={onBack} className="mt-6 px-8 py-3 bg-green-500 text-white rounded-full font-bold text-lg bouncy-hover shadow-md">
                    Continuar
                  </button>
                </div>
              ) : (
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-300 shadow-xl flex flex-col items-center text-center">
                  <span className="text-6xl mb-3">🤔</span>
                  <h3 className="text-xl font-bold text-red-700 mb-2">Casi casi...</h3>
                  <p className="text-red-800 font-medium">Intenta mirar bien su rostro. Parece que necesita un abrazo y consuelo.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Activity 2 Component: Juego por Parejas ---
function JuegoPorParejas({ onBack }: { onBack: () => void }) {
  const [action, setAction] = useState<string | null>(null);

  // Helper actions
  const actions = [
    { id: 'ayudar', label: 'Ayudar', icon: '🤝', color: 'bg-blue-100 border-blue-400 text-blue-800', hover: 'hover:bg-blue-200' },
    { id: 'abrazar', label: 'Abrazar', icon: '🤗', color: 'bg-pink-100 border-pink-400 text-pink-800', hover: 'hover:bg-pink-200' },
    { id: 'compartir', label: 'Compartir', icon: '🎁', color: 'bg-yellow-100 border-yellow-400 text-yellow-800', hover: 'hover:bg-yellow-200' },
    { id: 'ignorar', label: 'Ignorar', icon: '🚶', color: 'bg-gray-100 border-gray-400 text-gray-800', hover: 'hover:bg-gray-200' }
  ];

  const handleAction = (id: string) => {
    setAction(id);
    if (id === 'ignorar') {
      setTimeout(() => setAction(null), 3500); // Revert after negative action
    }
  };

  const isPositiveAction = action === 'ayudar' || action === 'abrazar' || action === 'compartir';

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-on-surface-variant hover:text-secondary drop-shadow-sm font-medium">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Menú
        </button>
        <h2 className="text-2xl font-headline font-bold text-secondary">Juego por Parejas</h2>
      </div>

      <div className="bg-surface-container glass-panel rounded-3xl p-8 border border-outline-variant/30 flex flex-col items-center w-full relative min-h-[500px] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        
        <p className="text-lg md:text-xl text-on-surface mb-8 text-center font-medium max-w-2xl">
          ¡Oh no! Un amiguito ha dejado caer su helado estelar y se siente mal. ¿Tú qué harías?
        </p>

        {/* Scene Container */}
        <div className="flex-1 flex flex-col justify-center items-center w-full mb-10 relative">
          <div className="flex items-end justify-center gap-12 sm:gap-24 h-52 relative w-full border-b-[3px] border-outline-variant/30 pb-4">
            
            {/* Player Character */}
            <motion.div 
              className="relative z-10 drop-shadow-lg"
              animate={
                action === 'abrazar' ? { x: 50, scale: 1.1 } : 
                action === 'ayudar' ? { x: 40, y: -10 } : 
                action === 'compartir' ? { x: 30 } : 
                action === 'ignorar' ? { x: -30, opacity: 0.5 } : 
                { x: 0 }
              }
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <div className="text-7xl md:text-8xl">😎</div>
              {action === 'compartir' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, x: 50, y: -20, rotate: 180 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-0 right-0 text-4xl"
                >
                  🍦
                </motion.div>
              )}
            </motion.div>

            {/* Friend Character */}
            <motion.div 
              className="relative z-10 drop-shadow-lg"
              animate={
                action === 'abrazar' ? { x: -50, scale: 1.1 } : 
                action === 'ayudar' ? { x: -40, y: -10 } :
                { x: 0 }
              }
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              {/* Emotion change based on action */}
              <motion.div 
                animate={isPositiveAction ? { scale: [1, 1.1, 1] } : { y: [0, 5, 0] }}
                transition={isPositiveAction ? { duration: 0.5 } : { duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl md:text-8xl"
              >
                {isPositiveAction ? '🥹' : action === 'ignorar' ? '😭' : '😢'}
              </motion.div>

              {/* Dropped Ice cream (hidden when shared) */}
              {!isPositiveAction && (
                <div className="absolute -bottom-6 -left-4 text-4xl rotate-[250deg] opacity-80 drop-shadow-md">🍦</div>
              )}
            </motion.div>

            {/* Emotional Hearts / Particles for Positive Action */}
            <AnimatePresence>
              {isPositiveAction && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{ opacity: 1, scale: 2, y: -80, rotate: -15 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-10 left-1/2 -translate-x-[60%] text-5xl pointer-events-none z-20"
                  >
                    ❤️
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{ opacity: 1, scale: 1.5, y: -60, rotate: 25 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-10 left-1/2 -translate-x-[20%] text-3xl pointer-events-none z-20"
                  >
                    ✨
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        {!isPositiveAction && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full z-20">
            {actions.map((act) => (
              <button
                key={act.id}
                onClick={() => handleAction(act.id)}
                disabled={action === 'ignorar'}
                className={clsx(
                  "flex flex-col items-center justify-center gap-3 p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 bouncy-hover font-bold shadow-sm",
                  act.color,
                  act.hover,
                  action === act.id && "scale-95 shadow-inner opacity-80",
                  action === 'ignorar' && action !== act.id && "opacity-50 grayscale"
                )}
              >
                <span className="text-4xl">{act.icon}</span>
                <span className="text-lg">{act.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Feedback Message */}
        <AnimatePresence>
          {action && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={clsx(
                "absolute bottom-8 p-6 md:p-8 rounded-3xl w-[90%] max-w-2xl text-center border-2 shadow-xl z-30",
                isPositiveAction ? "bg-green-50 border-green-400 text-green-900" : "bg-orange-50 border-orange-400 text-orange-900"
              )}
            >
              <h3 className="font-bold text-2xl mb-3">
                {isPositiveAction ? "¡Qué gran acción!" : "Piénsalo bien..."}
              </h3>
              <p className="font-medium text-lg leading-relaxed">
                {action === 'ayudar' && "Ofrecer ayuda a quien lo necesita demuestra mucha empatía. ¡Hiciste que tu amigo se sintiera apoyado y muy feliz de tenerte!"}
                {action === 'abrazar' && "Un abrazo es una forma maravillosa de consolar a alguien triste. ¡Ese calor le hizo saber a tu amigo que no está solo!"}
                {action === 'compartir' && "Al compartir tu helado, le devolviste la sonrisa a tu amigo. ¡Qué noble eres, la amistad lo es todo!"}
                {action === 'ignorar' && "Si ignoras a alguien que está triste, podría sentirse muy solo e inseguro. En un equipo siempre debemos tratar de ayudarnos unos a otros."}
              </p>
              
              {isPositiveAction && (
                <button onClick={onBack} className="mt-6 px-8 py-3 bg-green-500 text-white rounded-full font-bold text-lg bouncy-hover shadow-lg">
                  Finalizar Actividad
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// --- Main Container for Planeta Relación ---
export default function Relacion() {
  const [mode, setMode] = useState<ActivityMode>('menu');

  return (
    <div className="min-h-screen w-full flex flex-col p-6 pr-8 bg-gradient-to-b from-cyan-900/10 to-background overflow-x-hidden">
      
      {/* Header */}
      <header className="w-full relative mb-12 max-w-5xl mx-auto flex flex-col items-center pt-4">
        {/* Back Button positioned absolutely on the left */}
        <Link to="/" state={{ transitionType: 'push_back' }} className="absolute left-0 top-4 flex items-center gap-2 text-on-surface-variant hover:text-cyan-600 bouncy-hover z-10">
          <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center shadow-sm">
             <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </div>
          <span className="font-medium hidden sm:block">El Universo</span>
        </Link>
        
        {/* Large Planet Hero Image */}
        <motion.div
           initial={{ scale: 0, rotate: -20 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
           className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[4px] border-cyan-400/40 shadow-2xl bg-[radial-gradient(circle_at_30%_30%,#45d8ed,#006f7c)] p-2 mb-6 relative"
        >
          <img src="/social-epm.png" alt="Planeta Relación" className="w-[85%] h-[85%] object-contain filter drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" />
        </motion.div>

        <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-cyan-700 text-center">Planeta Relación</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center lg:justify-center max-w-5xl mx-auto w-full gap-8">
        
        {/* Menu Router State */}
        <AnimatePresence mode="wait">
          {mode === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full"
            >
              <div className="text-center text-on-surface-variant max-w-2xl mx-auto text-lg mb-12">
                <p>Bienvenido al planeta de la amistad. Aquí aprenderemos a salir de nuestro propio mundo emocional, a comprender cómo se sienten los demás y cómo nuestras decisiones los ayudan a estar mejor.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                <button 
                  onClick={() => setMode('activity1')}
                  className="bg-surface-container glass-panel rounded-3xl p-8 border border-outline-variant/40 flex flex-col items-center text-center gap-5 bouncy-hover group shadow-md hover:shadow-xl hover:border-blue-400 transition-all"
                >
                  <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors shadow-inner">
                    <span className="text-6xl group-hover:scale-110 transition-transform">🥺</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-on-surface group-hover:text-blue-600 transition-colors mb-2">¿Qué siente mi amigo?</h3>
                    <p className="text-base text-on-surface-variant font-medium">Reconoce emociones básicas observando atentamente las expresiones de otros.</p>
                  </div>
                  <div className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full font-bold text-lg w-full flex items-center justify-center gap-2 group-hover:bg-blue-600">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Jugar Misión
                  </div>
                </button>

                <button 
                  onClick={() => setMode('activity2')}
                  className="bg-surface-container glass-panel rounded-3xl p-8 border border-outline-variant/40 flex flex-col items-center text-center gap-5 bouncy-hover group shadow-md hover:shadow-xl hover:border-pink-400 transition-all"
                >
                  <div className="w-28 h-28 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors shadow-inner">
                    <span className="text-6xl group-hover:scale-110 transition-transform">🫂</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-on-surface group-hover:text-pink-600 transition-colors mb-2">Juego por Parejas</h3>
                    <p className="text-base text-on-surface-variant font-medium">Toma decisiones sobre cómo reaccionar ante las necesidades de tu compañero.</p>
                  </div>
                  <div className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg w-full flex items-center justify-center gap-2 group-hover:bg-pink-600">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Jugar Misión
                  </div>
                </button>
              </div>
              
              {/* Back Link replacement for Espejo Magico since it's asked down the road or moved */}
              <div className="mt-12 text-center text-on-surface-variant/60 font-medium">
                Completa estas dos misiones para desbloquear la evolución en tu Dashboard.
              </div>
            </motion.div>
          )}

          {mode === 'activity1' && (
            <motion.div 
              key="activity1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full"
            >
              <QueSienteMiAmigo onBack={() => setMode('menu')} />
            </motion.div>
          )}

          {mode === 'activity2' && (
            <motion.div 
              key="activity2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full"
            >
              <JuegoPorParejas onBack={() => setMode('menu')} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
