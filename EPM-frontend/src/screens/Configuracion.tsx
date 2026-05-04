import { useState } from 'react';
import NavigationButton from '../components/NavigationButton';

export default function Configuracion() {
  const [sonidosGuiados, setSonidosGuiados] = useState(true);
  const [notificaciones, setNotificaciones] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col p-6 bg-surface">
      <header className="w-full flex items-center justify-between mb-8 max-w-3xl mx-auto pt-2" role="banner">
        <h1 className="font-headline font-bold text-2xl">Configuración</h1>
        <NavigationButton to="/" label="Cerrar Configuración" icon="close" />
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto space-y-6" aria-label="Ajustes de la aplicación">
        <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant/30" aria-label="Perfil del especialista">
          <h2 className="font-bold text-lg text-primary mb-4">Perfil del Especialista</h2>
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant" aria-hidden="true">
               <span className="material-symbols-outlined text-3xl">psychology</span>
             </div>
             <div>
               <h3 className="font-medium text-lg">Dra. Clara Martínez</h3>
               <p className="text-sm text-on-surface-variant">Terapeuta Infantil</p>
             </div>
          </div>
        </section>

        <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant/30" aria-label="Parámetros de la aplicación">
          <h2 className="font-bold text-lg mb-4 text-on-surface">Parámetros de la Aplicación</h2>
          <ul className="space-y-5">
             <li className="flex items-center justify-between">
                <label htmlFor="session-duration" className="font-medium">Duración máxima de sesión (minutos)</label>
                <input
                  id="session-duration"
                  aria-label="Duración de sesión en minutos"
                  type="number"
                  defaultValue={45}
                  min={5}
                  max={120}
                  className="w-20 bg-surface-container-high border border-outline-variant rounded-lg p-2 text-center text-on-surface focus:ring-4 focus:ring-primary/30 outline-none"
                />
             </li>
             <li className="flex items-center justify-between">
                <span className="font-medium" id="toggle-sounds-label">Sonidos de fondo guiados</span>
                <button
                  onClick={() => setSonidosGuiados(!sonidosGuiados)}
                  aria-labelledby="toggle-sounds-label"
                  aria-pressed={sonidosGuiados}
                  role="switch"
                  aria-checked={sonidosGuiados}
                  className={`w-14 h-8 rounded-full relative transition-colors duration-200 focus:ring-4 focus:ring-primary/30 outline-none ${
                    sonidosGuiados ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full absolute top-1 transition-all duration-200 ${
                      sonidosGuiados
                        ? 'right-1 bg-on-primary'
                        : 'left-1 bg-outline'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{sonidosGuiados ? 'Activado' : 'Desactivado'}</span>
                </button>
             </li>
             <li className="flex items-center justify-between">
                <span className="font-medium" id="toggle-notif-label">Notificaciones de inactividad</span>
                <button
                  onClick={() => setNotificaciones(!notificaciones)}
                  aria-labelledby="toggle-notif-label"
                  aria-pressed={notificaciones}
                  role="switch"
                  aria-checked={notificaciones}
                  className={`w-14 h-8 rounded-full relative transition-colors duration-200 focus:ring-4 focus:ring-primary/30 outline-none ${
                    notificaciones ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full absolute top-1 transition-all duration-200 ${
                      notificaciones
                        ? 'right-1 bg-on-primary'
                        : 'left-1 bg-outline'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{notificaciones ? 'Activado' : 'Desactivado'}</span>
                </button>
             </li>
          </ul>
        </section>

        <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant/30">
           <button
             aria-label="Cerrar sesión del especialista"
             className="w-full py-4 text-error font-medium flex items-center justify-center gap-2 hover:bg-error-container/20 rounded-xl transition-colors focus:ring-4 focus:ring-error/30 outline-none"
           >
              <span className="material-symbols-outlined" aria-hidden="true">logout</span>
              Cerrar Sesión
           </button>
        </section>
      </main>
    </div>
  );
}
