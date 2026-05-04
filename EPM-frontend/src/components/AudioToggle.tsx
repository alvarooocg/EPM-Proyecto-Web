import { useAudio } from '../context/AudioContext';

export default function AudioToggle() {
  const { isBackgroundMusicPlaying, toggleBackgroundMusic } = useAudio();

  return (
    <button
      onClick={toggleBackgroundMusic}
      aria-label={isBackgroundMusicPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
      aria-pressed={isBackgroundMusicPlaying}
      className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface shadow-md hover:bg-secondary/20 hover:text-secondary focus:ring-4 focus:ring-secondary/50 outline-none"
    >
      <span className="material-symbols-outlined text-2xl">
        {isBackgroundMusicPlaying ? 'music_note' : 'music_off'}
      </span>
    </button>
  );
}
