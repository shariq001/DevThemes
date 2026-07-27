import Link from "next/link";
import { products } from "./data/products";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center relative">
      {/* Liquid morphing background shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[80px] -z-20 animate-liquid pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-20 pointer-events-none delay-1000"></div>

      {/* Continuous Glowing Border Animation Pill */}
      <div className="relative inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full text-sm font-bold tracking-wide animate-slide-up overflow-hidden shadow-lg group cursor-pointer" style={{ animationDelay: '0.1s' }}>
        {/* Spinning gradient border effect */}
        <div className="absolute w-[300%] h-[300%] top-[-100%] left-[-100%] animate-[spin_3s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 80%, var(--accent) 100%)' }}></div>
        
        {/* Inner background */}
        <div className="absolute inset-[1.5px] rounded-full bg-background/90 backdrop-blur-2xl z-0 transition-colors duration-300 group-hover:bg-background/80"></div>
        
        {/* Content */}
        <span className="relative z-10 flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] animate-pulse"></span>
        <span className="relative z-10 text-foreground transition-colors duration-300 group-hover:text-accent">Premium Multi-Tech Templates</span>
      </div>
      
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[1.1] max-w-5xl text-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
        Limitless design for <br className="hidden sm:block" />
        <span className="text-gradient">every technology.</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-secondary font-medium max-w-3xl mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
        World-class, beautifully crafted website templates across multiple frameworks. Designed to help you build, launch, and scale faster.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-5 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <a href="/products" className="px-8 py-4 rounded-full bg-accent text-white font-bold tracking-wide hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_40px_rgba(220,38,38,0.5)]">
          Explore Templates
        </a>
        <a href="/services" className="px-8 py-4 rounded-full liquid-glass text-foreground font-bold tracking-wide hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300">
          Custom Development
        </a>
      </div>

      {/* Feature Cards */}
      <div className="w-full max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        
        {/* Card 1 */}
        <div className="liquid-glass-card h-52 flex flex-col items-center justify-center p-6 text-secondary cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-2">Framework Agnostic</h3>
          <p className="text-sm text-center font-medium">Next.js, React, Vue, HTML, and more. We speak your stack.</p>
        </div>

        {/* Card 2 */}
        <div className="liquid-glass-card h-52 flex flex-col items-center justify-center p-6 text-secondary cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-2">Pixel-Perfect Design</h3>
          <p className="text-sm text-center font-medium">Uncompromising aesthetics built by expert designers.</p>
        </div>

        {/* Card 3 */}
        <div className="liquid-glass-card h-52 flex flex-col items-center justify-center p-6 text-secondary cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-2">Developer Friendly</h3>
          <p className="text-sm text-center font-medium">Clean, scalable code that makes customization a breeze.</p>
        </div>

      </div>

      {/* Featured Products */}
      <div className="w-full max-w-7xl mt-32 animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="flex items-end justify-between mb-12">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Featured <span className="text-gradient">Templates</span></h2>
            <p className="text-secondary text-lg">Start your next project with our premium assets.</p>
          </div>
          <Link href="/products" className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors">
            View All Templates &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id} className="group liquid-glass-card rounded-3xl overflow-hidden border border-border/50 hover:border-accent/50 transition-colors duration-500 flex flex-col text-left">
              <div className="aspect-[4/3] bg-background/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-blue-500/10 group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold bg-background/80 backdrop-blur-md rounded-full text-foreground border border-border/50">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">{product.title}</h3>
                
                <p className="text-sm text-secondary mb-6 line-clamp-2 flex-1">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-1 bg-secondary/10 rounded-md text-secondary uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-2xl font-bold text-foreground">${product.price}</span>
                  <span className="text-sm font-bold text-accent group-hover:translate-x-1 transition-transform">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors">
            View All Templates &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
