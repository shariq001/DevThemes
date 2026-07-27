import Link from "next/link";
import { products } from "../data/products";

export const metadata = {
  title: "Premium Templates | DevThemes",
  description: "Browse our collection of high-quality, autonomous Next.js templates, Figma systems, and WordPress themes.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full liquid-glass text-xs font-bold tracking-wider text-secondary uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Premium Assets
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto">
            Design & Code for <span className="text-gradient">Modern Teams</span>
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Get lifetime access to premium Next.js templates, comprehensive Figma design systems, and headless WordPress architectures.
          </p>
        </div>

        {/* Filters Placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {["All", "Template", "Figma System", "WordPress"].map((filter, i) => (
            <button key={i} className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${i === 0 ? 'bg-foreground text-background' : 'liquid-glass text-secondary hover:text-foreground'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {products.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id} className="group liquid-glass-card rounded-3xl overflow-hidden border border-border/50 hover:border-accent/50 transition-colors duration-500 flex flex-col">
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-background/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-blue-500/10 group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold bg-background/80 backdrop-blur-md rounded-full text-foreground border border-border/50">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{product.title}</h3>
                </div>
                
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
      </div>
    </div>
  );
}
