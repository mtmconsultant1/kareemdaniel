"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface RocketState {
  x: number;
  y: number;
  springX: number;
  springY: number;
  velocity: number;
  angle: number;
  trail: { x: number; y: number; vx: number; vy: number; life: number }[];
}

export default function RocketCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<RocketState>({
    x: -100, y: -100, springX: -100, springY: -100,
    velocity: 0, angle: 0, trail: []
  });
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [isInit, setIsInit] = useState(false);

  const animate = useCallback(() => {
    const s = stateRef.current;
    const ctx = canvasRef.current?.getContext("2d");
    const canvas = canvasRef.current;
    if (!ctx || !canvas) { rafRef.current = requestAnimationFrame(animate); return; }

    const dx = mouseRef.current.x - s.springX;
    const dy = mouseRef.current.y - s.springY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const spring = 0.15;
    const friction = 0.85;

    s.velocity = s.velocity * friction + dist * spring;
    s.springX += dx * spring;
    s.springY += dy * spring;
    s.angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;

    s.trail.push({
      x: s.springX, y: s.springY,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 + 1.5,
      life: 1
    });
    if (s.trail.length > 60) s.trail.shift();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < s.trail.length; i++) {
      const p = s.trail[i];
      p.x += p.vx * 0.3;
      p.y += p.vy * 0.3;
      p.life -= 0.025;
      if (p.life <= 0) continue;
      const size = p.life * 4;
      const alpha = p.life * 0.6;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
      grad.addColorStop(0, `rgba(212,175,55,${alpha * 0.4})`);
      grad.addColorStop(0.5, `rgba(182,134,44,${alpha * 0.15})`);
      grad.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(p.x - size * 2, p.y - size * 2, size * 4, size * 4);
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${alpha * 0.5})`;
      ctx.fill();
    }

    if (s.velocity > 2) {
      const beamLen = Math.min(s.velocity * 1.5, 60);
      const rad = (s.angle + 90) * (Math.PI / 180);
      const grad = ctx.createLinearGradient(
        s.springX, s.springY,
        s.springX + Math.cos(rad) * beamLen,
        s.springY + Math.sin(rad) * beamLen
      );
      grad.addColorStop(0, "rgba(212,175,55,0.12)");
      grad.addColorStop(1, "rgba(212,175,55,0)");
      ctx.beginPath();
      ctx.moveTo(s.springX, s.springY);
      ctx.lineTo(s.springX + Math.cos(rad - 0.12) * beamLen, s.springY + Math.sin(rad - 0.12) * beamLen);
      ctx.lineTo(s.springX + Math.cos(rad + 0.12) * beamLen, s.springY + Math.sin(rad + 0.12) * beamLen);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    if (rocketRef.current) {
      rocketRef.current.style.transform = `translate(${s.springX - 12}px, ${s.springY - 12}px) rotate(${s.angle}deg)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => { setIsInit(true); }, []);

  useEffect(() => {
    if (!isInit) return;
    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const handleResize = () => { if (canvasRef.current) { canvasRef.current.width = window.innerWidth; canvasRef.current.height = window.innerHeight; } };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);
    handleResize();
    rafRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", handleMouse); window.removeEventListener("resize", handleResize); cancelAnimationFrame(rafRef.current); };
  }, [animate, isInit]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 99998 }} />
      <div ref={rocketRef} className="fixed pointer-events-none" style={{
        zIndex: 99999, width: "24px", height: "24px",
        left: 0, top: 0,
      }}>
        {/* Rocket SVG inline - no external asset needed */}
        <svg viewBox="0 0 40 40" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rocketGrad" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5E6A3"/>
              <stop offset="40%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#B6862C"/>
            </linearGradient>
            <filter id="rocketGlow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M20 4C20 4 28 14 28 24C28 30 24 34 20 34C16 34 12 30 12 24C12 14 20 4 20 4Z" fill="url(#rocketGrad)" filter="url(#rocketGlow)"/>
          <circle cx="20" cy="22" r="3" fill="#0A0A0A" opacity="0.6"/>
          <path d="M12 24L6 32" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
          <path d="M28 24L34 32" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
          <path d="M17 34L20 39L23 34" fill="#D4AF37" opacity="0.9"/>
        </svg>
      </div>
    </>
  );
}
