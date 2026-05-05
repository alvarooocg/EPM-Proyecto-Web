// Audio Manager - SoundFX and Text-to-Speech
interface AudioContextType extends AudioContext {}

export const SoundFX = {
  ctx: null as AudioContextType | null,

  ensure() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {}
    }
    return this.ctx;
  },

  beep(freq = 523, dur = 0.18, vol = 0.18, type: OscillatorType = 'sine', when = 0) {
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    if (!soundEnabled) return;

    const ctx = this.ensure();
    if (!ctx) return;

    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  },

  chime() {
    this.beep(659, 0.12, 0.12);
    this.beep(784, 0.16, 0.12, 'sine', 0.08);
    this.beep(1047, 0.22, 0.14, 'sine', 0.18);
  },

  pop() {
    this.beep(880, 0.08, 0.14, 'triangle');
  },

  soft() {
    this.beep(440, 0.3, 0.06, 'sine');
  },

  error() {
    this.beep(220, 0.15, 0.1, 'sawtooth');
  },
};

export function speak(text: string, lang = 'es', rate = 0.95) {
  const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  if (!soundEnabled) return;

  if (!window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'es-ES';
    utterance.rate = rate;
    utterance.pitch = 1.15;
    window.speechSynthesis.speak(utterance);
  } catch (e) {}
}

export function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    vx: (Math.random() - 0.5) * 8,
    vy: Math.random() * 4 + 2,
    life: 1,
    emoji: ['🎉', '✨', '🎊', '⭐', '🌟'][Math.floor(Math.random() * 5)],
  }));

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.life -= 0.01;

      ctx.globalAlpha = p.life;
      ctx.font = 'bold 30px Arial';
      ctx.fillText(p.emoji, p.x, p.y);
    });

    if (particles.some((p) => p.life > 0)) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  };

  animate();
}
