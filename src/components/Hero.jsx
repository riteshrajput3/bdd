import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, Music, Cake, PartyPopper, Gift, Star, Crown } from 'lucide-react';
import { siteConfig } from '../data/content';
import { romanticAudio } from '../utils/audioEngine';

export default function Hero({ onOpenSurprise }) {
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const handleOpen = () => {
    // Start romantic background music upon interaction
    romanticAudio.start(siteConfig.audio.audioSrc);
    if (onOpenSurprise) {
      onOpenSurprise();
    } else {
      const storyEl = document.getElementById('story');
      if (storyEl) {
        storyEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Spawn floating birthday emojis on click anywhere in hero
  const handleHeroClick = (e) => {
    const emojis = ['🎂', '🎈', '🎁', '🎉', '✨', '💕', '🎀', '⭐', '🥳', '💖', '👑', '🌸'];
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: e.clientX,
      y: e.clientY,
    };
    setFloatingEmojis((prev) => [...prev.slice(-15), newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] sm:min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden z-10 pt-20 pb-16"
      onClick={handleHeroClick}
    >
      {/* Floating click particles */}
      {floatingEmojis.map((fe) => (
        <motion.span
          key={fe.id}
          initial={{ opacity: 1, scale: 0.5, x: fe.x - 16, y: fe.y - 16 }}
          animate={{
            opacity: 0,
            scale: 1.6,
            y: fe.y - 130,
            x: fe.x + (Math.random() - 0.5) * 80,
          }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="fixed text-3xl pointer-events-none z-50 select-none drop-shadow-md"
          style={{ left: 0, top: 0 }}
        >
          {fe.emoji}
        </motion.span>
      ))}

      {/* Hero Visual: 3D Glowing Birthday Portrait Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="relative inline-flex items-center justify-center group">
          {/* Animated luxury ambient aurora halos */}
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-r from-rose-500/30 via-amber-500/25 to-pink-500/30 blur-3xl animate-pulse-glow" />
          <div
            className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-pink-400/30 animate-ping opacity-20"
            style={{ animationDuration: '4s' }}
          />

          {/* Birthday Girl Photo Card Frame with Rose-Gold Border */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl p-1 bg-gradient-to-tr from-amber-300 via-rose-500 to-pink-500 shadow-[0_0_50px_rgba(244,63,94,0.65)] transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
            <div className="w-full h-full rounded-[20px] overflow-hidden border-2 border-black/40 relative shadow-inner bg-slate-950">
              <img
                src={siteConfig.hero.heroImage || '/images/photo1.jpg'}
                alt="Meenu"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/50 via-transparent to-transparent" />
            </div>

            {/* Glowing Crown Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1 border border-amber-200/60">
              <Crown className="w-3 h-3 text-slate-950 fill-slate-950" />
              <span className="tracking-wider uppercase text-[10px]">Birthday Queen</span>
            </div>

            {/* Cake badge overlay */}
            <div className="absolute -bottom-2.5 -right-2.5 w-10 h-10 rounded-full bg-[#1e0728] border-2 border-amber-400 flex items-center justify-center text-xl shadow-xl">
              🎂
            </div>
          </div>
        </div>
      </motion.div>

      {/* Birthday Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1c0827]/85 border border-pink-500/35 mb-4 shadow-glow-sm backdrop-blur-md"
      >
        <PartyPopper className="w-4 h-4 text-amber-300 animate-bounce" style={{ animationDuration: '2s' }} />
        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-pink-200">
          {siteConfig.hero.badge}
        </span>
        <Gift className="w-4 h-4 text-rose-300" />
      </motion.div>

      {/* Main Title — Happy Birthday Meenu */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.9 }}
        className="mb-4"
      >
        <h1 className="font-display text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <motion.span
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="text-gradient-rose drop-shadow-[0_4px_35px_rgba(244,63,94,0.5)]"
          >
            Happy Birthday, Meenu!
          </motion.span>
          <motion.span
            animate={{ rotate: [0, 15, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="inline-block"
          >
            🎂❤️
          </motion.span>
        </h1>
      </motion.div>

      {/* Romantic Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.9 }}
        className="font-serif italic text-xl sm:text-3xl text-pink-100/95 max-w-3xl mb-4 font-normal leading-relaxed tracking-wide drop-shadow-sm"
      >
        "{siteConfig.hero.subtitle}"
      </motion.p>

      {/* Personalized dedication */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.8 }}
        className="text-sm sm:text-base font-handwriting text-2xl sm:text-3xl text-pink-300/90 mb-10"
      >
        A special midnight surprise dedicated with all my heart to Meenu ✨
      </motion.p>

      {/* Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative group cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        {/* Pulsing halo */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 opacity-70 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 animate-pulse-glow" />

        <button
          type="button"
          id="hero-cta-button"
          className="relative inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bold text-base sm:text-xl shadow-glow-lg hover:shadow-[0_0_50px_rgba(255,51,102,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 border border-pink-200/30 overflow-hidden"
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

          <span>{siteConfig.hero.ctaButton}</span>
          <Cake className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-125" />
        </button>
      </motion.div>

      {/* Music hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mt-6 flex items-center gap-2 text-xs text-pink-300/70 font-light tracking-wide"
      >
        <Music className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>Tap anywhere for floating sparkles & birthday melody 🎵</span>
      </motion.div>

      {/* Floating birthday decorations */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute top-24 left-8 sm:left-16 text-4xl sm:text-5xl opacity-30 pointer-events-none"
      >
        🎈
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -3, 3, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
        className="absolute top-32 right-8 sm:right-20 text-3xl sm:text-4xl opacity-25 pointer-events-none"
      >
        🎁
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-28 left-12 sm:left-28 text-3xl opacity-25 pointer-events-none"
      >
        🎀
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 8, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 right-10 sm:right-24 text-4xl opacity-20 pointer-events-none"
      >
        🎈
      </motion.div>

      {/* Scroll indicator chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: [0, 8, 0] }}
        transition={{ delay: 1.6, repeat: Infinity, duration: 2.2 }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        className="absolute bottom-6 cursor-pointer text-pink-300/60 hover:text-pink-200 transition-colors"
        aria-hidden="true"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
