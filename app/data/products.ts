export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: "Template" | "UI Kit" | "Figma System" | "WordPress";
  features: string[];
  demoUrl?: string;
  techStack: string[];
}

export const products: Product[] = [
  {
    id: "prod_001",
    title: "SaaS Pro Dashboard",
    slug: "saas-pro-dashboard",
    description: "A comprehensive, highly-converting SaaS dashboard template built with Next.js App Router, Tailwind CSS, and Recharts.",
    price: 49,
    image: "/images/saas-dashboard.jpg",
    category: "Template",
    features: ["Responsive Design", "Dark Mode Ready", "Auth Integrated", "Interactive Charts"],
    techStack: ["Next.js 14", "TailwindCSS", "Framer Motion"],
    demoUrl: "https://demo.devthemes.com/saas-pro"
  },
  {
    id: "prod_002",
    title: "E-Commerce Storefront UI",
    slug: "e-commerce-storefront-ui",
    description: "Premium headless e-commerce storefront with shopping cart, Stripe integration, and complex product filtering.",
    price: 79,
    image: "/images/ecommerce-ui.jpg",
    category: "Template",
    features: ["Stripe Checkout", "Cart State Management", "Advanced Filtering", "SEO Optimized"],
    techStack: ["Next.js 14", "Zustand", "Stripe"],
    demoUrl: "https://demo.devthemes.com/ecommerce"
  },
  {
    id: "prod_003",
    title: "DevThemes Figma Design System",
    slug: "devthemes-figma-system",
    description: "The complete Figma design system used to build all DevThemes templates. Includes 500+ components and auto-layout.",
    price: 39,
    image: "/images/figma-system.jpg",
    category: "Figma System",
    features: ["500+ Components", "Auto-layout v5", "Global Styles", "Dark/Light Modes"],
    techStack: ["Figma"],
  },
  {
    id: "prod_004",
    title: "Minimalist Blog & Portfolio",
    slug: "minimalist-blog-portfolio",
    description: "A fast, content-focused portfolio template with MDX blog support and seamless MDX reading experience.",
    price: 29,
    image: "/images/blog-portfolio.jpg",
    category: "Template",
    features: ["MDX Support", "Syntax Highlighting", "View Counter", "RSS Feed"],
    techStack: ["Next.js 14", "MDX", "Tailwind Typography"],
    demoUrl: "https://demo.devthemes.com/portfolio"
  },
  {
    id: "prod_005",
    title: "WordPress Agency Theme",
    slug: "wordpress-agency-theme",
    description: "A blazing fast headless WordPress starter theme bridging the gap between traditional CMS and modern Next.js frontends.",
    price: 89,
    image: "/images/wp-agency.jpg",
    category: "WordPress",
    features: ["Headless WordPress", "GraphQL", "ACF Integration", "ISR Revalidation"],
    techStack: ["Next.js", "WordPress", "WPGraphQL"],
  }
];
