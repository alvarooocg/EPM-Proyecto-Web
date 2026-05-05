import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ActivityLayout, StarMascot, EmotionButton, EMOTIONS } from '../components/PlanetComponents';
import { SoundFX, speak, fireConfetti } from '../utils/audioManager';

export default function Planet3Screen() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<'menu' | 'feelings' | 'games'>('menu');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const handleActivitySelect = (act: string) => {
    setActivity(act as any);
    SoundFX.pop();
  };

  const handleEmotionSelect = (key: string) => {
    if (!selectedEmotions.includes(key)) {
      setSelectedEmotions([...selectedEmotions, key]);
      SoundFX.pop();
      speak(`Tu amigo se siente ${key}`, 'es');
    }
  };

  const handleComplete = () => {
    fireConfetti();
    SoundFX.chime();
    speak('¡Excelente! ¡Aprendes a entender los sentimientos de otros!', 'es');
    setTimeout(() => setActivity('menu'), 2000);
  };

  // Menu
  if (activity === 'menu') {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-pink-50 to-rose-50 p-8">
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
          <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">Me Relaciono</h1>
          <p className="text-xl text-gray-600 mb-16 text-center">
            Aprende a entender y conectar con otros
          </p>

          <StarMascot pose="social" size={250} floating message="¿Qué actividad compartida quieres hacer?" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('feelings')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-pink-200"
            >
              <span className="text-6xl mb-4">👫</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Sentimientos</h3>
              <p className="text-gray-600 text-center">Identifica cómo se sienten otros</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('games')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-rose-200"
            >
              <span className="text-6xl mb-4">🎮</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Juegos</h3>
              <p className="text-gray-600 text-center">Juega con amigos virtuales</p>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Actividad 1: Entender sentimientos
  if (activity === 'feelings') {
    return (
      <ActivityLayout
        title="¿Qué siente mi amigo?"
        onBack={() => setActivity('menu')}
        accentColor="#E88A82"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl w-full">
          <div className="flex-shrink-0">
            <StarMascot
              pose="social"
              size={220}
              message={
                selectedEmotions.length > 0
                  ? '¡Muy bien entiendes mis sentimientos!'
                  : 'Selecciona cómo me siento'
              }
              floating
            />
          </div>

          <div className="flex-1">
            <p className="text-xl text-white mb-8 text-center lg:text-left">
              Tu amigo Estela está hoy...
            </p>

            <div className="grid grid-cols-3 gap-4">
              {EMOTIONS.slice(0, 4).map((emotion) => (
                <EmotionButton
                  key={emotion.key}
                  emotion={emotion}
                  selected={selectedEmotions.includes(emotion.key)}
                  onClick={() => handleEmotionSelect(emotion.key)}
                  size={120}
                />
              ))}
            </div>

            {selectedEmotions.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleComplete}
                className="mt-10 w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:shadow-xl transition-all"
              >
                ✨ ¡Entiendo!
              </motion.button>
            )}
          </div>
        </div>
      </ActivityLayout>
    );
  }

  // Actividad 2: Juegos
  if (activity === 'games') {
    return (
      <ActivityLayout
        title="Juego en Parejas"
        onBack={() => setActivity('menu')}
        accentColor="#E88A82"
      >
        <StarMascot
          pose="social"
          size={200}
          message="¡Vamos a jugar juntos!"
          floating
        />

        <div className="mt-12 max-w-2xl w-full">
          <p className="text-xl text-white mb-8 text-center">
            Simon Says: Sigue los movimientos
          </p>

          <div className="grid grid-cols-2 gap-6">
            {['Levanta las manos', 'Salta', 'Corre en el lugar', 'Sonríe'].map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  SoundFX.pop();
                  speak(action, 'es');
                }}
                className="p-6 bg-white/20 border-2 border-white rounded-2xl text-white font-bold text-lg hover:bg-white/30 transition-all"
              >
                {action}
              </motion.button>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleComplete}
            className="mt-10 w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:shadow-xl transition-all"
          >
            ✨ ¡Terminamos!
          </motion.button>
        </div>
      </ActivityLayout>
    );
  }

  return null;
}
