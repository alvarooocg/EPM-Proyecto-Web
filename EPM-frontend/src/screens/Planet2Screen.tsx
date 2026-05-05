import React, { useState, useEffect } from 'react';
import '../styles/animations.css';

// Activity 1: ¿Qué siente mi amigo?
function A2_1_FriendFeels({ t, onComplete, onBack }: any) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<any>(null);
  const [streak, setStreak] = useState(0);

  const ROUNDS = [
    { target: "sad", scene: "🌧️" },
    { target: "happy", scene: "🎈" },
    { target: "scared", scene: "🌑" },
  ];

  const cur = ROUNDS[round];
  const targetEmo = window.EMOTIONS?.find((e: any) => e.key === cur.target);

  useEffect(() => {
    if (window.speak) window.speak(t.friend.prompt, window.__lang);
  }, [round]);

  const pick = (emo: any) => {
    setPicked(emo);
    if (emo.key === cur.target) {
      if (window.SoundFX) window.SoundFX.chime();
      if (window.speak) window.speak(`${t.friend.correct} ${t.emotions[emo.key]}`, window.__lang);
      setStreak((s: number) => s + 1);
      setTimeout(() => {
        if (round < ROUNDS.length - 1) { setRound((r: number) => r + 1); setPicked(null); }
        else { if (window.fireConfetti) window.fireConfetti(); onComplete(); }
      }, 1600);
    } else {
      if (window.SoundFX) window.SoundFX.err?.();
      if (window.speak) window.speak(t.friend.wrong, window.__lang);
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
        <div style={{
          background: targetEmo?.color,
          borderRadius: 36, padding: 30, minHeight: 380,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 12px 30px rgba(120, 80, 160, 0.15)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 16, left: 16, fontSize: 48, opacity: 0.4 }}>{cur.scene}</div>
          <FriendChar emoKey={cur.target} />
          <div className="display" style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 16 }}>
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
    happy: { skin: "#FFE2C4", hair: "#7A5A85" },
    sad: { skin: "#E8D8C0", hair: "#7A5A85" },
    angry: { skin: "#FFD0C0", hair: "#7A5A85" },
    scared: { skin: "#E8D8C0", hair: "#7A5A85" },
    excited: { skin: "#FFE2C4", hair: "#7A5A85" },
    surprised: { skin: "#FFE2C4", hair: "#7A5A85" },
  };
  const p = palette[emoKey];

  const Eye = ({ cx }: any) => {
    if (emoKey === "scared" || emoKey === "surprised") return <><circle cx={cx} cy="100" r="14" fill="white"/><circle cx={cx} cy="100" r="7" fill="#3D2A50"/></>;
    if (emoKey === "angry") return <><path d={`M${cx-15} 90 L${cx+12} 100`} stroke="#3D2A50" strokeWidth="5" fill="none" strokeLinecap="round" transform={cx > 130 ? `scale(-1,1) translate(-${cx*2},0)` : ""}/><ellipse cx={cx} cy="105" rx="6" ry="8" fill="#3D2A50"/></>;
    if (emoKey === "sad") return <path d={`M${cx-12} 105 Q ${cx} 95 ${cx+12} 105`} stroke="#3D2A50" strokeWidth="4" fill="none" strokeLinecap="round" />;
    return <ellipse cx={cx} cy="100" rx="6" ry="9" fill="#3D2A50"/>;
  };

  const Mouth = () => {
    if (emoKey === "happy" || emoKey === "excited") return <path d="M80 145 Q 110 175 140 145" stroke="#3D2A50" strokeWidth="5" fill="#E88A82" strokeLinecap="round"/>;
    if (emoKey === "sad") return <path d="M80 160 Q 110 138 140 160" stroke="#3D2A50" strokeWidth="5" fill="none" strokeLinecap="round"/>;
    if (emoKey === "angry") return <path d="M80 160 Q 110 145 140 160" stroke="#3D2A50" strokeWidth="5" fill="none" strokeLinecap="round"/>;
    return <ellipse cx="110" cy="155" rx="14" ry="16" fill="#3D2A50"/>;
  };

  return (
    <svg width="280" height="280" viewBox="0 0 220 220">
      <ellipse cx="110" cy="200" rx="80" ry="14" fill="rgba(0,0,0,0.08)"/>
      <circle cx="110" cy="115" r="88" fill={p.skin} stroke="#4A3A55" strokeWidth="3"/>
      <path d="M40 90 Q 50 30 110 28 Q 170 30 180 90 Q 170 60 110 58 Q 50 60 40 90 Z" fill={p.hair}/>
      <Eye cx={86}/>
      <Eye cx={134}/>
      <ellipse cx="74" cy="135" rx="9" ry="6" fill="#F5A6B5" opacity="0.7"/>
      <ellipse cx="146" cy="135" rx="9" ry="6" fill="#F5A6B5" opacity="0.7"/>
      <Mouth/>
      {emoKey === "sad" && <path d="M134 122 Q 134 142 138 152 Q 142 142 138 122 Z" fill="#7AAEDB"/>}
    </svg>
  );
}

// Activity 2: Juego por parejas
function A2_2_Pair({ t, onComplete, onBack }: any) {
  const [choice, setChoice] = useState<any>(null);

  useEffect(() => {
    if (window.speak) window.speak(t.pair.situation + " " + t.a2_2.lead, window.__lang);
  }, []);

  const choices = [
    { key: "hug", emoji: "🤗", color: "#FBD5DC", positive: true },
    { key: "help", emoji: "🤝", color: "#D6F0DC", positive: true },
    { key: "share", emoji: "🎁", color: "#FFE08A", positive: true },
    { key: "ignore", emoji: "🙈", color: "#E2D2F5", positive: false },
  ];

  const pick = (c: any) => {
    setChoice(c);
    if (c.positive) {
      if (window.SoundFX) window.SoundFX.chime();
      if (window.speak) window.speak(t.pair.results[c.key], window.__lang);
      setTimeout(() => { if (window.fireConfetti) window.fireConfetti(); onComplete(); }, 2200);
    } else {
      if (window.SoundFX) window.SoundFX.err?.();
      if (window.speak) window.speak(t.pair.results[c.key], window.__lang);
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
              <div className="display-h" style={{ fontSize: 20, color: "var(--ink)" }}>
                {t.pair.choices[c.key]}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Planet 2 Hub
function Planet2Screen({ t, onBack, onActivityComplete, completed }: any) {
  const [activity, setActivity] = useState<string | null>(null);

  if (activity === "a1") return <A2_1_FriendFeels t={t} onBack={() => setActivity(null)} onComplete={() => { if (onActivityComplete) onActivityComplete("p2", "a1"); setActivity(null); }} />;
  if (activity === "a2") return <A2_2_Pair t={t} onBack={() => setActivity(null)} onComplete={() => { if (onActivityComplete) onActivityComplete("p2", "a2"); setActivity(null); }} />;

  const acts = [
    { key: "a1", info: t.a2_1, emoji: "👀", color: "#FBD5DC" },
    { key: "a2", info: t.a2_2, emoji: "🤝", color: "#D6F0DC" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, padding: "100px 60px 40px" }}>
      <window.Topbar onBack={onBack} title={`Planeta 2 · ${t.p2.name}`} accent="#E88A82" />
      <window.StarSprinkles count={14} />

      <div style={{ display: "flex", alignItems: "center", gap: 40, maxWidth: 1300, margin: "10px auto 0" }}>
        <div style={{ animation: "float-med 5s ease-in-out infinite" }}>
          <window.PlanetSphere tone="rose" size={220} hasRing />
        </div>
        <div style={{ flex: 1 }}>
          <div className="display-h" style={{ fontSize: 48, color: "var(--ink)" }}>{t.p2.name}</div>
          <div className="display" style={{ fontSize: 22, color: "var(--ink-soft)", marginTop: 8 }}>{t.p2.subtitle}</div>
          <div style={{ fontSize: 16, color: "var(--ink-light)", marginTop: 12, maxWidth: 540 }}>
            Aprende a observar a los demás, comprender cómo se sienten y ayudarles cuando lo necesitan.
          </div>
        </div>
        <window.Star pose="social" size={220} />
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
                background: "#3D2B5F", borderRadius: 32, padding: "28px 24px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                boxShadow: "0 10px 24px rgba(120, 80, 160, 0.12)",
                cursor: "pointer", minHeight: 280, position: "relative",
                transition: "transform 0.2s",
                border: 'none',
                color: "white"
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

export default Planet2Screen;
