import { Link } from 'react-router-dom';
import AvatarGuia from '../components/AvatarGuia';

export default function ElUniverso() {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2650&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-background/80" />
      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-12">
        <header className="w-[calc(100%-2rem)] mx-4 mt-4 z-50 shrink-0 flex justify-between items-center bg-surface-container/80 backdrop-blur-md p-4 rounded-3xl border border-outline-variant/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl" aria-hidden="true">account_circle</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg">Hola, Explorador</h2>
              <p className="text-sm text-on-surface-variant font-medium">Nivel 4: Viajero Espacial</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard" state={{ transitionType: 'none' }} aria-label="Ver progreso" className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:bg-secondary/20 hover:text-secondary">
              <span className="material-symbols-outlined" aria-hidden="true">bar_chart</span>
            </Link>
            <Link to="/configuracion" state={{ transitionType: 'none' }} aria-label="Configuración" className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:bg-secondary/20 hover:text-secondary">
              <span className="material-symbols-outlined" aria-hidden="true">settings</span>
            </Link>
            <Link to="/logros" state={{ transitionType: 'none' }} aria-label="Mis logros" className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface hover:bg-secondary/20 hover:text-secondary">
              <span className="material-symbols-outlined" aria-hidden="true">emoji_events</span>
            </Link>
          </div>
        </header>

        <main id="main-content" className="w-full flex-1 relative flex items-center justify-center min-h-[600px] py-10 overflow-hidden lg:overflow-visible">
          
          <div className="relative w-full max-w-[800px] max-h-full aspect-square flex items-center justify-center scale-75 md:scale-90 lg:scale-100">
            {/* Sol Decorativo Central */}
            <div className="absolute z-20 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-500 shadow-[0_0_60px_rgba(253,224,71,0.6)] animate-pulse-glow" />
              <div className="absolute w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
            </div>

            {/* Anillos de Órbita Visibles (Líneas sólidas al estilo espacial) */}
            <div className="absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full border-[1.5px] border-blue-200/20 pointer-events-none" />
            <div className="absolute w-[380px] h-[380px] md:w-[560px] md:h-[560px] rounded-full border-[1.5px] border-blue-200/20 pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] md:w-[740px] md:h-[740px] rounded-full border-[1.5px] border-blue-200/20 pointer-events-none" />

            {/* Planeta Me Conozco - Órbita 1 (Interior, en las 10:00) */}
            <div className="absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] pointer-events-none" style={{ transform: 'rotate(-60deg)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto" style={{ transform: 'rotate(60deg)' }}>
                <Link
                  to="/me-conozco"
                  state={{ transitionType: 'push' }}
                  className="flex flex-col items-center gap-2 bouncy-hover group relative z-40"
                >
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full relative flex items-center justify-center shadow-[inset_-12px_-12px_20px_rgba(0,0,0,0.7),_inset_4px_4px_10px_rgba(255,255,255,0.3),_0_0_25px_rgba(243,192,26,0.4)]"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(0,0,0,0.8) 100%),
                        radial-gradient(circle at 25% 45%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 10%, transparent 12%),
                        radial-gradient(circle at 70% 35%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.25) 15%, transparent 18%),
                        radial-gradient(circle at 60% 75%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 12%, transparent 15%),
                        radial-gradient(circle at 40% 80%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 8%, transparent 10%),
                        radial-gradient(circle at center, #f3c01a 0%, #b38811 100%)
                      `
                    }}
                  >
                    <img src="/meconozco-epm-removebg-preview.png" alt="Me Conozco" className="w-[80%] h-[80%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform bouncy-spring relative z-10" />
                  </div>
                  <div className="absolute top-full mt-2 text-center bg-surface-container/90 px-3 py-1 rounded-full backdrop-blur-md border border-outline-variant/30 group-hover:bg-tertiary/20 group-hover:border-tertiary/50 transition-colors whitespace-nowrap">
                    <h3 className="font-bold text-xs md:text-sm text-on-surface">Me Conozco</h3>
                  </div>
                </Link>
              </div>
            </div>

            {/* Planeta Relación - Órbita 2 (Media, en las 5:00) */}
            <div className="absolute w-[380px] h-[380px] md:w-[560px] md:h-[560px] pointer-events-none" style={{ transform: 'rotate(150deg)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto" style={{ transform: 'rotate(-150deg)' }}>
                <Link
                  to="/relacion"
                  state={{ transitionType: 'push' }}
                  className="flex flex-col items-center gap-2 bouncy-hover group relative z-40"
                >
                  <div 
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full relative flex items-center justify-center shadow-[inset_-12px_-12px_20px_rgba(0,0,0,0.7),_inset_4px_4px_10px_rgba(255,255,255,0.3),_0_0_25px_rgba(69,216,237,0.4)]"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.85) 100%),
                        repeating-linear-gradient(15deg, transparent 0%, transparent 10%, rgba(255,255,255,0.15) 10%, rgba(255,255,255,0.15) 15%, transparent 15%, transparent 20%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 25%),
                        radial-gradient(circle at center, #45d8ed 0%, #006f7c 100%)
                      `
                    }}
                  >
                    <img src="/social-epm.png" alt="Relación" className="w-[80%] h-[80%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform bouncy-spring relative z-10" />
                  </div>
                  <div className="absolute top-full mt-2 text-center bg-surface-container/90 px-3 py-1 rounded-full backdrop-blur-md border border-outline-variant/30 group-hover:bg-secondary/20 group-hover:border-secondary/50 transition-colors whitespace-nowrap">
                    <h3 className="font-bold text-xs md:text-sm text-on-surface">Relación</h3>
                  </div>
                </Link>
              </div>
            </div>

            {/* Planeta Me Relajo - Órbita 3 (Exterior, en las 2:00) */}
            <div className="absolute w-[500px] h-[500px] md:w-[740px] md:h-[740px] pointer-events-none" style={{ transform: 'rotate(60deg)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto" style={{ transform: 'rotate(-60deg)' }}>
                <Link
                  to="/me-relajo"
                  state={{ transitionType: 'push' }}
                  className="flex flex-col items-center gap-2 bouncy-hover group relative z-40"
                >
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full relative flex items-center justify-center shadow-[inset_-12px_-12px_20px_rgba(0,0,0,0.7),_inset_4px_4px_10px_rgba(255,255,255,0.3),_0_0_25px_rgba(186,195,255,0.4)]"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 50%, rgba(0,0,0,0.9) 100%),
                        radial-gradient(circle at 40% 60%, rgba(255,255,255,0.2) 0%, transparent 30%),
                        radial-gradient(circle at 75% 25%, rgba(0,0,0,0.2) 0%, transparent 20%),
                        repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 5px, rgba(0,0,0,0.05) 6px, rgba(0,0,0,0.05) 8px),
                        radial-gradient(circle at center, #bac3ff 0%, #687ee6 50%, #2b397a 100%)
                      `
                    }}
                  >
                    <img src="/relax-epm.png" alt="Me Relajo" className="w-[80%] h-[80%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform bouncy-spring relative z-10" />
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
