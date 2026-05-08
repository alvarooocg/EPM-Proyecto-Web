export type EmotionKey = 'happy' | 'sad' | 'angry' | 'scared' | 'excited' | 'surprised';

export type PlanetKey = 'p1' | 'p2' | 'p3';

export type ActivityKey = 'a1' | 'a2' | 'a3';

export interface A1_1_Data {
  type: 'a1_1';
  emotion: EmotionKey;
  timestamp: number;
}

export interface A1_2_Data {
  type: 'a1_2';
  packed: string[];
  durationMs: number;
  timestamp: number;
}

export interface A1_3_Data {
  type: 'a1_3';
  exploredEmotions: EmotionKey[];
  lastEmotion: EmotionKey;
  timestamp: number;
}

export interface A2_1_Data {
  type: 'a2_1';
  correctOnFirstTry: number;
  totalRounds: number;
  mistakes: EmotionKey[];
  timestamp: number;
}

export interface A2_2_Data {
  type: 'a2_2';
  choice: 'hug' | 'help' | 'share' | 'ignore';
  positive: boolean;
  attempts: number;
  timestamp: number;
}

export interface A3_1_Data {
  type: 'a3_1';
  tapsCount: number;
  durationMs: number;
  timestamp: number;
}

export interface A3_2_Data {
  type: 'a3_2';
  cyclesCompleted: number;
  pausedCount: number;
  timestamp: number;
}

export type ActivityPayload =
  | A1_1_Data
  | A1_2_Data
  | A1_3_Data
  | A2_1_Data
  | A2_2_Data
  | A3_1_Data
  | A3_2_Data;

export interface SessionProgress {
  startedAt: number;
  activities: Record<string, ActivityPayload>;
  visitedPlanets: PlanetKey[];
}

export const EMPTY_PROGRESS = (): SessionProgress => ({
  startedAt: Date.now(),
  activities: {},
  visitedPlanets: [],
});
