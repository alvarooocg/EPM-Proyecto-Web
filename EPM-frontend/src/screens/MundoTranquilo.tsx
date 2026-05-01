import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import SuccessScreen from '../components/SuccessScreen';
import { AnimatePresence } from 'motion/react';

export default function MundoTranquilo() {
  const navigate = useNavigate();
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cycles, setCycles] = useState(0);

  const handlePlayAudio = () => {
    console.log("Reproduciendo audio de instrucción");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathingIn((prev) => {
        if (!prev) {
          setCycles((c) => c + 1);
        }
        return !prev;
      });
    }, 4000); // 4 seconds in, 4 seconds out
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cycles >= 3) {
      setTimeout(() => setShowSuccess(true), 1000);
    }
  }, [cycles]);

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface overflow-hidden">
      <header className="w-full flex items-center justify-between mb-8 z-10">
        <NavigationButton to="/me-relajo" label="Volver a Me Relajo" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full relative">
        <div className="w-full max-w-xl mx-auto bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl p-4 mt-4 absolute top-0 z-20 backdrop-blur-sm">
          <p className="text-center text-on-surface-variant text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Para el tutor: Acompaña al niño a seguir el ritmo de la animación para realizar respiraciones profundas.
          </p>
        </div>

        {/* Breathing Animation Circle */}
        <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
          {/* Outer Ripple */}
          <div
            className="absolute bg-primary/20 rounded-full transition-all duration-[4000ms] ease-in-out"
            style={{
              width: isBreathingIn ? '150%' : '100%',
              height: isBreathingIn ? '150%' : '100%',
              opacity: isBreathingIn ? 0.2 : 0.8
            }}
          />
          {/* Middle Ripple */}
          <div
            className="absolute bg-primary/40 rounded-full transition-all duration-[4000ms] ease-in-out"
            style={{
              width: isBreathingIn ? '120%' : '80%',
              height: isBreathingIn ? '120%' : '80%',
              opacity: isBreathingIn ? 0.4 : 0.9
            }}
          />
          {/* Inner Core */}
          <div
            className="absolute bg-primary rounded-full flex items-center justify-center shadow-xl transition-all duration-[4000ms] ease-in-out z-10"
            style={{
              width: isBreathingIn ? '80%' : '50%',
              height: isBreathingIn ? '80%' : '50%',
            }}
          >
             <span className="material-symbols-outlined text-on-primary text-6xl">
               {isBreathingIn ? 'air' : 'self_improvement'}
             </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-12 z-20">
          <p className="text-xl text-on-surface-variant font-medium">
            {isBreathingIn ? "Inhala profundo..." : "Exhala suavemente..."}
          </p>
          <button
            onClick={handlePlayAudio}
            aria-label="Escuchar instrucción"
            className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:ring-4 focus:ring-primary/30 outline-none"
          >
            <span className="material-symbols-outlined text-3xl">volume_up</span>
          </button>
        </div>
      </main>

      {/* Decorative stars */}
      <div className="absolute top-1/4 left-1/4 text-primary/30 animate-pulse text-2xl">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-secondary/30 animate-pulse delay-700 text-3xl">✨</div>

      <AnimatePresence>
        {showSuccess && (
          <SuccessScreen
            mensaje="¡Lo lograste! Ahora tu cuerpo y tu mente están mucho más tranquilos."
            onContinue={() => navigate('/me-relajo')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
