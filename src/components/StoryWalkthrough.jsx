import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Sparkles, Cake, ChevronRight, ChevronLeft, 
  PartyPopper, Crown, Gift, Stars, Compass, Camera, 
  Smile, Mail, LayoutGrid, Music
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';
import { romanticAudio } from '../utils/audioEngine';

export default function StoryWalkthrough({ onComplete, onSkipToDashboard }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    // Step 0: Midnight Teaser
    {
      id: 'midnight',
      badge: '✨ 12:00 AM • Special Message ✨',
      title: 'Hey Meenu...',
      subtitle: 'It’s officially midnight, and today is not just any ordinary day.',
      question: 'Do you know why today is so special to me?',
      cta: 'Tell me why →',
      image: null,
      icon: 'Sparkles',
      confetti: false,
    },
    // Step 1: Birthday Reveal
    {
      id: 'birthday-reveal',
      badge: '🎂 10th October 2026 🎂',
      title: 'Happy Birthday, My Love! 🎂❤️',
      subtitle: 'Today is the day the most incredible, beautiful, and kind-hearted girl was born.',
      question: 'Before you explore your full surprise, I prepared a small journey just for you.',
      cta: 'Start our journey →',
      image: '/images/photo1.jpg',
      icon: 'Cake',
      confetti: true,
    },
    // Step 2: Chapter 1 - The First Smile
    {
      id: 'chapter-1',
      badge: 'Chapter 01 • The Beginning',
      title: 'The Day You Walked In',
      subtitle: 'Life was ordinary until you showed up and turned everything into pure magic.',
      question: 'That very first conversation and that effortless smile changed my whole world forever.',
      quote: '"You felt like home before I even knew you."',
      cta: 'Next Memory →',
      image: '/images/photo2.jpg',
      icon: 'Sparkles',
      confetti: false,
    },
    // Step 3: Chapter 2 - Falling Deeper
    {
      id: 'chapter-2',
      badge: 'Chapter 02 • Endless Laughs',
      title: 'Late Night Talks & Memories',
      subtitle: 'From random jokes to deep conversations that lasted until 2:00 AM.',
      question: 'Somewhere between our shared laughter and secrets, you became my favorite person in the entire world.',
      quote: '"Every love song suddenly sounded like you."',
      cta: 'Next Memory →',
      image: '/images/photo3.jpg',
      icon: 'Heart',
      confetti: false,
    },
    // Step 4: Chapter 3 - Making Memories
    {
      id: 'chapter-3',
      badge: 'Chapter 03 • Precious Moments',
      title: 'Every Second With You',
      subtitle: 'Every candid snapshot, every warm hug, and every spontaneous adventure with you is saved in my heart.',
      question: 'Doing absolutely nothing feels magical as long as I am with you, Meenu.',
      quote: '"My favorite place in the world is right beside you."',
      cta: 'See what makes you special →',
      image: '/images/photo4.jpg',
      icon: 'Camera',
      confetti: false,
    },
    // Step 5: 5 Reasons Teaser
    {
      id: 'reasons-teaser',
      badge: 'Why I Love You ❤️',
      title: 'You Are My Safe Haven',
      subtitle: 'Your radiant smile, your kind heart, and your adorable little habits make you one in 8 billion.',
      question: 'Loving you is the easiest, most natural decision I have ever made.',
      quote: '"You are my best friend and the love of my life."',
      cta: 'Open Your Full Birthday Dashboard 🎁',
      image: '/images/couple.jpg',
      icon: 'Crown',
      confetti: true,
    },
  ];

  const handleNext = () => {
    // Start background music on user click
    romanticAudio.start(siteConfig.audio.audioSrc);

    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);

      if (steps[nextStepIndex].confetti) {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff2e7e', '#ff6b9d', '#fbbf24', '#ffffff', '#a855f7'],
        });
      }
    } else {
      // Completed walkthrough -> unlock full website
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff2e7e', '#ff6b9d', '#fbbf24', '#ffffff', '#3b82f6', '#22c55e'],
      });
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-4 sm:px-6 py-6 sm:py-10 z-20 overflow-hidden">
      {/* Top Header Controls */}
      <div className="w-full max-w-xl flex items-center justify-between z-30 pt-2">
        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {steps.map((s, idx) => (
            <div
              key={s.id}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                idx === currentStep
                  ? 'w-6 sm:w-8 bg-gradient-to-r from-rose-500 to-amber-400 shadow-glow-sm'
                  : idx < currentStep
                  ? 'w-2 sm:w-2.5 bg-pink-500/60'
                  : 'w-2 sm:w-2.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={() => {
            romanticAudio.start(siteConfig.audio.audioSrc);
            onSkipToDashboard();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-pink-300/80 hover:text-white glass-card hover:border-pink-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>View Full Site</span>
        </button>
      </div>

      {/* Main Interactive Slide Card */}
      <div className="w-full max-w-lg my-auto py-4 sm:py-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.94 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="w-full"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-pink-500/40 via-rose-500/30 to-amber-400/30 shadow-[0_0_50px_rgba(244,63,94,0.35)]">
              <div className="relative rounded-[22px] bg-[#1a0726]/95 backdrop-blur-2xl p-6 sm:p-9 text-center border border-pink-500/30 overflow-hidden flex flex-col items-center">
                {/* Ambient Top Glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/30 rounded-full blur-3xl pointer-events-none" />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/40 mb-5 shadow-sm"
                >
                  {step.id === 'birthday-reveal' ? (
                    <PartyPopper className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
                  )}
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-pink-200">
                    {step.badge}
                  </span>
                </motion.div>

                {/* Visual Image / Avatar if present */}
                {step.image ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-5 relative"
                  >
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 shadow-[0_0_35px_rgba(244,63,94,0.5)]">
                      <img
                        src={step.image}
                        alt="Meenu"
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_40px_rgba(244,63,94,0.6)] mb-5"
                  >
                    ✨
                  </motion.div>
                )}

                {/* Title */}
                <h2 className="font-display text-2xl sm:text-4xl font-black text-white mb-3 leading-tight">
                  <span className="text-gradient-rose drop-shadow-md">
                    {step.title}
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-pink-100/90 font-serif italic text-base sm:text-xl leading-relaxed mb-4 font-light max-w-sm">
                  "{step.subtitle}"
                </p>

                {/* Question / Narrative detail */}
                <p className="text-pink-200/80 text-xs sm:text-sm font-sans leading-relaxed mb-6 max-w-md">
                  {step.question}
                </p>

                {/* Quote if present */}
                {step.quote && (
                  <div className="mb-6 px-4 py-2 rounded-xl bg-pink-950/40 border border-pink-500/20 text-xs sm:text-sm text-pink-300/90 font-serif italic">
                    {step.quote}
                  </div>
                )}

                {/* CTA Action Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bold text-sm sm:text-base shadow-glow-lg hover:shadow-[0_0_45px_rgba(255,51,102,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 border border-pink-200/30"
                >
                  <span>{step.cta}</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="w-full max-w-xl flex items-center justify-between z-30 pb-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
            currentStep === 0
              ? 'opacity-0 pointer-events-none'
              : 'text-pink-300/70 hover:text-white glass-card active:scale-95'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-[11px] sm:text-xs text-pink-400/70 font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1 text-xs font-medium px-3.5 py-1.5 rounded-full text-pink-300/90 hover:text-white glass-card active:scale-95"
        >
          <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
