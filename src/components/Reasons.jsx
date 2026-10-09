import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Heart, Sparkles, Laugh, Flame, ChevronRight, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';

const iconMap = {
  Smile,
  Heart,
  Sparkles,
  Laugh,
  Flame,
};

export default function Reasons() {
  const { reasons } = siteConfig;
  const [activeCardId, setActiveCardId] = useState(null);
  const [likedCards, setLikedCards] = useState({});
  const [totalHearts, setTotalHearts] = useState(0);

  const toggleExpand = (id) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  const handleHeartClick = (e, id) => {
    e.stopPropagation();
    const newLiked = !likedCards[id];
    setLikedCards((prev) => ({
      ...prev,
      [id]: newLiked,
    }));

    if (newLiked) {
      setTotalHearts((prev) => prev + 1);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 15,
        spread: 45,
        origin: { x, y },
        colors: ['#ff3366', '#ff6b9d', '#fda4af'],
        ticks: 50,
      });
    }
  };

  return (
    <section id="reasons" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto z-10">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[400px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0a29]/80 border border-pink-500/30 mb-4 shadow-glow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span className="text-xs uppercase tracking-widest text-pink-200 font-semibold">
            Every Little Thing About Meenu
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-3xl sm:text-6xl font-black tracking-tight text-white mb-3"
        >
          <span className="text-gradient-rose drop-shadow-[0_2px_15px_rgba(244,63,94,0.4)]">
            {reasons.heading}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-sm sm:text-lg max-w-xl mx-auto font-light font-sans"
        >
          {reasons.subheading}
        </motion.p>

        {/* Interactive Love Counter Banner */}
        {totalHearts > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-pink-200 text-xs font-medium"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
            <span>You've sent {totalHearts} heart{totalHearts > 1 ? 's' : ''} to this list! ❤️</span>
          </motion.div>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {reasons.items.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Heart;
          const isExpanded = activeCardId === item.id;
          const isLiked = !!likedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => toggleExpand(item.id)}
              className="cursor-pointer"
            >
              <div
                className={`relative h-full rounded-2xl sm:rounded-3xl p-5 sm:p-8 glass-card transition-all duration-300 border ${
                  isExpanded
                    ? 'border-pink-400/60 bg-[#220d33]/90 shadow-glow'
                    : 'border-pink-500/20 hover:border-pink-500/50 hover:bg-[#1a0a28]/85 hover:shadow-glow-sm'
                } flex flex-col justify-between overflow-hidden group`}
              >
                {/* Subtle gradient splash in corner */}
                <div
                  className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`}
                />

                <div>
                  {/* Top bar with Reason Number & Heart like reaction */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-pink-200 bg-rose-500/20 border border-rose-500/35 px-2.5 sm:px-3 py-1 rounded-full shadow-sm">
                      Reason #{item.id}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleHeartClick(e, item.id)}
                      className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 ${
                        isLiked
                          ? 'bg-rose-500 text-white shadow-glow-sm scale-110'
                          : 'bg-white/5 text-pink-300/70 hover:text-white hover:bg-rose-500/30'
                      }`}
                      aria-label="Add heart to reason"
                      title={isLiked ? "Loved!" : "Send a heart"}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                          isLiked ? 'fill-white scale-110' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-rose-500/25 to-pink-500/25 border border-pink-400/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                      <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-pink-300 drop-shadow-[0_0_8px_rgba(255,107,157,0.5)]" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-pink-100 transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Preview / Subtitle */}
                  <p className="text-pink-100/80 text-xs sm:text-base leading-relaxed mb-3 sm:mb-4 font-light">
                    {item.preview}
                  </p>

                  {/* Expandable heartfelt detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 sm:pt-4 pb-1 border-t border-pink-500/20">
                          <div className="bg-[#2a0e36]/70 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-pink-500/20 shadow-inner">
                            <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-rose-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                              <MessageCircleHeart className="w-3.5 h-3.5" />
                              <span>Personal Note</span>
                            </div>
                            <p className="text-pink-100 text-xs sm:text-base leading-relaxed font-serif italic">
                              "{item.description}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom hint toggle */}
                <div className="mt-4 sm:mt-5 pt-3 flex items-center justify-between text-[11px] sm:text-xs text-pink-300/70 font-medium border-t border-white/5">
                  <span>{isExpanded ? 'Tap to close note' : 'Tap to read full note'}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-90' : 'group-hover:translate-x-1.5'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
