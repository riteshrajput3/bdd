import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Gift, PartyPopper, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';

export default function BirthdayCountdown() {
  const targetDate = new Date(siteConfig.birthdayDate).getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isBirthday, setIsBirthday] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWish, setShowWish] = useState(false);

  function calculateTimeLeft() {
    const now = Date.now();
    const diff = targetDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsBirthday(true);
        clearInterval(interval);
      }
    }, 1000);

    // Check if it's already birthday
    if (Date.now() >= targetDate) {
      setIsBirthday(true);
    }

    return () => clearInterval(interval);
  }, []);

  // Trigger confetti burst when birthday arrives
  useEffect(() => {
    if (isBirthday && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);
      fireBirthdayConfetti();
    }
  }, [isBirthday]);

  const fireBirthdayConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#ff2e7e', '#ff6b9d', '#f59e0b', '#fda4af', '#a855f7', '#ffffff', '#e11d48', '#22c55e', '#3b82f6'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setShowWish(true);
    // Celebration confetti
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff2e7e', '#ff6b9d', '#f59e0b', '#fda4af', '#a855f7', '#ffffff'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 140,
        origin: { y: 0.4 },
        colors: ['#ff3366', '#22c55e', '#3b82f6', '#f59e0b'],
      });
    }, 300);
  };

  const handleRelightCandles = () => {
    setCandlesLit(true);
    setShowWish(false);
  };

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        {/* Glowing border effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-500" />
        <div className="relative w-20 h-24 sm:w-28 sm:h-32 rounded-2xl bg-[#150722]/90 border border-pink-400/30 flex items-center justify-center backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <span className="font-display text-4xl sm:text-6xl font-black text-gradient-rose drop-shadow-[0_2px_10px_rgba(244,63,94,0.6)]">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-pink-300/80">
        {label}
      </span>
    </div>
  );

  // Separator colon
  const Separator = () => (
    <div className="flex flex-col gap-2 pt-2 sm:pt-4 px-1">
      <div className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
      <div className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
    </div>
  );

  return (
    <section id="countdown" className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-r from-rose-600/15 via-purple-600/10 to-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0a29]/80 border border-pink-500/30 mb-4 shadow-glow-sm"
        >
          <Cake className="w-3.5 h-3.5 text-pink-300" />
          <span className="text-xs uppercase tracking-widest text-pink-200 font-semibold">
            {isBirthday ? "🎉 It's Her Birthday!" : "Countdown To The Big Day"}
          </span>
          <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white mb-4"
        >
          <span className="text-gradient-rose drop-shadow-[0_2px_15px_rgba(244,63,94,0.4)]">
            {isBirthday ? "🎂 Happy Birthday, Meenu! 🎂" : "Meenu's Birthday Countdown"}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-base sm:text-xl max-w-xl mx-auto font-light font-serif italic"
        >
          {isBirthday
            ? '"Today the world celebrates because you were born. Happy Birthday, my love!"'
            : '"The clock is ticking towards the most special day of the year..."'}
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!isBirthday ? (
          /* Countdown Timer */
          <motion.div
            key="countdown-timer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap"
          >
            <TimeUnit value={timeLeft.days} label="Days" />
            <Separator />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <Separator />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <Separator />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </motion.div>
        ) : (
          /* Birthday Cake Interactive Section */
          <motion.div
            key="birthday-cake"
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 18, stiffness: 180 }}
            className="max-w-md mx-auto"
          >
            {/* Interactive Birthday Cake */}
            <div className="relative glass-card rounded-3xl p-8 sm:p-12 border-2 border-pink-400/40 shadow-[0_0_50px_rgba(244,63,94,0.3)] text-center overflow-hidden">
              {/* Background flare */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Animated Cake */}
              <div className="relative mb-6">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="text-8xl sm:text-9xl mx-auto w-fit relative"
                >
                  🎂
                  {/* Candle flames */}
                  {candlesLit && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-3">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.4, 0.9, 1.2, 1],
                            opacity: [0.8, 1, 0.7, 1, 0.8],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8 + i * 0.2,
                            ease: 'easeInOut',
                          }}
                          className="w-3 h-5 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Blow candles prompt / Wish message */}
              <AnimatePresence mode="wait">
                {!showWish ? (
                  <motion.div
                    key="blow-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-pink-200/90 font-serif italic text-lg mb-5">
                      {candlesLit ? "Make a wish and blow out the candles! 🌟" : "The candles are out!"}
                    </p>
                    {candlesLit && (
                      <motion.button
                        type="button"
                        onClick={handleBlowCandles}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold text-base shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.7)] transition-all duration-300 border border-amber-200/30"
                      >
                        <Sparkles className="w-5 h-5" />
                        <span>Blow the Candles! 🌬️</span>
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="wish-message"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  >
                    <div className="mb-4">
                      <motion.div
                        animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="text-5xl mb-3"
                      >
                        🎉
                      </motion.div>
                      <h3 className="font-display text-2xl sm:text-3xl font-black text-gradient-rose mb-2">
                        Your Wish Has Been Made! ✨
                      </h3>
                      <p className="text-pink-200/80 font-serif italic text-base">
                        "May all your dreams come true, Meenu. You deserve the world."
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRelightCandles}
                      className="text-xs text-pink-300/70 hover:text-white underline underline-offset-4 font-light transition-colors"
                    >
                      Relight candles & wish again ✨
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Re-celebrate button */}
              <div className="mt-8 pt-4 border-t border-pink-500/20">
                <button
                  type="button"
                  onClick={fireBirthdayConfetti}
                  className="inline-flex items-center gap-2 text-xs text-pink-300/80 hover:text-white glass-card px-5 py-2 rounded-full border border-pink-500/25 hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
                >
                  <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
                  <span>Burst more confetti! 🎊</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating birthday decorations */}
      <div className="absolute top-10 left-10 text-3xl animate-float-slow opacity-40 pointer-events-none">🎈</div>
      <div className="absolute top-20 right-12 text-2xl animate-float-reverse opacity-35 pointer-events-none">🎁</div>
      <div className="absolute bottom-16 left-16 text-2xl animate-float-slow opacity-30 pointer-events-none" style={{ animationDelay: '2s' }}>🎀</div>
      <div className="absolute bottom-10 right-20 text-3xl animate-float-reverse opacity-35 pointer-events-none" style={{ animationDelay: '1s' }}>🎈</div>
    </section>
  );
}
