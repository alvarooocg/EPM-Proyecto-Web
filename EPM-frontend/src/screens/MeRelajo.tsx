import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function MeRelajo() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-gradient-to-b from-primary-container/20 to-background">
      <header className="w-full flex items-center justify-between mb-8">
        <Link to="/" state={{ transitionType: 'push_back' }} className="flex items-center gap-2 text-on-surface-variant hover:text-primary bouncy-hover">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          <span className="font-medium">Volver</span>
        </Link>
        <h1 className="font-headline font-bold text-2xl text-primary">Planeta Me Relajo</h1>
        <div className="w-20" /> {/* Spacer */}
      </header>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-8">
        <p className="text-center text-on-surface-variant max-w-lg mx-auto text-lg">
          Actividades de calma y relajación para volver al centro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Card Mundo Tranquilo */}
          <Link
            to="/mundo-tranquilo"
            state={{ transitionType: 'push' }}
            aria-label="Ir a Mundo Tranquilo: ejercicios de respiración guiada para la calma"
            className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center gap-4 bouncy-hover group"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-4xl" aria-hidden="true">waves</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-on-surface group-hover:text-primary transition-colors mb-2" aria-hidden="true">Mundo Tranquilo</h3>
              <p className="text-sm text-on-surface-variant" aria-hidden="true">Ejercicios de respiración guiada para la calma.</p>
            </div>
          </Link>

          {/* Card La Maleta Mágica */}
          <Link
            to="/maleta-magica"
            state={{ transitionType: 'push' }}
            aria-label="Ir a La Maleta Mágica: un viaje imaginativo para guardar nuestras preocupaciones"
            className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center gap-4 bouncy-hover group"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-4xl" aria-hidden="true">luggage</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-on-surface group-hover:text-primary transition-colors mb-2" aria-hidden="true">La Maleta Mágica</h3>
              <p className="text-sm text-on-surface-variant" aria-hidden="true">Un viaje imaginativo para guardar nuestras preocupaciones.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
