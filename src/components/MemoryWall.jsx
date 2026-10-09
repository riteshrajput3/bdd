import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Calendar, Heart, ZoomIn, Sparkles, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';

export default function MemoryWall() {
  const { gallery } = siteConfig;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [lovedPhotos, setLovedPhotos] = useState({});
  const [lovedSpotlight, setLovedSpotlight] = useState(false);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const prevPhoto = useCallback(() => {
    setSelectedPhotoIndex((curr) =>
      curr === 0 ? gallery.photos.length - 1 : curr - 1
    );
  }, [gallery.photos.length]);

  const nextPhoto = useCallback(() => {
    setSelectedPhotoIndex((curr) =>
      curr === gallery.photos.length - 1 ? 0 : curr + 1
    );
  }, [gallery.photos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, prevPhoto, nextPhoto]);

  const toggleLovePhoto = (e, id) => {
    e.stopPropagation();
    const newLoved = !lovedPhotos[id];
    setLovedPhotos((prev) => ({ ...prev, [id]: newLoved }));

    if (newLoved) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x, y },
        colors: ['#ff3366', '#ff6b9d', '#ffffff', '#fbbf24'],
      });
    }
  };

  const toggleSpotlightLove = (e) => {
    e.stopPropagation();
    setLovedSpotlight(!lovedSpotlight);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff', '#e11d48'],
    });
  };

  return (
    <section id="gallery" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto z-10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[450px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0a29]/80 border border-pink-500/30 mb-4 shadow-glow-sm"
        >
          <Camera className="w-3.5 h-3.5 text-pink-300" />
          <span className="text-xs uppercase tracking-widest text-pink-200 font-semibold">
            Cherished Moments
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
            {gallery.heading}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-sm sm:text-lg max-w-xl mx-auto font-light font-sans"
        >
          {gallery.subheading}
        </motion.p>
      </div>

      {/* FEATURED: Making Memories Together / AI Couple Image Spotlight */}
      {gallery.coupleSpotlight && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 sm:mb-20 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-r from-amber-400/40 via-rose-500/50 to-pink-500/40 shadow-[0_0_50px_rgba(244,63,94,0.3)] group">
            <div className="relative rounded-[18px] sm:rounded-[22px] bg-[#1a0826]/90 backdrop-blur-xl p-4 sm:p-10 overflow-hidden border border-pink-500/30 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              {/* Background ambient light */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Couple / AI Photo Frame */}
              <div className="w-full md:w-1/2 relative">
                <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-2xl group/photo bg-slate-950">
                  <img
                    src={gallery.coupleSpotlight.image}
                    alt={gallery.coupleSpotlight.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150722] via-transparent to-transparent opacity-60" />

                  {/* Stamp Love Button */}
                  <button
                    type="button"
                    onClick={toggleSpotlightLove}
                    className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                      lovedSpotlight
                        ? 'bg-rose-600 text-white scale-110 shadow-glow'
                        : 'bg-black/50 text-white/80 hover:text-white hover:bg-rose-500/80'
                    }`}
                    title={lovedSpotlight ? "Loved forever!" : "Heart this memory"}
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${lovedSpotlight ? 'fill-white' : ''}`} />
                  </button>

                  {/* Corner Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-pink-200">
                    <Stars className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                    <span className="font-serif italic truncate">{gallery.coupleSpotlight.quote}</span>
                  </div>
                </div>
              </div>

              {/* Story Description & Dedication */}
              <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 w-fit">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{gallery.coupleSpotlight.badge}</span>
                </div>

                <h3 className="font-display text-xl sm:text-3xl font-black text-white mb-1.5 sm:mb-2 leading-tight">
                  {gallery.coupleSpotlight.title}
                </h3>

                <p className="text-pink-300/90 font-serif italic text-xs sm:text-base mb-3 sm:mb-4">
                  "{gallery.coupleSpotlight.subtitle}"
                </p>

                <p className="text-pink-100/80 text-xs sm:text-sm leading-relaxed font-light mb-4 sm:mb-6">
                  {gallery.coupleSpotlight.note}
                </p>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-pink-500/20">
                  <span className="text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {gallery.coupleSpotlight.tag}
                  </span>

                  <button
                    type="button"
                    onClick={toggleSpotlightLove}
                    className="text-xs font-medium text-pink-200 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
                    <span>{lovedSpotlight ? "Loved! ❤️" : "Send Love ✨"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Polaroid Gallery Grid (All 6 Photos of Her) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
        {gallery.photos.map((photo, index) => {
          const isLoved = !!lovedPhotos[photo.id];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 30 }}
              onClick={() => openLightbox(index)}
              className={`cursor-pointer transform transition-all duration-300 ${photo.rotation} sm:hover:rotate-0`}
            >
              {/* Polaroid Container */}
              <div className="relative bg-[#fffdf9] text-slate-800 p-3.5 sm:p-5 pb-6 sm:pb-7 rounded-sm shadow-polaroid hover:shadow-[0_20px_50px_rgba(255,51,102,0.35)] transition-all duration-300 group max-w-sm mx-auto sm:max-w-none">
                {/* Washi Tape Strip at Top */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-gradient-to-r from-pink-300/40 via-rose-200/50 to-pink-300/40 backdrop-blur-[2px] border-t border-b border-pink-400/30 transform -rotate-1 shadow-sm pointer-events-none rounded-xs flex items-center justify-center">
                  <div className="w-10 sm:w-12 h-[1px] bg-pink-400/20" />
                </div>

                {/* Photo Image Frame */}
                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden rounded-xs mb-3 sm:mb-4 shadow-inner">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Stamp button in photo corner */}
                  <button
                    type="button"
                    onClick={(e) => toggleLovePhoto(e, photo.id)}
                    className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isLoved
                        ? 'bg-rose-600 text-white scale-110 shadow-glow-sm'
                        : 'bg-black/50 text-white/80 hover:text-white hover:bg-rose-500/80'
                    }`}
                    title={isLoved ? "Loved!" : "Stamp with love"}
                    aria-label="Love this photo"
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoved ? 'fill-white' : ''}`} />
                  </button>

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 text-white text-xs backdrop-blur-md shadow-lg border border-white/10 font-medium">
                      <ZoomIn className="w-3.5 h-3.5 text-pink-300" />
                      View Polaroid
                    </span>
                  </div>
                </div>

                {/* Polaroid Bottom Caption */}
                <div className="text-center px-1">
                  <p className="font-handwriting text-2xl sm:text-3xl text-slate-900 font-bold leading-tight mb-1">
                    {photo.caption}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 tracking-widest uppercase font-medium">
                    {photo.date}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal (Mobile Safe) */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl"
            style={{
              paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))',
              paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
            }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-rose-600 text-white transition-colors border border-white/15 active:scale-95"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/15 hover:bg-rose-600 text-white transition-colors border border-white/15 active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/15 hover:bg-rose-600 text-white transition-colors border border-white/15 active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Polaroid Modal Card Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full max-h-[85vh] bg-[#fffef9] text-slate-800 p-3 sm:p-6 rounded-sm shadow-2xl overflow-hidden flex flex-col mx-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative flex-1 min-h-0 bg-slate-950 rounded-xs overflow-hidden flex items-center justify-center shadow-inner">
                <img
                  src={gallery.photos[selectedPhotoIndex].src}
                  alt={gallery.photos[selectedPhotoIndex].caption}
                  className="max-h-[55vh] sm:max-h-[62vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption details */}
              <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 border-t border-slate-200">
                <div className="text-center sm:text-left">
                  <h3 className="font-handwriting text-2xl sm:text-4xl text-slate-950 font-bold">
                    {gallery.photos[selectedPhotoIndex].caption}
                  </h3>
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
                    <span>{gallery.photos[selectedPhotoIndex].date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-rose-100 text-rose-700">
                    Photo {selectedPhotoIndex + 1} of {gallery.photos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
