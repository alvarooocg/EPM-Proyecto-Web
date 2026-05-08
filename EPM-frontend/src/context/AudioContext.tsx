import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ambientAudio, ThemeKey } from '../utils/ambientAudio';

export interface AudioContextType {
  isBackgroundMusicPlaying: boolean;
  currentTheme: ThemeKey;
  toggleBackgroundMusic: () => void;
  setMusicTheme: (theme: ThemeKey) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('home');

  const toggleBackgroundMusic = useCallback(() => {
    setIsBackgroundMusicPlaying((prev) => {
      const turningOn = !prev;
      if (turningOn) {
        // currentTheme is captured via the functional setState pattern below;
        // we read it from the ref-like setter argument to avoid stale closure.
        setCurrentTheme((theme) => {
          ambientAudio.play(theme);
          return theme;
        });
        (window as Window & { __soundOn?: boolean }).__soundOn = true;
        console.log('Música de fondo: ACTIVADA (Global)');
      } else {
        ambientAudio.stop();
        console.log('Música de fondo: DESACTIVADA (Global)');
      }
      return turningOn;
    });
  }, []);

  const setMusicTheme = useCallback((theme: ThemeKey) => {
    setCurrentTheme(theme);
    if (ambientAudio.isPlaying) {
      ambientAudio.setTheme(theme);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{ isBackgroundMusicPlaying, currentTheme, toggleBackgroundMusic, setMusicTheme }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
