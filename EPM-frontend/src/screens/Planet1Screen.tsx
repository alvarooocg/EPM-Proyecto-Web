import React, { useState, useEffect, useRef } from 'react';
import '../styles/animations.css';
import PlanetScreen, { PlanetConfig } from './PlanetScreen';

// Activity 1: ¿Cómo me siento?
function A1_HowDoIFeel({ t, onComplete, onBack }: any) {
  const [picked, setPicked] = useState<any>(null);

  useEffect(() => {
    if (window.speak) window.speak(t.a1_1.lead, window.__lang);
  }, []);

  const pick = (emo: any) => {
    setPicked(emo);
    if (window.SoundFX) window.SoundFX.pop();
    if (window.speak) window.speak(t.feedback[emo.key], window.__lang);
  };

  return (
    <div style={{ position: "absolute", inset: 0, padding: "100px 60px 40px" }}>
      <window.Topbar onBack={onBack} title={t.a1_1.name} accent="#F5C44A" />
      <window.StarSprinkles count={10} />

      <div style={{ display: "flex", alignItems: "center", gap: 30, maxWidth: 1280, margin: "0 auto" }}>
        <window.Star pose="hello" size={220}
          message={picked ? t.feedback[picked.key] : t.a1_1.lead} />
        <div style={{ flex: 1 }} />
      </div>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <div className="display" style={{ fontSize: 22, color: "var(--ink-soft)" }}>
          {t.a1_1.helper}
        </div>
      </div>

      <div style={{
        marginTop: 30,
        display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
        gap: 18, maxWidth: 1100, margin: "30px auto 0",
        justifyItems: "center",
      }}>
        {window.EMOTIONS.map((emo: any) => (
          <window.EmotionButton
            key={emo.key} emo={emo} t={t}
            onClick={() => pick(emo)}
            selected={picked && picked.key === emo.key}
            size={140}
          />
        ))}
      </div>

      {picked && (
        <div style={{ textAlign: "center", marginTop: 36, animation: "pop-in 0.4s" }}>
          <button
            onClick={() => {
              if (window.fireConfetti) window.fireConfetti();
              if (window.SoundFX) window.SoundFX.chime();
              onComplete();
            }}
            className="display-h"
            style={{
              fontSize: 24, padding: "16px 40px", borderRadius: 30,
              background: "linear-gradient(180deg, #A8DDB5, #7BC189)",
              color: "white",
              boxShadow: "0 8px 18px rgba(123, 193, 137, 0.35)",
              minHeight: 64,
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.15s'
            }}
            onMouseDown={(e: any) => e.currentTarget.style.transform = "scale(0.92)"}
            onMouseUp={(e: any) => e.currentTarget.style.transform = "scale(1)"}
          >
            ✨ {t.finish}
          </button>
        </div>
      )}
    </div>
  );
}

// Activity 2: La maleta
const SUITCASE_ITEMS = [
  { key: "teddy", emoji: "🧸", positive: true },
  { key: "park", emoji: "🌳", positive: true },
  { key: "family", emoji: "👨‍👩‍👧", positive: true },
  { key: "music", emoji: "🎵", positive: true },
  { key: "friends", emoji: "👫", positive: true },
  { key: "book", emoji: "📖", positive: true },
  { key: "pet", emoji: "🐶", positive: true },
  { key: "sun", emoji: "☀️", positive: true },
];

function A2_Suitcase({ t, onComplete, onBack }: any) {
  const [packed, setPacked] = useState<string[]>([]);
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState<any>(null);
  const [overSuitcase, setOverSuitcase] = useState(false);
  const [reinforce, setReinforce] = useState(false);
  const sourceRef = useRef<any>({});
  const suitcaseRef = useRef<any>(null);

  useEffect(() => {
    if (window.speak) window.speak(t.a1_2.lead, window.__lang);
  }, []);

  const startDrag = (e: any, key: string) => {
    e.preventDefault();
    setDraggingKey(key);
    const pt = e.touches ? e.touches[0] : e;
    setDragPos({ x: pt.clientX, y: pt.clientY });
  };

  useEffect(() => {
    if (!draggingKey) return;
    const move = (e: any) => {
      const pt = e.touches ? e.touches[0] : e;
      setDragPos({ x: pt.clientX, y: pt.clientY });
      if (suitcaseRef.current) {
        const r = suitcaseRef.current.getBoundingClientRect();
        const inside = pt.clientX >= r.left && pt.clientX <= r.right
                    && pt.clientY >= r.top && pt.clientY <= r.bottom;
        setOverSuitcase(inside);
      }
    };
    const up = () => {
      if (overSuitcase && draggingKey && !packed.includes(draggingKey)) {
        const newPacked = [...packed, draggingKey];
        setPacked(newPacked);
        if (window.SoundFX) window.SoundFX.chime();
        setReinforce(true);
        if (window.speak) window.speak(t.suitcase.reinforce, window.__lang);
        setTimeout(() => setReinforce(false), 1800);
      }
      setDraggingKey(null);
      setDragPos(null);
      setOverSuitcase(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [draggingKey, overSuitcase, packed]);

  const allPacked = packed.length >= 4;

  return (
    <div style={{ position: "absolute", inset: 0, padding: "100px 60px 40px" }}>
      <window.Topbar onBack={onBack} title={t.a1_2.name} accent="#F5A26A"
        progress={<span>{packed.length} / 8</span>} />
      <window.StarSprinkles count={10} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, maxWidth: 1280, margin: "0 auto" }}>
        <window.Star pose="thinking" size={180}
          message={reinforce ? t.suitcase.reinforce : (allPacked ? t.suitcase.done : t.a1_2.helper)} />
      </div>

      <div style={{
        position: "relative", marginTop: 20, height: 460,
        maxWidth: 1300, margin: "20px auto 0",
      }}>
        {/* Floating items */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: "55%", height: "100%",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
          padding: 16, alignItems: "center", justifyItems: "center",
        }}>
          {SUITCASE_ITEMS.map((item, i) => {
            const isPacked = packed.includes(item.key);
            const isDragging = draggingKey === item.key;
            return (
              <button key={item.key}
                ref={el => sourceRef.current[item.key] = el}
                onMouseDown={e => !isPacked && startDrag(e, item.key)}
                onTouchStart={e => !isPacked && startDrag(e, item.key)}
                disabled={isPacked}
                style={{
                  width: 110, height: 110, borderRadius: "50%",
                  background: isPacked ? "rgba(255,255,255,0.4)" : "white",
                  boxShadow: isPacked ? "none" : "0 6px 18px rgba(120, 80, 160, 0.15)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  fontSize: 48, cursor: isPacked ? "default" : "grab",
                  opacity: isDragging ? 0.3 : (isPacked ? 0.35 : 1),
                  animation: isPacked ? "none" : `float-tiny ${2 + (i%4)*0.4}s ease-in-out ${i*0.2}s infinite`,
                  transition: "opacity 0.3s",
                  touchAction: "none", userSelect: "none",
                  position: "relative",
                  border: 'none',
                }}
              >
                <div>{item.emoji}</div>
                <div className="display" style={{ fontSize: 14, marginTop: -4, color: "var(--ink-soft)" }}>
                  {t.suitcase.items[item.key]}
                </div>
                {isPacked && <div style={{
                  position: "absolute", top: 4, right: 4,
                  fontSize: 16, background: "#A8DDB5", color: "white",
                  borderRadius: "50%", width: 24, height: 24,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>✓</div>}
              </button>
            );
          })}
        </div>

        {/* Suitcase */}
        <div ref={suitcaseRef}
          style={{
            position: "absolute", right: 30, top: 30,
            width: 480, height: 360,
            background: overSuitcase ? "#FFE7CB" : "#F5DEB8",
            borderRadius: 30,
            border: `6px dashed ${overSuitcase ? "#F5A26A" : "#C8A57A"}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
            padding: 20, gap: 10,
            boxShadow: overSuitcase ? "0 0 0 8px rgba(245,162,106,0.25), 0 12px 30px rgba(120, 80, 160, 0.2)" : "0 12px 30px rgba(120, 80, 160, 0.2)",
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
          }}
        >
          <div style={{
            position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)",
            width: 120, height: 32,
            background: "#A87E54", borderRadius: "20px 20px 8px 8px",
          }} />
          <div style={{ position: "absolute", top: 12, left: 30, width: 22, height: 22, background: "#C8A57A", borderRadius: 4 }} />
          <div style={{ position: "absolute", top: 12, right: 30, width: 22, height: 22, background: "#C8A57A", borderRadius: 4 }} />

          <div className="display-h" style={{ fontSize: 22, color: "#7A5A33", marginTop: 6 }}>
            🧳 {t.suitcase.title}
          </div>
          <div style={{ fontSize: 14, color: "#9A7A4F", textAlign: "center" }}>
            {t.suitcase.hint}
          </div>

          <div style={{
            flex: 1, width: "100%",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
            placeItems: "center", marginTop: 8,
          }}>
            {packed.map(key => {
              const item = SUITCASE_ITEMS.find(i => i.key === key);
              return (
                <div key={key} style={{
                  width: 64, height: 64, borderRadius: "50%", background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, animation: "pop-in 0.4s ease-out",
                  boxShadow: "0 4px 10px rgba(120, 80, 160, 0.15)",
                }}>{item?.emoji}</div>
              );
            })}
          </div>
        </div>
      </div>

      {draggingKey && dragPos && (
        <div style={{
          position: "fixed", left: dragPos.x - 55, top: dragPos.y - 55,
          width: 110, height: 110, borderRadius: "50%",
          background: "white", boxShadow: "0 10px 24px rgba(120, 80, 160, 0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 48, pointerEvents: "none", zIndex: 100,
          transform: "scale(1.1)",
        }}>
          {SUITCASE_ITEMS.find(i => i.key === draggingKey)?.emoji}
        </div>
      )}

      {allPacked && (
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button onClick={() => {
            if (window.fireConfetti) window.fireConfetti();
            if (window.SoundFX) window.SoundFX.chime();
            onComplete();
          }}
            className="display-h"
            style={{
              fontSize: 24, padding: "16px 40px", borderRadius: 30,
              background: "linear-gradient(180deg, #A8DDB5, #7BC189)",
              color: "white", boxShadow: "0 8px 18px rgba(123, 193, 137, 0.35)",
              minHeight: 64,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ✨ {t.finish}
          </button>
        </div>
      )}
    </div>
  );
}

// Activity 3: El espejo mágico
function MirrorFace({ emoKey, size = 240 }: any) {
  const palette: any = {
    happy: { bg: "#FFE08A", mouth: "happy" },
    sad: { bg: "#BFD9F2", mouth: "sad" },
    angry: { bg: "#FBC0BA", mouth: "angry" },
    scared: { bg: "#D6E4D5", mouth: "scared" },
    excited: { bg: "#FFD2A6", mouth: "excited" },
    surprised: { bg: "#E2D2F5", mouth: "surprised" },
  };
  const p = palette[emoKey] || palette.happy;

  const Eye = ({ cx, scared, surprised, angry, sad }: any) => {
    if (scared || surprised) {
      return <>
        <circle cx={cx} cy="100" r="18" fill="white" />
        <circle cx={cx} cy="100" r="9" fill="#3D2A50" />
      </>;
    }
    if (angry) {
      return <>
        <path d={`M${cx-22} 90 L${cx+18} 100`} stroke="#3D2A50" strokeWidth="6" strokeLinecap="round" fill="none"
          transform={cx > 130 ? `scale(-1,1) translate(-${cx*2},0)` : ""} />
        <ellipse cx={cx} cy="105" rx="8" ry="10" fill="#3D2A50" />
      </>;
    }
    if (sad) {
      return <>
        <path d={`M${cx-15} 105 Q ${cx} 92 ${cx+15} 105`} stroke="#3D2A50" strokeWidth="5" strokeLinecap="round" fill="none" />
      </>;
    }
    return <ellipse cx={cx} cy="100" rx="8" ry="11" fill="#3D2A50" />;
  };

  const Mouth = () => {
    if (p.mouth === "happy") return <path d="M70 145 Q 110 180 150 145" stroke="#3D2A50" strokeWidth="6" fill="#E88A82" strokeLinecap="round" />;
    if (p.mouth === "sad") return <path d="M70 165 Q 110 135 150 165" stroke="#3D2A50" strokeWidth="6" fill="none" strokeLinecap="round" />;
    if (p.mouth === "angry") return <path d="M70 165 Q 110 145 150 165" stroke="#3D2A50" strokeWidth="6" fill="none" strokeLinecap="round" />;
    if (p.mouth === "scared") return <ellipse cx="110" cy="158" rx="14" ry="20" fill="#3D2A50" />;
    if (p.mouth === "excited") return <path d="M70 140 Q 110 195 150 140 Q 110 175 70 140 Z" stroke="#3D2A50" strokeWidth="5" fill="#E88A82" />;
    if (p.mouth === "surprised") return <ellipse cx="110" cy="158" rx="16" ry="18" fill="#3D2A50" />;
    return null;
  };

  return (
    <svg width={size} height={size} viewBox="0 0 220 220" style={{ animation: "pop-in 0.4s ease-out" }}>
      <circle cx="110" cy="115" r="92" fill={p.bg} stroke="#4A3A55" strokeWidth="3" />
      <path d="M70 50 Q 90 25 110 30 Q 130 25 150 50 Q 130 40 110 45 Q 90 40 70 50 Z" fill="#7A5A85" />
      <Eye cx={88} sad={emoKey==="sad"} angry={emoKey==="angry"} scared={emoKey==="scared"} surprised={emoKey==="surprised"} />
      <Eye cx={138} sad={emoKey==="sad"} angry={emoKey==="angry"} scared={emoKey==="scared"} surprised={emoKey==="surprised"} />
      <ellipse cx="72" cy="138" rx="10" ry="6" fill="#F5A6B5" opacity="0.6" />
      <ellipse cx="148" cy="138" rx="10" ry="6" fill="#F5A6B5" opacity="0.6" />
      <Mouth />
      {emoKey === "sad" && <path d="M138 120 Q 138 140 142 152 Q 146 140 142 120 Z" fill="#7AAEDB" opacity="0.85"
        style={{ animation: "float-tiny 2s ease-in-out infinite" }} />}
      {emoKey === "scared" && <path d="M155 80 Q 150 95 160 95 Q 170 95 165 80 Z" fill="#7AAEDB" opacity="0.7" />}
    </svg>
  );
}

function A3_Mirror({ t, onComplete, onBack }: any) {
  const [picked, setPicked] = useState(window.EMOTIONS?.[0] || { key: 'happy' });

  useEffect(() => {
    if (window.speak) window.speak(t.a1_3.lead, window.__lang);
  }, []);

  const tints: any = {
    happy: "linear-gradient(180deg, #FFF6D9, #FFE08A)",
    sad: "linear-gradient(180deg, #E6F0FA, #BFD9F2)",
    angry: "linear-gradient(180deg, #FFE5E2, #FBC0BA)",
    scared: "linear-gradient(180deg, #ECF5EB, #D6E4D5)",
    excited: "linear-gradient(180deg, #FFEBD6, #FFD2A6)",
    surprised: "linear-gradient(180deg, #F2EAFB, #E2D2F5)",
  };

  return (
    <div style={{ position: "absolute", inset: 0, padding: "100px 60px 40px" }}>
      <window.Topbar onBack={onBack} title={t.a1_3.name} accent="#C7B5E8" />
      <window.StarSprinkles count={10} />

      <div style={{ display: "flex", alignItems: "center", gap: 30, maxWidth: 1280, margin: "0 auto" }}>
        <window.Star pose="magic" size={180} message={t.a1_3.lead} />
      </div>

      <div style={{
        marginTop: 30,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
        maxWidth: 1180, margin: "30px auto 0", alignItems: "center",
      }}>
        <div style={{
          aspectRatio: "3/4", maxHeight: 480,
          background: tints[picked.key], borderRadius: 200,
          border: "10px solid #C8A57A",
          boxShadow: "0 0 0 6px #FFD89E, 0 16px 40px rgba(120, 80, 160, 0.25), inset 0 0 60px rgba(255,255,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          transition: "background 0.5s",
        }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <window.StarSprinkles count={6} color={picked.deep} />
          </div>
          <MirrorFace emoKey={picked.key} size={300} />
          <div style={{
            position: "absolute", left: "12%", top: "10%", width: "30%", height: "12%",
            background: "rgba(255,255,255,0.6)", borderRadius: "50%",
            transform: "rotate(-30deg)", filter: "blur(8px)",
          }} />
        </div>

        <div>
          <div className="display" style={{ fontSize: 22, color: "var(--ink-soft)", marginBottom: 20, textAlign: "center" }}>
            {t.a1_3.helper}
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18,
            justifyItems: "center",
          }}>
            {window.EMOTIONS?.map((emo: any) => (
              <window.EmotionButton key={emo.key} emo={emo} t={t}
                onClick={() => { setPicked(emo); if (window.SoundFX) window.SoundFX.pop(); if (window.speak) window.speak(t.emotions[emo.key], window.__lang); }}
                selected={picked.key === emo.key}
                size={120}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => {
              if (window.fireConfetti) window.fireConfetti();
              if (window.SoundFX) window.SoundFX.chime();
              onComplete();
            }}
              className="display-h"
              style={{
                fontSize: 22, padding: "14px 36px", borderRadius: 30,
                background: "linear-gradient(180deg, #A8DDB5, #7BC189)", color: "white",
                boxShadow: "0 8px 18px rgba(123, 193, 137, 0.35)", minHeight: 60,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ✨ {t.finish}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Planet1Screen({ t, onBack, onActivityComplete, completed }: any) {
  const config: PlanetConfig = {
    planetId: 1,
    planetKey: 'p1',
    tone: 'warm',
    accentColor: '#F5C44A',
    planetImage: '/meconozco-epm-removebg-preview.png',
    description: 'En este planeta descubrirás cómo te sientes y aprenderás a ponerle nombre a tus emociones.',
    activities: [
      { key: 'a1', info: t.a1_1, emoji: '😊', color: '#FFE08A' },
      { key: 'a2', info: t.a1_2, emoji: '🧳', color: '#FFD2A6' },
      { key: 'a3', info: t.a1_3, emoji: '🪞', color: '#E2D2F5' },
    ],
  };

  return (
    <PlanetScreen
      config={config}
      t={t}
      onBack={onBack}
      onActivityComplete={onActivityComplete}
      completed={completed}
      renderActivity={(key, actBack, actComplete) => {
        if (key === 'a1') return <A1_HowDoIFeel t={t} onBack={actBack} onComplete={actComplete} />;
        if (key === 'a2') return <A2_Suitcase t={t} onBack={actBack} onComplete={actComplete} />;
        if (key === 'a3') return <A3_Mirror t={t} onBack={actBack} onComplete={actComplete} />;
        return null;
      }}
    />
  );
}
