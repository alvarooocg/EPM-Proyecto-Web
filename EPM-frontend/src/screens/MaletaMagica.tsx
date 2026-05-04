import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function MaletaMagica() {
  const [items, setItems] = useState([
    { id: 1, label: 'Peluche', icon: 'toys', color: 'text-[#e91e63]' },
    { id: 2, label: 'Parque', icon: 'park', color: 'text-primary' },
    { id: 3, label: 'Familia', icon: 'family_restroom', color: 'text-secondary' },
    { id: 4, label: 'Música', icon: 'music_note', color: 'text-[#9c27b0]' },
    { id: 5, label: 'Amigos', icon: 'diversity_1', color: 'text-tertiary' },
  ]);
  const [inSuitcase, setInSuitcase] = useState<number[]>([]);
  const [mensaje, setMensaje] = useState("Guarda aquí las cosas que te hacen sentir bien.");
  const [isSparkling, setIsSparkling] = useState(false);

  const handleDragEnd = (event: any, info: any, item: any) => {
    if (info.offset.y > 100) {
      handleAddToSuitcase(item);
    }
  };

  const handleAddToSuitcase = (item: typeof items[0]) => {
    setInSuitcase(prev => [...prev, item.id]);
    setItems(prev => prev.filter(i => i.id !== item.id));
    setMensaje(`¡Eso! ${item.label} te hace sentir bien.`);
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface relative overflow-hidden">
      <header className="w-full flex items-center justify-between z-10 relative">
        <Link to="/me-conozco" state={{ transitionType: 'push_back' }} className="flex items-center gap-2 text-on-surface hover:text-tertiary bouncy-hover">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          <span className="font-medium">Volver a Me Conozco</span>
        </Link>
      </header>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-between pb-10 z-10 relative w-full max-w-4xl mx-auto">

        {/* Floating Items Area */}
        <div className="w-full h-48 flex justify-center items-end gap-4 flex-wrap mt-8">
           <AnimatePresence>
             {items.map((item) => (
               <motion.div
                 key={item.id}
                 drag
                 dragConstraints={{ top: -50, left: -100, right: 100, bottom: 400 }}
                 dragElastic={0.2}
                 dragSnapToOrigin={true}
                 onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.5 }}
                 role="group"
                 aria-label={`${item.label}: arrastra o pulsa el botón para meter en la maleta`}
                 tabIndex={-1}
                 className="flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform touch-none"
               >
                 <div className="w-16 h-16 rounded-full bg-surface-container glass-panel border border-outline-variant/30 flex items-center justify-center shadow-lg pointer-events-none">
                    <span className={`material-symbols-outlined text-4xl ${item.color}`} aria-hidden="true">{item.icon}</span>
                 </div>
                 <span className="text-sm font-medium bg-surface-container-high px-3 py-1 rounded-full pointer-events-none" aria-hidden="true">{item.label}</span>
                 <button
                   onClick={() => handleAddToSuitcase(item)}
                   aria-label={`Meter ${item.label} en la maleta`}
                   className="mt-1 text-xs px-3 py-1 rounded-full bg-primary/20 hover:bg-primary/40 focus-visible:ring-2 focus-visible:ring-primary text-on-surface transition-colors"
                 >
                   + Meter
                 </button>
               </motion.div>
             ))}
           </AnimatePresence>

           {items.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-tertiary font-bold text-xl animate-bounce">
                ¡Tu maleta está llena de cosas buenas!
              </motion.div>
           )}
        </div>

        {/* Mascot / Star Prompt */}
        <div className="flex flex-col items-center justify-center my-8">
           <div className="flex items-center gap-4 bg-surface-container-highest px-6 py-4 rounded-full border border-tertiary/20 shadow-xl max-w-lg relative animate-float-slow">
             <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-tertiary/50">
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

        {/* The Suitcase */}
        <div
          aria-label="Maleta de las emociones"
          aria-live="polite"
          aria-atomic="false"
          className="relative flex justify-center w-full max-w-sm mt-auto mb-10"
        >
           {isSparkling && (
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40" aria-hidden="true">
               <span className="material-symbols-outlined absolute top-0 left-4 text-tertiary animate-ping">auto_awesome</span>
               <span className="material-symbols-outlined absolute top-10 right-4 text-secondary animate-ping" style={{ animationDelay: '0.2s' }}>auto_awesome</span>
               <span className="material-symbols-outlined absolute top-4 right-1/2 text-primary animate-ping" style={{ animationDelay: '0.4s' }}>auto_awesome</span>
             </div>
           )}

           <div className={`w-80 h-56 bg-[#3a2818] rounded-3xl border-b-8 border-r-8 border-[#26180d] relative flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 ${isSparkling ? 'scale-105' : 'scale-100'}`}>
              <div className="absolute inset-x-4 inset-y-4 rounded-xl bg-[#2a1d12] border-t-8 border-l-4 border-black/20 flex flex-wrap gap-2 p-4 content-start overflow-hidden">
                 {inSuitcase.map((id, index) => (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key={index} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-white/50 text-xl" aria-hidden="true">favorite</span>
                    </motion.div>
                 ))}
              </div>

              <div className="absolute top-0 bottom-0 left-12 w-6 bg-[#1a110a] shadow-[2px_0_0_rgba(0,0,0,0.3)]" />
              <div className="absolute top-0 bottom-0 right-12 w-6 bg-[#1a110a] shadow-[2px_0_0_rgba(0,0,0,0.3)]" />

              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 border-4 border-[#2a1d12] rounded-t-xl" />
           </div>
        </div>
      </main>
    </div>
  );
}
