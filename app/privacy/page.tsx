export const metadata = {
  title: 'Privacy Policy | DevThemes',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto liquid-glass-card p-8 md:p-12 rounded-3xl animate-slide-up">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-secondary">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us when you make a purchase, create an account, or contact us for support. This may include your name, email address, and payment information.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to process your transactions, provide technical support, and send you important updates about your purchases.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">We implement appropriate security measures to protect your personal information. Payment processing is handled by secure third-party providers (like Stripe) and we do not store your raw credit card data.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at support@devthemes.com.</p>
        </div>
      </div>
    </div>
  );
}
