import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import NavigationButton from '../components/NavigationButton';
import SuccessScreen from '../components/SuccessScreen';

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
    { id: 'feliz', emoji: '😊', label: 'Feliz' },
    { id: 'triste', emoji: '😢', label: 'Triste' },
    { id: 'enojado', emoji: '😠', label: 'Enojado' },
    { id: 'asustado', emoji: '😨', label: 'Asustado' }
  ];

  const handleSelect = (id: string) => {
    setSelectedEmotion(id);
    setShowFeedback(true);

    if (id === targetEmotion) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedEmotion(null);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <NavigationButton to="#" onClick={onBack} label="Volver" />
      <div className="flex items-center justify-center gap-4 mb-8">
          <h2 className="text-3xl font-bold font-headline text-on-surface text-center">
            ¿Qué siente tu amigo?
          </h2>
          <button
            onClick={() => console.log("Reproduciendo audio de instrucción")}
            aria-label="Escuchar instrucción"
            className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:ring-4 focus:ring-primary/30 outline-none"
          >
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">volume_up</span>
          </button>
        </div>

      <div className="w-full relative">
        {/* Scenario */}
        <div className="bg-surface-container-high rounded-3xl p-8 mb-8 text-center flex flex-col items-center justify-center border border-outline-variant/30 shadow-inner min-h-[200px]" role="img" aria-label="Tu amigo está llorando porque se le ha caído su helado favorito">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl mb-4"
          >
            {friendFace}
          </motion.div>
          <p className="text-xl text-on-surface-variant font-medium">Se le ha caído su helado favorito al suelo.</p>
        </div>

        {/* Emotion Options */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !isSuccess && handleSelect(opt.id)}
              disabled={showFeedback && isSuccess}
              aria-label={`Seleccionar emoción: ${opt.label}`}
              className={clsx(
                "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 bouncy-hover bg-background focus:ring-4 focus:ring-secondary/50 outline-none",
                selectedEmotion === opt.id && showFeedback
                  ? (isSuccess ? "border-green-500 bg-green-50 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-red-400 bg-red-50")
                  : "border-outline-variant/50 hover:border-secondary/50 hover:bg-secondary/10 shadow-sm"
              )}
            >
              <span className="text-5xl" aria-hidden="true">{opt.emoji}</span>
              <span className="font-bold text-lg text-on-surface">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              aria-live="assertive" className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-surface/80 backdrop-blur-sm rounded-3xl"
            >
              {isSuccess ? (
                <SuccessScreen mensaje="Has reconocido que tu amigo está triste. ¡Eres muy empático!" onContinue={onBack} />
              ) : (
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-400 shadow-xl flex flex-col items-center text-center max-w-sm">
                  <span className="text-5xl mb-3">🤔</span>
                  <h3 className="text-xl font-bold text-red-700 mb-1">Mmm, no exactamente</h3>
                  <p className="text-red-800">Piensa en cómo te sentirías tú si se te cayera tu helado favorito.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Activity 2 Component: ¿Qué harías tú? ---
function QueHariasTu({ onBack }: { onBack: () => void }) {
  const [action, setAction] = useState<string | null>(null);

  const actions = [
    { id: 'ayudar', icon: 'handshake', label: 'Ayudar', color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'abrazar', icon: 'volunteer_activism', label: 'Abrazar', color: 'text-pink-500', bg: 'bg-pink-100' },
    { id: 'ignorar', icon: 'directions_walk', label: 'Ignorar', color: 'text-gray-500', bg: 'bg-gray-100' },
    { id: 'compartir', icon: 'icecream', label: 'Compartir', color: 'text-orange-500', bg: 'bg-orange-100' },
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
      <NavigationButton to="#" onClick={onBack} label="Volver" />

      <div className="flex items-center justify-center gap-4 mb-8">
          <h2 className="text-3xl font-bold font-headline text-on-surface text-center">
            ¿Qué harías tú?
          </h2>
          <button
            onClick={() => console.log("Reproduciendo audio de instrucción")}
            aria-label="Escuchar instrucción"
            className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:ring-4 focus:ring-primary/30 outline-none"
          >
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">volume_up</span>
          </button>
        </div>

      <div className="w-full relative flex flex-col items-center">

        {/* Interactive Scenario Area */}
        <div className="w-full max-w-2xl bg-surface-container-high rounded-[3rem] p-8 mb-10 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden border border-outline-variant/30 shadow-inner">
          <p className="text-center text-on-surface-variant font-medium text-lg mb-8 z-10 bg-surface/80 px-6 py-2 rounded-full backdrop-blur-sm">
            Tu amigo está triste porque su helado se cayó...
          </p>

          <div className="relative flex items-center justify-center w-full h-48 z-10">
            {/* The friend */}
            <motion.div
              className="absolute"
              animate={
                action === 'abrazar' ? { x: 40 } :
                action === 'compartir' ? { x: 20 } :
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
                    className="absolute text-pink-400 text-3xl"
                  >❤️</motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{ opacity: 1, scale: 1.5, y: -100, x: 40, rotate: 15 }}
                    transition={{ delay: 0.2 }}
                    exit={{ opacity: 0 }}
                    className="absolute text-yellow-400 text-2xl"
                  >✨</motion.div>
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
                aria-label={`Acción: ${act.label}`}
                className={clsx(
                  "flex flex-col items-center gap-3 p-4 md:p-6 rounded-3xl border-2 transition-all duration-300 bouncy-hover bg-surface focus:ring-4 focus:ring-tertiary/50 outline-none",
                  action === act.id && !isPositiveAction ? "border-outline opacity-50" : "border-outline-variant/30 hover:border-tertiary/50 hover:shadow-md"
                )}
              >
                <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center", act.bg, act.color)} aria-hidden="true">
                  <span className="material-symbols-outlined text-3xl">{act.icon}</span>
                </div>
                <span className="font-bold text-on-surface">{act.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Feedback Area */}
        <AnimatePresence>
          {action && !isPositiveAction && (
            <motion.div
              aria-live="assertive" className="absolute bottom-8 p-6 md:p-8 rounded-3xl w-[90%] max-w-2xl text-center border-2 shadow-xl z-30 bg-orange-50 border-orange-400 text-orange-900"
            >
              <h3 className="font-bold text-2xl mb-3">Piénsalo bien...</h3>
              <p className="font-medium text-lg leading-relaxed">Si ignoras a alguien que está triste, podría sentirse muy solo e inseguro. En un equipo siempre debemos tratar de ayudarnos unos a otros.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isPositiveAction && (
             <SuccessScreen
               mensaje={
                 action === 'ayudar' ? "Ofrecer ayuda demuestra empatía. ¡Tu amigo se siente apoyado!" :
                 action === 'abrazar' ? "Un abrazo es maravilloso. ¡Ese calor le hizo saber que no está solo!" :
                 "Al compartir, le devolviste la sonrisa. ¡Qué noble eres!"
               }
               onContinue={onBack}
             />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// --- Main Menu Component ---
export default function Relacion() {
  const [activities, setActivities] = useState([
    { id: 'activity1', completed: false },
    { id: 'activity2', completed: false }
  ]);
  const [mode, setMode] = useState<ActivityMode>('menu');

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <header className="w-full flex items-center justify-between mb-2 relative z-10 pt-2" role="banner">
        {mode === 'menu' ? (
          <NavigationButton to="/" label="Volver a El Universo" />
        ) : null}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full relative z-10" aria-label="Actividades del Planeta Relación">
        <AnimatePresence mode="wait">

          {mode === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex flex-col items-center max-w-5xl mx-auto"
            >
              {/* Visual Hierarchy: Tutor instructions separated */}
              <div className="w-full max-w-xl mx-auto bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl p-4 mb-8 backdrop-blur-sm">
                <p className="text-center text-on-surface-variant text-sm flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base">info</span>
                  Para el tutor: Selecciona una de las actividades sociales para trabajar la empatía y la resolución de conflictos.
                </p>
              </div>


              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full relative flex items-center justify-center shadow-[inset_-12px_-12px_20px_rgba(0,0,0,0.5),_inset_4px_4px_10px_rgba(255,255,255,0.3),_0_0_30px_rgba(69,216,237,0.3)] bg-gradient-to-br from-[#45d8ed] to-[#006f7c]">
                  <img src="/social-epm.png" alt="Personaje Relación" className="w-[85%] h-[85%] object-contain drop-shadow-2xl animate-float" />
                </div>
                <div className="bg-surface-container glass-panel px-6 py-4 rounded-3xl border border-outline-variant/30 max-w-lg text-center shadow-md">
                  <p className="text-lg text-on-surface font-medium">
                    "¡Hola! Bienvenido al Planeta Relación. Aquí aprenderemos a entender a nuestros amigos y descubrir cómo podemos ayudarnos mutuamente."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                <button 
                  onClick={() => setMode('activity1')}
                  aria-label={`Actividad: ¿Qué siente mi amigo? – Aprenderemos a entender las emociones de los demás${activities[0].completed ? ' (completada)' : ''}`}
                  className={`relative bg-surface-container glass-panel rounded-3xl p-8 flex flex-col items-center text-center gap-5 bouncy-hover group shadow-md hover:shadow-xl transition-all focus:ring-4 focus:ring-blue-400/50 outline-none ${activities[0].completed ? 'border border-green-500 ring-4 ring-green-500/50 opacity-90' : 'border border-outline-variant/40 hover:border-blue-400'}`}
                >
                  {activities[0].completed && <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md z-10 text-3xl" aria-hidden="true">✅</div>}
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-inner" aria-hidden="true">
                    <span className="material-symbols-outlined text-5xl">psychology</span>
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">¿Qué siente mi amigo?</h2>
                    <p className="text-on-surface-variant font-medium">Aprenderemos a entender las emociones de los demás.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setMode('activity2')}
                  aria-label={`Actividad: ¿Qué harías tú? – Aprenderemos cómo ayudar a un amigo${activities[1].completed ? ' (completada)' : ''}`}
                  className={`relative bg-surface-container glass-panel rounded-3xl p-8 flex flex-col items-center text-center gap-5 bouncy-hover group shadow-md hover:shadow-xl transition-all focus:ring-4 focus:ring-pink-400/50 outline-none ${activities[1].completed ? 'border border-green-500 ring-4 ring-green-500/50 opacity-90' : 'border border-outline-variant/40 hover:border-pink-400'}`}
                >
                  {activities[1].completed && <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md z-10 text-3xl" aria-hidden="true">✅</div>}
                  <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shadow-inner" aria-hidden="true">
                    <span className="material-symbols-outlined text-5xl">volunteer_activism</span>
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">¿Qué harías tú?</h2>
                    <p className="text-on-surface-variant font-medium">Aprenderemos cómo ayudar a un amigo que lo necesita.</p>
                  </div>
                </button>
              </div>

              {/* Decorative Planet Image */}
              <div className="mt-12 text-center text-on-surface-variant/60 font-medium">
                <p>Planeta de la Empatía</p>
              </div>
            </motion.div>
          )}

          {mode === 'activity1' && (
            <motion.div
              key="activity1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex justify-center"
            >
              <QueSienteMiAmigo onBack={() => {
                setActivities([
                  { id: 'activity1', completed: true },
                  activities[1]
                ]);
                setMode('menu');
              }} />
            </motion.div>
          )}

          {mode === 'activity2' && (
            <motion.div
              key="activity2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex justify-center"
            >
              <QueHariasTu onBack={() => {
                 setActivities([
                  activities[0],
                  { id: 'activity2', completed: true }
                ]);
                setMode('menu');
              }} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
