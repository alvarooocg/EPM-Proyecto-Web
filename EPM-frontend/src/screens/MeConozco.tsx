import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function MeConozco() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-gradient-to-b from-tertiary-container/20 to-background">
      <header className="w-full flex items-center justify-between mb-8">
        <NavigationButton to="/" label="Volver a El Universo" />
        <h1 className="font-headline font-bold text-2xl text-tertiary">Planeta Me Conozco</h1>
        <div className="w-20" /> {/* Spacer */}
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-8">
        <div className="flex flex-col items-center gap-4 mb-4">
           {/* Mascota / Estrella animada */}
           <div className="w-24 h-24 rounded-full overflow-hidden bg-tertiary/10 border-4 border-tertiary/30 animate-float">
             <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg" 
               alt="Estrella Mascota" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
           </div>
           <p className="text-center text-on-surface-variant max-w-lg mx-auto text-lg bg-surface-container py-3 px-6 rounded-2xl border border-tertiary/20 relative">
             ¡Hola! Exploremos juntos cómo nos sentimos y qué cosas nos gustan.
             {/* Speech bubble tail */}
             <span className="absolute -top-3 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-surface-container"></span>
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
          {/* Actividad 1: ¿Cómo me siento? */}
          <Link to="/selector-emociones" state={{ transitionType: 'push' }} className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center gap-4 bouncy-hover group">
            <div className="w-24 h-24 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary/20 transition-colors">
              <span className="material-symbols-outlined text-4xl">emoji_emotions</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-on-surface group-hover:text-tertiary transition-colors mb-2">¿Cómo me siento?</h3>
              <p className="text-sm text-on-surface-variant">Conectando y nombrando nuestras emociones.</p>
            </div>
          </Link>

          {/* Actividad 2: La Maleta de las Emociones */}
          <Link to="/maleta-magica" state={{ transitionType: 'push' }} className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center gap-4 bouncy-hover group">
            <div className="w-24 h-24 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary/20 transition-colors">
              <span className="material-symbols-outlined text-4xl">luggage</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-on-surface group-hover:text-tertiary transition-colors mb-2">La Maleta de las Emociones</h3>
              <p className="text-sm text-on-surface-variant">Guarda lo que te hace sentir bien.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
