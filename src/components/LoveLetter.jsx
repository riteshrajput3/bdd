import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';

export default function LoveLetter() {
  const { letter, recipientName, senderName } = siteConfig;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    // Burst delicate romantic heart confetti
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff6b9d', '#fda4af', '#fef3c7'],
    });
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  return (
    <section id="letter" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose-600/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-18">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0a29]/80 border border-pink-500/30 mb-4 shadow-glow-sm"
        >
          <Feather className="w-3.5 h-3.5 text-pink-300" />
          <span className="text-xs uppercase tracking-widest text-pink-200 font-semibold">
            Confidential & Personal
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
            {letter.heading}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-sm sm:text-lg font-light font-serif italic max-w-md mx-auto"
        >
          {isOpen
            ? "A handwritten letter written with endless love for Meenu's birthday."
            : "Tap below to break the royal wax seal and read your birthday letter."}
        </motion.p>
      </div>

      {/* Envelope & Letter Experience */}
      <div className="relative flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Royal Envelope with Golden Wax Seal */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-lg"
            >
              <div
                onClick={handleOpenLetter}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenLetter();
                }}
                className="group relative cursor-pointer mx-auto w-full aspect-[16/11] sm:aspect-[16/10.5] max-h-[340px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#310f34] via-[#200926] to-[#120417] p-1.5 border border-pink-500/40 shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-98 hover:shadow-[0_0_50px_rgba(255,51,102,0.4)]"
              >
                {/* Envelope Interior Texture */}
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#3a133f] to-[#1a0821] border border-pink-400/25 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                  {/* Flap lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-25">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <polygon
                        points="0,0 50,46 100,0"
                        fill="none"
                        stroke="rgba(255,182,193,0.6)"
                        strokeWidth="1.2"
                      />
                      <line x1="0" y1="100" x2="43" y2="44" stroke="rgba(255,182,193,0.5)" strokeWidth="1" />
                      <line x1="100" y1="100" x2="57" y2="44" stroke="rgba(255,182,193,0.5)" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Stamp in upper corner */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-5 rotate-6 border border-amber-300/40 bg-amber-950/40 px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-[10px] text-amber-200/90 font-mono tracking-widest uppercase flex items-center gap-1 shadow-sm">
                    <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                    <span>PRIORITY LOVE</span>
                  </div>

                  {/* Wax Seal Stamp */}
                  <div className="relative z-10 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-400 via-rose-600 to-amber-700 p-1 sm:p-1.5 shadow-[0_10px_25px_rgba(190,18,60,0.7)] flex items-center justify-center border-2 border-amber-300/50">
                      <div className="w-full h-full rounded-full border border-amber-200/50 flex flex-col items-center justify-center bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500">
                        <Heart className="w-7 h-7 sm:w-10 sm:h-10 text-amber-100 fill-amber-100/90 animate-pulse drop-shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Note Label */}
                  <p className="relative z-10 text-xs sm:text-base font-serif italic text-pink-200/90 mb-3 tracking-wide">
                    {letter.senderNote}
                  </p>

                  {/* Open Button */}
                  <button
                    type="button"
                    className="relative z-10 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bold text-xs sm:text-base shadow-glow group-hover:shadow-[0_0_35px_rgba(255,51,102,0.8)] transition-all duration-300 flex items-center gap-2 border border-pink-200/30"
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{letter.buttonText}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Opened Handwritten Parchment Letter */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="w-full max-w-2xl relative"
            >
              {/* Parchment Card */}
              <div className="letter-paper rounded-2xl sm:rounded-3xl p-5 sm:p-14 text-[#261219] relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-2 border-[#e6d0ba]">
                {/* Vintage Letterhead Stamp */}
                <div className="flex justify-between items-start pb-4 sm:pb-6 border-b border-rose-900/15 mb-6 sm:mb-8">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-rose-800 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                      <Feather className="w-3.5 h-3.5 text-rose-700" />
                      <span>{letter.date}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-rose-900/60 font-serif italic mt-0.5">
                      Straight from my heart to yours • 10th October 2026
                    </p>
                  </div>

                  {/* Fold back button */}
                  <button
                    type="button"
                    onClick={handleCloseLetter}
                    className="inline-flex items-center gap-1 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans font-medium text-rose-900 bg-rose-200/70 hover:bg-rose-300 transition-colors shadow-sm"
                    aria-label="Fold letter"
                  >
                    <span>{letter.closeButtonText}</span>
                  </button>
                </div>

                {/* Salutation */}
                <h3 className="font-handwriting text-2xl sm:text-5xl text-[#1a0810] font-black mb-5 sm:mb-8 leading-tight">
                  {letter.salutation}
                </h3>

                {/* Body Paragraphs */}
                <div className="space-y-4 sm:space-y-6 font-serif text-base sm:text-2xl text-[#2d141e] leading-relaxed">
                  {letter.paragraphs.map((p, idx) => (
                    <p key={idx} className="leading-relaxed font-light">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Closing & Handwritten Signature */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-rose-900/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                  <div>
                    <p className="font-serif italic text-rose-900/80 text-sm sm:text-lg mb-1">
                      {letter.closing}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="font-handwriting text-2xl sm:text-5xl font-black text-rose-800">
                        {senderName || letter.signature}
                      </span>
                      <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-rose-600 fill-rose-600 animate-heartbeat inline" />
                    </div>
                  </div>

                  {/* Vintage Postmark Seal */}
                  <div className="border-2 border-dashed border-rose-800/40 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center p-1 text-center rotate-6 opacity-85 self-end sm:self-auto">
                    <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-rose-800 uppercase">FOREVER</span>
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-700 fill-rose-700 my-0.5" />
                    <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-rose-800 uppercase">OFFICIAL</span>
                  </div>
                </div>
              </div>

              {/* Helpful footer fold toggle */}
              <div className="text-center mt-4 sm:mt-5">
                <button
                  type="button"
                  onClick={handleCloseLetter}
                  className="text-[11px] sm:text-xs text-pink-300/80 hover:text-white underline underline-offset-4 font-light transition-colors"
                >
                  Tap to fold the letter back into the envelope
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
