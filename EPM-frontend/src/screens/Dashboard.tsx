import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function Dashboard() {
  return (
    <div className="h-screen w-full flex flex-col bg-surface overflow-hidden">
      {/* Header – the NavigationButton is fixed at top-left, so we add padding to avoid it */}
      <header className="w-full flex items-center justify-center pt-5 pb-3 px-6 shrink-0" role="banner">
        <NavigationButton to="/" label="Volver a El Universo" />
        <h1 className="font-headline font-bold text-xl md:text-2xl text-center">Progreso Infantil</h1>
      </header>

      <main
        className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 pb-4 overflow-hidden min-h-0"
        aria-label="Panel de progreso del niño"
      >
        {/* Left column - Charts */}
        <div className="md:col-span-2 flex flex-col gap-4 min-h-0 overflow-hidden">
          <section
            className="bg-surface-container glass-panel rounded-2xl p-4 border border-outline-variant/30 flex-1 min-h-0 flex flex-col"
            aria-label="Gráfico de tiempo de uso semanal"
          >
            <h2 className="font-bold text-base md:text-lg mb-3 shrink-0">Tiempo de Uso y Actividades</h2>
            <div className="flex-1 flex items-end justify-center gap-3 border-b border-outline-variant/50 pb-3 min-h-0" role="img" aria-label="Gráfico de barras: Lunes 40%, Martes 70%, Miércoles 45%, Jueves 90%, Viernes 60%, Sábado 30%, Domingo 80%">
              {/* Fake chart columns */}
              {[40, 70, 45, 90, 60, 30, 80].map((height, i) => (
                <div key={i} className="w-10 md:w-12 bg-primary/20 rounded-t-md relative group flex-shrink-0" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%` }}
                    aria-hidden="true"
                  />
                  <span className="absolute -bottom-5 w-full text-center text-[10px] md:text-xs text-on-surface-variant" aria-hidden="true">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section
            className="bg-surface-container glass-panel rounded-2xl p-4 border border-outline-variant/30 shrink-0"
            aria-label="Resumen de emociones registradas"
          >
            <h2 className="font-bold text-base md:text-lg mb-3">Emociones Registradas</h2>
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center" role="group" aria-label="Feliz: 45 por ciento">
                <div className="text-2xl md:text-3xl font-bold text-tertiary">45%</div>
                <span className="material-symbols-outlined text-tertiary mt-1" aria-hidden="true">sentiment_satisfied</span>
                <span className="text-xs text-on-surface-variant mt-1">Feliz</span>
              </div>
              <div className="flex flex-col items-center" role="group" aria-label="Neutral: 30 por ciento">
                <div className="text-2xl md:text-3xl font-bold text-secondary">30%</div>
                <span className="material-symbols-outlined text-secondary mt-1" aria-hidden="true">sentiment_neutral</span>
                <span className="text-xs text-on-surface-variant mt-1">Neutral</span>
              </div>
              <div className="flex flex-col items-center" role="group" aria-label="Calmado: 25 por ciento">
                <div className="text-2xl md:text-3xl font-bold text-primary">25%</div>
                <span className="material-symbols-outlined text-primary mt-1" aria-hidden="true">self_improvement</span>
                <span className="text-xs text-on-surface-variant mt-1">Calmado</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right column - Stats */}
        <div className="flex flex-col gap-4 min-h-0 overflow-hidden">
          <section
            className="bg-surface-container glass-panel rounded-2xl p-4 border border-outline-variant/30 flex-1 min-h-0"
            aria-label="Planetas visitados"
          >
            <h2 className="font-bold text-base md:text-lg mb-3">Planetas Visitados</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined" aria-hidden="true">diversity_3</span>
                  Relación
                </span>
                <span className="font-bold">12h</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">self_improvement</span>
                  Me Relajo
                </span>
                <span className="font-bold">8h</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined" aria-hidden="true">emoji_emotions</span>
                  Me Conozco
                </span>
                <span className="font-bold">6h</span>
              </li>
            </ul>
          </section>

          <section
            className="bg-surface-container-high rounded-2xl p-4 border border-outline-variant/30 flex flex-col items-center text-center shrink-0"
            aria-label="Último logro desbloqueado"
          >
            <span className="material-symbols-outlined text-4xl text-tertiary mb-1" aria-hidden="true">military_tech</span>
            <h3 className="font-bold text-lg mb-1">Viajero Frecuente</h3>
            <p className="text-xs text-on-surface-variant">Logro desbloqueado por 7 días de juego consecutivo.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
