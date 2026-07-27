import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | DevThemes",
  description: "Manage your DevThemes templates and purchases.",
};

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-[70vh] py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Welcome back, <span className="text-accent">{user.firstName || "Developer"}</span>
          </h1>
          <p className="text-secondary text-lg">
            Manage your purchases, downloads, and technical support tickets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            <section className="liquid-glass-card rounded-2xl p-8 border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Your Templates</h2>
                <Link href="/products" className="text-sm font-bold text-accent hover:text-accent-hover transition-colors">
                  Browse More &rarr;
                </Link>
              </div>
              
              {/* Empty State */}
              <div className="text-center py-12 px-4 rounded-xl border border-dashed border-border bg-background/30">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">No purchases yet</h3>
                <p className="text-secondary text-sm max-w-sm mx-auto mb-6">
                  You haven't purchased any templates or custom services yet. Once you do, they will appear here for secure download.
                </p>
                <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-bold hover:bg-accent hover:text-white transition-colors duration-300">
                  Explore Templates
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <section className="liquid-glass-card rounded-2xl p-8 border border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-6">Account Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-secondary mb-1">Email</p>
                  <p className="font-medium text-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div>
                  <p className="text-secondary mb-1">Status</p>
                  <p className="inline-flex items-center gap-1.5 text-green-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                  </p>
                </div>
              </div>
            </section>
            
            <section className="liquid-glass-card rounded-2xl p-8 border border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-4">Need Support?</h2>
              <p className="text-secondary text-sm mb-6">
                Every purchase includes 1 month of premium technical support. Need help configuring a template?
              </p>
              <Link href="/contact" className="block w-full py-3 text-center rounded-xl bg-background border border-border font-bold text-foreground hover:border-accent hover:text-accent transition-colors">
                Contact Support
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
