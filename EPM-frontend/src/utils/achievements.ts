import { A1_2_Data, A1_3_Data, A3_2_Data, SessionProgress } from '../types/progress';

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  bgColor: string;
  unlocked: boolean;
}

export function computeAchievements(progress: SessionProgress): Achievement[] {
  const acts = progress.activities;
  const a1_3 = acts['p1.a3'] as A1_3_Data | undefined;
  const a1_2 = acts['p1.a2'] as A1_2_Data | undefined;
  const a3_2 = acts['p3.a2'] as A3_2_Data | undefined;

  return [
    {
      id: 'first-contact',
      title: 'Primer Contacto',
      desc: 'Visitaste tu primer planeta.',
      icon: 'rocket_launch',
      color: 'text-tertiary',
      bgColor: 'bg-tertiary/20',
      unlocked: progress.visitedPlanets.length >= 1,
    },
    {
      id: 'peace-seeker',
      title: 'Buscador de Paz',
      desc: 'Completaste las dos actividades de relajación.',
      icon: 'self_improvement',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      unlocked: 'p3.a1' in acts && 'p3.a2' in acts,
    },
    {
      id: 'emotion-master',
      title: 'Maestro de Emociones',
      desc: 'Exploraste 5 emociones distintas en el espejo mágico.',
      icon: 'sentiment_satisfied',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      unlocked: !!a1_3 && a1_3.exploredEmotions.length >= 5,
    },
    {
      id: 'galactic-explorer',
      title: 'Explorador Galáctico',
      desc: 'Visitaste los tres planetas.',
      icon: 'travel_explore',
      color: 'text-tertiary',
      bgColor: 'bg-tertiary/20',
      unlocked: progress.visitedPlanets.length === 3,
    },
    {
      id: 'full-suitcase',
      title: 'Maleta Llena',
      desc: 'Empacaste 6 o más cosas que te hacen feliz.',
      icon: 'luggage',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      unlocked: !!a1_2 && a1_2.packed.length >= 6,
    },
    {
      id: 'deep-breath',
      title: 'Respiración Profunda',
      desc: 'Completaste 4 ciclos de respiración con la estrella.',
      icon: 'air',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      unlocked: !!a3_2 && a3_2.cyclesCompleted >= 4,
    },
  ];
}

export function lastUnlockedAchievement(progress: SessionProgress): Achievement | null {
  const all = computeAchievements(progress);
  const unlocked = all.filter(a => a.unlocked);
  return unlocked.length === 0 ? null : unlocked[unlocked.length - 1];
}
