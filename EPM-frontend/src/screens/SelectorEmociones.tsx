import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import SuccessScreen from '../components/SuccessScreen';
import { AnimatePresence } from 'motion/react';

export default function SelectorEmociones() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("¿Cómo te sientes hoy?");
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlayAudio = () => {
    console.log("Reproduciendo audio de instrucción");
  }

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
        <NavigationButton to="/me-conozco" label="Volver a Me Conozco" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-8">
        <div className="w-full max-w-xl mx-auto bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl p-4 mt-4 backdrop-blur-sm">
          <p className="text-center text-on-surface-variant text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Para el tutor: Ayuda al niño a identificar cómo se siente pulsando sobre la emoción que mejor le represente hoy.
          </p>
        </div>
        
        {/* Mascota guiando */}
        <div className="flex flex-col items-center gap-3 animate-float mb-4">
           <div className="w-20 h-20 rounded-full overflow-hidden bg-tertiary/10 border-4 border-tertiary/30">
             <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg" 
               alt="Estrella Mascota" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
           </div>

           <div className="flex items-center gap-4 bg-surface-container-high py-3 px-6 rounded-3xl border border-outline-variant/30 relative transition-all duration-300">
             <h1 className="font-headline font-bold text-2xl lg:text-3xl text-center text-on-surface">
               {mensaje}
             </h1>
             <button
               onClick={handlePlayAudio}
               aria-label="Escuchar instrucción"
               className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:ring-4 focus:ring-primary/30 outline-none"
             >
               <span className="material-symbols-outlined text-3xl">volume_up</span>
             </button>
             {/* Burbuja */}
             <span className="absolute -top-3 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-surface-container-high"></span>
           </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl">
          {emociones.map((emocion) => (
            <button 
              key={emocion.id} 
              onClick={() => {
                setMensaje(emocion.feedback);
                setTimeout(() => setShowSuccess(true), 2000);
              }}
              className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 ${emocion.border} ${emocion.bg} bouncy-hover group transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-tertiary/50`}
            >
               <span className={`material-symbols-outlined text-6xl ${emocion.color} group-hover:scale-110 transition-transform mb-3`}>
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
