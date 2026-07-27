"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewRequestPage() {
  const [subject, setSubject] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, budget, initialMessage: message }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/inbox/${data.id}`);
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/dashboard/inbox" className="text-secondary hover:text-foreground text-sm font-medium mb-4 inline-block">&larr; Back to Inbox</Link>
        <h1 className="text-3xl font-bold tracking-tighter">New Custom Request</h1>
        <p className="text-secondary mt-1">Tell us about your project and we'll get back to you with a quote.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Project Subject</label>
          <input 
            type="text" 
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
            placeholder="e.g., Headless E-commerce with Shopify"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Estimated Budget (Optional)</label>
          <select 
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors appearance-none"
          >
            <option value="">Select a range...</option>
            <option value="<$1,000">Less than $1,000</option>
            <option value="$1,000 - $3,000">$1,000 - $3,000</option>
            <option value="$3,000 - $5,000">$3,000 - $5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Project Details</label>
          <textarea 
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-y"
            placeholder="Describe your requirements, timeline, and any reference websites..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className="w-full bg-foreground text-background font-bold rounded-lg px-4 py-3 hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending Request..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
