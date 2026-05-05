import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import SuccessScreen from '../components/SuccessScreen';
import { AnimatePresence } from 'motion/react';

export default function MaletaMagica() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, text: 'Tristeza', emoji: '😢', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    { id: 2, text: 'Miedo', emoji: '😨', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    { id: 3, text: 'Enojo', emoji: '😠', color: 'bg-red-100 border-red-300 text-red-800' },
  ]);
  const [inSuitcase, setInSuitcase] = useState<number[]>([]);
  const [mensaje, setMensaje] = useState("Guarda aquí las cosas que te hacen sentir bien.");
  const [isSparkling, setIsSparkling] = useState(false);

  const draggedItem = useRef<number | null>(null);
  const totalItems = 3;

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setItemsInside((prev) => {
      const newCount = prev + 1;
      setMensaje('¡Wow! Has guardado algo muy especial.');
      if (newCount >= totalItems) {
        setTimeout(() => setShowSuccess(true), 1500);
      }
      return newCount;
    });
  };

  const handleDragStart = (id: number) => {
    draggedItem.current = id;
    setMensaje('¡Llévalo a la maleta!');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necesario para permitir el drop
    setIsHoveringMaleta(true);
  };

  const handleDragLeave = () => {
    setIsHoveringMaleta(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringMaleta(false);

    if (draggedItem.current !== null) {
      removeItem(draggedItem.current);
      draggedItem.current = null;
    }
  };

  // Keyboard alternative: press Enter or Space on an item to store it
  const handleItemKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      removeItem(id);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface overflow-hidden">
      <header className="w-full flex items-center justify-between mb-2 z-10 pt-2" role="banner">
        <NavigationButton to="/me-conozco" label="Volver a Me Conozco" />
      </header>

      <main className="flex-1 flex flex-col items-center max-w-5xl mx-auto w-full gap-6" aria-label="Actividad: La Maleta Mágica">
        <div className="w-full max-w-xl mx-auto bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl p-4 mt-4 backdrop-blur-sm">
          <p className="text-center text-on-surface-variant text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base" aria-hidden="true">info</span>
            Para el tutor: Guía al niño para que arrastre las preocupaciones y las guarde en la maleta, o pulsa sobre ellas para guardarlas.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 bg-surface-container-high py-3 px-6 rounded-3xl border border-outline-variant/30">
            <h1 className="font-headline font-bold text-3xl text-center text-on-surface">
              Guarda tus emociones
            </h1>
          <button
            onClick={() => console.log("Reproduciendo audio de instrucción")}
            aria-label="Escuchar instrucción en voz alta"
            className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:ring-4 focus:ring-primary/30 outline-none ml-4"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">volume_up</span>
          </button>
          </div>

          <div className="flex items-center gap-4 bg-surface-container py-2 px-6 rounded-2xl border border-outline-variant/20 shadow-sm animate-pulse-glow" role="status" aria-live="polite">
             <div className="w-12 h-12 rounded-full overflow-hidden bg-tertiary/10 border-2 border-tertiary/30 shrink-0" aria-hidden="true">
                 <img
                   src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg" 
                   alt="Estrella Mascota" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                 />
             </div>
             <p
               aria-live="polite"
               aria-atomic="true"
               className="font-headline font-bold text-lg text-on-surface"
             >
               {mensaje}
             </p>
           </div>
        </div>
        
        {/* Zona de Arrastre */}
        <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-around gap-8 mt-4">

          {/* Elementos a arrastrar */}
          <div className="flex flex-wrap md:flex-col justify-center gap-4 w-full md:w-1/3 min-h-[150px]" role="list" aria-label="Emociones para guardar">
            {items.map((item) => (
              <div
                key={item.id}
                role="listitem"
                draggable
                tabIndex={0}
                onDragStart={() => handleDragStart(item.id)}
                onKeyDown={(e) => handleItemKeyDown(e, item.id)}
                aria-label={`${item.text} – Pulsa Enter o arrastra para guardar en la maleta`}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${item.color} cursor-grab active:cursor-grabbing hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm shadow-md focus:ring-4 focus:ring-primary/50 outline-none`}
              >
                <span className="text-3xl" aria-hidden="true">{item.emoji}</span>
                <span className="font-bold text-lg">{item.text}</span>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-on-surface-variant font-medium text-center italic opacity-70" role="status">
                ¡Todo está guardado!
              </p>
            )}
          </div>

          {/* Maleta Receptora */}
          <div
            className={`relative w-64 h-56 md:w-80 md:h-72 rounded-[3rem] border-4 border-dashed transition-all duration-300 flex items-center justify-center ${isHoveringMaleta ? 'bg-secondary/20 border-secondary scale-110 shadow-2xl' : 'bg-surface-container-high border-outline-variant shadow-lg'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            aria-label={`Maleta mágica – ${itemsInside} de ${totalItems} emociones guardadas`}
            role="region"
          >
             {/* Indicador de soltar */}
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 pointer-events-none" aria-hidden="true">
               <span className="material-symbols-outlined text-8xl text-on-surface-variant">work</span>
             </div>

             {/* Items guardados flotando */}
             {items.length < totalItems && (
                <div className="absolute inset-0 overflow-hidden rounded-[2.8rem] pointer-events-none" aria-hidden="true">
                  {Array.from({ length: totalItems - items.length }).map((_, i) => (
                    <div key={i} className={`absolute text-4xl animate-float opacity-50`} style={{
                      left: `${20 + (i * 30)}%`,
                      top: `${30 + (i * 20)}%`,
                      animationDelay: `${i * 0.5}s`
                    }}>
                      ✨
                    </div>
                  ))}
                </div>
             )}
          </div>

              <div className="absolute top-0 bottom-0 left-12 w-6 bg-[#1a110a] shadow-[2px_0_0_rgba(0,0,0,0.3)]" />
              <div className="absolute top-0 bottom-0 right-12 w-6 bg-[#1a110a] shadow-[2px_0_0_rgba(0,0,0,0.3)]" />

              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 border-4 border-[#2a1d12] rounded-t-xl" />
           </div>
        </div>

      </main>

      <AnimatePresence>
        {showSuccess && (
          <SuccessScreen
            mensaje="¡Has guardado todas tus emociones! Tu maleta mágica está llena de cosas buenas."
            onContinue={() => navigate('/me-conozco')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}