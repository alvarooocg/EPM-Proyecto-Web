import React, { useState, useEffect, useRef } from 'react';
import '../styles/animations.css';
import PlanetScreen, { PlanetConfig } from './PlanetScreen';
import { ActivityPayload } from '../types/progress';

// Activity 1: Mundo tranquilo
function A3_1_Quiet({ t, onComplete, onBack }: any) {
  const [popped, setPopped] = useState(0);
  const startedAtRef = useRef<number>(Date.now());

  const onTap = () => {
    setPopped((p: number) => p + 1);
    if (window.SoundFX?.beep) {
      window.SoundFX.beep(660 + Math.random() * 200, 0.4, 0.04, "sine");
    }
  };

  const clouds = Array.from({ length: 5 }).map((_, i) => ({
    id: i, top: 10 + i * 15 + Math.random() * 8, left: -10,
    duration: 25 + i * 5, scale: 0.8 + Math.random() * 0.5, delay: i * 4,
  }));
  const bubbles = Array.from({ length: 8 }).map((_, i) => ({
    id: i, left: 10 + i * 11, duration: 8 + Math.random() * 6, delay: i * 1.2,
    size: 30 + Math.random() * 40,
  }));
  const twinklestars = Array.from({ length: 14 }).map((_, i) => ({
    id: i, top: Math.random() * 70, left: Math.random() * 100,
    size: 14 + Math.random() * 16, delay: Math.random() * 3,
  }));

  return (
    <div style={{
      position: "absolute", inset: 0, padding: "100px 60px 40px",
      background: "linear-gradient(180deg, #D6EAF8 0%, #E8DDF5 60%, #FBD5DC 100%)",
      overflow: "hidden",
    }}>
      <window.Topbar onBack={onBack} title={t.a3_1.name} accent="#A6CDE8"
        progress={<span>{popped} 💫</span>} />

      {clouds.map((c: any) => (
        <div key={c.id} onClick={onTap}
          style={{
            position: "absolute", top: `${c.top}%`, left: 0,
            animation: `drift-x ${c.duration}s linear ${c.delay}s infinite`,
            transform: `scale(${c.scale})`,
            cursor: "pointer", userSelect: "none",
          }}
        >
          <Cloud />
        </div>
      ))}

      {twinklestars.map((s: any) => (
        <button key={s.id} onClick={onTap}
          style={{
            position: "absolute", top: `${s.top}%`, left: `${s.left}%`,
            width: s.size, height: s.size, padding: 0, border: 0,
            background: "transparent",
            animation: `twinkle ${3 + Math.random() * 2}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path fill="#F5C44A" stroke="white" strokeWidth="1"
              d="M12 2l2.6 6.5 7 .6-5.3 4.6 1.6 6.8L12 16.8 6.1 20.5 7.7 13.7 2.4 9.1l7-.6L12 2z" />
          </svg>
        </button>
      ))}

      {bubbles.map((b: any) => (
        <button key={b.id} onClick={onTap}
          style={{
            position: "absolute", left: `${b.left}%`, bottom: 0,
            width: b.size, height: b.size, borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(214,234,248,0.5) 60%, rgba(167,205,232,0.3))",
            border: "2px solid rgba(255,255,255,0.6)",
            animation: `bubble-up ${b.duration}s linear ${b.delay}s infinite`,
            cursor: "pointer",
          }}
        />
      ))}

      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        pointerEvents: "none",
      }}>
        <window.Star pose="relax" size={300} message={t.quiet.hint} />
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)" }}>
        <button onClick={() => {
          if (window.SoundFX) window.SoundFX.chime();
          onComplete({
            type: 'a3_1',
            tapsCount: popped,
            durationMs: Date.now() - startedAtRef.current,
            timestamp: Date.now(),
          });
        }}
          className="display-h"
          style={{
            fontSize: 22, padding: "14px 36px", borderRadius: 30,
            background: "rgba(255,255,255,0.92)", color: "#2A2440", fontWeight: 700,
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 22px rgba(120, 80, 160, 0.18)", minHeight: 60,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          🌙 {t.finish}
        </button>
      </div>
    </div>
  );
}

function Cloud() {
  return (
    <svg width="160" height="80" viewBox="0 0 160 80">
      <ellipse cx="40" cy="50" rx="30" ry="22" fill="white" opacity="0.9" />
      <ellipse cx="70" cy="42" rx="32" ry="26" fill="white" opacity="0.95" />
      <ellipse cx="100" cy="48" rx="30" ry="24" fill="white" opacity="0.9" />
      <ellipse cx="125" cy="55" rx="22" ry="18" fill="white" opacity="0.85" />
    </svg>
  );
}

// Activity 2: Respiramos con la estrella
function A3_2_Breathe({ t, onComplete, onBack }: any) {
  const [phase, setPhase] = useState("inhale");
  const [cycles, setCycles] = useState(0);
  const [running, setRunning] = useState(false);
  const timeoutRef = useRef<any>(null);
  const pausedCountRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const seq = [
      { p: "inhale", d: 4000 },
      { p: "hold", d: 1500 },
      { p: "exhale", d: 5000 },
    ];
    let i = 0;

    const tick = () => {
      const cur = seq[i];
      setPhase(cur.p);
      timeoutRef.current = setTimeout(() => {
        i++;
        if (i >= seq.length) {
          i = 0;
          setCycles((c: number) => c + 1);
        }
        tick();
      }, cur.d);
    };
    tick();
    return () => clearTimeout(timeoutRef.current);
  }, [running]);

  useEffect(() => {
    if (cycles >= 4) {
      setRunning(false);
      if (window.SoundFX) window.SoundFX.chime();
    }
  }, [cycles]);

  const phaseLabel: any = { inhale: t.breathe.inhale, hold: t.breathe.hold, exhale: t.breathe.exhale };
  const finished = cycles >= 4;

  const circleStyle: any = (() => {
    if (!running) return { transform: "scale(0.7)", transition: "transform 0.6s" };
    if (phase === "inhale") return { transform: "scale(1.5)", transition: "transform 4s ease-in-out" };
    if (phase === "hold") return { transform: "scale(1.5)", transition: "transform 1.5s linear" };
    if (phase === "exhale") return { transform: "scale(0.7)", transition: "transform 5s ease-in-out" };
    return {};
  })();

  return (
    <div style={{
      position: "absolute", inset: 0, padding: "100px 60px 40px",
      background: "linear-gradient(180deg, #E8DDF5 0%, #D6EAF8 100%)",
      overflow: "hidden",
    }}>
      <window.Topbar onBack={onBack} title={t.a3_2.name} accent="#C7B5E8"
        progress={<span>{Math.min(cycles, 4)}/4 {t.breathe.cycles}</span>} />
      <window.StarSprinkles count={10} color="#C7B5E8" />

      <div style={{ display: "flex", alignItems: "center", gap: 30, maxWidth: 1280, margin: "0 auto" }}>
        <window.Star pose="relax" size={170}
          message={finished ? t.breathe.finished : (running ? phaseLabel[phase] : t.a3_2.lead)} />
      </div>

      <div style={{
        position: "absolute", left: "50%", top: "55%", transform: "translate(-50%, -50%)",
        width: 360, height: 360,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "3px dashed rgba(199, 181, 232, 0.6)",
        }} />
        <div style={{
          width: 240, height: 240, borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #FFE08A, #F5A26A)",
          boxShadow: "0 0 60px rgba(245, 196, 74, 0.4)",
          ...circleStyle,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div className="display-h" style={{
            fontSize: 32, color: "white",
            textShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}>
            {running ? phaseLabel[phase] : (finished ? "✓" : "🫁")}
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 16,
      }}>
        {!running && !finished && (
          <button onClick={() => { setRunning(true); setCycles(0); }}
            className="display-h"
            style={{
              fontSize: 24, padding: "16px 44px", borderRadius: 32,
              background: "linear-gradient(180deg, #C7B5E8, #A88BD1)",
              color: "white", boxShadow: "0 8px 22px rgba(168, 139, 209, 0.45)",
              minHeight: 64,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ▶ Empezar
          </button>
        )}
        {running && (
          <button onClick={() => { pausedCountRef.current += 1; setRunning(false); }}
            className="display-h"
            style={{
              fontSize: 22, padding: "14px 32px", borderRadius: 30,
              background: "white", color: "#2A2440", fontWeight: 700,
              boxShadow: "0 6px 16px rgba(120, 80, 160, 0.18)", minHeight: 60,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ⏸ Pausar
          </button>
        )}
        {finished && (
          <button onClick={() => {
            if (window.fireConfetti) window.fireConfetti();
            onComplete({
              type: 'a3_2',
              cyclesCompleted: Math.min(cycles, 4),
              pausedCount: pausedCountRef.current,
              timestamp: Date.now(),
            });
          }}
            className="display-h"
            style={{
              fontSize: 24, padding: "16px 44px", borderRadius: 32,
              background: "linear-gradient(180deg, #A8DDB5, #7BC189)",
              color: "white", boxShadow: "0 8px 22px rgba(123, 193, 137, 0.45)",
              minHeight: 64,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ✨ {t.finish}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Planet3Screen({ t, onBack, onActivityComplete, completed }: any) {
  const config: PlanetConfig = {
    planetId: 3,
    planetKey: 'p3',
    tone: 'calm',
    accentColor: '#A6CDE8',
    planetImage: '/relax-epm.png',
    description: 'Aquí encontrarás calma, respira despacio y descubre cómo relajarte.',
    guideInstruction: '¡Escoge una actividad para encontrar la calma!',
    sprinklesColor: '#A6CDE8',
    activities: [
      { key: 'a1', info: t.a3_1, emoji: '☁️', color: '#D6EAF8' },
      { key: 'a2', info: t.a3_2, emoji: '🫁', color: '#E2D2F5' },
    ],
  };

  return (
    <PlanetScreen
      config={config}
      t={t}
      onBack={onBack}
      onActivityComplete={onActivityComplete}
      completed={completed}
      renderActivity={(key, actBack, actComplete: (p: ActivityPayload) => void) => {
        if (key === 'a1') return <A3_1_Quiet t={t} onBack={actBack} onComplete={actComplete} />;
        if (key === 'a2') return <A3_2_Breathe t={t} onBack={actBack} onComplete={actComplete} />;
        return null;
      }}
    />
  );
}
