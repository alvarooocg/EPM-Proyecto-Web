import React, { useState } from 'react';
import '../styles/animations.css';
import AvatarGuia from '../components/AvatarGuia';
import { ActivityKey, ActivityPayload, PlanetKey } from '../types/progress';

export interface ActivityDef {
  key: ActivityKey;
  info: { name: string; helper: string };
  emoji: string;
  color: string;
}

export interface PlanetConfig {
  planetId: 1 | 2 | 3;
  planetKey: 'p1' | 'p2' | 'p3';
  tone: 'warm' | 'rose' | 'calm';
  hasRing?: boolean;
  accentColor: string;
  planetImage: string;
  description: string;
  guideInstruction: string;
  backgroundStyle?: React.CSSProperties;
  sprinklesColor?: string;
  activities: ActivityDef[];
}

interface PlanetScreenProps {
  config: PlanetConfig;
  t: any;
  onBack: () => void;
  onActivityComplete: (planet: PlanetKey, activity: ActivityKey, payload: ActivityPayload) => void;
  completed: string[];
  renderActivity: (
    activityKey: ActivityKey,
    onBack: () => void,
    onComplete: (payload: ActivityPayload) => void
  ) => React.ReactNode;
}

export default function PlanetScreen({
  config,
  t,
  onBack,
  onActivityComplete,
  completed,
  renderActivity,
}: PlanetScreenProps) {
  const [activity, setActivity] = useState<ActivityKey | null>(null);

  if (activity) {
    const planetKey = `p${config.planetId}` as PlanetKey;
    return (
      <>
        {renderActivity(
          activity,
          () => setActivity(null),
          (payload: ActivityPayload) => {
            onActivityComplete(planetKey, activity, payload);
            setActivity(null);
          }
        )}
      </>
    );
  }

  const cols = config.activities.length >= 3 ? 3 : 2;
  const gridMaxWidth = cols === 3 ? 1180 : 900;

  return (
    <div style={{
      position: 'absolute', inset: 0, padding: '100px 60px 40px',
      ...config.backgroundStyle,
    }}>
      <window.Topbar
        onBack={onBack}
        title={`Planeta ${config.planetId} · ${t[config.planetKey].name}`}
        accent={config.accentColor}
      />
      <window.StarSprinkles count={14} color={config.sprinklesColor} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 40, maxWidth: 1300, margin: '10px auto 0' }}>
        <div style={{ animation: 'float-med 5s ease-in-out infinite' }}>
          <window.PlanetSphere tone={config.tone} size={220} hasRing={config.hasRing} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="display-h" style={{ fontSize: 48, color: 'var(--ink)' }}>
            {t[config.planetKey].name}
          </div>
          <div className="display" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 8 }}>
            {t[config.planetKey].subtitle}
          </div>
          <div style={{ fontSize: 16, color: 'var(--ink-light)', marginTop: 12, maxWidth: 540 }}>
            {config.description}
          </div>
        </div>
        <img
          src={config.planetImage}
          alt={t[config.planetKey]?.name ?? ''}
          style={{
            height: 220,
            width: 220,
            objectFit: 'contain',
            animation: 'float-med 5s ease-in-out infinite',
            filter: 'drop-shadow(0 8px 24px rgba(120, 80, 160, 0.22))',
          }}
        />
      </div>

      <div className="display-h" style={{ fontSize: 22, color: 'var(--ink-soft)', textAlign: 'center', marginTop: 28 }}>
        {t.chooseActivity}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 24,
        maxWidth: gridMaxWidth,
        margin: '20px auto 0',
      }}>
        {config.activities.map((a, idx) => {
          const done = completed?.includes(a.key);
          return (
            <button
              key={a.key}
              onClick={() => { if ((window as any).SoundFX) (window as any).SoundFX.pop(); setActivity(a.key); }}
              style={{
                background: '#3D2B5F', borderRadius: 32, padding: '28px 24px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                boxShadow: '0 10px 24px rgba(120, 80, 160, 0.12)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer', minHeight: 280, position: 'relative',
                border: 'none', color: 'white',
              }}
              onMouseEnter={(e: any) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e: any) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                fontFamily: 'Fredoka', fontWeight: 600, fontSize: 14,
                color: 'var(--ink-light)', letterSpacing: '0.06em',
              }}>
                ACTIVIDAD {idx + 1}
              </div>
              <div style={{
                width: 110, height: 110, borderRadius: '50%',
                background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 56,
                boxShadow: `0 0 0 6px white, 0 0 0 10px ${a.color}88`,
              }}>
                {a.emoji}
              </div>
              <div className="display-h" style={{ fontSize: 22, color: 'var(--ink)', textAlign: 'center' }}>
                {a.info.name}
              </div>
              <div style={{ fontSize: 15, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 260 }}>
                {a.info.helper}
              </div>
              {done && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: '#7BC189', color: 'white',
                  borderRadius: 16, padding: '4px 12px',
                  fontSize: 13, fontFamily: 'Fredoka', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  ✓ {t.completed}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <AvatarGuia mensaje={config.guideInstruction} subtitulo="" />
    </div>
  );
}
