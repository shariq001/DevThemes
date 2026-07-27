"use client";

import { useEffect, useState } from "react";

interface DevThemesLogoProps {
  animate?: boolean;
}

export function DevThemesLogo({ animate = true }: DevThemesLogoProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-48 h-12" />; // placeholder to prevent hydration mismatch
  }

  return (
    <div className="flex items-center relative py-2 shrink-0">
      {animate && (
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 768px) {
            @keyframes expandText {
              0%, 10%, 100% { max-width: 0px; opacity: 0; filter: blur(12px); transform: scale(0.9) translateX(-15px); }
              25%, 85% { max-width: 160px; opacity: 1; filter: blur(0px); transform: scale(1) translateX(0); }
            }
            @keyframes bracketAmbient {
              0%, 100% { filter: drop-shadow(0 0 2px rgba(220,38,38,0.2)); }
              50% { filter: drop-shadow(0 0 14px rgba(220,38,38,0.7)); }
            }
            @keyframes spinSlow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spinSlowReverse {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            .animate-reveal {
              animation: expandText 7s cubic-bezier(0.16, 1, 0.3, 1) infinite;
            }
            .animate-bracket {
              animation: bracketAmbient 3.5s ease-in-out infinite;
            }
            .animate-spin-slow {
              animation: spinSlow 12s linear infinite;
            }
            .animate-spin-slow-reverse {
              animation: spinSlowReverse 12s linear infinite;
            }
          }
        `}} />
      )}

      {/* Left Bracket - Unexpected Double Tech Design */}
      <div className={`z-10 text-foreground ${animate ? 'animate-bracket' : ''}`}>
        <svg viewBox="0 0 50 100" className="w-5 h-10 overflow-visible" fill="none">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" className="text-foreground" />
              <stop offset="100%" stopColor="currentColor" className="text-accent" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" className="text-accent" />
              <stop offset="100%" stopColor="currentColor" className="text-foreground" />
            </linearGradient>
          </defs>
          <path d="M45 10 L15 50 L45 90" stroke="url(#logoGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M45 25 L25 50 L45 75" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <circle cx="15" cy="50" r="3" fill="url(#logoGradient)" className="hidden md:block" />
        </svg>
      </div>

      {/* Center Icon (Themes Layers) */}
      <div className={`relative w-8 h-8 mx-1 md:mx-3 z-10 shrink-0 ${animate ? 'animate-bracket' : ''}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="12"
            fill="url(#logoGradient)"
            className={`origin-[50px_50px] opacity-90 ${animate ? 'animate-spin-slow' : 'rotate-0'}`}
          />
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="12"
            fill="url(#glowGradient)"
            className={`origin-[50px_50px] opacity-90 mix-blend-overlay ${animate ? 'animate-spin-slow-reverse' : 'rotate-[45deg]'}`}
          />
        </svg>
      </div>

      {/* Text Container with continuous expanding/fading animation */}
      <div className={`hidden md:flex ${animate ? 'overflow-hidden animate-reveal' : 'max-w-[160px]'} items-center justify-center whitespace-nowrap z-10 shrink-0`}>
        <span className="font-heading font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-accent mr-3">
          DevThemes
        </span>
      </div>

      {/* Right Bracket - Unexpected Double Tech Design */}
      <div className={`z-10 text-foreground ${animate ? 'animate-bracket' : ''}`}>
        <svg viewBox="0 0 50 100" className="w-5 h-10 overflow-visible" fill="none">
          <path d="M5 10 L35 50 L5 90" stroke="url(#glowGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 25 L25 50 L5 75" stroke="url(#glowGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <circle cx="35" cy="50" r="3" fill="url(#glowGradient)" className={animate ? 'animate-pulse' : ''} />
        </svg>
      </div>
    </div>
  );
}
