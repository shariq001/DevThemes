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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = ["Products", "Services", "About", "Contact"];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        {/* Animated Flowing Gradient Background (Visible when scrolled or menu open) */}
        <AnimatePresence>
          {(scrolled || isMobileMenuOpen) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full -z-10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border-b border-border/40"
            >
              <div className="absolute inset-0 bg-background/95 backdrop-blur-xl"></div>
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
            {/* Logo Container - Responsive width to allow hamburger menu on small screens */}
            <div className="flex-shrink-0 w-auto md:w-[240px] flex items-center">
              <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <DevThemesLogo />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-10">
              {navLinks.map((item) => (
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
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 pt-[80px]"
          >
            <div className="flex flex-col px-6 py-8 h-full overflow-y-auto">
              <nav className="flex flex-col gap-6 mb-10">
                {navLinks.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold tracking-tighter text-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-6 pt-8 border-t border-border/50">
                {(!isLoaded || !isSignedIn) ? (
                  <SignInButton mode="modal">
                    <button className="text-xl font-bold tracking-tighter text-foreground hover:text-accent transition-colors text-left">
                      Log in
                    </button>
                  </SignInButton>
                ) : (
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-bold tracking-tighter text-foreground hover:text-accent transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                
                <div onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
                  <GetTemplatesButton />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
