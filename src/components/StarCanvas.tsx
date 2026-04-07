"use client";

import { useEffect, useRef, useCallback } from "react";

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; r: number; a: number; s: number; g: boolean }[]>([]);

  const initStars = useCallback((w: number, h: number) => {
    const stars: typeof starsRef.current = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        s: Math.random() * 0.005 + 0.002,
        g: Math.random() > 0.7,
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (starsRef.current.length === 0) initStars(canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        star.a += star.s;
        const alpha = 0.3 + Math.abs(Math.sin(star.a)) * 0.7;

        if (star.g) {
          const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 3);
          grad.addColorStop(0, `rgba(212,175,55,${alpha * 0.15})`);
          grad.addColorStop(1, "rgba(212,175,55,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.g
          ? `rgba(212,175,55,${alpha * 0.8})`
          : `rgba(245,245,245,${alpha * 0.5})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
