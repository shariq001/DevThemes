"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MotionLink = motion(Link);

export function GetTemplatesButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {/* Spark explosions when hover starts */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180);
              // Calculate random distances for sparks
              const distanceX = 40 + Math.random() * 20;
              const distanceY = 20 + Math.random() * 15;
              
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: Math.cos(angle) * distanceX, 
                    y: Math.sin(angle) * distanceY, 
                    scale: [0, Math.random() * 1.5 + 0.5, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ 
                    duration: 0.5 + Math.random() * 0.3, 
                    ease: "easeOut",
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,1)]"
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <MotionLink
        href="/products"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-6 py-2.5 text-sm font-bold tracking-wide rounded-full bg-accent text-white overflow-hidden shadow-[0_4px_14px_rgba(220,38,38,0.4)] hover:shadow-[0_8px_25px_rgba(220,38,38,0.6)] group inline-flex items-center justify-center z-10"
      >
        {/* Continuous sweeping shimmer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-[150%]"
          animate={{ x: ["-150%", "150%"] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
        />

        <span className="relative z-10 flex items-center gap-2">
          Get Templates
          <motion.svg
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </motion.svg>
        </span>
      </MotionLink>
    </div>
  );
}
