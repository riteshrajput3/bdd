import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import MusicToggle from './components/MusicToggle';
import StoryWalkthrough from './components/StoryWalkthrough';
import Hero from './components/Hero';
import StoryTimeline from './components/StoryTimeline';
import Reasons from './components/Reasons';
import MemoryWall from './components/MemoryWall';
import LoveLetter from './components/LoveLetter';
import Footer from './components/Footer';
import { Heart, Cake, Gift, PartyPopper, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // 'walkthrough' (step-by-step story mode) or 'dashboard' (full website)
  const [viewMode, setViewMode] = useState('walkthrough');

  const handleCompleteWalkthrough = () => {
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkipToDashboard = () => {
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayWalkthrough = () => {
    setViewMode('walkthrough');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSurprise = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07030c] text-[#ffe4e9] font-sans selection:bg-rose-500/30 selection:text-pink-100 overflow-x-hidden">
      {/* Dynamic Romantic Particle & Stars Canvas Background */}
      <ParticleBackground />

      {/* Floating Music Controller */}
      <MusicToggle />

      <AnimatePresence mode="wait">
        {viewMode === 'walkthrough' ? (
          /* 1. STEP-BY-STEP INTERACTIVE STORY JOURNEY */
          <motion.div
            key="walkthrough-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <StoryWalkthrough
              onComplete={handleCompleteWalkthrough}
              onSkipToDashboard={handleSkipToDashboard}
            />
          </motion.div>
        ) : (
          /* 2. FULL BIRTHDAY SHOWCASE WEBSITE */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {/* Top Replay Mode Bar */}
            <div className="fixed top-4 left-3 sm:top-5 sm:left-5 z-50">
              <button
                type="button"
                onClick={handleReplayWalkthrough}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-pink-200 glass-card hover:border-pink-500/50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm"
                title="Replay interactive story"
              >
                <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                <span>Story Mode ↺</span>
              </button>
            </div>

            {/* Main Content Sections */}
            <main className="relative z-10 flex flex-col">
              {/* 1. HERO / LANDING SCREEN */}
              <Hero onOpenSurprise={handleOpenSurprise} />

              {/* Section Divider with Birthday Cake */}
              <div className="flex items-center justify-center my-6 opacity-40">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-400" />
                <Cake className="w-4 h-4 mx-3 text-amber-400" />
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-400" />
              </div>

              {/* 2. OUR STORY TIMELINE */}
              <StoryTimeline />

              {/* Section Divider */}
              <div className="flex items-center justify-center my-6 opacity-40">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-pink-400" />
                <Gift className="w-4 h-4 mx-3 text-pink-400" />
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-pink-400" />
              </div>

              {/* 3. REASONS WHY MEENU IS SPECIAL */}
              <Reasons />

              {/* Section Divider */}
              <div className="flex items-center justify-center my-6 opacity-40">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-rose-400" />
                <Heart className="w-4 h-4 mx-3 text-rose-400 fill-rose-500/50" />
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-rose-400" />
              </div>

              {/* 4. MEMORY WALL & MAKING MEMORIES SPOTLIGHT */}
              <MemoryWall />

              {/* Section Divider */}
              <div className="flex items-center justify-center my-6 opacity-40">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-pink-400" />
                <PartyPopper className="w-4 h-4 mx-3 text-amber-400" />
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-pink-400" />
              </div>

              {/* 5. LOVE LETTER */}
              <LoveLetter />

              {/* 6. FOOTER */}
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
