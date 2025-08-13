"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

// Simple SVG petal
const Petal = () => (
  <svg width="20" height="24" viewBox="0 0 20 24" className="opacity-70">
    <path className="petal-fill" d="M10 0c2.6 5.2 8 6.8 8 12.2C18 18 14 22 10 24 6 22 2 18 2 12.2 2 6.8 7.4 5.2 10 0z" />
  </svg>
);

type PetalSpec = { x: number; delay: number; duration: number; scale: number; layer: number };

export function PetalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const petals = useMemo<PetalSpec[]>(() => {
    const arr: PetalSpec[] = [];
    const width = 100; // vw
    for (let i = 0; i < 38; i++) {
      const layer = i % 3; // 0,1,2 for parallax
      arr.push({
        x: Math.random() * width,
        delay: Math.random() * 20,
        duration: 16 + Math.random() * 16,
        scale: 0.6 + Math.random() * 0.8,
        layer
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // gentle parallax on mouse move
      const onMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const dx = (e.clientX / innerWidth - 0.5) * 10;
        const dy = (e.clientY / innerHeight - 0.5) * 6;
        gsap.to(".petal-layer-0", { x: dx, y: dy, duration: 0.6, ease: "power2.out" });
        gsap.to(".petal-layer-1", { x: dx * 1.6, y: dy * 1.2, duration: 0.8, ease: "power2.out" });
        gsap.to(".petal-layer-2", { x: dx * 2.1, y: dy * 1.6, duration: 1.0, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[0,1,2].map((layer) => (
        <div key={layer} className={`petal-layer-${layer} absolute inset-0`}>
          {petals.filter(p => p.layer===layer).map((p, idx) => (
            <div
              key={idx}
              className="absolute animate-fall"
              style={{
                left: `${p.x}vw`,
                top: `-10vh`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            >
              <div className="animate-sway" style={{ transform: `scale(${p.scale}) rotate(${Math.random()*60 - 30}deg)`}}>
                <Petal />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
