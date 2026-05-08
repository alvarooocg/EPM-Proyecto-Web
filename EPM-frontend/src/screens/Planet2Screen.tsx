import React, { useState, useEffect, useRef } from 'react';
import '../styles/animations.css';
import PlanetScreen, { PlanetConfig } from './PlanetScreen';
import { ActivityPayload, EmotionKey } from '../types/progress';

// Activity 1: ¿Qué siente mi amigo?
function A2_1_FriendFeels({ t, onComplete, onBack }: any) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<any>(null);
  const [streak, setStreak] = useState(0);
  const mistakesRef = useRef<EmotionKey[]>([]);
  const firstTryHitsRef = useRef<number>(0);
  const roundFailedRef = useRef<boolean>(false);

  const ROUNDS = [
    { target: "sad", scene: "🌧️" },
    { target: "happy", scene: "🎈" },
    { target: "scared", scene: "🌑" },
  ];

  const cur = ROUNDS[round];
  const targetEmo = window.EMOTIONS?.find((e: any) => e.key === cur.target);

  const pick = (emo: any) => {
    setPicked(emo);
    if (emo.key === cur.target) {
      if (window.SoundFX) window.SoundFX.chime();
      setStreak((s: number) => s + 1);
      if (!roundFailedRef.current) firstTryHitsRef.current += 1;
      const isLast = round >= ROUNDS.length - 1;
      setTimeout(() => {
        if (!isLast) {
          setRound((r: number) => r + 1);
          setPicked(null);
          roundFailedRef.current = false;
        } else {
          if (window.fireConfetti) window.fireConfetti();
          onComplete({
            type: 'a2_1',
            correctOnFirstTry: firstTryHitsRef.current,
            totalRounds: ROUNDS.length,
            mistakes: [...mistakesRef.current],
            timestamp: Date.now(),
          });
        }
      }, 1600);
    } else {
      if (window.SoundFX) window.SoundFX.err?.();
      mistakesRef.current.push(emo.key as EmotionKey);
      roundFailedRef.current = true;
      setTimeout(() => setPicked(null), 1100);
    }
  };

  const distractors = window.EMOTIONS?.filter((e: any) => e.key !== cur.target).slice(0, 3) || [];
  const choices = [...distractors, targetEmo].sort((a: any, b: any) => a.key.localeCompare(b.key));

  return (
    <div style={{ position: "absolute", inset: 0, padding: "100px 60px 40px" }}>
      <window.Topbar onBack={onBack} title={t.a2_1.name} accent="#E88A82"
        progress={<span>{round + 1}/{ROUNDS.length}</span>} />
      <window.StarSprinkles count={10} />

      <div style={{ display: "flex", alignItems: "center", gap: 30, maxWidth: 1280, margin: "0 auto" }}>
        <window.Star pose="thinking" size={180} message={t.friend.prompt} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, maxWidth: 1180, margin: "20px auto 0", alignItems: "center" }}>
        <div className="light-surface" style={{
          background: targetEmo?.color,
          borderRadius: 36, padding: 30, minHeight: 380,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 12px 30px rgba(120, 80, 160, 0.15)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 16, left: 16, fontSize: 48, opacity: 0.4 }}>{cur.scene}</div>
          <FriendChar emoKey={cur.target} />
          <div className="display" style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 16, fontWeight: 600 }}>
            Tu amiga Lila
          </div>
        </div>

        <div>
          <div className="display" style={{ fontSize: 20, color: "var(--ink-soft)", textAlign: "center", marginBottom: 18 }}>
            {t.a2_1.helper}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, justifyItems: "center" }}>
            {choices.map((emo: any) => (
              <window.EmotionButton key={emo.key} emo={emo} t={t}
                onClick={() => !picked && pick(emo)}
                selected={picked && picked.key === emo.key}
                size={130}
              />
            ))}
          </div>
          {picked && picked.key === cur.target && (
            <div className="display-h" style={{
              textAlign: "center", marginTop: 24, fontSize: 22, color: "#7BC189",
              animation: "pop-in 0.4s",
            }}>
              ✓ {t.friend.correct} {t.emotions[picked.key]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FriendChar({ emoKey }: any) {
  const palette: any = {
    happy:    { skin: "#FFE0A8", hair: "#7A5A85" },
    sad:      { skin: "#D8E4F4", hair: "#7A5A85" },
    angry:    { skin: "#FFBFB0", hair: "#7A5A85" },
    scared:   { skin: "#D4EDD4", hair: "#7A5A85" },
    excited:  { skin: "#FFD890", hair: "#7A5A85" },
    surprised:{ skin: "#EEE0FF", hair: "#7A5A85" },
  };
  const p = palette[emoKey] || palette.happy;

  // Full layered eye with sclera, iris, pupil, highlight, eyelashes and eyebrow
  const Eye = ({ cx, ey = 106 }: { cx: number; ey?: number }) => {
    const isScared    = emoKey === "scared";
    const isSurprised = emoKey === "surprised";
    const isAngry     = emoKey === "angry";
    const isSad       = emoKey === "sad";
    const isHappy     = emoKey === "happy";
    const isExcited   = emoKey === "excited";

    const scleraRx = isScared || isSurprised ? 15 : 11;
    const scleraRy = isScared || isSurprised ? 17 : 13;
    const irisColor = isScared ? "#4E7A6A" : isSad ? "#5B82A8" : isAngry ? "#8B4040" : "#6A5A9A";
    const irisR     = isScared || isSurprised ? 9 : 7;
    const pupilOY   = isHappy || isExcited ? -1 : 0;

    let browPath = "";
    if (isAngry) {
      browPath = cx < 110
        ? `M${cx - 12} ${ey - 22} Q${cx - 1} ${ey - 16} ${cx + 10} ${ey - 20}`
        : `M${cx - 10} ${ey - 20} Q${cx + 1} ${ey - 16} ${cx + 12} ${ey - 22}`;
    } else if (isSad) {
      browPath = cx < 110
        ? `M${cx - 11} ${ey - 20} Q${cx} ${ey - 24} ${cx + 11} ${ey - 18}`
        : `M${cx - 11} ${ey - 18} Q${cx} ${ey - 24} ${cx + 11} ${ey - 20}`;
    } else if (isScared) {
      browPath = `M${cx - 12} ${ey - 28} Q${cx} ${ey - 34} ${cx + 12} ${ey - 28}`;
    } else {
      browPath = `M${cx - 11} ${ey - 24} Q${cx} ${ey - 30} ${cx + 11} ${ey - 24}`;
    }

    // 5 eyelashes at top arc of sclera
    const lashAngles = [-50, -70, -90, -110, -130];
    const lashLen = 5;
    const lashes = lashAngles.map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = cx + scleraRx * Math.cos(rad);
      const y1 = ey - scleraRy * Math.abs(Math.sin(rad));
      const x2 = x1 + lashLen * Math.cos(rad);
      const y2 = y1 - lashLen * Math.abs(Math.sin(rad));
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3D2A50" strokeWidth="1.6" strokeLinecap="round" />;
    });

    return (
      <>
        {/* Eyebrow */}
        <path d={browPath} stroke="#3D2A50" strokeWidth={isAngry ? 4.5 : 3.5} fill="none" strokeLinecap="round" />
        {/* Sclera */}
        <ellipse cx={cx} cy={ey} rx={scleraRx} ry={scleraRy} fill="white" stroke="#D0C0CC" strokeWidth="1" />
        {/* Iris */}
        <circle cx={cx} cy={ey + pupilOY} r={irisR} fill={irisColor} />
        {/* Pupil */}
        <circle cx={cx} cy={ey + pupilOY} r={irisR * 0.55} fill="#1A1020" />
        {/* Specular highlight */}
        <circle cx={cx + 3} cy={ey + pupilOY - 3} r={2} fill="white" />
        {/* Eyelashes */}
        {lashes}
      </>
    );
  };

  const Mouth = () => {
    if (emoKey === "happy") return (
      <g>
        <path d="M78 148 Q 110 182 142 148" stroke="#3D2A50" strokeWidth="4" fill="#E06070" strokeLinecap="round" />
        <path d="M84 150 Q 110 176 136 150 Q 110 160 84 150 Z" fill="white" opacity="0.9" />
        <path d="M78 148 Q 110 182 142 148" stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "excited") return (
      <g>
        <path d="M72 144 Q 110 192 148 144" stroke="#3D2A50" strokeWidth="4" fill="#E06070" strokeLinecap="round" />
        <path d="M80 148 Q 110 180 140 148 Q 110 165 80 148 Z" fill="white" opacity="0.95" />
        <path d="M72 144 Q 110 192 148 144" stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "sad") return (
      <g>
        <path d="M80 162 Q 110 140 140 162" stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Quivering lower lip bump */}
        <path d="M96 162 Q 110 168 124 162" stroke="#3D2A50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "angry") return (
      <g>
        <path d="M80 158 Q 110 150 140 158" stroke="#3D2A50" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M80 158 Q 78 162 82 164" stroke="#3D2A50" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M140 158 Q 142 162 138 164" stroke="#3D2A50" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>
    );
    if (emoKey === "scared") return (
      <g>
        <ellipse cx="110" cy="160" rx="16" ry="20" fill="#1A1020" />
        <path d="M96 148 Q 110 144 124 148 L 124 158 Q 110 154 96 158 Z" fill="white" />
        <ellipse cx="110" cy="170" rx="6" ry="4" fill="#E06070" />
      </g>
    );
    if (emoKey === "surprised") return (
      <g>
        <ellipse cx="110" cy="158" rx="18" ry="18" fill="#1A1020" stroke="#3D2A50" strokeWidth="3" />
        <path d="M94 144 Q 110 140 126 144 L 126 153 Q 110 149 94 153 Z" fill="white" />
      </g>
    );
    return null;
  };

  const blushOpacity = (emoKey === "happy" || emoKey === "excited") ? 0.65 : 0.28;
  const blushRx      = (emoKey === "happy" || emoKey === "excited") ? 13 : 8;
  const blushRy      = (emoKey === "happy" || emoKey === "excited") ? 7  : 5;
  const showBlush    = emoKey !== "angry";

  return (
    <svg width="280" height="280" viewBox="0 0 220 220">
      {/* Ground shadow */}
      <ellipse cx="110" cy="200" rx="80" ry="14" fill="rgba(0,0,0,0.08)"/>
      {/* Face */}
      <circle cx="110" cy="115" r="88" fill={p.skin} stroke="#4A3A55" strokeWidth="3"/>
      {/* Hair — voluminous with strand highlights */}
      <path d="M30 88 Q 40 22 110 20 Q 180 22 190 88 Q 178 52 110 50 Q 42 52 30 88 Z" fill={p.hair}/>
      {/* Hair volume sides */}
      <path d="M30 88 Q 26 60 34 44 Q 32 65 36 82 Z" fill="#9A7AAA" opacity="0.5" />
      <path d="M190 88 Q 194 60 186 44 Q 188 65 184 82 Z" fill="#9A7AAA" opacity="0.5" />
      {/* Hair strand highlights */}
      <path d="M85 22 Q 87 13 91 21" stroke="#9A7AAA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 18 Q 110 9 114 17" stroke="#9A7AAA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M130 22 Q 133 13 136 22" stroke="#9A7AAA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <Eye cx={86} ey={106} />
      <Eye cx={134} ey={106} />
      {/* Nose */}
      <ellipse cx="110" cy="132" rx="4" ry="3" fill="#B08070" opacity="0.3" />
      {/* Blush */}
      {showBlush && <ellipse cx="70" cy="140" rx={blushRx} ry={blushRy} fill="#F5A6B5" opacity={blushOpacity} />}
      {showBlush && <ellipse cx="150" cy="140" rx={blushRx} ry={blushRy} fill="#F5A6B5" opacity={blushOpacity} />}
      <Mouth/>
      {/* Sad: animated teardrop */}
      {emoKey === "sad" && (
        <path d="M134 122 Q 134 142 138 152 Q 142 142 138 122 Z" fill="#7AAEDB" opacity="0.85" />
      )}
      {/* Scared: sweat drops */}
      {emoKey === "scared" && (
        <>
          <path d="M158 68 Q 154 82 161 82 Q 168 82 164 68 Z" fill="#7AAEDB" opacity="0.8" />
          <path d="M165 83 Q 162 93 167 93 Q 172 93 169 83 Z" fill="#7AAEDB" opacity="0.55" />
        </>
      )}
      {/* Angry: steam puffs */}
      {emoKey === "angry" && (
        <>
          <circle cx="46" cy="68" r="7" fill="#FFAAAA" opacity="0.55" />
          <circle cx="58" cy="56" r="5" fill="#FFAAAA" opacity="0.4" />
          <circle cx="174" cy="68" r="7" fill="#FFAAAA" opacity="0.55" />
          <circle cx="162" cy="56" r="5" fill="#FFAAAA" opacity="0.4" />
        </>
      )}
    </svg>
  );
}

// Activity 2: Juego por parejas
function A2_2_Pair({ t, onComplete, onBack }: any) {
  const [choice, setChoice] = useState<any>(null);
  const attemptsRef = useRef<number>(0);

  const choices = [
    { key: "hug", emoji: "🤗", color: "#FBD5DC", positive: true },
    { key: "help", emoji: "🤝", color: "#D6F0DC", positive: true },
    { key: "share", emoji: "🎁", color: "#FFE08A", positive: true },
    { key: "ignore", emoji: "🙈", color: "#E2D2F5", positive: false },
  ];

  const pick = (c: any) => {
    attemptsRef.current += 1;
    setChoice(c);
    if (c.positive) {
      if (window.SoundFX) window.SoundFX.chime();
      setTimeout(() => {
        if (window.fireConfetti) window.fireConfetti();
        onComplete({
          type: 'a2_2',
          choice: c.key,
          positive: true,
          attempts: attemptsRef.current,
          timestamp: Date.now(),
        });
      }, 2200);
    } else {
      if (window.SoundFX) window.SoundFX.err?.();
      setTimeout(() => setChoice(null), 1800);
    }
  };

  return (
    <div style={{ position: "absolute", inset: 0, padding: "100px 60px 40px" }}>
      <window.Topbar onBack={onBack} title={t.a2_2.name} accent="#F5A6B5" />
      <window.StarSprinkles count={10} />

      <div style={{ display: "flex", alignItems: "center", gap: 30, maxWidth: 1280, margin: "0 auto" }}>
        <window.Star pose="thinking" size={180} message={choice ? t.pair.results[choice.key] : t.pair.situation} />
      </div>

      <div style={{ maxWidth: 1100, margin: "20px auto 0" }}>
        <div style={{
          background: "linear-gradient(180deg, #FBD5DC, #F5A6B5)",
          borderRadius: 36, padding: 30, minHeight: 280,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 80,
          boxShadow: "0 12px 30px rgba(120, 80, 160, 0.15)",
          position: "relative", overflow: "hidden",
        }}>
          <FriendChar emoKey="sad"/>
          <div style={{ fontSize: 80, animation: "wiggle 1.2s ease-in-out infinite" }}>👧</div>
        </div>

        <div className="display" style={{
          textAlign: "center", marginTop: 24, fontSize: 22, color: "var(--ink-soft)",
        }}>
          {t.a2_2.helper}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18,
          marginTop: 18,
        }}>
          {choices.map((c: any) => (
            <button key={c.key} onClick={() => !choice && pick(c)}
              className="light-surface"
              style={{
                background: c.color, borderRadius: 28, padding: "24px 16px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                boxShadow: choice && choice.key === c.key
                  ? `0 0 0 6px white, 0 0 0 10px ${c.positive ? "#7BC189" : "#E88A82"}`
                  : "0 6px 18px rgba(120, 80, 160, 0.15)",
                transition: "transform 0.15s, box-shadow 0.15s",
                cursor: choice ? "default" : "pointer",
                opacity: choice && choice.key !== c.key ? 0.5 : 1,
                minHeight: 140,
                border: 'none'
              }}
              onMouseEnter={(e: any) => !choice && (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e: any) => !choice && (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: 56 }}>{c.emoji}</div>
              <div className="display-h" style={{ fontSize: 20, color: "var(--ink)", fontWeight: 700 }}>
                {t.pair.choices[c.key]}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Planet2Screen({ t, onBack, onActivityComplete, completed }: any) {
  const config: PlanetConfig = {
    planetId: 2,
    planetKey: 'p2',
    tone: 'rose',
    hasRing: true,
    accentColor: '#E88A82',
    planetImage: '/social-epm.png',
    description: 'Aprende a observar a los demás, comprender cómo se sienten y ayudarles cuando lo necesitan.',
    guideInstruction: '¡Elige una actividad para aprender sobre los amigos!',
    activities: [
      { key: 'a1', info: t.a2_1, emoji: '👀', color: '#FBD5DC' },
      { key: 'a2', info: t.a2_2, emoji: '🤝', color: '#D6F0DC' },
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
        if (key === 'a1') return <A2_1_FriendFeels t={t} onBack={actBack} onComplete={actComplete} />;
        if (key === 'a2') return <A2_2_Pair t={t} onBack={actBack} onComplete={actComplete} />;
        return null;
      }}
    />
  );
}
