export const metadata = {
  title: 'Terms of Service | DevThemes',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto liquid-glass-card p-8 md:p-12 rounded-3xl animate-slide-up">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none text-secondary">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using DevThemes, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. License to Use</h2>
          <p className="mb-4">Upon purchase, you are granted an unrestricted, non-exclusive license to use the templates for whatever you want, across as many personal or commercial projects as you need. The only restriction is that you may not redistribute or resell the raw templates as your own products.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Refunds</h2>
          <p className="mb-4">Due to the digital nature of our products, we generally do not offer refunds once the source code has been downloaded, except in cases where the product is demonstrably defective.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
          <p className="mb-4">All templates, graphics, and code provided by DevThemes remain the intellectual property of DevThemes until a transfer of rights is explicitly stated.</p>
        </div>
      </div>
    </div>
  );
}
