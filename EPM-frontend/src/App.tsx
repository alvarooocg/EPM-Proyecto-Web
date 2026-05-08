/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AudioProvider, useAudio } from './context/AudioContext';
import type { ThemeKey } from './utils/ambientAudio';
import { SessionProgressProvider, useSessionProgress } from './context/SessionProgressContext';
import AudioToggle from './components/AudioToggle';
import PasswordScreen from './components/PasswordScreen';
import './components/Shared';
import { useT } from './i18n';
import { ActivityKey, ActivityPayload, PlanetKey } from './types/progress';

// Screens
import ElUniverso from './screens/ElUniverso';
import Relacion from './screens/Relacion';
import MeRelajo from './screens/MeRelajo';
import MundoTranquilo from './screens/MundoTranquilo';
import EspejoMagico from './screens/EspejoMagico';
import MaletaMagica from './screens/MaletaMagica';
import SelectorEmociones from './screens/SelectorEmociones';
import Dashboard from './screens/Dashboard';
import EvolucionPlaneta from './screens/EvolucionPlaneta';
import LogrosGalacticos from './screens/LogrosGalacticos';
import MeConozco from './screens/MeConozco';
import Informe from './screens/Informe';

// New Planet Screens
import Planet1Screen from './screens/Planet1Screen';
import Planet2Screen from './screens/Planet2Screen';
import Planet3Screen from './screens/Planet3Screen';

const PLANET_COMPONENTS = {
  1: Planet1Screen,
  2: Planet2Screen,
  3: Planet3Screen,
} as const;

function PlanetRoute({ planetId, t }: { planetId: 1 | 2 | 3; t: any }) {
  const { progress, recordActivity, markPlanetVisited } = useSessionProgress();
  const planetKey: PlanetKey = `p${planetId}` as PlanetKey;

  useEffect(() => {
    markPlanetVisited(planetKey);
  }, [planetKey, markPlanetVisited]);

  const completed = Object.keys(progress.activities)
    .filter(k => k.startsWith(`${planetKey}.`))
    .map(k => k.split('.')[1]);

  const Comp = PLANET_COMPONENTS[planetId];
  return (
    <Comp
      t={t}
      onBack={() => window.history.back()}
      completed={completed}
      onActivityComplete={(p: PlanetKey, a: ActivityKey, payload: ActivityPayload) =>
        recordActivity(p, a, payload)
      }
    />
  );
}

function ThemeSwitcher() {
  const { pathname } = useLocation();
  const { setMusicTheme } = useAudio();

  useEffect(() => {
    const theme: ThemeKey =
      pathname.startsWith('/planeta/1') ? 'p1' :
      pathname.startsWith('/planeta/2') ? 'p2' :
      pathname.startsWith('/planeta/3') ? 'p3' :
      'home';
    setMusicTheme(theme);
  }, [pathname, setMusicTheme]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const transitionType = location.state?.transitionType || 'none';
  const shouldReduce = useReducedMotion();
  const t = useT('es');

  const variants = shouldReduce
    ? {
        push:      { initial: {}, animate: {}, exit: {} },
        push_back: { initial: {}, animate: {}, exit: {} },
        none:      { initial: {}, animate: {}, exit: {} },
      }
    : {
        push: {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 }
        },
        push_back: {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 }
        },
        none: {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 }
        }
      };

  const currentVariant = variants[transitionType as keyof typeof variants] || variants.none;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={currentVariant}
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="w-full min-h-screen relative"
      >
        <ThemeSwitcher />
        <Routes location={location}>
          <Route path="/" element={<ElUniverso />} />
          <Route path="/planeta/1" element={<PlanetRoute planetId={1} t={t} />} />
          <Route path="/planeta/2" element={<PlanetRoute planetId={2} t={t} />} />
          <Route path="/planeta/3" element={<PlanetRoute planetId={3} t={t} />} />
          <Route path="/informe" element={<Informe t={t} />} />
          <Route path="/me-conozco" element={<MeConozco />} />
          <Route path="/relacion" element={<Relacion />} />
          <Route path="/me-relajo" element={<MeRelajo />} />
          <Route path="/mundo-tranquilo" element={<MundoTranquilo />} />
          <Route path="/espejo-magico" element={<EspejoMagico />} />
          <Route path="/maleta-magica" element={<MaletaMagica />} />
          <Route path="/selector-emociones" element={<SelectorEmociones />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/evolucion-planeta" element={<EvolucionPlaneta />} />
          <Route path="/logros" element={<LogrosGalacticos />} />
        </Routes>
        <AudioToggle />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('epm_auth') === 'true';
  });

  const handleAuthSuccess = () => {
    sessionStorage.setItem('epm_auth', 'true');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <PasswordScreen onSuccess={handleAuthSuccess} />;
  }

  return (
    <AudioProvider>
      <SessionProgressProvider>
        <BrowserRouter>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-bold focus:text-lg"
          >
            Saltar al contenido principal
          </a>
          <AnimatedRoutes />
        </BrowserRouter>
      </SessionProgressProvider>
    </AudioProvider>
  );
}

