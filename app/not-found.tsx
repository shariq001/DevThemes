import Link from "next/link";
import { ThemeToggle } from "./components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background text-foreground">
      {/* Liquid background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] -z-10"></div>
      
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="text-center animate-slide-up z-10">
        <h1 className="text-[12rem] md:text-[16rem] font-bold tracking-tighter leading-none text-foreground/10 select-none">
          404
        </h1>
        
        <div className="-mt-16 md:-mt-24 relative z-20 liquid-glass-card p-8 md:p-12 rounded-3xl border border-border/50 max-w-2xl mx-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Page Not Found
          </h2>
          
          <p className="text-secondary text-lg mb-8 max-w-md mx-auto">
            The template or page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors w-full sm:w-auto"
            >
              Return Home
            </Link>
            <Link 
              href="/products" 
              className="px-8 py-4 liquid-glass text-foreground font-bold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors w-full sm:w-auto"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
