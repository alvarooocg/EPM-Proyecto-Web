/**
 * Ambient audio system for "El Planeta de las Emociones".
 * Generates all soundscapes programmatically via the Web Audio API.
 * No external audio files are required.
 *
 * Signal chain per theme:
 *   droneOsc[n] → droneGain → masterFilter → masterGain → ctx.destination
 *   melodyOsc   → noteGain  → masterFilter
 */

export type ThemeKey = 'home' | 'p1' | 'p2' | 'p3';

interface ThemeConfig {
  droneFreqs: number[];
  melodyNotes: number[];
  masterGainTarget: number;
  filterFreq: number;
  noteTempo: number;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  home: {
    droneFreqs: [110, 146.8, 220],
    melodyNotes: [440, 523.3, 659.3, 440, 587.3],
    masterGainTarget: 0.10,
    filterFreq: 650,
    noteTempo: 2600,
  },
  p1: {
    droneFreqs: [261.6, 329.6, 392.0, 523.3],
    melodyNotes: [1046.5, 1318.5, 783.9, 1046.5, 659.3],
    masterGainTarget: 0.12,
    filterFreq: 1400,
    noteTempo: 1700,
  },
  p2: {
    droneFreqs: [174.6, 220.0, 261.6, 349.2],
    melodyNotes: [698.5, 880.0, 1046.5, 880.0],
    masterGainTarget: 0.11,
    filterFreq: 1000,
    noteTempo: 2100,
  },
  p3: {
    droneFreqs: [98.0, 130.8, 196.0],
    melodyNotes: [392.0, 493.9, 587.3, 392.0],
    masterGainTarget: 0.09,
    filterFreq: 500,
    noteTempo: 3400,
  },
};

class AmbientAudio {
  isPlaying: boolean = false;

  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private masterFilter: BiquadFilterNode | null = null;

  private droneOscs: OscillatorNode[] = [];
  private noteTimer: ReturnType<typeof setInterval> | null = null;
  private melodyIndex: number = 0;
  private currentTheme: ThemeKey | null = null;

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private ensureCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();

      // Master filter (lowpass)
      this.masterFilter = this.ctx.createBiquadFilter();
      this.masterFilter.type = 'lowpass';

      // Master gain (starts at 0 for fade-in)
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;

      // Chain: masterFilter → masterGain → destination
      this.masterFilter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    return this.ctx;
  }

  private stopThemeNodes(): void {
    if (this.noteTimer !== null) {
      clearInterval(this.noteTimer);
      this.noteTimer = null;
    }

    const stopTime = this.ctx ? this.ctx.currentTime + 0.05 : 0;
    for (const osc of this.droneOscs) {
      try {
        osc.stop(stopTime);
      } catch {
        // Oscillator may already be stopped; silently ignore.
      }
    }
    this.droneOscs = [];
    this.melodyIndex = 0;
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  play(theme: ThemeKey): void {
    const ctx = this.ensureCtx();
    const config = THEMES[theme];
    this.currentTheme = theme;

    // Apply filter frequency for this theme
    if (this.masterFilter) {
      this.masterFilter.frequency.value = config.filterFreq;
    }

    // Reset gain to 0 before fade-in (handles the case where stop() was called
    // just before and the ramp hasn't reached 0 yet)
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(
        config.masterGainTarget,
        ctx.currentTime + 2.0
      );
    }

    // ---- Drone layer --------------------------------------------------------
    // Two detuned oscillators per frequency create chorus warmth.
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.022 / config.droneFreqs.length;
    droneGain.connect(this.masterFilter!);

    for (const freq of config.droneFreqs) {
      for (const detune of [-5, 5]) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.detune.value = detune;
        osc.connect(droneGain);
        osc.start(ctx.currentTime);
        this.droneOscs.push(osc);
      }
    }

    // ---- Melody layer -------------------------------------------------------
    // Delayed start so the drone establishes the soundscape first.
    const melodyStartDelay = 0.6; // seconds

    const playNote = () => {
      // Use ctx.currentTime inside the callback for accurate scheduling.
      const now = ctx.currentTime;
      const freq = config.melodyNotes[this.melodyIndex % config.melodyNotes.length];
      this.melodyIndex = (this.melodyIndex + 1) % config.melodyNotes.length;

      const noteOsc = ctx.createOscillator();
      noteOsc.type = 'triangle';
      noteOsc.frequency.value = freq;

      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0, now);
      // Attack: 0 → 0.028 over 0.3s
      noteGain.gain.linearRampToValueAtTime(0.028, now + 0.3);
      // Decay: 0.028 → 0.012 at 1.2s
      noteGain.gain.linearRampToValueAtTime(0.012, now + 1.2);
      // Release: 0.012 → 0 at 2.8s
      noteGain.gain.linearRampToValueAtTime(0, now + 2.8);

      noteOsc.connect(noteGain);
      noteGain.connect(this.masterFilter!);

      noteOsc.start(now);
      noteOsc.stop(now + 3.0);
    };

    // First note fires after the initial delay, then every noteTempo ms.
    const melodyDelayMs = melodyStartDelay * 1000;
    const firstNoteTimeout = setTimeout(() => {
      playNote();
      this.noteTimer = setInterval(playNote, config.noteTempo);
    }, melodyDelayMs);

    // Store the timeout reference so stopThemeNodes can cancel it if needed
    // by piggy-backing on noteTimer (we overwrite after timeout fires, which
    // is fine because stopThemeNodes only clears the interval).
    // If stop/setTheme is called before the delay elapses, we need to clear it.
    // We use a separate slot for this edge case.
    this._pendingFirstNote = firstNoteTimeout;

    this.isPlaying = true;
  }

  // Holds the timeout for the first melody note so it can be cancelled on
  // rapid stop/setTheme calls before the 600 ms delay elapses.
  private _pendingFirstNote: ReturnType<typeof setTimeout> | null = null;

  stop(): void {
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const mg = this.masterGain;

    mg.gain.cancelScheduledValues(ctx.currentTime);
    mg.gain.setValueAtTime(mg.gain.value, ctx.currentTime);
    mg.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);

    // Clear the pending first-note timeout if stop is called during the delay
    if (this._pendingFirstNote !== null) {
      clearTimeout(this._pendingFirstNote);
      this._pendingFirstNote = null;
    }

    setTimeout(() => {
      this.stopThemeNodes();
      this.isPlaying = false;
      this.currentTheme = null;
    }, 1600);
  }

  setTheme(theme: ThemeKey): void {
    if (!this.isPlaying) {
      this.play(theme);
      return;
    }

    if (this.currentTheme === theme) {
      return;
    }

    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const mg = this.masterGain;

    // Clear the pending first-note timeout if a theme switch happens quickly
    if (this._pendingFirstNote !== null) {
      clearTimeout(this._pendingFirstNote);
      this._pendingFirstNote = null;
    }

    // Fade out current theme over 1.2s
    mg.gain.cancelScheduledValues(ctx.currentTime);
    mg.gain.setValueAtTime(mg.gain.value, ctx.currentTime);
    mg.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);

    setTimeout(() => {
      this.stopThemeNodes();
      // play() will ramp masterGain from 0 → target over 2s
      this.play(theme);
    }, 1200);
  }
}

export const ambientAudio = new AmbientAudio();
