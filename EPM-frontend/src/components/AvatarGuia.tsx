import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function AvatarGuia({ mensaje = "¡Hola, Explorador!", subtitulo = "¿A qué planeta viajaremos hoy?", audioSrc = "" }) {
  const [showTooltip, setShowTooltip] = useState(true);

  // Simulación de audio
  const handlePlayAudio = () => {
    console.log("Reproduciendo instrucción de audio:", mensaje, subtitulo);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 relative mr-12"
          >
            <div className="bg-surface-container-highest py-3 px-6 rounded-3xl border border-tertiary/30 text-on-surface shadow-xl backdrop-blur-sm whitespace-nowrap flex items-center gap-3">
              <div>
                <p className="font-headline font-bold text-lg">{mensaje}</p>
                {subtitulo && <p className="text-sm">{subtitulo}</p>}
              </div>
              <button
                onClick={handlePlayAudio}
                aria-label="Escuchar instrucción"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:ring-2 focus:ring-primary outline-none"
              >
                <span className="material-symbols-outlined text-2xl">volume_up</span>
              </button>
            </div>
            {/* Flecha del bocadillo apuntando hacia abajo a la derecha */}
            <span className="absolute -bottom-3 right-8 border-8 border-transparent border-t-surface-container-highest"></span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative flex items-center justify-center cursor-pointer"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {/* El personaje renderizado directamente con drop-shadow, sin fondo circular */}
        <img
          src="/personaje-epm.png"
          alt="Estrella Guía"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] animate-float"
        />
      </div>
    </div>
  );
}
