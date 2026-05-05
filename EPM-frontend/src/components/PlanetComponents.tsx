import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';

export interface Emotion {
  key: string;
  emoji: string;
  label: string;
  color: string;
  deepColor: string;
}

export const EMOTIONS: Emotion[] = [
  { key: 'happy', emoji: '😊', label: 'Feliz', color: '#FFE08A', deepColor: '#F5C44A' },
  { key: 'sad', emoji: '😢', label: 'Triste', color: '#BFD9F2', deepColor: '#7AAEDB' },
  { key: 'angry', emoji: '😠', label: 'Enojado', color: '#FBC0BA', deepColor: '#E88A82' },
  { key: 'scared', emoji: '😨', label: 'Asustado', color: '#D6E4D5', deepColor: '#9DC0A0' },
  { key: 'excited', emoji: '🤩', label: 'Emocionado', color: '#FFD2A6', deepColor: '#F5A26A' },
  { key: 'surprised', emoji: '😲', label: 'Sorprendido', color: '#E2D2F5', deepColor: '#B79AE0' },
];

interface StarProps {
  pose?: 'hello' | 'magic' | 'thinking' | 'relax' | 'social';
  size?: number;
  message?: string;
  floating?: boolean;
  className?: string;
}

export function StarMascot({ pose = 'hello', size = 180, message, floating = true, className = '' }: StarProps) {
  const starImages: Record<string, string> = {
    hello: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg',
    magic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg',
    thinking: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg',
    relax: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg',
    social: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLtVIXOnyFpv2clk7u0CdeadSIEKMx0rZfw9nylSdd5Zr5IX4yNDT2m_rg2IrZDiyxXY5P7tiam5XA5B8_avncxG8DnAUaw85dy_DpRCHUDXBPt6xcJNK9QDQPZ7-RDYWulnrzQebPzD-fZxYdy3nG5GLy9eNIjmKawk8kHO18n-EBVKc2qTJuGTwM05uAcB4sJTq34VJFKiW1svNmLNP7MlvMBPpgan_aTtPpFwuKJJgEB2DuxBAmPvt6Qwsb-CADYGd7BKK8eKg',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        animate={floating ? { y: [0, -15, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ width: size, height: size * 0.62 }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/30 to-transparent blur-2xl animate-pulse" />
        <img
          src={starImages[pose]}
          alt="Mascota"
          className="w-full h-full object-contain drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-[85%] top-[5%] bg-white rounded-3xl rounded-tr-lg px-5 py-3 shadow-xl z-10 min-w-max max-w-xs"
        >
          <p className="text-sm font-semibold text-gray-700">{message}</p>
        </motion.div>
      )}
    </div>
  );
}

interface TopbarProps {
  title: string;
  onBack: () => void;
  accentColor?: string;
}

export function Topbar({ title, onBack, accentColor = '#F5C44A' }: TopbarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-20 flex items-center px-6 gap-4 z-50">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50"
        aria-label="Volver"
      >
        <ArrowLeft size={24} />
      </motion.button>

      <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <h1 className="font-bold text-lg text-gray-800">{title}</h1>
      </div>

      <div className="flex-1" />
    </div>
  );
}

interface EmotionButtonProps {
  emotion: Emotion;
  selected?: boolean;
  onClick: () => void;
  size?: number;
}

export function EmotionButton({ emotion, selected = false, onClick, size = 140 }: EmotionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-3xl border-2 transition-all ${
        selected
          ? 'border-primary bg-primary/10 shadow-lg scale-110'
          : 'border-gray-200 hover:border-primary/30'
      }`}
      style={{
        width: size,
        height: size,
        backgroundColor: selected ? `${emotion.deepColor}20` : 'transparent',
        borderColor: selected ? emotion.deepColor : '#e5e7eb',
      }}
    >
      <span className="text-5xl mb-2">{emotion.emoji}</span>
      <span className="text-sm font-semibold text-gray-700">{emotion.label}</span>
    </motion.button>
  );
}

interface StarSprinklesProps {
  count?: number;
}

export function StarSprinkles({ count = 10 }: StarSprinklesProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </>
  );
}

interface ActivityLayoutProps {
  title: string;
  onBack: () => void;
  accentColor?: string;
  children: ReactNode;
}

export function ActivityLayout({
  title,
  onBack,
  accentColor = '#F5C44A',
  children,
}: ActivityLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <Topbar title={title} onBack={onBack} accentColor={accentColor} />
      <StarSprinkles count={8} />

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center pt-24 px-6">
        {children}
      </main>
    </div>
  );
}
