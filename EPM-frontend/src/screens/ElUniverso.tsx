import { Link } from 'react-router-dom';
import AvatarGuia from '../components/AvatarGuia';

export default function ElUniverso() {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2650&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-background/80" aria-hidden="true" />
      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8 h-full">
        <header
          className="w-[calc(100%-2rem)] mx-4 mt-4 z-50 shrink-0 flex justify-between items-center bg-surface-container/80 backdrop-blur-md p-3 md:p-4 rounded-3xl border border-outline-variant/30"
          role="banner"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center" aria-hidden="true">
              <span className="material-symbols-outlined text-primary text-xl md:text-2xl">account_circle</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-base md:text-lg">Hola, Explorador</h2>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium">Nivel 4: Viajero Espacial</p>
            </div>
          </div>
          <nav className="flex gap-2" aria-label="Menú principal">
            <Link to="/dashboard" aria-label="Ver progreso y estadísticas" state={{ transitionType: 'none' }} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:bg-secondary/20 hover:text-secondary focus:ring-4 focus:ring-secondary/50 outline-none">
              <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">bar_chart</span>
            </Link>
            <Link to="/configuracion" aria-label="Ir a configuración" state={{ transitionType: 'none' }} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:bg-secondary/20 hover:text-secondary focus:ring-4 focus:ring-secondary/50 outline-none">
              <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">settings</span>
            </Link>
            <Link to="/logros" aria-label="Ver logros galácticos" state={{ transitionType: 'none' }} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:bg-secondary/20 hover:text-secondary focus:ring-4 focus:ring-secondary/50 outline-none">
              <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">emoji_events</span>
            </Link>
          </nav>
        </header>

        <main className="w-full flex-1 relative flex items-center justify-center overflow-hidden min-h-0" aria-label="Sistema solar de planetas emocionales">
          
          <div className="relative w-full max-w-[800px] max-h-full aspect-square flex items-center justify-center scale-75 md:scale-85 lg:scale-100">
            {/* Sol Decorativo Central */}
            <div className="absolute z-20 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div className="absolute w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-500 shadow-[0_0_60px_rgba(253,224,71,0.6)] animate-pulse-glow" />
              <div className="absolute w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
            </div>

            {/* Anillos de Órbita Visibles (Líneas sólidas al estilo espacial) */}
            <div className="absolute w-[240px] h-[240px] md:w-[360px] md:h-[360px] rounded-full border-[1.5px] border-blue-200/20 pointer-events-none" aria-hidden="true" />
            <div className="absolute w-[360px] h-[360px] md:w-[540px] md:h-[540px] rounded-full border-[1.5px] border-blue-200/20 pointer-events-none" aria-hidden="true" />
            <div className="absolute w-[480px] h-[480px] md:w-[720px] md:h-[720px] rounded-full border-[1.5px] border-blue-200/20 pointer-events-none" aria-hidden="true" />

            {/* Planeta Me Conozco - Órbita 1 (Interior, en las 10:00) */}
            <div className="absolute w-[240px] h-[240px] md:w-[360px] md:h-[360px] pointer-events-none" style={{ transform: 'rotate(-60deg)' }} aria-hidden="true">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto" style={{ transform: 'rotate(60deg)' }}>
                <Link
                  to="/planeta/1"
                  state={{ transitionType: 'push' }}
                  className="flex flex-col items-center gap-2 bouncy-hover group relative z-40 focus:ring-4 focus:ring-tertiary/50 rounded-full outline-none"
                  aria-label="Ir al Planeta Me Conozco – Autoconocimiento emocional"
                >
                  <div
                    className="w-18 h-18 md:w-22 md:h-22 rounded-full relative flex items-center justify-center"
                    style={{
                      width: 'clamp(72px, 8vw, 96px)',
                      height: 'clamp(72px, 8vw, 96px)',
                      background: `radial-gradient(circle at 30% 30%, #FFD89E 0%, #F5A26A 55%, #E88A6C 100%)`,
                      boxShadow: `inset -20px -25px 40px rgba(0,0,0,0.12), 0 16px 40px rgba(120, 80, 160, 0.25)`,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(circle at 60% 35%, rgba(255,255,255,0.25) 0 8%, transparent 9%),
                                   radial-gradient(circle at 25% 65%, rgba(255,255,255,0.18) 0 6%, transparent 7%),
                                   radial-gradient(circle at 70% 75%, rgba(0,0,0,0.06) 0 5%, transparent 6%)`,
                    }} />
                  </div>
                  <div className="absolute top-full mt-2 text-center bg-surface-container/90 px-3 py-1 rounded-full backdrop-blur-md border border-outline-variant/30 group-hover:bg-tertiary/20 group-hover:border-tertiary/50 transition-colors whitespace-nowrap">
                    <h3 className="font-bold text-xs md:text-sm text-on-surface">Me Conozco</h3>
                  </div>
                </Link>
              </div>
            </div>

            {/* Planeta Relación - Órbita 2 (Media, en las 5:00) */}
            <div className="absolute w-[360px] h-[360px] md:w-[540px] md:h-[540px] pointer-events-none" style={{ transform: 'rotate(150deg)' }} aria-hidden="true">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto" style={{ transform: 'rotate(-150deg)' }}>
                <Link
                  to="/planeta/2"
                  state={{ transitionType: 'push' }}
                  className="flex flex-col items-center gap-2 bouncy-hover group relative z-40 focus:ring-4 focus:ring-secondary/50 rounded-full outline-none"
                  aria-label="Ir al Planeta Relación – Habilidades sociales y empatía"
                >
                  <div
                    className="rounded-full relative flex items-center justify-center"
                    style={{
                      width: 'clamp(88px, 10vw, 112px)',
                      height: 'clamp(88px, 10vw, 112px)',
                      background: `radial-gradient(circle at 30% 30%, #FBD5DC 0%, #F5A6B5 55%, #D879A0 100%)`,
                      boxShadow: `inset -20px -25px 40px rgba(0,0,0,0.12), 0 16px 40px rgba(120, 80, 160, 0.25)`,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(circle at 60% 35%, rgba(255,255,255,0.25) 0 8%, transparent 9%),
                                   radial-gradient(circle at 25% 65%, rgba(255,255,255,0.18) 0 6%, transparent 7%),
                                   radial-gradient(circle at 70% 75%, rgba(0,0,0,0.06) 0 5%, transparent 6%)`,
                    }} />
                  </div>
                  <div className="absolute top-full mt-2 text-center bg-surface-container/90 px-3 py-1 rounded-full backdrop-blur-md border border-outline-variant/30 group-hover:bg-secondary/20 group-hover:border-secondary/50 transition-colors whitespace-nowrap">
                    <h3 className="font-bold text-xs md:text-sm text-on-surface">Relación</h3>
                  </div>
                </Link>
              </div>
            </div>

            {/* Planeta Me Relajo - Órbita 3 (Exterior, en las 2:00) */}
            <div className="absolute w-[480px] h-[480px] md:w-[720px] md:h-[720px] pointer-events-none" style={{ transform: 'rotate(60deg)' }} aria-hidden="true">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto" style={{ transform: 'rotate(-60deg)' }}>
                <Link
                  to="/planeta/3"
                  state={{ transitionType: 'push' }}
                  className="flex flex-col items-center gap-2 bouncy-hover group relative z-40 focus:ring-4 focus:ring-primary/50 rounded-full outline-none"
                  aria-label="Ir al Planeta Me Relajo – Relajación y respiración"
                >
                  <div
                    className="rounded-full relative flex items-center justify-center"
                    style={{
                      width: 'clamp(72px, 8vw, 96px)',
                      height: 'clamp(72px, 8vw, 96px)',
                      background: `radial-gradient(circle at 30% 30%, #D6EAF8 0%, #A6CDE8 55%, #7DA8C9 100%)`,
                      boxShadow: `inset -20px -25px 40px rgba(0,0,0,0.12), 0 16px 40px rgba(120, 80, 160, 0.25)`,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(circle at 60% 35%, rgba(255,255,255,0.25) 0 8%, transparent 9%),
                                   radial-gradient(circle at 25% 65%, rgba(255,255,255,0.18) 0 6%, transparent 7%),
                                   radial-gradient(circle at 70% 75%, rgba(0,0,0,0.06) 0 5%, transparent 6%)`,
                    }} />
                  </div>
                  <div className="absolute top-full mt-2 text-center bg-surface-container/90 px-3 py-1 rounded-full backdrop-blur-md border border-outline-variant/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors whitespace-nowrap">
                    <h3 className="font-bold text-xs md:text-sm text-on-surface">Me Relajo</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <AvatarGuia mensaje="¡Hola, Explorador!" subtitulo="¿A qué planeta viajaremos hoy?" />
        </main>
      </div>
    </div>
  );
}
