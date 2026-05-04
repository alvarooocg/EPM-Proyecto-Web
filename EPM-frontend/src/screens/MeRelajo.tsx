import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function MeRelajo() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-gradient-to-b from-primary-container/20 to-background">
      <header className="w-full flex items-center justify-between mb-8 pt-2" role="banner">
        <NavigationButton to="/" label="Volver a El Universo" />
        <h1 className="font-headline font-bold text-2xl text-primary">Planeta Me Relajo</h1>
        <div className="w-20" aria-hidden="true" /> {/* Spacer */}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-8" aria-label="Actividades de relajación">
        <div className="w-full max-w-xl mx-auto bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-center text-on-surface-variant text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Para el tutor: Selecciona una actividad para ayudar al niño a relajarse y encontrar su calma interior.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-4">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full relative flex items-center justify-center shadow-[inset_-12px_-12px_20px_rgba(0,0,0,0.5),_inset_4px_4px_10px_rgba(255,255,255,0.3),_0_0_30px_rgba(186,195,255,0.3)] bg-gradient-to-br from-[#bac3ff] via-[#687ee6] to-[#2b397a]">
            <img src="/relax-epm.png" alt="Personaje Me Relajo" className="w-[85%] h-[85%] object-contain drop-shadow-2xl animate-float" />
          </div>
          <div className="bg-surface-container glass-panel px-6 py-4 rounded-3xl border border-outline-variant/30 max-w-lg text-center shadow-md">
            <p className="text-lg text-on-surface font-medium">
              "¡Hola! Soy tu guía en el Planeta Me Relajo. Juntos aprenderemos a respirar, calmar nuestra mente y encontrar nuestro lugar de paz."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Card Mundo Tranquilo */}
          <Link to="/mundo-tranquilo" state={{ transitionType: 'push' }} aria-label="Mundo Tranquilo – Ejercicios de respiración guiada" className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center gap-4 bouncy-hover group focus:ring-4 focus:ring-primary/50 outline-none">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors" aria-hidden="true">
              <span className="material-symbols-outlined text-4xl">waves</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-on-surface group-hover:text-primary transition-colors mb-2">Mundo Tranquilo</h3>
              <p className="text-sm text-on-surface-variant">Ejercicios de respiración guiada para la calma.</p>
            </div>
          </Link>

          {/* Card La Maleta Mágica */}
          <Link to="/maleta-magica" state={{ transitionType: 'push' }} aria-label="La Maleta Mágica – Un viaje imaginativo" className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center gap-4 bouncy-hover group focus:ring-4 focus:ring-primary/50 outline-none">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors" aria-hidden="true">
              <span className="material-symbols-outlined text-4xl">luggage</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-on-surface group-hover:text-primary transition-colors mb-2">La Maleta Mágica</h3>
              <p className="text-sm text-on-surface-variant">Un viaje imaginativo para guardar nuestras preocupaciones.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
