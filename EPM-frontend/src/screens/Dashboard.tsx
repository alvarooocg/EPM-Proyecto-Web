import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface">
      <header className="w-full flex items-center justify-between mb-8">
        <h1 className="font-headline font-bold text-2xl">Progreso Infantil</h1>
        <Link to="/" aria-label="Volver al inicio" state={{ transitionType: 'none' }} className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface">
          <span className="material-symbols-outlined">close</span>
        </Link>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {/* Left column - Charts */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30">
            <h2 className="font-bold text-xl mb-6">Tiempo de Uso y Actividades</h2>
            <div className="h-64 flex items-end justify-center gap-4 border-b border-outline-variant/50 pb-4">
              {/* Fake chart columns */}
              {[40, 70, 45, 90, 60, 30, 80].map((height, i) => (
                <div key={i} className="w-12 bg-primary/20 rounded-t-md relative group">
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-md" style={{ height: `${height}%` }}></div>
                  <span className="absolute -bottom-6 w-full text-center text-xs text-on-surface-variant">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30">
             <h2 className="font-bold text-xl mb-6">Emociones Registradas</h2>
             <div className="flex justify-around items-center h-40">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-tertiary">45%</div>
                  <span className="material-symbols-outlined text-tertiary mt-2">sentiment_satisfied</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-secondary">30%</div>
                  <span className="material-symbols-outlined text-secondary mt-2">sentiment_neutral</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">25%</div>
                  <span className="material-symbols-outlined text-primary mt-2">self_improvement</span>
                </div>
             </div>
          </section>
        </div>

        {/* Right column - Stats */}
        <div className="space-y-6">
           <section className="bg-surface-container glass-panel rounded-3xl p-6 border border-outline-variant/30">
            <h2 className="font-bold text-lg mb-4">Planetas Visitados</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-secondary"><span className="material-symbols-outlined">diversity_3</span> Relación</span>
                <span className="font-bold">12h</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-primary"><span className="material-symbols-outlined">self_improvement</span> Me Relajo</span>
                <span className="font-bold">8h</span>
              </li>
            </ul>
          </section>

          <section className="bg-surface-container-high rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-5xl text-tertiary mb-2">military_tech</span>
            <h3 className="font-bold text-xl mb-1">Viajero Frecuente</h3>
            <p className="text-sm text-on-surface-variant">Logro desbloqueado por 7 días de juego consecutivo.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
