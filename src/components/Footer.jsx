import React from 'react';
import { Heart, ArrowUp, Cake } from 'lucide-react';
import { siteConfig } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative py-10 sm:py-12 px-4 border-t border-pink-500/15 text-center z-10 bg-[#060209]/80 backdrop-blur-sm"
      style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3">
        {/* Birthday cake + Made with love line */}
        <p className="font-serif italic text-sm sm:text-lg text-pink-200/90 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          <Cake className="w-4 h-4 text-amber-400 inline" />
          <span>{siteConfig.footer.message}</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-heartbeat inline" />
        </p>

        {/* Sub-footnote */}
        <p className="text-[11px] sm:text-xs text-pink-400/60 font-light tracking-wider uppercase">
          {siteConfig.footer.footnote}
        </p>

        {/* Date stamp */}
        <p className="text-[10px] text-pink-500/40 font-mono tracking-widest">
          10.10.2026 • with eternal love
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          type="button"
          className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs text-pink-300/70 hover:text-white glass-card hover:border-pink-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp className="w-3 h-3" />
          <span>Back to top 🎂</span>
        </button>
      </div>
    </footer>
  );
}
