"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors overflow-visible outline-none group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {/* Unexpected Energy Burst & Particles on Hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Pulsing Aura */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1.5, rotate: 180 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
              transition={{ duration: 0.5, type: "spring" }}
              className={`absolute inset-0 rounded-full blur-[8px] ${isDark ? 'bg-indigo-500/20' : 'bg-orange-500/20'} -z-10`}
            />
            {/* Orbiting particles */}
            {[0, 90, 180, 270].map((angle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  x: Math.cos(angle * Math.PI / 180) * 22,
                  y: Math.sin(angle * Math.PI / 180) * 22,
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className={`absolute w-1.5 h-1.5 rounded-full ${isDark ? 'bg-indigo-300' : 'bg-amber-400'}`}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-5 h-5 text-indigo-300 relative z-10"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -90 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-5 h-5 text-amber-500 relative z-10"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
