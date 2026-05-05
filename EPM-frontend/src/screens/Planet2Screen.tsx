import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ActivityLayout, StarMascot } from '../components/PlanetComponents';
import { SoundFX, speak, fireConfetti } from '../utils/audioManager';

export default function Planet2Screen() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<'menu' | 'breathing' | 'music' | 'story'>('menu');
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleActivitySelect = (act: string) => {
    setActivity(act as any);
    SoundFX.pop();
  };

  const handleComplete = () => {
    fireConfetti();
    SoundFX.chime();
    speak('¡Excelente! ¡Has aprendido a relajarte!', 'es');
    setCompleted(true);
    setTimeout(() => setActivity('menu'), 2000);
  };

  // Menu
  if (activity === 'menu') {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
        <div className="absolute top-4 left-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50"
          >
            ←
          </motion.button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">Me Relajo</h1>
          <p className="text-xl text-gray-600 mb-16 text-center">
            Aprende técnicas para relajarte y encontrar paz
          </p>

          <StarMascot pose="relax" size={250} floating message="Elige una actividad relajante" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('breathing')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-blue-200"
            >
              <span className="text-6xl mb-4">💨</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Respirar</h3>
              <p className="text-gray-600 text-center">Practica respiración profunda</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('music')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-cyan-200"
            >
              <span className="text-6xl mb-4">🎵</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Música</h3>
              <p className="text-gray-600 text-center">Escucha sonidos relajantes</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('story')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-teal-200"
            >
              <span className="text-6xl mb-4">📚</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Historia</h3>
              <p className="text-gray-600 text-center">Escucha una historia tranquila</p>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Actividad 1: Respiración
  if (activity === 'breathing') {
    const phases = [
      { label: 'Inhala...', duration: 4, scale: 'scale-150' },
      { label: 'Aguanta...', duration: 2, scale: 'scale-150' },
      { label: 'Exhala...', duration: 4, scale: 'scale-100' },
      { label: 'Pausa...', duration: 2, scale: 'scale-100' },
    ];

    React.useEffect(() => {
      const interval = setInterval(() => {
        setBreathingPhase((p) => (p + 1) % phases.length);
      }, (phases[breathingPhase]?.duration || 4) * 1000);
      return () => clearInterval(interval);
    }, [breathingPhase]);

    return (
      <ActivityLayout title="Respira Conmigo" onBack={() => setActivity('menu')} accentColor="#00BCD4">
        <StarMascot pose="relax" size={200} message={phases[breathingPhase].label} floating />

        <motion.div
          animate={{ scale: phases[breathingPhase].scale === 'scale-150' ? 1.5 : 1 }}
          transition={{ duration: phases[breathingPhase].duration, ease: 'easeInOut' }}
          className="w-48 h-48 rounded-full border-4 border-cyan-400 flex items-center justify-center mt-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20"
        >
          <span className="text-5xl">💨</span>
        </motion.div>

        <p className="text-2xl text-white mt-12 font-semibold">{phases[breathingPhase].label}</p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleComplete}
          className="mt-16 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:shadow-xl transition-all"
        >
          ✨ ¡Completo!
        </motion.button>
      </ActivityLayout>
    );
  }

  return null;
}
