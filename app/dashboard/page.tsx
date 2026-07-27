import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';


// Mock database to map purchased IDs to display data
const PRODUCT_CATALOG: Record<string, any> = {
  'prod_001': {
    name: 'SaaS Pro Dashboard',
    description: 'High-converting dark mode SaaS template.',
  },
  'prod_002': {
    name: 'E-Commerce Storefront UI',
    description: 'Minimalist fashion and lifestyle storefront.',
  },
  'prod_004': {
    name: 'Minimalist Blog & Portfolio',
    description: 'Premium dark mode bento grid portfolio.',
  },
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const purchases = (user.publicMetadata.purchases as string[]) || [];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 border-b border-border pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading mb-2">My Library</h1>
          <p className="text-muted-foreground">Manage and download your purchased templates.</p>
        </div>
        <a href="/dashboard/inbox" className="px-5 py-2.5 bg-accent/10 text-accent font-bold rounded-xl hover:bg-accent/20 transition-colors inline-flex items-center gap-2 border border-accent/20 self-start sm:self-auto">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Inbox & Custom Requests
        </a>
      </div>

      {purchases.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
          <p className="text-xl font-medium text-foreground mb-4">You haven't purchased any templates yet.</p>
          <a href="/products" className="inline-block px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-accent transition-colors">
            Browse Templates
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {purchases.map((productId) => {
            const product = PRODUCT_CATALOG[productId];
            if (!product) return null;

            return (
              <div key={productId} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-card border border-border rounded-2xl shadow-sm">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-xl font-bold font-heading">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
                </div>
                <a 
                  href={`/api/download?id=${productId}`}
                  download
                  className="w-full sm:w-auto px-6 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download ZIP
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
