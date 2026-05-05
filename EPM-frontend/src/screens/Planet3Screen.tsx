import React, { useState, useEffect, useRef } from 'react';
import '../styles/animations.css';

// Activity 1: Mundo tranquilo
function A3_1_Quiet({ t, onComplete, onBack }: any) {
  const [popped, setPopped] = useState(0);

  useEffect(() => {
    if (window.speak) window.speak(t.a3_1.lead, window.__lang);
  }, []);

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
          onComplete();
        }}
          className="display-h"
          style={{
            fontSize: 22, padding: "14px 36px", borderRadius: 30,
            background: "rgba(255,255,255,0.85)", color: "var(--ink)",
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

  useEffect(() => {
    if (window.speak) window.speak(t.a3_2.lead, window.__lang);
  }, []);

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
      if (cur.p === "inhale") {
        if (window.speak) window.speak(t.breathe.inhale, window.__lang, 0.85);
      } else if (cur.p === "exhale") {
        if (window.speak) window.speak(t.breathe.exhale, window.__lang, 0.85);
      }
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
      if (window.speak) window.speak(t.breathe.finished, window.__lang);
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
          <button onClick={() => setRunning(false)}
            className="display-h"
            style={{
              fontSize: 22, padding: "14px 32px", borderRadius: 30,
              background: "white", color: "var(--ink)",
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
            onComplete();
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

// Planet 3 Hub
function Planet3Screen({ t, onBack, onActivityComplete, completed }: any) {
  const [activity, setActivity] = useState<string | null>(null);

  if (activity === "a1") return <A3_1_Quiet t={t} onBack={() => setActivity(null)} onComplete={() => { if (onActivityComplete) onActivityComplete("p3", "a1"); setActivity(null); }} />;
  if (activity === "a2") return <A3_2_Breathe t={t} onBack={() => setActivity(null)} onComplete={() => { if (onActivityComplete) onActivityComplete("p3", "a2"); setActivity(null); }} />;

  const acts = [
    { key: "a1", info: t.a3_1, emoji: "☁️", color: "#D6EAF8" },
    { key: "a2", info: t.a3_2, emoji: "🫁", color: "#E2D2F5" },
  ];

  return (
    <div style={{
      position: "absolute", inset: 0, padding: "100px 60px 40px",
      background: "linear-gradient(180deg, #E8DDF5 0%, #D6EAF8 100%)",
    }}>
      <window.Topbar onBack={onBack} title={`Planeta 3 · ${t.p3.name}`} accent="#A6CDE8" />
      <window.StarSprinkles count={14} color="#A6CDE8" />

      <div style={{ display: "flex", alignItems: "center", gap: 40, maxWidth: 1300, margin: "10px auto 0" }}>
        <div style={{ animation: "float-med 5s ease-in-out infinite" }}>
          <window.PlanetSphere tone="calm" size={220} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="display-h" style={{ fontSize: 48, color: "var(--ink)" }}>{t.p3.name}</div>
          <div className="display" style={{ fontSize: 22, color: "var(--ink-soft)", marginTop: 8 }}>{t.p3.subtitle}</div>
          <div style={{ fontSize: 16, color: "var(--ink-light)", marginTop: 12, maxWidth: 540 }}>
            Aquí encontrarás calma, respira despacio y descubre cómo relajarte.
          </div>
        </div>
        <window.Star pose="relax" size={220} />
      </div>

      <div className="display-h" style={{
        fontSize: 22, color: "var(--ink-soft)", textAlign: "center", marginTop: 28,
      }}>
        {t.chooseActivity}
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28,
        maxWidth: 900, margin: "20px auto 0",
      }}>
        {acts.map((a, idx) => {
          const done = completed?.includes(a.key);
          return (
            <button key={a.key} onClick={() => { if (window.SoundFX) window.SoundFX.pop(); setActivity(a.key); }}
              style={{
                background: "white", borderRadius: 32, padding: "28px 24px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                boxShadow: "0 10px 24px rgba(120, 80, 160, 0.12)",
                cursor: "pointer", minHeight: 280, position: "relative",
                transition: "transform 0.2s",
                border: 'none'
              }}
              onMouseEnter={(e: any) => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseLeave={(e: any) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                fontFamily: "Fredoka", fontWeight: 600, fontSize: 14,
                color: "var(--ink-light)", letterSpacing: "0.06em",
              }}>ACTIVIDAD {idx + 1}</div>
              <div style={{
                width: 110, height: 110, borderRadius: "50%",
                background: a.color, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 56,
                boxShadow: `0 0 0 6px white, 0 0 0 10px ${a.color}88`,
              }}>{a.emoji}</div>
              <div className="display-h" style={{ fontSize: 22, color: "var(--ink)", textAlign: "center" }}>
                {a.info.name}
              </div>
              <div style={{ fontSize: 15, color: "var(--ink-soft)", textAlign: "center", maxWidth: 280 }}>
                {a.info.helper}
              </div>
              {done && (
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: "#7BC189", color: "white", borderRadius: 16, padding: "4px 12px",
                  fontSize: 13, fontFamily: "Fredoka", fontWeight: 600,
                }}>✓ {t.completed}</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Planet3Screen;
