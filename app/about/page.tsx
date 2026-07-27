import Link from 'next/link';

export const metadata = {
  title: 'About Us | DevThemes',
  description: 'Learn more about DevThemes and our mission to provide limitless design for every technology.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full liquid-glass text-xs font-bold tracking-wider text-secondary uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
            Limitless design for <span className="text-gradient">every medium.</span>
          </h1>
          <p className="text-xl text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            DevThemes was born from a simple idea: world-class design shouldn't be confined to a single framework. From code to canvas, we craft premium digital assets that empower you to launch faster without compromising on aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="liquid-glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Beyond Code</h2>
            <p className="text-secondary leading-relaxed mb-6">
              While we started with coding templates, our vision spans the entire creative ecosystem. We are actively expanding our team to bring you expert WordPress development, highly customizable Figma systems, Canva UI/UX templates, and striking poster designs.
            </p>
          </div>
          <div className="liquid-glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">A Growing Ecosystem</h2>
            <p className="text-secondary leading-relaxed mb-6">
              We aren't just building templates; we are building a holistic design infrastructure. Whether you are a developer seeking scalable code architecture or a marketer needing stunning visual assets, DevThemes is expanding to be your all-in-one creative partner.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background font-bold tracking-wide hover:bg-accent hover:text-white transition-colors duration-300">
            Explore Our Templates
          </Link>
        </div>
      </div>
    </div>
  );
}
