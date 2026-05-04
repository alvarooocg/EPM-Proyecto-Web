import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import SuccessScreen from '../components/SuccessScreen';
import { AnimatePresence } from 'motion/react';

export default function SelectorEmociones() {
  const [mensaje, setMensaje] = useState("");

  const emociones = [
    { id: 1, icon: 'sentiment_satisfied', color: 'text-tertiary', bg: 'bg-tertiary/10', border: 'border-tertiary/30', label: 'Contento', feedback: '¡Veo que estás contento, eso es genial!' },
    { id: 2, icon: 'sentiment_dissatisfied', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30', label: 'Triste', feedback: 'Si estás triste, aquí te podemos ayudar.' },
    { id: 3, icon: 'sentiment_extremely_dissatisfied', color: 'text-error', bg: 'bg-error/10', border: 'border-error/30', label: 'Enfadado', feedback: 'Es normal enfadarse. Respira profundo conmigo.' },
    { id: 4, icon: 'face', color: 'text-[#9c27b0]', bg: 'bg-[#9c27b0]/10', border: 'border-[#9c27b0]/30', label: 'Asustado', feedback: 'Si tienes miedo, estoy aquí para protegerte.' },
    { id: 5, icon: 'sentiment_very_satisfied', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30', label: 'Emocionado', feedback: '¡Qué emoción! ¡Tienes mucha energía!' },
    { id: 6, icon: 'mood', color: 'text-[#00bcd4]', bg: 'bg-[#00bcd4]/10', border: 'border-[#00bcd4]/30', label: 'Sorprendido', feedback: '¡Wow! ¿Qué cosa nueva descubriste?' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface">
      <header className="w-full flex items-center justify-between mb-2">
        <Link to="/me-conozco" state={{ transitionType: 'push_back' }} className="flex items-center gap-2 text-on-surface-variant hover:text-tertiary bouncy-hover">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          <span className="font-medium">Volver a Me Conozco</span>
        </Link>
      </header>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-8">

        {/* Mascota con h1 estático */}
        <div className="flex flex-col items-center gap-3 animate-float mb-4">
           <div className="w-20 h-20 rounded-full overflow-hidden bg-tertiary/10 border-4 border-tertiary/30">
             <img
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg"
               alt="Estrella Mascota"
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
           </div>
           <h1 id="pregunta-titulo" className="font-headline font-bold text-2xl lg:text-3xl text-center bg-surface-container-high py-3 px-6 rounded-3xl border border-outline-variant/30 text-on-surface relative">
             ¿Cómo te sientes hoy?
             {/* Burbuja */}
             <span className="absolute -top-3 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-surface-container-high" aria-hidden="true"></span>
           </h1>
        </div>

        {/* Mensaje de feedback dinámico anunciado por lector de pantalla */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="font-headline font-bold text-lg text-center text-on-surface-variant bg-surface-container py-3 px-6 rounded-2xl border border-outline-variant/20 min-h-[3rem] transition-all duration-300"
        >
          {mensaje}
        </div>

        <div
          role="group"
          aria-labelledby="pregunta-titulo"
          className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl"
        >
          {emociones.map((emocion) => (
            <button
              key={emocion.id}
              onClick={() => setMensaje(emocion.feedback)}
              aria-label={`Seleccionar emoción: ${emocion.label}`}
              aria-pressed={mensaje === emocion.feedback}
              className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 ${emocion.border} ${emocion.bg} bouncy-hover group transition-all duration-300 focus-visible:ring-4 focus-visible:ring-tertiary/50`}
            >
               <span className={`material-symbols-outlined text-6xl ${emocion.color} group-hover:scale-110 transition-transform mb-3`} aria-hidden="true">
                 {emocion.icon}
               </span>
               <span className="font-bold text-lg text-on-surface">{emocion.label}</span>
            </button>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {showSuccess && (
          <SuccessScreen
            mensaje="¡Has identificado cómo te sientes! Conocer tus emociones es el primer paso."
            onContinue={() => navigate('/me-conozco')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
