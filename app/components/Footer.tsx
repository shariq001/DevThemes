import Link from "next/link";
import { DevThemesLogo } from "./DevThemesLogo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-transparent mt-auto z-10 relative overflow-hidden">
      {/* Subtle blur for footer background */}
      <div className="absolute inset-0 liquid-glass -z-10 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <DevThemesLogo animate={false} />
            </Link>
            <p className="text-secondary font-medium text-base max-w-sm leading-relaxed">
              Premium Next.js themes and templates designed for modern startups and creators who want to ship fast without sacrificing quality.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-foreground mb-6 text-lg tracking-tight">Platform</h3>
            <ul className="space-y-4">
              {[
                { name: "Templates", href: "/products" },
                { name: "Custom Services", href: "/services" },
                { name: "FAQ", href: "/faq" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-bold text-secondary hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-foreground mb-6 text-lg tracking-tight">Company</h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-bold text-secondary hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-secondary font-bold">
            &copy; {new Date().getFullYear()} DevThemes. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <div className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-accent hover:text-white text-secondary flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-accent hover:text-white text-secondary flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
