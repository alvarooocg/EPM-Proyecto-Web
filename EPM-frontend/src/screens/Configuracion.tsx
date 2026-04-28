import { Link } from 'react-router-dom';

export default function Configuracion() {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface">
      <header className="w-full flex items-center justify-between mb-8 max-w-3xl mx-auto">
        <h1 className="font-headline font-bold text-2xl">Configuración</h1>
        <Link to="/" aria-label="Volver al inicio" state={{ transitionType: 'none' }} className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface">
          <span className="material-symbols-outlined">close</span>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto space-y-6">
        <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant/30">
          <h2 className="font-bold text-lg text-primary mb-4">Perfil del Especialista</h2>
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
               <span className="material-symbols-outlined text-3xl">psychology</span>
             </div>
             <div>
               <h3 className="font-medium text-lg">Dra. Clara Martínez</h3>
               <p className="text-sm text-on-surface-variant">Terapeuta Infantil</p>
             </div>
          </div>
        </section>

        <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant/30">
          <h2 className="font-bold text-lg mb-4 text-on-surface">Parámetros de la Aplicación</h2>
          <ul className="space-y-4">
             <li className="flex items-center justify-between">
                <span className="font-medium">Duración máxima de sesión (minutos)</span>
                <input aria-label="Duración de sesión en minutos" type="number" defaultValue={45} className="w-20 bg-surface-container-high border border-outline-variant rounded-lg p-2 text-center text-on-surface" />
             </li>
             <li className="flex items-center justify-between">
                <span className="font-medium">Sonidos de fondo guiados</span>
                <button aria-label="Alternar sonidos de fondo guiados" aria-pressed="true" className="w-12 h-6 bg-primary rounded-full relative">
                  <div className="w-4 h-4 bg-on-primary rounded-full absolute right-1 top-1"></div>
                </button>
             </li>
             <li className="flex items-center justify-between">
                <span className="font-medium">Notificaciones de inactividad</span>
                <button aria-label="Alternar notificaciones de inactividad" aria-pressed="false" className="w-12 h-6 bg-surface-container-highest rounded-full relative">
                  <div className="w-4 h-4 bg-outline rounded-full absolute left-1 top-1"></div>
                </button>
             </li>
          </ul>
        </section>

        <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant/30">
           <button aria-label="Cerrar sesión" className="w-full py-4 text-error font-medium flex items-center justify-center gap-2 hover:bg-error-container/20 rounded-xl transition-colors">
              <span className="material-symbols-outlined">logout</span>
              Cerrar Sesión
           </button>
        </section>
      </main>
    </div>
  );
}
