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
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-on-surface-variant hover:text-secondary drop-shadow-sm font-medium">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          Volver al Menú
        </button>
        <h2 className="text-2xl font-headline font-bold text-secondary">¿Qué siente mi amigo?</h2>
      </div>

      <div className="w-full relative">
        {/* Scenario */}
        <div className="bg-surface-container-high rounded-3xl p-8 mb-8 text-center flex flex-col items-center justify-center border border-outline-variant/30 shadow-inner min-h-[200px]">
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
              aria-label={opt.label}
              aria-pressed={selectedEmotion === opt.id}
              className={clsx(
                "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 bouncy-hover bg-background",
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
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-on-surface-variant hover:text-secondary drop-shadow-sm font-medium">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          Volver al Menú
        </button>
        <h2 className="text-2xl font-headline font-bold text-secondary">Juego por Parejas</h2>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
          <h2 className="text-3xl font-bold font-headline text-on-surface text-center">
            ¿Qué harías tú?
          </h2>
          <button
            onClick={() => console.log("Reproduciendo audio de instrucción")}
            aria-label="Escuchar instrucción"
            className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:ring-4 focus:ring-primary/30 outline-none"
          >
            <span className="material-symbols-outlined text-3xl">volume_up</span>
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
                aria-label={act.label}
                aria-pressed={action === act.id}
                className={clsx(
                  "flex flex-col items-center gap-3 p-4 md:p-6 rounded-3xl border-2 transition-all duration-300 bouncy-hover bg-surface",
                  action === act.id && !isPositiveAction ? "border-outline opacity-50" : "border-outline-variant/30 hover:border-tertiary/50 hover:shadow-md"
                )}
              >
                <span className="text-4xl" aria-hidden="true">{act.icon}</span>
                <span className="text-lg">{act.label}</span>
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
      
      {/* Header */}
      <header className="w-full relative mb-12 max-w-5xl mx-auto flex flex-col items-center pt-4">
        {/* Back Button positioned absolutely on the left */}
        <Link to="/" state={{ transitionType: 'push_back' }} className="absolute left-0 top-4 flex items-center gap-2 text-on-surface-variant hover:text-cyan-600 bouncy-hover z-10">
          <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center shadow-sm">
             <span className="material-symbols-outlined text-2xl" aria-hidden="true">arrow_back</span>
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
      
      <main id="main-content" className="flex-1 flex flex-col items-center lg:justify-center max-w-5xl mx-auto w-full gap-8">
        
        {/* Menu Router State */}
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
                  className={`relative bg-surface-container glass-panel rounded-3xl p-8 flex flex-col items-center text-center gap-5 bouncy-hover group shadow-md hover:shadow-xl transition-all ${activities[0].completed ? 'border border-green-500 ring-4 ring-green-500/50 opacity-90' : 'border border-outline-variant/40 hover:border-blue-400'}`}
                >
                  {activities[0].completed && <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md z-10 text-3xl">✅</div>}
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-inner">
                    <span className="material-symbols-outlined text-5xl">psychology</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-on-surface group-hover:text-blue-600 transition-colors mb-2">¿Qué siente mi amigo?</h3>
                    <p className="text-base text-on-surface-variant font-medium">Reconoce emociones básicas observando atentamente las expresiones de otros.</p>
                  </div>
                  <div className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full font-bold text-lg w-full flex items-center justify-center gap-2 group-hover:bg-blue-600">
                    <span className="material-symbols-outlined" aria-hidden="true">play_arrow</span>
                    Jugar Misión
                  </div>
                </button>

                <button 
                  onClick={() => setMode('activity2')}
                  className={`relative bg-surface-container glass-panel rounded-3xl p-8 flex flex-col items-center text-center gap-5 bouncy-hover group shadow-md hover:shadow-xl transition-all ${activities[1].completed ? 'border border-green-500 ring-4 ring-green-500/50 opacity-90' : 'border border-outline-variant/40 hover:border-pink-400'}`}
                >
                  {activities[1].completed && <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md z-10 text-3xl">✅</div>}
                  <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shadow-inner">
                    <span className="material-symbols-outlined text-5xl">volunteer_activism</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-on-surface group-hover:text-pink-600 transition-colors mb-2">Juego por Parejas</h3>
                    <p className="text-base text-on-surface-variant font-medium">Toma decisiones sobre cómo reaccionar ante las necesidades de tu compañero.</p>
                  </div>
                  <div className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg w-full flex items-center justify-center gap-2 group-hover:bg-pink-600">
                    <span className="material-symbols-outlined" aria-hidden="true">play_arrow</span>
                    Jugar Misión
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
