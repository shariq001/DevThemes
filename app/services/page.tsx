"use client";

import Link from 'next/link';
import { useState } from 'react';

const packages = {
  Basic: {
    name: "Starter Next.js Site",
    price: 100,
    desc: "3-page fully responsive custom UI, perfect for landing pages or simple portfolios.",
    delivery: 3,
    revisions: 2,
    features: [
      "Functional website",
      "3 pages",
      "Content upload",
      "Speed optimization",
      "Social media icons"
    ]
  },
  Standard: {
    name: "Business Web App",
    price: 250,
    desc: "5-page fully responsive custom UI with Advanced backend integrations.",
    delivery: 7,
    revisions: 4,
    features: [
      "Functional website",
      "5 pages",
      "Content upload",
      "Opt-in form",
      "Speed optimization",
      "Social media icons"
    ]
  },
  Premium: {
    name: "Full Stack Next.js Pro",
    price: 450,
    desc: "10-page fully responsive custom UI, perfect for landing pages or simple portfolios.",
    delivery: 10,
    revisions: 6,
    features: [
      "Functional website",
      "10 pages",
      "Content upload",
      "E-commerce functionality",
      "15 products",
      "Payment Integration",
      "Opt-in form",
      "Speed optimization",
      "Social media icons"
    ]
  }
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof packages>("Basic");
  const currentPackage = packages[activeTab];

  // Custom Quote State
  const [pages, setPages] = useState(1);
  const [needsDesign, setNeedsDesign] = useState(false);
  const [auth, setAuth] = useState(false);
  const [ecommerce, setEcommerce] = useState(false);
  const [database, setDatabase] = useState(false);
  const [advancedSEO, setAdvancedSEO] = useState(false);
  const [revisions, setRevisions] = useState(0);
  const [fastDelivery, setFastDelivery] = useState(false);

  // Calculate Custom Total
  const calculateTotal = () => {
    let total = 0;
    total += pages * 15; // $15 per page
    if (needsDesign) total += 50;
    if (auth) total += 100;
    if (ecommerce) total += 150;
    if (database) total += 250; // Kept at $250 for custom DB based on previous proposal
    if (advancedSEO) total += 100;
    total += revisions * 15; // $15 per revision
    if (fastDelivery) total += 50; // $50 for fast delivery
    return total;
  };

  const customTotal = calculateTotal();

  // Generate URL for custom quote
  const customQuoteSubject = encodeURIComponent("Custom Project Inquiry - Estimated at $" + customTotal);
  const customQuoteBody = encodeURIComponent(`Hello DevThemes team,\n\nI am interested in a custom project based on the calculator:\n- Pages: ${pages}\n- Custom Design: ${needsDesign ? 'Yes' : 'No'}\n- Authentication: ${auth ? 'Yes' : 'No'}\n- E-commerce: ${ecommerce ? 'Yes' : 'No'}\n- Database: ${database ? 'Yes' : 'No'}\n- Advanced SEO: ${advancedSEO ? 'Yes' : 'No'}\n- Revisions: ${revisions}\n- Fast Delivery: ${fastDelivery ? 'Yes' : 'No'}\n\nEstimated Total: $${customTotal}\n\nPlease let me know the next steps!`);

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full liquid-glass text-xs font-bold tracking-wider text-secondary uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Professional Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 max-w-4xl">
            I will build a custom modern <span className="text-gradient">next js</span> website for your business
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-secondary">
            <span className="text-foreground font-bold">Top Rated Services</span>
            <span>•</span>
            <span>Premium Code Quality</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Gig Details Column */}
          <div className="lg:col-span-2 space-y-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Visual Placeholder */}
            <div className="w-full aspect-video rounded-3xl liquid-glass flex items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-background/5 -z-10"></div>
              <svg className="w-24 h-24 text-accent/50 transform group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4">About this gig</h2>
              <div className="prose prose-invert max-w-none text-secondary leading-relaxed space-y-6">
                <p>
                  Need a blazing-fast, custom Next.js website? Welcome! I build enterprise-grade business landing pages, modern portfolios, and full-stack web apps tailored to your unique brand.
                </p>
                
                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">What You Get:</h3>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong className="text-foreground">Custom UI:</strong> Built from a blank canvas. No Figma? I'll design it based on your brand!
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong className="text-foreground">Modern Stack:</strong> Next.js (App Router), React, TypeScript & Tailwind.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong className="text-foreground">100% Responsive:</strong> Flawless on mobile, tablet, and desktop.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong className="text-foreground">SEO & Speed:</strong> Top Lighthouse scores, Meta Tags & Open Graph configured.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong className="text-foreground">Smooth Handoff:</strong> Live staging link, full source code delivery, and post-launch support.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong className="text-foreground">Advanced Backend Integrations:</strong> Need more power? I seamlessly integrate Stripe Checkout (Payments) and Database Integration.
                    </div>
                  </li>
                </ul>

                <p className="font-bold text-foreground mt-8">
                  Ready to elevate your digital presence? Message me with your project idea today to get started!
                </p>
              </div>
            </section>
          </div>

          {/* Pricing Column */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="liquid-glass-card rounded-3xl sticky top-24 overflow-hidden border border-border">
              {/* Tabs */}
              <div className="grid grid-cols-3 border-b border-border bg-background/50">
                {(Object.keys(packages) as Array<keyof typeof packages>).map((tab) => (
                  <div 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-center text-sm font-bold cursor-pointer transition-colors ${
                      activeTab === tab 
                        ? 'border-b-2 border-accent text-foreground bg-accent/5' 
                        : 'text-secondary hover:text-foreground hover:bg-background/80'
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground pr-4">{currentPackage.name}</h3>
                  <span className="text-2xl font-bold text-foreground">${currentPackage.price}</span>
                </div>
                <p className="text-secondary text-sm mb-6 leading-relaxed min-h-[60px]">
                  {currentPackage.desc}
                </p>
                
                <div className="flex items-center justify-between text-sm font-bold text-foreground mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {currentPackage.delivery} Days Delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {currentPackage.revisions} Revisions
                  </div>
                </div>

                <div className="mb-4 text-sm font-bold text-foreground">What's included:</div>
                <ul className="space-y-3 mb-8 text-sm text-secondary min-h-[260px]">
                  {currentPackage.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/contact?subject=${encodeURIComponent(currentPackage.name + ' Package Inquiry')}`} className="block w-full py-4 text-center rounded-xl bg-accent text-white font-bold tracking-wide hover:bg-accent-hover transition-colors duration-300 shadow-[0_4px_14px_rgba(220,38,38,0.4)]">
                  Continue (${currentPackage.price})
                </Link>
                
                <a href="#custom-quote" className="block w-full text-center mt-4 text-sm font-bold text-secondary hover:text-foreground transition-colors">
                  Need something else? Get a custom quote
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom Quote Calculator */}
        <div id="custom-quote" className="mt-12 mb-24 pt-24 border-t border-border/50 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Packages don't fit? <span className="text-gradient">Customize it.</span></h2>
            <p className="text-xl text-secondary">Build your perfect website module by module. Get an instant estimate.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 liquid-glass-card p-8 md:p-12 rounded-3xl space-y-8">
              
              {/* Sliders */}
              <div className="space-y-6 pb-8 border-b border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Number of Pages</h3>
                    <p className="text-sm text-secondary">How many unique pages do you need? ($15/page)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setPages(Math.max(1, pages - 1))} className="w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-colors">-</button>
                    <span className="text-xl font-bold text-accent min-w-[2ch] text-center">{pages}</span>
                    <button onClick={() => setPages(Math.min(30, pages + 1))} className="w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-colors">+</button>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1" max="30" 
                  value={pages} 
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  className="w-full h-2 bg-background/50 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              <div className="space-y-6 pb-8 border-b border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Number of Revisions</h3>
                    <p className="text-sm text-secondary">Extra rounds of feedback and changes ($15/revision)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setRevisions(Math.max(0, revisions - 1))} className="w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-colors">-</button>
                    <span className="text-xl font-bold text-accent min-w-[2ch] text-center">{revisions}</span>
                    <button onClick={() => setRevisions(Math.min(10, revisions + 1))} className="w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-colors">+</button>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" max="10" 
                  value={revisions} 
                  onChange={(e) => setRevisions(parseInt(e.target.value))}
                  className="w-full h-2 bg-background/50 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'design', label: 'Custom UI/UX Design', desc: 'Design from scratch based on brand', price: '+$50', state: needsDesign, setter: setNeedsDesign },
                  { id: 'auth', label: 'Secure Authentication', desc: 'User Login & Signup flows', price: '+$100', state: auth, setter: setAuth },
                  { id: 'ecom', label: 'Full E-Commerce', desc: 'Products, Cart, and Payments', price: '+$150', state: ecommerce, setter: setEcommerce },
                  { id: 'db', label: 'Database Integration', desc: 'Custom backend data storage', price: '+$250', state: database, setter: setDatabase },
                  { id: 'seo', label: 'Advanced SEO', desc: 'Technical SEO & Speed Optimizations', price: '+$100', state: advancedSEO, setter: setAdvancedSEO },
                  { id: 'fast', label: 'Fast Delivery', desc: 'Expedited 7-day delivery', price: '+$50', state: fastDelivery, setter: setFastDelivery },
                ].map((feature) => (
                  <div key={feature.id} className="flex items-start justify-between p-4 rounded-xl bg-background/30 border border-border/50 hover:border-accent/30 transition-colors">
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{feature.label}</h4>
                      <p className="text-xs text-secondary mt-1">{feature.desc}</p>
                      <p className="text-xs font-bold text-accent mt-2">{feature.price}</p>
                    </div>
                    <button 
                      onClick={() => feature.setter(!feature.state)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${feature.state ? 'bg-accent' : 'bg-secondary/40'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${feature.state ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Calculator Side */}
            <div>
              <div className="liquid-glass-card p-8 rounded-3xl sticky top-24 text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">Estimated Project Cost</h3>
                <p className="text-sm text-secondary mb-8 border-b border-border/50 pb-6">
                  Based on your custom requirements
                </p>
                <div className="text-6xl font-bold text-foreground mb-8">
                  ${customTotal}
                </div>
                
                <Link 
                  href={`/contact?subject=${customQuoteSubject}&body=${customQuoteBody}`} 
                  className="block w-full py-4 rounded-xl bg-foreground text-background font-bold tracking-wide hover:bg-accent hover:text-white transition-colors duration-300 shadow-xl"
                >
                  Request Proposal
                </Link>
                <p className="text-xs text-secondary mt-4">
                  This is a non-binding estimate. We will finalize pricing after reviewing your exact requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
