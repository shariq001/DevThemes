"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

type Thread = {
  id: string;
  subject: string;
  status: string;
  budget: string | null;
  updatedAt: string;
  _count: { messages: number };
};

export default function InboxPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoaded } = useAuth();

  useEffect(() => {
    async function fetchThreads() {
      try {
        const res = await fetch("/api/inbox");
        if (res.ok) {
          const data = await res.json();
          setThreads(data);
        }
      } catch (error) {
        console.error("Failed to load threads", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (isLoaded) fetchThreads();
  }, [isLoaded]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Project Inbox</h1>
          <p className="text-secondary mt-1">Manage your custom development requests.</p>
        </div>
        <Link 
          href="/dashboard/inbox/new"
          className="bg-foreground text-background px-4 py-2 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
        >
          New Request
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-accent/5 animate-pulse rounded-xl border border-border/50"></div>
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="text-center py-20 bg-accent/5 rounded-2xl border border-border/50 border-dashed">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">No active projects</h3>
          <p className="text-secondary mb-6 max-w-sm mx-auto">You haven't requested any custom development yet. Start a conversation to get a quote.</p>
          <Link href="/dashboard/inbox/new" className="text-accent font-medium hover:underline">Start a new project request &rarr;</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {threads.map((thread) => (
            <Link 
              key={thread.id} 
              href={`/dashboard/inbox/${thread.id}`}
              className="block group bg-card hover:bg-accent/5 border border-border/50 p-6 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{thread.subject}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  thread.status === 'OPEN' ? 'bg-amber-500/10 text-amber-500' :
                  thread.status === 'AWAITING_REPLY' ? 'bg-blue-500/10 text-blue-500' :
                  thread.status === 'IN_PROGRESS' ? 'bg-green-500/10 text-green-500' :
                  'bg-gray-500/10 text-gray-500'
                }`}>
                  {thread.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-secondary">
                <span>{thread._count.messages} messages</span>
                <span>•</span>
                <span>Updated {formatDistanceToNow(new Date(thread.updatedAt))} ago</span>
                {thread.budget && (
                  <>
                    <span>•</span>
                    <span>Budget: {thread.budget}</span>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
