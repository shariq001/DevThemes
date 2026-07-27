"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { DevThemesLogo } from "./DevThemesLogo";
import { GetTemplatesButton } from "./GetTemplatesButton";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      {/* Animated Flowing Gradient Background (Visible when scrolled) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full -z-10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border-b border-border/40"
          >
            {/* Solid base to stop transparency bleed from scrolling content */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl"></div>
            
            {/* Continuous loop flow of bg colors based on theme */}
            <motion.div 
              className="absolute inset-0 opacity-25 dark:opacity-[0.15]"
              style={{
                background: "linear-gradient(110deg, var(--accent) 0%, var(--bg) 40%, var(--bg) 60%, var(--accent) 100%)",
                backgroundSize: "200% 200%"
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Container - Fixed width prevents nav links from shifting during logo animation */}
          <div className="flex-shrink-0 w-[240px] flex items-center">
            <Link href="/" className="flex items-center">
              <DevThemesLogo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10">
            {["Products", "Services", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-bold tracking-wide text-secondary hover:text-foreground transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            {(!isLoaded || !isSignedIn) ? (
              <SignInButton mode="modal">
                <button className="text-sm font-bold tracking-wide text-secondary hover:text-foreground transition-colors">
                  Log in
                </button>
              </SignInButton>
            ) : (
              <>
                <Link href="/dashboard" className="text-sm font-bold tracking-wide text-secondary hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 border-2 border-accent/20 hover:border-accent transition-colors" } }} />
              </>
            )}
            <GetTemplatesButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            {isLoaded && isSignedIn && (
              <UserButton />
            )}
            <button className="text-foreground p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
