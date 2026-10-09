import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Bell, PartyPopper, Gift } from 'lucide-react';
import { siteConfig } from '../data/content';

export default function FinalSurprise() {
  const { finalSurprise } = siteConfig;
  const [hasRevealed, setHasRevealed] = useState(false);
  const [responseGiven, setResponseGiven] = useState(null);
  const [giftStage, setGiftStage] = useState(0); // 0 = wrapped, 1 = shaking, 2 = unwrapped

  const fireGrandConfetti = () => {
    // Multi-stage fireworks confetti cannon with birthday colors
    const count = 280;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#ff2e7e', '#ff6b9d', '#f43f5e', '#fda4af', '#f59e0b', '#ffffff', '#e11d48', '#a855f7', '#22c55e', '#3b82f6'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 30, startVelocity: 60 });
    fire(0.2, { spread: 70 });
    fire(0.35, { spread: 120, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 140, startVelocity: 30, decay: 0.92, scalar: 1.3 });
    fire(0.1, { spread: 140, startVelocity: 50 });
  };

  const handleUnwrapGift = () => {
    // Stage 1: shake the gift
    setGiftStage(1);
    setTimeout(() => {
      // Stage 2: reveal
      setGiftStage(2);
      setHasRevealed(true);
      fireGrandConfetti();
      setTimeout(() => fireGrandConfetti(), 500);
    }, 1500);
  };

  const handleResponse = (text) => {
    setResponseGiven(text);
    fireGrandConfetti();
  };

  return (
    <section id="surprise" className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-4xl mx-auto text-center z-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-rose-600/20 rounded-full blur-[160px] pointer-events-none" />

      {/* "And one last thing..." lead in */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-pink-300/90 font-serif italic text-xl sm:text-3xl mb-6 tracking-wide"
      >
        {finalSurprise.leadText}
      </motion.p>

      {/* Dramatic poetic quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="max-w-3xl mx-auto mb-14 sm:mb-18"
      >
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-snug sm:leading-tight mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
          "{finalSurprise.dramaticQuote}"
        </h2>
        <p className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-gradient-rose drop-shadow-[0_4px_30px_rgba(244,63,94,0.6)]">
          "{finalSurprise.dramaticPunchline}"
        </p>
      </motion.div>

      {/* Gift Unwrapping Experience OR Final Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!hasRevealed ? (
            <motion.div
              key="gift-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: -30 }}
              transition={{ duration: 0.5 }}
              className="inline-block relative"
            >
              {giftStage === 0 ? (
                /* Wrapped Gift */
                <div className="relative group cursor-pointer" onClick={handleUnwrapGift}>
                  {/* Outer pulsing glow aura */}
                  <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-r from-rose-600 via-amber-500 to-pink-500 opacity-80 blur-2xl group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 animate-pulse-glow" />

                  <div className="relative glass-card rounded-3xl p-10 sm:p-14 border-2 border-pink-400/50 shadow-[0_0_50px_rgba(244,63,94,0.4)] bg-gradient-to-b from-[#250b30]/95 via-[#180621]/95 to-[#0e0214]/95 overflow-hidden">
                    {/* Background shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1500 ease-in-out pointer-events-none" />

                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      className="text-8xl sm:text-9xl mb-6"
                    >
                      🎁
                    </motion.div>

                    <button
                      type="button"
                      id="final-surprise-button"
                      className="inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-6 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-black text-lg sm:text-2xl shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:shadow-[0_0_70px_rgba(245,158,11,0.9)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-amber-200/40"
                    >
                      <Gift className="w-6 h-6 text-white" />
                      <span>{finalSurprise.buttonText}</span>
                      <Sparkles className="w-6 h-6 text-amber-200 animate-spin" style={{ animationDuration: '5s' }} />
                    </button>
                  </div>
                </div>
              ) : giftStage === 1 ? (
                /* Shaking Gift */
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 opacity-90 blur-3xl animate-pulse" />
                  <div className="relative glass-card rounded-3xl p-10 sm:p-14 border-2 border-amber-400/60 shadow-[0_0_60px_rgba(245,158,11,0.5)]">
                    <motion.div
                      animate={{
                        rotate: [-8, 8, -10, 10, -6, 6, -4, 4, 0],
                        scale: [1, 1.1, 1, 1.15, 1, 1.1, 1.2, 1.3, 1.5],
                      }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                      className="text-8xl sm:text-9xl"
                    >
                      🎁
                    </motion.div>
                    <motion.p
                      animate={{ opacity: [0, 1, 0, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="mt-6 text-amber-200 font-display text-xl font-bold tracking-wide"
                    >
                      ✨ Unwrapping your surprise... ✨
                    </motion.p>
                  </div>
                </div>
              ) : null}
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.75, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
              className="relative max-w-xl mx-auto"
            >
              {/* Card Container */}
              <div className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-pink-400/50 shadow-[0_0_60px_rgba(244,63,94,0.4)] relative overflow-hidden bg-gradient-to-b from-[#250b30]/95 via-[#180621]/95 to-[#0e0214]/95">
                {/* Background glowing flare */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-500/30 rounded-full blur-3xl pointer-events-none" />

                {/* Big Animated Birthday Cake */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 shadow-[0_0_40px_rgba(244,63,94,0.8)] border border-pink-200/40"
                >
                  <span className="text-6xl sm:text-7xl">🎂</span>
                </motion.div>

                {/* Birthday notification pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/25 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
                  <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>🎂 10th October • Happy Birthday Meenu 🎂</span>
                </div>

                {/* The Final Message */}
                <h3 className="font-display text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                  <span className="text-gradient-rose drop-shadow-[0_2px_20px_rgba(255,51,102,0.6)]">
                    {finalSurprise.finalMessage}
                  </span>
                </h3>

                <p className="text-pink-100/90 font-serif italic text-base sm:text-xl max-w-md mx-auto mb-8 font-light">
                  "{finalSurprise.subMessage}"
                </p>

                {/* Interactive Birthday Response Choice */}
                <div className="mb-8 pt-6 border-t border-pink-500/20">
                  <p className="text-xs sm:text-sm text-pink-300/80 mb-4 font-medium uppercase tracking-wider">
                    {responseGiven ? "Saved in my heart forever:" : "Send your birthday reaction to me:"}
                  </p>

                  {!responseGiven ? (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleResponse("Best Birthday Ever! 🎂❤️")}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-glow-sm hover:shadow-glow"
                      >
                        Best Birthday Ever! 🎂❤️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResponse("I Love You So Much! 🥰💕")}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-glow-sm hover:shadow-glow"
                      >
                        I Love You So Much! 🥰💕
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResponse("Forever & Always, Mine! 💖")}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-glow-sm hover:shadow-glow"
                      >
                        Forever & Always, Mine! 💖
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/30 border border-rose-500/50 text-white font-semibold text-sm animate-pulse"
                    >
                      <Heart className="w-4 h-4 fill-white text-white" />
                      <span>{responseGiven}</span>
                    </motion.div>
                  )}
                </div>

                {/* Trigger celebration again button */}
                <button
                  type="button"
                  onClick={fireGrandConfetti}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-card hover:bg-rose-500/25 text-xs sm:text-sm text-pink-200 border border-pink-500/30 transition-all duration-300 hover:scale-105"
                >
                  <PartyPopper className="w-4 h-4 text-amber-300" />
                  <span>{finalSurprise.replayButtonText}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating birthday decor */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-16 left-8 text-3xl opacity-25 pointer-events-none"
      >
        🎈
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        className="absolute top-24 right-12 text-3xl opacity-20 pointer-events-none"
      >
        🎊
      </motion.div>
    </section>
  );
}
