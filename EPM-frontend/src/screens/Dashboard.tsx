import { Link } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import { useSessionProgress } from '../context/SessionProgressContext';
import { lastUnlockedAchievement } from '../utils/achievements';
import {
  A1_1_Data, A1_2_Data, A1_3_Data, A3_1_Data,
  ActivityPayload, EmotionKey, PlanetKey,
} from '../types/progress';

const PLANET_META: { key: PlanetKey; label: string; icon: string; color: string; total: number }[] = [
  { key: 'p1', label: 'Me Conozco', icon: 'emoji_emotions', color: 'text-tertiary', total: 3 },
  { key: 'p2', label: 'Relación', icon: 'diversity_3', color: 'text-secondary', total: 2 },
  { key: 'p3', label: 'Me Relajo', icon: 'self_improvement', color: 'text-primary', total: 2 },
];

function totalDurationByPlanet(progress: ReturnType<typeof useSessionProgress>['progress'], planetKey: PlanetKey): number {
  let ms = 0;
  Object.entries(progress.activities).forEach(([key, raw]) => {
    if (!key.startsWith(`${planetKey}.`)) return;
    const payload = raw as ActivityPayload;
    if (payload.type === 'a1_2') ms += payload.durationMs;
    if (payload.type === 'a3_1') ms += payload.durationMs;
  });
  return ms;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return '—';
  const totalSeconds = Math.round(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds === 0 ? `${minutes}min` : `${minutes}min ${seconds}s`;
}

export default function Dashboard() {
  const { progress } = useSessionProgress();

  const completedByPlanet = PLANET_META.map(p => {
    const count = Object.keys(progress.activities).filter(k => k.startsWith(`${p.key}.`)).length;
    return { ...p, completed: count, percent: Math.round((count / p.total) * 100) };
  });

  // Conteo de emociones registradas (auto-reporte: a1_1 y exploradas en a1_3)
  const emotionCounts: Record<string, number> = {};
  const a1_1 = progress.activities['p1.a1'] as A1_1_Data | undefined;
  const a1_3 = progress.activities['p1.a3'] as A1_3_Data | undefined;
  if (a1_1) emotionCounts[a1_1.emotion] = (emotionCounts[a1_1.emotion] ?? 0) + 1;
  if (a1_3) a1_3.exploredEmotions.forEach(e => { emotionCounts[e] = (emotionCounts[e] ?? 0) + 1; });
  const totalEmotions = Object.values(emotionCounts).reduce((a, b) => a + b, 0);

  const topEmotions: { key: EmotionKey; label: string; icon: string; color: string }[] = [
    { key: 'happy', label: 'Feliz', icon: 'sentiment_satisfied', color: 'text-tertiary' },
    { key: 'excited', label: 'Emocionado', icon: 'celebration', color: 'text-secondary' },
    { key: 'surprised', label: 'Sorprendido', icon: 'sentiment_very_satisfied', color: 'text-primary' },
  ];

  const lastAchievement = lastUnlockedAchievement(progress);

  return (
    <div className="h-screen w-full flex flex-col bg-surface overflow-hidden">
      <header className="w-full flex items-center justify-center pt-5 pb-3 px-6 shrink-0" role="banner">
        <NavigationButton to="/" label="Volver a El Universo" />
        <h1 className="font-headline font-bold text-xl md:text-2xl text-center">Progreso de la sesión</h1>
      </header>

      <main
        className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 pb-4 overflow-hidden min-h-0"
        aria-label="Panel de progreso del niño"
      >
        {/* Left column - Charts */}
        <div className="md:col-span-2 flex flex-col gap-4 min-h-0 overflow-hidden">
          <section
            className="bg-surface-container glass-panel rounded-2xl p-4 border border-outline-variant/30 flex-1 min-h-0 flex flex-col"
            aria-label="Actividades completadas por planeta"
          >
            <h2 className="font-bold text-base md:text-lg mb-3 shrink-0">Actividades por Planeta</h2>
            <div className="flex-1 flex items-end justify-around gap-6 border-b border-outline-variant/50 pb-6 min-h-0">
              {completedByPlanet.map(p => (
                <div key={p.key} className="flex flex-col items-center gap-2 flex-1" role="group" aria-label={`${p.label}: ${p.completed} de ${p.total} actividades`}>
                  <div className="w-full max-w-20 bg-primary/15 rounded-t-md relative" style={{ height: '70%' }}>
                    <div
                      className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all duration-700"
                      style={{ height: `${p.percent}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={`material-symbols-outlined ${p.color}`} aria-hidden="true">{p.icon}</span>
                  <span className="text-[11px] md:text-xs font-medium text-on-surface text-center">{p.label}</span>
                  <span className="text-[10px] md:text-xs text-on-surface-variant">{p.completed}/{p.total}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            className="bg-surface-container glass-panel rounded-2xl p-4 border border-outline-variant/30 shrink-0"
            aria-label="Resumen de emociones registradas"
          >
            <h2 className="font-bold text-base md:text-lg mb-3">Emociones Registradas</h2>
            {totalEmotions === 0 ? (
              <p className="text-sm text-on-surface-variant italic">
                Aún no se han registrado emociones en esta sesión.
              </p>
            ) : (
              <div className="flex justify-around items-center">
                {topEmotions.map(e => {
                  const count = emotionCounts[e.key] ?? 0;
                  const pct = Math.round((count / totalEmotions) * 100);
                  return (
                    <div key={e.key} className="flex flex-col items-center" role="group" aria-label={`${e.label}: ${pct} por ciento`}>
                      <div className={`text-2xl md:text-3xl font-bold ${e.color}`}>{pct}%</div>
                      <span className={`material-symbols-outlined ${e.color} mt-1`} aria-hidden="true">{e.icon}</span>
                      <span className="text-xs text-on-surface-variant mt-1">{e.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right column - Stats */}
        <div className="flex flex-col gap-4 min-h-0 overflow-hidden">
          <section
            className="bg-surface-container glass-panel rounded-2xl p-4 border border-outline-variant/30 flex-1 min-h-0"
            aria-label="Tiempo en planetas"
          >
            <h2 className="font-bold text-base md:text-lg mb-3">Tiempo en Planetas</h2>
            <ul className="space-y-3">
              {PLANET_META.map(p => {
                const ms = totalDurationByPlanet(progress, p.key);
                const visited = progress.visitedPlanets.includes(p.key);
                return (
                  <li key={p.key} className="flex items-center justify-between">
                    <span className={`flex items-center gap-2 ${p.color}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">{p.icon}</span>
                      {p.label}
                    </span>
                    <span className="font-bold text-sm">
                      {visited ? formatDuration(ms) : 'Sin visitar'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section
            className="bg-surface-container-high rounded-2xl p-4 border border-outline-variant/30 flex flex-col items-center text-center shrink-0"
            aria-label="Último logro desbloqueado"
          >
            <span className="material-symbols-outlined text-4xl text-tertiary mb-1" aria-hidden="true">
              {lastAchievement?.icon ?? 'emoji_events'}
            </span>
            <h3 className="font-bold text-lg mb-1">{lastAchievement?.title ?? 'Aún sin logros'}</h3>
            <p className="text-xs text-on-surface-variant">
              {lastAchievement?.desc ?? 'Completa actividades para desbloquear logros.'}
            </p>
            <Link to="/logros" state={{ transitionType: 'push' }} className="mt-2 text-xs text-tertiary underline">
              Ver todos
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
