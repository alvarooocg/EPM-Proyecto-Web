import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ActivityLayout,
  StarMascot,
  EmotionButton,
  EMOTIONS,
  Emotion,
} from '../components/PlanetComponents';
import { SoundFX, speak, fireConfetti } from '../utils/audioManager';

export default function Planet1Screen() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<'menu' | 'emotion' | 'suitcase' | 'mirror'>('menu');
  const [picked, setPicked] = useState<Emotion | null>(null);
  const [packed, setPacked] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleActivitySelect = (act: string) => {
    setActivity(act as any);
    SoundFX.pop();
  };

  const handleEmotionSelect = (emotion: Emotion) => {
    setPicked(emotion);
    SoundFX.pop();
    speak(`Te sientes ${emotion.label}`, 'es');
  };

  const handleEmotionComplete = () => {
    fireConfetti();
    SoundFX.chime();
    speak('¡Excelente! ¡Reconocer cómo nos sentimos es muy importante!', 'es');
    setTimeout(() => setActivity('menu'), 2000);
  };

  // Menu
  if (activity === 'menu') {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 p-8">
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
          <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">Me Conozco</h1>
          <p className="text-xl text-gray-600 mb-16 text-center">
            Descubre tus emociones y aprende sobre ti mismo
          </p>

          <StarMascot pose="hello" size={250} floating message="¿Qué actividad te gustaría hacer hoy?" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
            {/* Actividad 1 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('emotion')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-amber-200"
            >
              <span className="text-6xl mb-4">😊</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">¿Cómo me siento?</h3>
              <p className="text-gray-600 text-center">Reconoce y expresa tus emociones</p>
            </motion.button>

            {/* Actividad 2 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('suitcase')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-blue-200"
            >
              <span className="text-6xl mb-4">🧳</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Mi Maleta</h3>
              <p className="text-gray-600 text-center">Guarda cosas que te hacen feliz</p>
            </motion.button>

            {/* Actividad 3 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivitySelect('mirror')}
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-purple-200"
            >
              <span className="text-6xl mb-4">🪞</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Espejo Mágico</h3>
              <p className="text-gray-600 text-center">Mira tu reflejo y expresa cómo te ves</p>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Actividad 1: ¿Cómo me siento?
  if (activity === 'emotion') {
    return (
      <ActivityLayout
        title="¿Cómo me siento?"
        onBack={() => setActivity('menu')}
        accentColor="#F5C44A"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl w-full">
          <div className="flex-shrink-0">
            <StarMascot
              pose="hello"
              size={220}
              message={
                picked
                  ? `Te sientes ${picked.label} ¡Eso está bien!`
                  : '¿Cómo te sientes hoy?'
              }
              floating
            />
          </div>

          <div className="flex-1">
            <p className="text-xl text-white mb-8 text-center lg:text-left">
              Elige cómo te sientes en este momento
            </p>

            <div className="grid grid-cols-3 gap-4">
              {EMOTIONS.map((emotion) => (
                <EmotionButton
                  key={emotion.key}
                  emotion={emotion}
                  selected={picked?.key === emotion.key}
                  onClick={() => handleEmotionSelect(emotion)}
                  size={120}
                />
              ))}
            </div>

            {picked && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleEmotionComplete}
                className="mt-10 w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:shadow-xl transition-all"
              >
                ✨ ¡Continuar!
              </motion.button>
            )}
          </div>
        </div>
      </ActivityLayout>
    );
  }

  // Actividad 2: La Maleta
  if (activity === 'suitcase') {
    const items = ['🧸', '🌳', '👨‍👩‍👧', '🎵', '👫', '📖'];

    return (
      <ActivityLayout
        title="Mi Maleta de Emociones"
        onBack={() => setActivity('menu')}
        accentColor="#7AAEDB"
      >
        <StarMascot
          pose="magic"
          size={200}
          message={
            packed.length === items.length
              ? '¡Tu maleta está llena de alegría!'
              : `${packed.length}/${items.length} guardados`
          }
          floating
        />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {items.map((emoji, i) => (
            <motion.div
              key={i}
              draggable
              onDragStart={() => setDraggedItem(emoji)}
              onDragEnd={() => setDraggedItem(null)}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                if (!packed.includes(emoji)) {
                  setPacked([...packed, emoji]);
                  SoundFX.pop();
                }
              }}
              className={`p-6 rounded-2xl text-4xl cursor-grab active:cursor-grabbing text-center transition-all ${
                packed.includes(emoji)
                  ? 'bg-green-500/20 border-2 border-green-500'
                  : 'bg-white border-2 border-gray-200 hover:border-primary'
              }`}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {packed.length === items.length && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleEmotionComplete}
            className="mt-10 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:shadow-xl transition-all"
          >
            ✨ ¡Maleta Completa!
          </motion.button>
        )}
      </ActivityLayout>
    );
  }

  return null;
}
