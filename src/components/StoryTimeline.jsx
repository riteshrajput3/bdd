import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake, Camera, Compass, Heart, Calendar, Quote } from 'lucide-react';
import { siteConfig } from '../data/content';

const iconMap = {
  Sparkles,
  HeartHandshake,
  Camera,
  Compass,
};

export default function StoryTimeline() {
  const { story } = siteConfig;

  return (
    <section id="story" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Background soft glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0a29]/80 border border-pink-500/30 mb-4 shadow-glow-sm"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/60 animate-heartbeat" />
          <span className="text-xs uppercase tracking-widest text-pink-200 font-semibold">
            Our Chapters Together
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
            {story.heading}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-sm sm:text-xl max-w-xl mx-auto font-light font-serif italic"
        >
          "{story.subheading}"
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central glowing romantic neon line */}
        <div className="absolute left-4 sm:left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-500/30 via-pink-400/80 to-purple-500/30 shadow-[0_0_15px_rgba(244,63,94,0.8)]" />

        <div className="space-y-12 sm:space-y-24">
          {story.chapters.map((chapter, index) => {
            const IconComponent = iconMap[chapter.icon] || Sparkles;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex items-start md:items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-4 sm:gap-6 md:gap-14 pl-10 sm:pl-14 md:pl-0`}
              >
                {/* Node Milestone Heart Icon */}
                <div className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-2 md:top-auto z-20">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-rose-500 blur-md opacity-80 animate-pulse-glow" />
                    <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#180724] border-2 border-pink-400 flex items-center justify-center text-pink-200 shadow-glow hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card glass-card-hover p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden group border border-pink-500/25 bg-[#170826]/85 shadow-2xl">
                    {/* Top ambient highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />

                    {/* Chapter & Date Header */}
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-3 sm:mb-4 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-rose-500/30 to-pink-500/20 text-pink-200 border border-pink-400/40 tracking-wider uppercase shadow-sm">
                        {chapter.number}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-pink-300/80 font-light bg-black/30 px-2.5 sm:px-3 py-1 rounded-full border border-white/5">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                        {chapter.date}
                      </span>
                    </div>

                    {/* Visual Photo for each chapter */}
                    {chapter.image && (
                      <div className="mb-4 sm:mb-5 rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] max-h-48 sm:max-h-56 w-full border border-pink-500/30 relative shadow-inner group/img">
                        <img
                          src={chapter.image}
                          alt={chapter.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#150722] via-transparent to-transparent opacity-70" />
                        {chapter.quote && (
                          <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3 flex items-center gap-1.5 text-white/95 text-[11px] sm:text-xs font-serif italic drop-shadow-md">
                            <Quote className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-300 shrink-0 rotate-180 inline" />
                            <span className="truncate">{chapter.quote}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Chapter Title */}
                    <h3 className="font-display text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-pink-100 transition-colors">
                      {chapter.title}
                    </h3>

                    {/* Chapter Description */}
                    <p className="text-pink-100/85 text-xs sm:text-base leading-relaxed font-light mb-4 sm:mb-5">
                      {chapter.description}
                    </p>

                    {/* Romantic Tag Pill */}
                    <div className={`flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="text-[11px] sm:text-xs italic font-serif text-pink-200 bg-rose-950/60 px-3.5 py-1 sm:py-1.5 rounded-full border border-rose-500/30 flex items-center gap-1.5 shadow-sm">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-500/70 inline" />
                        <span>{chapter.tag}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Spacer for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
