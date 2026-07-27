export const metadata = {
  title: 'FAQ | DevThemes',
  description: 'Frequently asked questions about DevThemes templates and services.',
};

const faqs = [
  {
    question: "What technologies do your templates support?",
    answer: "We provide premium templates across multiple stacks including Next.js, React, Vue, HTML, and more. Each template clearly specifies its built-in technology on its product page."
  },
  {
    question: "Do I get full source code access?",
    answer: "Yes! Once purchased, you receive the complete, uncompiled source code. You are free to modify, extend, and customize it to fit your exact needs."
  },
  {
    question: "Can I use the template for multiple projects?",
    answer: "Yes, absolutely! Once purchased, you can use the template for whatever you want across unlimited projects. There are no restrictive usage limits."
  },
  {
    question: "Do you provide technical support?",
    answer: "We offer 1 month of premium technical support with every purchase. This covers bug fixes and general guidance on how to use the template's features."
  },
  {
    question: "Do you offer custom development?",
    answer: "Absolutely. If you love our design but need specific functionality or a completely custom build, our team is available for custom development services."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-secondary font-medium">
            Everything you need to know about our templates and licensing.
          </p>
        </div>

        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {faqs.map((faq, index) => (
            <div key={index} className="liquid-glass-card p-6 md:p-8 rounded-2xl group transition-all duration-300 hover:border-accent/30">
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {faq.question}
              </h3>
              <p className="text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
