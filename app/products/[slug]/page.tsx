import { products } from "../../data/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import CheckoutButton from "../../components/CheckoutButton";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image || "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image || "/images/og-image.jpg"],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/products" className="text-sm font-bold text-secondary hover:text-foreground transition-colors inline-flex items-center gap-2">
            &larr; Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Visual Presentation */}
          <div className="animate-slide-up">
            <div className="w-full aspect-[4/3] rounded-3xl liquid-glass flex items-center justify-center overflow-hidden border border-border/50 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/10"></div>
              {/* Fake image representation */}
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 z-10 text-foreground/50 group-hover:scale-105 transition-transform duration-700">
                <svg className="w-24 h-24 mb-4 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-bold tracking-widest uppercase opacity-50">{product.title}</span>
              </div>
            </div>
            
            {/* Thumbnail Gallery (Placeholders) */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors cursor-pointer"></div>
              ))}
            </div>
          </div>

          {/* Details & Checkout */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full liquid-glass text-[10px] font-bold tracking-wider text-secondary uppercase border border-border/50">
                {product.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 bg-secondary/10 rounded-lg text-xs font-bold text-foreground tracking-wide">
                  {tech}
                </span>
              ))}
            </div>

            <div className="liquid-glass-card rounded-2xl p-8 border border-border/50">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-sm text-secondary font-bold mb-1">Lifetime Access</p>
                  <div className="text-5xl font-bold text-foreground">${product.price}</div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-secondary">
                    <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-sm font-medium text-secondary">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  1 Month Premium Support Included
                </li>
              </ul>

              <div className="space-y-4">
                <CheckoutButton productId={product.id} price={product.price} />
                
                {product.demoUrl && (
                  <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl bg-transparent border border-border/50 text-foreground font-bold tracking-wide hover:border-accent hover:text-accent transition-colors duration-300 flex items-center justify-center gap-2">
                    Live Demo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
              
              <p className="text-center text-xs text-secondary mt-4 font-medium">
                Secure payment powered by Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
