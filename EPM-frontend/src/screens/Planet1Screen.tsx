import React, { useState, useEffect, useRef } from 'react';
import '../styles/animations.css';
import PlanetScreen, { PlanetConfig } from './PlanetScreen';
import { ActivityPayload, EmotionKey } from '../types/progress';

// Activity 1: ¿Cómo me siento?
function A1_HowDoIFeel({ t, onComplete, onBack }: any) {
  const [picked, setPicked] = useState<any>(null);

  const pick = (emo: any) => {
    setPicked(emo);
    if (window.SoundFX) window.SoundFX.pop();
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
              onComplete({
                type: 'a1_1',
                emotion: picked.key as EmotionKey,
                timestamp: Date.now(),
              });
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
  const startedAtRef = useRef<number>(Date.now());

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
                <div className="display" style={{ fontSize: 16, marginTop: -2, color: "#2A2440", fontWeight: 600 }}>
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

          <div className="display-h" style={{ fontSize: 24, color: "#3D2A1A", marginTop: 6, fontWeight: 700 }}>
            🧳 {t.suitcase.title}
          </div>
          <div style={{ fontSize: 16, color: "#3D2A1A", textAlign: "center", fontWeight: 500 }}>
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
            onComplete({
              type: 'a1_2',
              packed: [...packed],
              durationMs: Date.now() - startedAtRef.current,
              timestamp: Date.now(),
            });
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
    happy:    { bg: "#FFE48A", skin: "#FFDFA0" },
    sad:      { bg: "#C8DCEF", skin: "#D8E8F8" },
    angry:    { bg: "#FFBDB5", skin: "#FFCCC0" },
    scared:   { bg: "#C8DFC8", skin: "#D8EDD0" },
    excited:  { bg: "#FFCF8A", skin: "#FFD898" },
    surprised:{ bg: "#DDD0F5", skin: "#E8DEFF" },
  };
  const p = palette[emoKey] || palette.happy;

  // Full layered eye: sclera + iris + pupil + highlight + eyelashes + eyebrow
  const Eye = ({ cx, ey = 108 }: { cx: number; ey?: number }) => {
    const isScared    = emoKey === "scared";
    const isSurprised = emoKey === "surprised";
    const isAngry     = emoKey === "angry";
    const isSad       = emoKey === "sad";
    const isHappy     = emoKey === "happy";
    const isExcited   = emoKey === "excited";

    // Sclera size: bigger for scared/surprised
    const scleraRx = isScared || isSurprised ? 17 : 13;
    const scleraRy = isScared || isSurprised ? 19 : 15;
    // Iris color
    const irisColor = isScared ? "#4E7A6A" : isSad ? "#5B82A8" : isAngry ? "#8B4040" : "#6A5A9A";
    const irisR     = isScared || isSurprised ? 10 : 8;
    // Pupil offset: looking slightly up for happy/excited
    const pupilOY   = isHappy || isExcited ? -1 : 0;

    // Eyebrow path relative to cx
    let browPath = "";
    if (isAngry) {
      // Angled inward and down toward nose
      browPath = cx < 110
        ? `M${cx - 14} ${ey - 24} Q${cx - 2} ${ey - 18} ${cx + 12} ${ey - 22}`
        : `M${cx - 12} ${ey - 22} Q${cx + 2} ${ey - 18} ${cx + 14} ${ey - 24}`;
    } else if (isSad) {
      // Outer ends droop down
      browPath = cx < 110
        ? `M${cx - 13} ${ey - 22} Q${cx} ${ey - 26} ${cx + 13} ${ey - 20}`
        : `M${cx - 13} ${ey - 20} Q${cx} ${ey - 26} ${cx + 13} ${ey - 22}`;
    } else if (isScared) {
      // Raised and arched high
      browPath = `M${cx - 14} ${ey - 30} Q${cx} ${ey - 36} ${cx + 14} ${ey - 30}`;
    } else {
      // Happy / excited / surprised — gently arched up
      browPath = `M${cx - 13} ${ey - 26} Q${cx} ${ey - 32} ${cx + 13} ${ey - 26}`;
    }

    // Eyelashes: 4 short strokes at top of sclera
    const lashAngles = [-50, -70, -90, -110, -130];
    const lashLen = 6;
    const lashes = lashAngles.map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = cx + scleraRx * Math.cos(rad);
      const y1 = ey - scleraRy * Math.abs(Math.sin(rad));
      const x2 = x1 + lashLen * Math.cos(rad);
      const y2 = y1 - lashLen * Math.abs(Math.sin(rad));
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3D2A50" strokeWidth="1.8" strokeLinecap="round" />;
    });

    return (
      <>
        {/* Eyebrow */}
        <path d={browPath} stroke="#3D2A50" strokeWidth={isAngry ? 5 : 4} fill="none" strokeLinecap="round" />
        {/* Sclera */}
        <ellipse cx={cx} cy={ey} rx={scleraRx} ry={scleraRy} fill="white" stroke="#D0C0CC" strokeWidth="1" />
        {/* Iris */}
        <circle cx={cx} cy={ey + pupilOY} r={irisR} fill={irisColor} />
        {/* Pupil */}
        <circle cx={cx} cy={ey + pupilOY} r={irisR * 0.55} fill="#1A1020" />
        {/* Specular highlight */}
        <circle cx={cx + 4} cy={ey + pupilOY - 4} r={2.5} fill="white" />
        {/* Eyelashes */}
        {lashes}
      </>
    );
  };

  const Mouth = () => {
    if (emoKey === "happy") return (
      <g>
        {/* Outer smile shape */}
        <path d="M72 150 Q 110 188 148 150" stroke="#3D2A50" strokeWidth="4" fill="#E06070" strokeLinecap="round" />
        {/* Teeth hint */}
        <path d="M78 152 Q 110 180 142 152 Q 110 162 78 152 Z" fill="white" opacity="0.9" />
        {/* Upper lip line */}
        <path d="M72 150 Q 110 188 148 150" stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "sad") return (
      <g>
        <path d="M76 168 Q 110 140 144 168" stroke="#3D2A50" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Quivering lower lip bump */}
        <path d="M95 168 Q 110 174 125 168" stroke="#3D2A50" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "angry") return (
      <g>
        {/* Tight near-straight line with downward corners */}
        <path d="M76 162 Q 110 155 144 162" stroke="#3D2A50" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M76 162 Q 74 165 78 167" stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M144 162 Q 146 165 142 167" stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "scared") return (
      <g>
        {/* Wide open oval */}
        <ellipse cx="110" cy="162" rx="18" ry="22" fill="#1A1020" />
        {/* Teeth */}
        <path d="M94 152 Q 110 148 126 152 L 126 162 Q 110 158 94 162 Z" fill="white" />
        {/* Small tongue */}
        <ellipse cx="110" cy="172" rx="7" ry="5" fill="#E06070" />
      </g>
    );
    if (emoKey === "excited") return (
      <g>
        {/* Big open smile */}
        <path d="M68 146 Q 110 196 152 146" stroke="#3D2A50" strokeWidth="4" fill="#E06070" strokeLinecap="round" />
        {/* Teeth */}
        <path d="M76 150 Q 110 185 144 150 Q 110 168 76 150 Z" fill="white" opacity="0.95" />
        {/* Lip line */}
        <path d="M68 146 Q 110 196 152 146" stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "surprised") return (
      <g>
        {/* Wide O shape */}
        <ellipse cx="110" cy="160" rx="20" ry="20" fill="#1A1020" stroke="#3D2A50" strokeWidth="3" />
        {/* Visible teeth at top of O */}
        <path d="M92 146 Q 110 142 128 146 L 128 155 Q 110 151 92 155 Z" fill="white" />
      </g>
    );
    return null;
  };

  // Blush: larger and more visible for happy/excited
  const blushOpacity = (emoKey === "happy" || emoKey === "excited") ? 0.65 : 0.3;
  const blushRx      = (emoKey === "happy" || emoKey === "excited") ? 14 : 9;
  const blushRy      = (emoKey === "happy" || emoKey === "excited") ? 8  : 5;
  const showBlush    = emoKey !== "angry";

  return (
    <svg width={size} height={size} viewBox="0 0 220 220" style={{ animation: "pop-in 0.4s ease-out" }}>
      {/* Face base */}
      <circle cx="110" cy="115" r="92" fill={p.bg} stroke="#4A3A55" strokeWidth="3" />
      {/* Skin overlay for emotion tint */}
      <circle cx="110" cy="118" r="82" fill={p.skin} opacity="0.45" />
      {/* Hair — voluminous with strand highlights */}
      <path d="M30 85 Q 38 18 110 20 Q 182 18 190 85 Q 178 48 110 50 Q 42 48 30 85 Z" fill="#7A5A85" />
      <path d="M30 85 Q 35 55 50 45 Q 45 62 44 80 Z" fill="#9A7AAA" opacity="0.5" />
      <path d="M190 85 Q 185 55 170 45 Q 175 62 176 80 Z" fill="#9A7AAA" opacity="0.5" />
      <path d="M88 22 Q 90 14 94 20" stroke="#9A7AAA" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M110 18 Q 112 10 116 17" stroke="#9A7AAA" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <Eye cx={86} ey={108} />
      <Eye cx={134} ey={108} />
      {/* Nose — small cute dot */}
      <ellipse cx="110" cy="135" rx="4" ry="3" fill="#C09080" opacity="0.35" />
      {/* Blush */}
      {showBlush && <ellipse cx="68" cy="143" rx={blushRx} ry={blushRy} fill="#F5A6B5" opacity={blushOpacity} />}
      {showBlush && <ellipse cx="152" cy="143" rx={blushRx} ry={blushRy} fill="#F5A6B5" opacity={blushOpacity} />}
      <Mouth />
      {/* Sad: animated teardrop */}
      {emoKey === "sad" && (
        <path d="M136 122 Q 136 143 140 155 Q 144 143 140 122 Z" fill="#7AAEDB" opacity="0.85"
          style={{ animation: "float-tiny 2s ease-in-out infinite" }} />
      )}
      {/* Scared: sweat drops */}
      {emoKey === "scared" && (
        <>
          <path d="M158 72 Q 154 88 162 88 Q 170 88 166 72 Z" fill="#7AAEDB" opacity="0.8" />
          <path d="M166 88 Q 163 98 169 98 Q 175 98 172 88 Z" fill="#7AAEDB" opacity="0.6" />
        </>
      )}
      {/* Angry: steam puffs */}
      {emoKey === "angry" && (
        <>
          <circle cx="52" cy="65" r="8" fill="#FFAAAA" opacity="0.55" />
          <circle cx="64" cy="54" r="6" fill="#FFAAAA" opacity="0.4" />
          <circle cx="168" cy="65" r="8" fill="#FFAAAA" opacity="0.55" />
          <circle cx="156" cy="54" r="6" fill="#FFAAAA" opacity="0.4" />
        </>
      )}
    </svg>
  );
}

function A3_Mirror({ t, onComplete, onBack }: any) {
  const [picked, setPicked] = useState(window.EMOTIONS?.[0] || { key: 'happy' });
  const exploredRef = useRef<Set<EmotionKey>>(new Set([picked.key as EmotionKey]));

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
                onClick={() => {
                  setPicked(emo);
                  exploredRef.current.add(emo.key as EmotionKey);
                  if (window.SoundFX) window.SoundFX.pop();
                }}
                selected={picked.key === emo.key}
                size={120}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => {
              if (window.fireConfetti) window.fireConfetti();
              if (window.SoundFX) window.SoundFX.chime();
              onComplete({
                type: 'a1_3',
                exploredEmotions: Array.from(exploredRef.current),
                lastEmotion: picked.key as EmotionKey,
                timestamp: Date.now(),
              });
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
    guideInstruction: '¡Toca una actividad para descubrir tus emociones!',
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
      renderActivity={(key, actBack, actComplete: (p: ActivityPayload) => void) => {
        if (key === 'a1') return <A1_HowDoIFeel t={t} onBack={actBack} onComplete={actComplete} />;
        if (key === 'a2') return <A2_Suitcase t={t} onBack={actBack} onComplete={actComplete} />;
        if (key === 'a3') return <A3_Mirror t={t} onBack={actBack} onComplete={actComplete} />;
        return null;
      }}
    />
  );
}
