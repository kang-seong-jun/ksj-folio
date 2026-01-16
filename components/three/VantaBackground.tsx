'use client';

import { useEffect, useRef, useState } from 'react';

interface VantaBackgroundProps {
  className?: string;
}

declare global {
  interface Window {
    VANTA: {
      NET: (config: Record<string, unknown>) => { destroy: () => void };
    };
    THREE: unknown;
  }
}

export default function VantaBackground({ className = '' }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const loadScripts = async () => {
      // Load Three.js first
      if (!window.THREE) {
        await new Promise<void>((resolve) => {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
          threeScript.onload = () => resolve();
          document.head.appendChild(threeScript);
        });
      }

      // Then load Vanta
      if (!window.VANTA) {
        await new Promise<void>((resolve) => {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
          vantaScript.onload = () => resolve();
          document.head.appendChild(vantaScript);
        });
      }

      // Initialize Vanta effect
      if (vantaRef.current && window.VANTA && !vantaEffect) {
        const effect = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00d4ff,
          backgroundColor: 0x0a0a14,
          points: 8.0,
          maxDistance: 25.0,
          spacing: 15.0,
          showDots: true,
        });
        setVantaEffect(effect);
      }
    };

    loadScripts();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
