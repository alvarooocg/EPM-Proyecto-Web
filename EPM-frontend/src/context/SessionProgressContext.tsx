import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  ActivityKey,
  ActivityPayload,
  EMPTY_PROGRESS,
  PlanetKey,
  SessionProgress,
} from '../types/progress';

const STORAGE_KEY = 'epm_progress';

interface SessionProgressContextValue {
  progress: SessionProgress;
  recordActivity: (planet: PlanetKey, activity: ActivityKey, payload: ActivityPayload) => void;
  markPlanetVisited: (planet: PlanetKey) => void;
  resetProgress: () => void;
}

const SessionProgressContext = createContext<SessionProgressContextValue | null>(null);

function readFromStorage(): SessionProgress {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS();
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return EMPTY_PROGRESS();
    return {
      startedAt: typeof parsed.startedAt === 'number' ? parsed.startedAt : Date.now(),
      activities: parsed.activities && typeof parsed.activities === 'object' ? parsed.activities : {},
      visitedPlanets: Array.isArray(parsed.visitedPlanets) ? parsed.visitedPlanets : [],
    };
  } catch {
    return EMPTY_PROGRESS();
  }
}

export function SessionProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<SessionProgress>(readFromStorage);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Quota exceeded or storage disabled — silently ignore.
    }
  }, [progress]);

  const recordActivity = useCallback((planet: PlanetKey, activity: ActivityKey, payload: ActivityPayload) => {
    setProgress(prev => ({
      ...prev,
      activities: { ...prev.activities, [`${planet}.${activity}`]: payload },
      visitedPlanets: prev.visitedPlanets.includes(planet)
        ? prev.visitedPlanets
        : [...prev.visitedPlanets, planet],
    }));
  }, []);

  const markPlanetVisited = useCallback((planet: PlanetKey) => {
    setProgress(prev =>
      prev.visitedPlanets.includes(planet)
        ? prev
        : { ...prev, visitedPlanets: [...prev.visitedPlanets, planet] }
    );
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(EMPTY_PROGRESS());
  }, []);

  return (
    <SessionProgressContext.Provider value={{ progress, recordActivity, markPlanetVisited, resetProgress }}>
      {children}
    </SessionProgressContext.Provider>
  );
}

export function useSessionProgress() {
  const ctx = useContext(SessionProgressContext);
  if (!ctx) {
    throw new Error('useSessionProgress must be used within a SessionProgressProvider');
  }
  return ctx;
}
