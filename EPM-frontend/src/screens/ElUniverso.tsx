import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AvatarGuia from '../components/AvatarGuia';

const PLANETS = [
  {
    id: 1,
    route: '/planeta/1',
    name: 'Me Conozco',
    subtitle: 'Mis emociones',
    image: '/meconozco-epm-removebg-preview.png',
    size: 88,
    gradient: 'radial-gradient(circle at 36% 32%, #FFE082 0%, #FFA726 50%, #E65100 100%)',
    glow: 'rgba(255, 167, 38, 0.70)',
    shadowColor: 'rgba(255, 190, 80, 0.40)',
    orbitPct: 42,
    orbitAngle: -60,
    floatDuration: '4s',
    floatDelay: '0s',
    accentColor: '#FFA726',
    hasRing: false,
  },
  {
    id: 2,
    route: '/planeta/2',
    name: 'Relaciones',
    subtitle: 'Amigos y empatía',
    image: '/social-epm.png',
    size: 96,
    gradient: 'radial-gradient(circle at 36% 32%, #FFCDD2 0%, #F06292 50%, #C2185B 100%)',
    glow: 'rgba(240, 98, 146, 0.70)',
    shadowColor: 'rgba(240, 98, 146, 0.38)',
    orbitPct: 62,
    orbitAngle: 150,
    floatDuration: '5.2s',
    floatDelay: '0.9s',
    accentColor: '#F06292',
    hasRing: true,
  },
  {
    id: 3,
    route: '/planeta/3',
    name: 'Me Relajo',
    subtitle: 'Calma y respiro',
    image: '/relax-epm.png',
    size: 88,
    gradient: 'radial-gradient(circle at 36% 32%, #B3E5FC 0%, #4FC3F7 50%, #0277BD 100%)',
    glow: 'rgba(79, 195, 247, 0.70)',
    shadowColor: 'rgba(100, 210, 250, 0.38)',
    orbitPct: 82,
    orbitAngle: 60,
    floatDuration: '6.4s',
    floatDelay: '1.8s',
    accentColor: '#4FC3F7',
    hasRing: false,
  },
] as const;

// Deterministic star positions (no rerenders)
const STARS = Array.from({ length: 72 }, (_, i) => ({
  id: i,
  left: ((i * 37 + 13) % 97),
  top: ((i * 53 + 7) % 96),
  size: i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : 1.1,
  delay: (i * 0.27) % 4,
  duration: 2.5 + (i % 5) * 0.4,
}));

const SUN_RAYS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i * 36 * Math.PI) / 180;
  const cx = 96, cy = 96;
  return {
    id: i,
    x1: cx + 66 * Math.cos(angle),
    y1: cy + 66 * Math.sin(angle),
    x2: cx + (i % 2 === 0 ? 88 : 80) * Math.cos(angle),
    y2: cy + (i % 2 === 0 ? 88 : 80) * Math.sin(angle),
    width: i % 2 === 0 ? 7 : 4,
  };
});

export default function ElUniverso() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes epu-ray-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes epu-star-twinkle {
          0%, 100% { opacity: 0.12; transform: scale(0.7); }
          50%       { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes epu-planet-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes epu-sun-corona {
          0%, 100% { transform: scale(1);    opacity: 0.75; }
          50%       { transform: scale(1.14); opacity: 1; }
        }
        @keyframes epu-sun-blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95%           { transform: scaleY(0.08); }
        }
      `}</style>

      <div style={{
        width: '100vw', height: '100vh',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 60%, #1E1245 0%, #0D0828 55%, #050315 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* ── Starfield ── */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {STARS.map(s => (
            <div key={s.id} style={{
              position: 'absolute',
              left: `${s.left}%`, top: `${s.top}%`,
              width: s.size, height: s.size,
              borderRadius: '50%',
              background: 'white',
              animation: `epu-star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }} />
          ))}
          {/* Nebula blobs */}
          <div style={{
            position: 'absolute', width: 500, height: 420,
            left: '-6%', top: '4%',
            background: 'radial-gradient(ellipse, rgba(110, 60, 210, 0.09) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }} />
          <div style={{
            position: 'absolute', width: 440, height: 380,
            right: '-4%', bottom: '4%',
            background: 'radial-gradient(ellipse, rgba(30, 120, 220, 0.09) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }} />
        </div>

        {/* ── Header ── */}
        <header style={{
          width: '100%', maxWidth: 900,
          padding: '14px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 50, flexShrink: 0,
        }} role="banner">
          {/* User badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 40, padding: '8px 16px',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #9C6FDE, #5B9BD5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>🚀</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.95)', lineHeight: 1.25 }}>
                Hola, Explorador
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)' }}>
                Viajero Espacial
              </div>
            </div>
          </div>

          {/* Nav buttons — FIX 4: increased to 66×66 for child-friendly touch targets */}
          <nav style={{ display: 'flex', gap: 8 }} aria-label="Menú principal">
            {([
              { to: '/informe',   label: 'Mi Viaje', emoji: '📖' },
              { to: '/dashboard', label: 'Progreso', emoji: '📊' },
              { to: '/logros',    label: 'Logros',   emoji: '🏆' },
            ] as const).map(btn => (
              <Link key={btn.to} to={btn.to} state={{ transitionType: 'none' }}
                aria-label={btn.label}
                style={{
                  width: 66, height: 66, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, textDecoration: 'none',
                  transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
              >
                {btn.emoji}
              </Link>
            ))}
          </nav>
        </header>

        {/* ── Solar system ── */}
        <main style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', minHeight: 0, position: 'relative',
        }} id="main-content" aria-label="Sistema solar de planetas emocionales">

          {/* FIX 2: container uses min(88vmin, 820px) — no minimum clamp */}
          <div style={{
            position: 'relative',
            width: 'min(88vmin, 820px)',
            height: 'min(88vmin, 820px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>

            {/* Orbit rings — FIX 2: updated to 42, 62, 82 | FIX 8: static opacity, no animation */}
            {([42, 62, 82] as const).map((pct, i) => (
              <div key={pct} style={{
                position: 'absolute',
                width: `${pct}%`, height: `${pct}%`,
                borderRadius: '50%',
                border: `1.5px dashed rgba(190, 170, 255, ${0.17 + i * 0.05})`,
                opacity: 0.22,
                pointerEvents: 'none',
              }} />
            ))}

            {/* ── FRIENDLY SUN ── */}
            <div style={{ position: 'absolute', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Corona glow */}
              <div style={{
                position: 'absolute',
                width: 220, height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,220,70,0.28) 0%, rgba(255,140,30,0.10) 50%, transparent 70%)',
                animation: 'epu-sun-corona 3.2s ease-in-out infinite',
                pointerEvents: 'none',
              }} />
              {/* Rotating rays */}
              <div style={{
                position: 'absolute', width: 192, height: 192,
                animation: 'epu-ray-spin 30s linear infinite',
                pointerEvents: 'none',
              }}>
                <svg width="192" height="192" viewBox="0 0 192 192" aria-hidden="true">
                  {SUN_RAYS.map(r => (
                    <line key={r.id}
                      x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                      stroke="rgba(255, 230, 90, 0.82)"
                      strokeWidth={r.width}
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              </div>
              {/* Sun body */}
              <div style={{
                width: 118, height: 118, borderRadius: '50%',
                background: 'radial-gradient(circle at 36% 32%, #FFE566 0%, #FFB300 46%, #FF6D00 100%)',
                boxShadow: '0 0 55px rgba(255,200,50,0.78), 0 0 110px rgba(255,150,30,0.32), inset -12px -16px 28px rgba(200,80,0,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <svg width="80" height="80" viewBox="0 0 80 80" aria-label="Sol amigable">
                  {/* Left eye */}
                  <g style={{ animation: 'epu-sun-blink 5s ease-in-out 2s infinite', transformOrigin: '27px 31px' }}>
                    <ellipse cx="27" cy="31" rx="6" ry="7" fill="#7A3800" />
                    <ellipse cx="25" cy="29" rx="1.8" ry="2.2" fill="white" opacity="0.55" />
                  </g>
                  {/* Right eye */}
                  <g style={{ animation: 'epu-sun-blink 5s ease-in-out 2s infinite', transformOrigin: '53px 31px' }}>
                    <ellipse cx="53" cy="31" rx="6" ry="7" fill="#7A3800" />
                    <ellipse cx="51" cy="29" rx="1.8" ry="2.2" fill="white" opacity="0.55" />
                  </g>
                  {/* Big smile */}
                  <path d="M22 51 Q40 68 58 51" stroke="#7A3800" strokeWidth="3.5" fill="rgba(210,75,0,0.32)" strokeLinecap="round" />
                  {/* Rosy cheeks */}
                  <ellipse cx="13" cy="45" rx="8" ry="5.5" fill="rgba(255,95,50,0.35)" />
                  <ellipse cx="67" cy="45" rx="8" ry="5.5" fill="rgba(255,95,50,0.35)" />
                </svg>
              </div>
            </div>

            {/* ── PLANETS ── */}
            {PLANETS.map(p => (
              /*
               * FIX 1 — 4-layer structure separating counter-rotation from float animation:
               *   Layer 1: orbit container — rotated to position planet on its ring
               *   Layer 2: anchor point at top-center of orbit container
               *   Layer 3: counter-rotation + centering (NO animation here)
               *   Layer 4: float animation ONLY (NO transform here)
               */

              /* Layer 1: orbit container */
              <div key={p.id} style={{
                position: 'absolute',
                width: `${p.orbitPct}%`, height: `${p.orbitPct}%`,
                transform: `rotate(${p.orbitAngle}deg)`,
                pointerEvents: 'none',
              }}>
                {/* Layer 2: anchor at top-center */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '50%',
                  pointerEvents: 'auto',
                }}>
                  {/* Layer 3: counter-rotation + centering — no animation property */}
                  <div style={{
                    transform: `translate(-50%, -50%) rotate(${-p.orbitAngle}deg)`,
                  }}>
                    {/* Layer 4: float animation only — no transform property */}
                    <div style={{
                      animation: `epu-planet-float ${p.floatDuration} ease-in-out ${p.floatDelay} infinite`,
                    }}>
                      {/* FIX 7: removed outline:'none' — keyboard focus handled by global focus-visible CSS */}
                      <Link
                        to={p.route}
                        state={{ transitionType: 'push' }}
                        aria-label={`Ir al Planeta ${p.name} – ${p.subtitle}`}
                        className="focus-visible:ring-2 focus-visible:ring-white"
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                          textDecoration: 'none',
                        }}
                        onMouseEnter={() => setHovered(p.id)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(p.id)}
                        onBlur={() => setHovered(null)}
                        /* FIX 5: touch feedback for touch devices */
                        onTouchStart={() => setHovered(p.id)}
                        onTouchEnd={() => setHovered(null)}
                      >
                        {/* Planet sphere */}
                        <div style={{
                          width: p.size, height: p.size,
                          borderRadius: '50%',
                          background: p.gradient,
                          boxShadow: hovered === p.id
                            ? `inset -14px -18px 32px rgba(0,0,0,0.22), 0 0 52px ${p.glow}, 0 20px 50px ${p.shadowColor}`
                            : `inset -14px -18px 32px rgba(0,0,0,0.22), 0 0 26px ${p.glow}, 0 14px 36px ${p.shadowColor}`,
                          position: 'relative', overflow: 'visible',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transform: hovered === p.id ? 'scale(1.13)' : 'scale(1)',
                          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
                        }}>
                          {/* Surface highlights */}
                          <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            background: `radial-gradient(circle at 62% 34%, rgba(255,255,255,0.32) 0 8%, transparent 9%),
                                         radial-gradient(circle at 26% 68%, rgba(255,255,255,0.14) 0 6%, transparent 7%)`,
                          }} />
                          {/* Planet character image */}
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{
                              width: p.size * 0.88,
                              height: p.size * 0.88,
                              objectFit: 'contain',
                              zIndex: 2,
                              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.45))',
                              pointerEvents: 'none',
                            }}
                          />
                          {/* Ring for planet 2 */}
                          {p.hasRing && (
                            <div style={{
                              position: 'absolute',
                              left: '-22%', top: '37%',
                              width: '144%', height: '28%',
                              border: '5px solid rgba(255, 200, 225, 0.55)',
                              borderRadius: '50%',
                              transform: 'rotate(-18deg)',
                              pointerEvents: 'none',
                            }} />
                          )}
                        </div>

                        {/* Label — FIX 6: increased font sizes and contrast */}
                        <div style={{
                          background: 'rgba(14, 8, 38, 0.84)',
                          backdropFilter: 'blur(14px)',
                          border: `1.5px solid ${hovered === p.id ? p.accentColor + 'BB' : p.accentColor + '44'}`,
                          borderRadius: 22,
                          padding: '5px 14px',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          boxShadow: hovered === p.id ? `0 0 20px ${p.glow}55` : 'none',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        }}>
                          <div style={{ fontWeight: 700, fontSize: 16, color: 'white', lineHeight: 1.3 }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 1 }}>
                            {p.subtitle}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </main>
      </div>

      <AvatarGuia mensaje="¡Hola, Explorador!" subtitulo="¿A qué planeta viajaremos hoy?" />
    </>
  );
}
