import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
  isBackgroundMusicPlaying: boolean;
  toggleBackgroundMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);

  const toggleBackgroundMusic = () => {
    setIsBackgroundMusicPlaying((prev) => !prev);
    if (!isBackgroundMusicPlaying) {
      console.log("Música de fondo: ACTIVADA (Global)");
      // play background music logic
    } else {
      console.log("Música de fondo: DESACTIVADA (Global)");
      // pause background music logic
    }
  };

  return (
    <AudioContext.Provider value={{ isBackgroundMusicPlaying, toggleBackgroundMusic }}>
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
