import React, { useEffect, useState, useRef, useCallback } from 'react';

// Emotion definitions
const EMOTIONS = [
  { key: "happy",     emoji: "😊", color: "#FFE08A", deep: "#F5C44A", face: "happy" },
  { key: "sad",       emoji: "😢", color: "#BFD9F2", deep: "#7AAEDB", face: "sad" },
  { key: "angry",     emoji: "😠", color: "#FBC0BA", deep: "#E88A82", face: "angry" },
  { key: "scared",    emoji: "😨", color: "#D6E4D5", deep: "#9DC0A0", face: "scared" },
  { key: "excited",   emoji: "🤩", color: "#FFD2A6", deep: "#F5A26A", face: "excited" },
  { key: "surprised", emoji: "😲", color: "#E2D2F5", deep: "#B79AE0", face: "surprised" },
];

// Audio: TTS + sound effects
const SoundFX = {
  ctx: null as any,
  ensure() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {}
    }
    return this.ctx;
  },
  beep(freq = 523, dur = 0.18, vol = 0.18, type = "sine", when = 0) {
    if (!(window as any).__soundOn) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    (osc as any).type = type;
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
    this.beep(784, 0.16, 0.12, "sine", 0.08);
    this.beep(1047, 0.22, 0.14, "sine", 0.18);
  },
  pop() {
    this.beep(880, 0.08, 0.14, "triangle");
  },
  soft() {
    this.beep(440, 0.3, 0.06, "sine");
  },
  err() {
    this.beep(220, 0.15, 0.1, "sawtooth");
  },
};

function speak(text: string, lang = "es", rate = 0.95) {
  if (!(window as any).__soundOn) return;
  if (!window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "en" ? "en-US" : "es-ES";
    u.rate = rate;
    u.pitch = 1.15;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

// Star mascot
function Star({ pose = "hello", size = 180, message = null, mood = "cheer", floating = true, style = {} }: any) {
  const src: any = {
    hello: "/assets/star-hello.png",
    magic: "/assets/star-magic.png",
    thinking: "/assets/star-thinking.png",
    relax: "/assets/star-relax.png",
    social: "/assets/stars-social.png",
  }[pose] || "/assets/star-hello.png";

  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <div style={{
        width: size,
        height: size * 0.62,
        animation: floating ? "float-slow 4s ease-in-out infinite" : "none",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          inset: "-10%",
          background: "radial-gradient(circle, rgba(255,224,138,0.5) 0%, transparent 60%)",
          animation: "pulse-glow 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <img src={src} alt="Estela" style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 8px 20px rgba(120, 80, 160, 0.18))",
          position: "relative",
        }} />
      </div>
      {message && (
        <div style={{
          position: "absolute",
          left: "85%",
          top: "5%",
          background: "white",
          borderRadius: "24px 24px 24px 6px",
          padding: "14px 20px",
          minWidth: 180,
          maxWidth: 280,
          boxShadow: "0 6px 20px rgba(120, 80, 160, 0.15)",
          fontFamily: "Fredoka, sans-serif",
          fontSize: 18,
          fontWeight: 500,
          color: "#4A3A55",
          animation: "pop-in 0.5s ease-out",
          zIndex: 5,
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

// Topbar
function Topbar({ title, onBack, onHome, progress = null, accent = "#F5C44A" }: any) {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 84,
      display: "flex",
      alignItems: "center",
      padding: "0 32px",
      gap: 20,
      zIndex: 50,
    }}>
      {onBack && (
        <button onClick={onBack} aria-label="Volver" style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: "rgba(50, 25, 90, 0.92)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
          border: '2px solid rgba(255, 255, 255, 0.38)',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          transition: "transform 0.15s",
          cursor: 'pointer'
        }}
          onMouseDown={(e: any) => e.currentTarget.style.transform = "scale(0.92)"}
          onMouseUp={(e: any) => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={(e: any) => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {title && (
        <div className="display-h" style={{
          fontSize: 26,
          color: "white",
          background: "rgba(50, 25, 90, 0.92)",
          backdropFilter: "blur(8px)",
          padding: "12px 24px",
          borderRadius: 32,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
          border: '1.5px solid rgba(255, 255, 255, 0.30)',
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: accent, display: "inline-block" }} />
          {title}
        </div>
      )}
      <div style={{ flex: 1 }} />
      {progress && (
        <div style={{
          background: "white",
          padding: "10px 20px",
          borderRadius: 30,
          boxShadow: "0 4px 14px rgba(120, 80, 160, 0.10)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "Fredoka, sans-serif",
          fontWeight: 500,
          fontSize: 17,
        }}>
          {progress}
        </div>
      )}
      {onHome && (
        <button onClick={onHome} aria-label="Inicio" style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: "white",
          boxShadow: "0 4px 14px rgba(120, 80, 160, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: 'none',
          cursor: 'pointer'
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4A3A55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.5z" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Confetti
function fireConfetti(colors = ["#FFE08A", "#F5C44A", "#FBC0BA", "#C7B5E8", "#A8DDB5", "#A6CDE8"]) {
  if (!(window as any).__animOn) return;
  const root = document.body;
  const div = document.createElement("div");
  div.className = "confetti";
  for (let i = 0; i < 40; i++) {
    const s = document.createElement("span");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = "-20px";
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    s.style.animationDelay = (Math.random() * 0.4) + "s";
    s.style.animationDuration = (1.2 + Math.random() * 0.6) + "s";
    s.style.transform = `rotate(${Math.random() * 360}deg)`;
    div.appendChild(s);
  }
  root.appendChild(div);
  setTimeout(() => div.remove(), 2400);
}

// Decorative star sprinkles
function StarSprinkles({ count = 8, color = "#F5C44A", area = "100% 100%" }: any) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const s = 8 + Math.random() * 14;
    const d = Math.random() * 3;
    stars.push(
      <svg key={i} width={s} height={s} viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          animation: `twinkle ${2 + Math.random() * 2}s ease-in-out ${d}s infinite`,
          color,
        }}>
        <path fill="currentColor" d="M12 2l2.6 6.5 7 .6-5.3 4.6 1.6 6.8L12 16.8 6.1 20.5 7.7 13.7 2.4 9.1l7-.6L12 2z" />
      </svg>
    );
  }
  return <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{stars}</div>;
}

// Emotion button
function EmotionButton({ emo, t, onClick, selected = false, size = 130 }: any) {
  return (
    <button
      onClick={onClick}
      className="btn-emotion"
      aria-label={t?.emotions?.[emo.key] || emo.key}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: selected ? emo.deep : emo.color,
        boxShadow: selected
          ? `0 0 0 6px white, 0 0 0 12px ${emo.deep}, 0 8px 24px rgba(120, 80, 160, 0.25)`
          : "0 6px 18px rgba(120, 80, 160, 0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        transition: "transform 0.18s, box-shadow 0.18s",
        cursor: "pointer",
        position: "relative",
        border: 'none'
      }}
      onMouseDown={(e: any) => e.currentTarget.style.transform = "scale(0.92)"}
      onMouseUp={(e: any) => e.currentTarget.style.transform = "scale(1.06)"}
      onMouseEnter={(e: any) => e.currentTarget.style.transform = "scale(1.06)"}
      onMouseLeave={(e: any) => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ fontSize: size * 0.5, lineHeight: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}>
        {emo.emoji}
      </div>
      <div className="display" style={{
        fontSize: size * 0.13,
        color: "#4A3A55",
        fontWeight: 600,
        marginTop: 2,
      }}>
        {t?.emotions?.[emo.key] || ""}
      </div>
    </button>
  );
}

// Decorative planet
function PlanetSphere({ tone = "warm", size = 260, hasRing = false, label }: any) {
  const palettes: any = {
    warm: { c1: "#FFD89E", c2: "#F5A26A", c3: "#E88A6C", ring: "#FFE08A" },
    rose: { c1: "#FBD5DC", c2: "#F5A6B5", c3: "#D879A0", ring: "#E2D2F5" },
    calm: { c1: "#D6EAF8", c2: "#A6CDE8", c3: "#7DA8C9", ring: "#D6F0DC" },
  };
  const p = palettes[tone];
  return (
    <div style={{ position: "relative", width: size, height: size, display: "inline-block" }}>
      {hasRing && (
        <div style={{
          position: "absolute",
          left: "-15%",
          top: "40%",
          width: "130%",
          height: "30%",
          border: `8px solid ${p.ring}`,
          borderRadius: "50%",
          transform: "rotate(-15deg)",
          opacity: 0.65,
          pointerEvents: "none",
        }} />
      )}
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${p.c1} 0%, ${p.c2} 55%, ${p.c3} 100%)`,
        boxShadow: `inset -20px -25px 40px rgba(0,0,0,0.12), 0 16px 40px rgba(120, 80, 160, 0.25)`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(circle at 60% 35%, rgba(255,255,255,0.25) 0 8%, transparent 9%),
             radial-gradient(circle at 25% 65%, rgba(255,255,255,0.18) 0 6%, transparent 7%),
             radial-gradient(circle at 70% 75%, rgba(0,0,0,0.06) 0 5%, transparent 6%)`,
        }} />
      </div>
      {label && (
        <div className="display-h" style={{
          position: "absolute",
          bottom: -54,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 24,
          color: "var(--ink)",
        }}>{label}</div>
      )}
    </div>
  );
}

// Initialize globals
(window as any).EMOTIONS = EMOTIONS;
(window as any).SoundFX = SoundFX;
(window as any).speak = speak;
(window as any).Star = Star;
(window as any).Topbar = Topbar;
(window as any).fireConfetti = fireConfetti;
(window as any).StarSprinkles = StarSprinkles;
(window as any).EmotionButton = EmotionButton;
(window as any).PlanetSphere = PlanetSphere;
(window as any).__soundOn = true;
(window as any).__animOn = true;
(window as any).__lang = "es";

export { EMOTIONS, SoundFX, speak, Star, Topbar, fireConfetti, StarSprinkles, EmotionButton, PlanetSphere };
