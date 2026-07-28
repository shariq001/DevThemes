"use client";

import { useState, useEffect, useRef, use } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
};

type Thread = {
  id: string;
  subject: string;
  status: string;
  userId: string;
  messages: Message[];
};

export default function ThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  const resolvedParams = use(params);
  const [thread, setThread] = useState<Thread | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { userId, isLoaded } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchThread = async () => {
    try {
      const res = await fetch(`/api/inbox/${resolvedParams.threadId}`);
      if (res.ok) {
        setThread(await res.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoaded) fetchThread();
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchThread, 5000);
    return () => clearInterval(interval);
  }, [isLoaded, resolvedParams.threadId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/inbox/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: resolvedParams.threadId, content: newMessage }),
      });

      if (res.ok) {
        setNewMessage("");
        await fetchThread(); // refresh immediately
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  if (!isLoaded || !thread) return <div className="p-8 text-center animate-pulse">Loading thread...</div>;

  const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_CLERK_ID; // In real app, configure this

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col py-4 px-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50 shrink-0">
        <div>
          <Link href="/dashboard/inbox" className="text-secondary hover:text-foreground text-sm font-medium mb-1 inline-block">&larr; Inbox</Link>
          <h1 className="text-xl font-bold tracking-tighter">{thread.subject}</h1>
        </div>
        <span className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded-full">
          {thread.status.replace('_', ' ')}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
        {thread.messages.map((msg) => {
          const isMine = msg.senderId === userId;
          return (
            <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-bold text-foreground">
                  {isMine ? 'You' : 'DevThemes'}
                </span>
                <span className="text-xs text-secondary">
                  {formatDistanceToNow(new Date(msg.createdAt))} ago
                </span>
              </div>
              <div className={`px-5 py-3 rounded-2xl max-w-[85%] whitespace-pre-wrap ${
                isMine 
                  ? 'bg-foreground text-background rounded-tr-sm' 
                  : 'bg-accent/10 text-foreground border border-accent/20 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="pt-4 border-t border-border/50 shrink-0">
        <div className="relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-background border border-border/50 rounded-xl pl-4 pr-16 py-3 focus:outline-none focus:border-accent transition-colors resize-none max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim() || sending}
            className="absolute right-2 bottom-2 bg-accent text-white p-2 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
