import React, { useEffect, useRef } from 'react';

/**
 * Cinematic Romantic Canvas Particle Background
 * Highly optimized for mobile browsers (iOS Safari, Android Chrome) & desktop.
 * Features:
 * - Fluttering, realistic rose petals swaying gently in 3D
 * - Glowing luminous hearts and twinkling bokeh orbs
 * - Mobile touch & mouse stardust spark trail
 * - Smooth 60fps performance with devicePixelRatio awareness
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    setupCanvasSize();

    const handleResize = () => {
      setupCanvasSize();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Stardust sparks for mouse & mobile touch trail
    const sparkParticles = [];
    const addSparks = (x, y, count = 2) => {
      for (let i = 0; i < count; i++) {
        if (sparkParticles.length > 25) sparkParticles.shift();
        sparkParticles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: Math.random() * 0.04 + 0.03,
          size: Math.random() * 2.5 + 1.2,
          color: Math.random() > 0.4 ? 'rgba(255, 112, 166, ' : 'rgba(254, 215, 170, ',
        });
      }
    };

    const handleMouseMove = (e) => addSparks(e.clientX, e.clientY, 1);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        addSparks(e.touches[0].clientX, e.touches[0].clientY, 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 1. Rose Petals (Optimized count for mobile performance)
    const petalCount = isMobile ? 12 : 24;
    const petals = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobile ? 8 : 12) + (isMobile ? 8 : 10),
        speedY: Math.random() * 0.6 + 0.4,
        speedX: Math.random() * 0.5 - 0.25,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        flipAngle: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.35 + 0.4,
        colorType: Math.random() > 0.5 ? 1 : 2,
      });
    }

    // 2. Rising Heart & Star particles
    const starCount = isMobile ? 18 : 36;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 1,
        speedY: -(Math.random() * 0.3 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        opacitySpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        isHeart: i % 4 === 0,
        heartAngle: Math.random() * Math.PI,
      });
    }

    // Draw vector heart
    const drawHeart = (ctx, x, y, size) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    // Draw organic rose petal
    const drawPetal = (ctx, p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const scaleX = Math.cos(p.flipAngle);
      ctx.scale(scaleX, 1);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
      if (p.colorType === 1) {
        grad.addColorStop(0, `rgba(244, 63, 94, ${p.opacity})`);
        grad.addColorStop(1, `rgba(136, 19, 55, ${p.opacity * 0.8})`);
      } else {
        grad.addColorStop(0, `rgba(255, 112, 166, ${p.opacity})`);
        grad.addColorStop(1, `rgba(190, 18, 60, ${p.opacity * 0.75})`);
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render sparks
      for (let i = sparkParticles.length - 1; i >= 0; i--) {
        const s = sparkParticles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparkParticles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `${s.color}${s.life * 0.8})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render rising stars & hearts
      stars.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += s.opacitySpeed;
        if (s.opacity > 0.75 || s.opacity < 0.15) s.opacitySpeed = -s.opacitySpeed;

        if (s.y < -20) {
          s.y = height + 20;
          s.x = Math.random() * width;
        }

        if (s.isHeart) {
          ctx.save();
          ctx.translate(s.x, s.y);
          s.heartAngle += 0.01;
          ctx.rotate(s.heartAngle);
          ctx.fillStyle = `rgba(255, 107, 157, ${Math.max(0.1, s.opacity)})`;
          drawHeart(ctx, 0, 0, s.size * 3.2);
          ctx.restore();
        } else {
          ctx.fillStyle = `rgba(255, 182, 193, ${Math.max(0.1, s.opacity)})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render drifting rose petals
      petals.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.flipAngle += p.flipSpeed;
        p.rotation += p.rotationSpeed;
        p.x += Math.sin(p.swayAngle) * 0.8 + p.speedX;
        p.y += p.speedY;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        drawPetal(ctx, p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep romantic gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07020b] via-[#0f0418] to-[#08020e] opacity-98" />

      {/* Luminous aurora orbs */}
      <div 
        className="absolute -top-[15%] left-[10%] w-[65vw] h-[65vw] rounded-full blur-[120px] pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, #e11d48 0%, #be123c 40%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[35%] -right-[15%] w-[70vw] h-[70vw] rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #9333ea 0%, #ff2e7e 40%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-[10%] left-[25%] w-[60vw] h-[60vw] rounded-full blur-[120px] pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, #f43f5e 0%, #881337 50%, transparent 75%)' }}
      />

      {/* Soft romantic vignette frame */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Interactive canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full touch-none" />
    </div>
  );
}
