import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/animations.css';
import '../styles/print.css';
import { useSessionProgress } from '../context/SessionProgressContext';
import {
  A1_1_Data, A1_2_Data, A1_3_Data,
  A2_1_Data, A2_2_Data,
  A3_1_Data, A3_2_Data,
  EmotionKey, PlanetKey,
} from '../types/progress';
import { computeAchievements } from '../utils/achievements';

const PLANET_TONES: Record<PlanetKey, 'warm' | 'rose' | 'calm'> = {
  p1: 'warm',
  p2: 'rose',
  p3: 'calm',
};

const PLANET_RING: Record<PlanetKey, boolean> = {
  p1: false,
  p2: true,
  p3: false,
};

function formatSeconds(ms: number): string {
  return Math.max(1, Math.round(ms / 1000)).toString();
}

function Card({ title, children, accent = '#F5C44A' }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="informe-card" style={{
      background: 'rgba(28, 30, 48, 0.65)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: 24,
      padding: '20px 22px',
      border: `1.5px solid ${accent}55`,
      boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
      color: 'white',
    }}>
      <h3 className="display-h informe-card-title" style={{
        fontSize: 19,
        color: accent,
        marginBottom: 12,
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>
      <div className="informe-card-body" style={{
        fontSize: 15,
        lineHeight: 1.5,
        color: 'rgba(255,255,255,0.92)',
      }}>
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="informe-stat" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: '4px 0',
      borderBottom: '1px dashed rgba(255,255,255,0.10)',
    }}>
      <span className="informe-stat-label" style={{
        color: 'rgba(255,255,255,0.65)',
        fontSize: 14,
      }}>{label}</span>
      <span className="informe-stat-value" style={{
        fontWeight: 700,
        fontSize: 16,
      }}>{value}</span>
    </div>
  );
}

interface EmotionTagProps { emoKey: EmotionKey; t: any }
const EmotionTag: React.FC<EmotionTagProps> = ({ emoKey, t }) => {
  const emoData = (window as any).EMOTIONS?.find((e: any) => e.key === emoKey);
  if (!emoData) return null;
  return (
    <div className="informe-emotion-tag" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: emoData.color,
      color: '#3D2A50',
      borderRadius: 18,
      padding: '5px 12px',
      fontWeight: 600,
      fontSize: 14,
      boxShadow: '0 3px 8px rgba(0,0,0,0.10)',
    }}>
      <span style={{ fontSize: 18 }}>{emoData.emoji}</span>
      <span>{t.emotions[emoKey]}</span>
    </div>
  );
};

export default function Informe({ t }: { t: any }) {
  const navigate = useNavigate();
  const { progress, resetProgress } = useSessionProgress();

  const Topbar = (window as any).Topbar;
  const StarSprinkles = (window as any).StarSprinkles;
  const PlanetSphere = (window as any).PlanetSphere;

  const completedCount = Object.keys(progress.activities).length;
  const visitedCount = progress.visitedPlanets.length;
  const achievements = useMemo(() => computeAchievements(progress), [progress]);

  useEffect(() => {
    if (completedCount >= 3 && (window as any).fireConfetti) {
      (window as any).fireConfetti();
    }
    if ((window as any).SoundFX?.chime) (window as any).SoundFX.chime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const a1_1 = progress.activities['p1.a1'] as A1_1_Data | undefined;
  const a1_2 = progress.activities['p1.a2'] as A1_2_Data | undefined;
  const a1_3 = progress.activities['p1.a3'] as A1_3_Data | undefined;
  const a2_1 = progress.activities['p2.a1'] as A2_1_Data | undefined;
  const a2_2 = progress.activities['p2.a2'] as A2_2_Data | undefined;
  const a3_1 = progress.activities['p3.a1'] as A3_1_Data | undefined;
  const a3_2 = progress.activities['p3.a2'] as A3_2_Data | undefined;

  const allEmotions: EmotionKey[] = [];
  if (a1_1) allEmotions.push(a1_1.emotion);
  if (a1_3) a1_3.exploredEmotions.forEach(e => { if (!allEmotions.includes(e)) allEmotions.push(e); });

  const handleDownload = () => {
    window.print();
  };

  const handleRestart = () => {
    if (window.confirm(t.report.restartConfirm)) {
      resetProgress();
      navigate('/');
    }
  };

  const heroMessage = visitedCount === 0
    ? t.report.heroNoneYet
    : t.report.heroVisited.replace('{n}', String(visitedCount));

  return (
    <div className="informe-root" style={{
      position: 'absolute', inset: 0, padding: '90px 50px 130px',
      overflow: 'auto',
      background: 'linear-gradient(180deg, #101223 0%, #1c1e30 60%, #2a1f3d 100%)',
    }}>
      <div className="informe-no-print">
        <Topbar
          onBack={() => navigate(-1)}
          title={t.report.title}
          accent="#F5C44A"
        />
        <StarSprinkles count={20} color="#F5C44A" />
      </div>

      {/* HERO */}
      <div className="informe-hero" style={{
        maxWidth: 1100, margin: '0 auto', textAlign: 'center', paddingTop: 12,
      }}>
        <div className="display-h informe-hero-title" style={{
          fontSize: 38, color: 'white', marginBottom: 8,
          textShadow: '0 4px 14px rgba(0,0,0,0.30)',
        }}>
          {heroMessage}
        </div>
        <div className="informe-hero-subtitle" style={{
          color: 'rgba(255,255,255,0.72)', fontSize: 18, marginBottom: 30,
        }}>
          {t.report.heroCompletedActivities.replace('{n}', String(completedCount))}
        </div>

        <div className="informe-planet-row" style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 60, flexWrap: 'wrap', marginBottom: 24,
        }}>
          {(['p1', 'p2', 'p3'] as PlanetKey[]).map((pk, i) => {
            const visited = progress.visitedPlanets.includes(pk);
            const planetActs = Object.keys(progress.activities).filter(k => k.startsWith(`${pk}.`));
            const tInfo = t[pk];
            return (
              <div key={pk} className="informe-planet-item" style={{
                opacity: visited ? 1 : 0.25,
                filter: visited ? 'none' : 'grayscale(0.7)',
                animation: visited ? `float-med ${4 + i}s ease-in-out ${i * 0.4}s infinite` : 'none',
                textAlign: 'center',
              }}>
                <PlanetSphere tone={PLANET_TONES[pk]} size={130} hasRing={PLANET_RING[pk]} />
                <div className="display-h informe-planet-name" style={{
                  marginTop: 18, color: 'white', fontSize: 18,
                }}>
                  {tInfo?.name}
                </div>
                <div className="informe-planet-count" style={{
                  marginTop: 4, fontSize: 13, color: '#A8DDB5', fontWeight: 600,
                }}>
                  {planetActs.length > 0 ? `✓ ${planetActs.length} ${t.activities}` : '—'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Logros desbloqueados */}
        {achievements.filter(a => a.unlocked).length > 0 && (
          <div className="informe-achievements" style={{
            display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
            marginTop: 14, marginBottom: 18,
          }}>
            {achievements.filter(a => a.unlocked).map(a => (
              <div key={a.id} className="informe-achievement-chip" style={{
                background: 'rgba(245, 196, 74, 0.18)',
                border: '1.5px solid rgba(245, 196, 74, 0.55)',
                borderRadius: 22, padding: '6px 14px',
                color: '#FFE08A', fontWeight: 600, fontSize: 14,
              }}>
                ⭐ {a.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN DE DETALLES — siempre visible */}
      <div className="informe-details" style={{ maxWidth: 1100, margin: '40px auto 0' }}>
        <div className="informe-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {/* Emociones identificadas */}
          <Card title={t.report.sectionEmotions} accent="#FFE08A">
            {allEmotions.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allEmotions.map(e => <EmotionTag key={e} emoKey={e} t={t} />)}
              </div>
            ) : <span className="informe-empty" style={{ opacity: 0.6 }}>{t.report.noData}</span>}
          </Card>

          {/* Maleta */}
          <Card title={t.report.sectionSuitcase} accent="#F5A26A">
            {a1_2 ? (
              <div>
                <Stat label={t.report.labelPacked} value={`${a1_2.packed.length}`} />
                <Stat label={t.report.labelDuration} value={`${formatSeconds(a1_2.durationMs)}${t.report.seconds}`} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {a1_2.packed.map(k => (
                    <span key={k} className="informe-mini-chip" style={{
                      background: 'rgba(255,224,138,0.20)', borderRadius: 14,
                      padding: '3px 10px', fontSize: 13, color: '#FFE08A',
                    }}>
                      {t.suitcase.items[k] ?? k}
                    </span>
                  ))}
                </div>
              </div>
            ) : <span className="informe-empty" style={{ opacity: 0.6 }}>{t.report.noData}</span>}
          </Card>

          {/* Espejo mágico */}
          <Card title={t.report.sectionMirror} accent="#C7B5E8">
            {a1_3 ? (
              <div>
                <Stat label={t.report.labelExplored} value={`${a1_3.exploredEmotions.length} / 6`} />
                <Stat label={t.report.labelLastEmotion} value={t.emotions[a1_3.lastEmotion]} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {a1_3.exploredEmotions.map(e => <EmotionTag key={e} emoKey={e} t={t} />)}
                </div>
              </div>
            ) : <span className="informe-empty" style={{ opacity: 0.6 }}>{t.report.noData}</span>}
          </Card>

          {/* Empatía amigo */}
          <Card title={t.report.sectionFriend} accent="#E88A82">
            {a2_1 ? (
              <div>
                <Stat label={t.report.labelCorrect} value={`${a2_1.correctOnFirstTry} / ${a2_1.totalRounds}`} />
                <Stat label={t.report.labelMistakes} value={a2_1.mistakes.length} />
                {a2_1.mistakes.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                    {a2_1.mistakes.map((e, i) => <EmotionTag key={`${e}-${i}`} emoKey={e} t={t} />)}
                  </div>
                )}
              </div>
            ) : <span className="informe-empty" style={{ opacity: 0.6 }}>{t.report.noData}</span>}
          </Card>

          {/* Decisión social */}
          <Card title={t.report.sectionPair} accent="#F5A6B5">
            {a2_2 ? (
              <div>
                <Stat label={t.report.labelChoice} value={`${t.pair.choices[a2_2.choice]} ${a2_2.positive ? '✓' : '✗'}`} />
                <Stat label={t.report.labelAttempts} value={a2_2.attempts} />
              </div>
            ) : <span className="informe-empty" style={{ opacity: 0.6 }}>{t.report.noData}</span>}
          </Card>

          {/* Mundo tranquilo */}
          <Card title={t.report.sectionQuiet} accent="#A6CDE8">
            {a3_1 ? (
              <div>
                <Stat label={t.report.labelTaps} value={a3_1.tapsCount} />
                <Stat label={t.report.labelDuration} value={`${formatSeconds(a3_1.durationMs)}${t.report.seconds}`} />
              </div>
            ) : <span className="informe-empty" style={{ opacity: 0.6 }}>{t.report.noData}</span>}
          </Card>

          {/* Respiración */}
          <Card title={t.report.sectionBreathe} accent="#A8DDB5">
            {a3_2 ? (
              <div>
                <Stat label={t.report.labelCycles} value={`${a3_2.cyclesCompleted} / 4`} />
                <Stat label={t.report.labelPauses} value={a3_2.pausedCount} />
              </div>
            ) : <span className="informe-empty" style={{ opacity: 0.6 }}>{t.report.noData}</span>}
          </Card>
        </div>

        <div className="informe-footnote" style={{
          marginTop: 22, textAlign: 'center', color: 'rgba(255,255,255,0.55)',
          fontSize: 13, fontStyle: 'italic',
        }}>
          ⓘ {t.report.saveBeforeClose}
        </div>
      </div>

      {/* Acciones inferiores */}
      <div className="informe-actions" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '14px 20px', display: 'flex', justifyContent: 'center', gap: 10,
        background: 'linear-gradient(0deg, rgba(16, 18, 35, 0.95) 0%, rgba(16, 18, 35, 0) 100%)',
        zIndex: 30, flexWrap: 'wrap',
      }}>
        <button onClick={handleDownload} style={{
          background: 'linear-gradient(180deg, #FFE08A, #F5C44A)',
          color: '#3D2A50', borderRadius: 30, padding: '14px 28px',
          fontFamily: 'Fredoka', fontWeight: 700, fontSize: 16,
          border: 'none', cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(245, 196, 74, 0.40)',
          minHeight: 56,
        }}>
          📥 {t.report.download}
        </button>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(255,255,255,0.10)',
          color: 'white', borderRadius: 30, padding: '14px 24px',
          fontFamily: 'Fredoka', fontWeight: 600, fontSize: 16,
          border: '1.5px solid rgba(255,255,255,0.20)', cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          minHeight: 56,
        }}>
          🏠 {t.report.home}
        </button>
        <button onClick={handleRestart} style={{
          background: 'rgba(232, 138, 130, 0.18)',
          color: '#FBC0BA', borderRadius: 30, padding: '14px 24px',
          fontFamily: 'Fredoka', fontWeight: 600, fontSize: 16,
          border: '1.5px solid rgba(232, 138, 130, 0.45)', cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          minHeight: 56,
        }}>
          ↻ {t.report.restart}
        </button>
      </div>

      <div className="informe-no-print" style={{
        position: 'fixed', bottom: 78, right: 20, zIndex: 28,
        background: 'rgba(20, 10, 40, 0.78)', backdropFilter: 'blur(8px)',
        borderRadius: 16, padding: '6px 12px',
        color: 'rgba(255,255,255,0.6)', fontSize: 12, maxWidth: 220,
        border: '1px solid rgba(255,255,255,0.10)',
      }}>
        {t.report.downloadHint}
      </div>

      {/* Encabezado solo para impresión */}
      <div className="informe-print-header informe-print-only">
        <div className="informe-print-title">{t.report.title}</div>
        <div className="informe-print-meta">
          {new Date(progress.startedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
