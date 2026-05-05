/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AudioProvider } from './context/AudioContext';
import AudioToggle from './components/AudioToggle';
import PasswordScreen from './components/PasswordScreen';

// Screens
import ElUniverso from './screens/ElUniverso';
import Relacion from './screens/Relacion';
import MeRelajo from './screens/MeRelajo';
import MundoTranquilo from './screens/MundoTranquilo';
import EspejoMagico from './screens/EspejoMagico';
import MaletaMagica from './screens/MaletaMagica';
import SelectorEmociones from './screens/SelectorEmociones';
import Dashboard from './screens/Dashboard';
import Configuracion from './screens/Configuracion';
import EvolucionPlaneta from './screens/EvolucionPlaneta';
import LogrosGalacticos from './screens/LogrosGalacticos';
import MeConozco from './screens/MeConozco';

// New Planet Screens
import Planet1Screen from './screens/Planet1Screen';
import Planet2Screen from './screens/Planet2Screen';
import Planet3Screen from './screens/Planet3Screen';

function AnimatedRoutes() {
  const location = useLocation();
  const transitionType = location.state?.transitionType || 'none';
  const shouldReduce = useReducedMotion();

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
        <Routes location={location}>
          <Route path="/" element={<ElUniverso />} />
          <Route path="/planeta/1" element={<Planet1Screen />} />
          <Route path="/planeta/2" element={<Planet2Screen />} />
          <Route path="/planeta/3" element={<Planet3Screen />} />
          <Route path="/me-conozco" element={<MeConozco />} />
          <Route path="/relacion" element={<Relacion />} />
          <Route path="/me-relajo" element={<MeRelajo />} />
          <Route path="/mundo-tranquilo" element={<MundoTranquilo />} />
          <Route path="/espejo-magico" element={<EspejoMagico />} />
          <Route path="/maleta-magica" element={<MaletaMagica />} />
          <Route path="/selector-emociones" element={<SelectorEmociones />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/evolucion-planeta" element={<EvolucionPlaneta />} />
          <Route path="/logros" element={<LogrosGalacticos />} />
        </Routes>
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
      <BrowserRouter>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-bold focus:text-lg"
        >
          Saltar al contenido principal
        </a>
        <AnimatedRoutes />
      </BrowserRouter>
    </AudioProvider>
  );
}

