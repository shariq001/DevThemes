export const metadata = {
  title: 'Contact Us | DevThemes',
  description: 'Get in touch with the DevThemes team for support or custom project inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-y-1/2"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
            Let's <span className="text-gradient">connect.</span>
          </h1>
          <p className="text-xl text-secondary font-medium">
            Have a question about a template or want to discuss a custom project? Drop us a message below.
          </p>
        </div>

        <div className="liquid-glass-card p-8 md:p-12 rounded-3xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Formspree integration endpoint */}
          <form action="https://formspree.io/f/xbdnqzne" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-foreground">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-foreground">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-bold text-foreground">Subject</label>
              <select 
                name="subject" 
                id="subject" 
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Template Support">Template Support</option>
                <option value="Custom Project">Custom Project (WordPress/React/Design)</option>
                <option value="Licensing">Licensing Question</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-foreground">Message</label>
              <textarea 
                name="message" 
                id="message" 
                required 
                rows={5}
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                placeholder="How can we help you today?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 rounded-xl bg-accent text-white font-bold tracking-wide hover:bg-accent-hover transition-colors duration-300 shadow-[0_4px_14px_rgba(220,38,38,0.4)]"
            >
              Send Message
            </button>
            <p className="text-xs text-center text-secondary mt-4">
              We aim to respond to all inquiries within 24 hours. Powered by Formspree.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
