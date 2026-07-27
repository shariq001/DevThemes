"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

export default function CheckoutButton({ productId, price }: { productId: string, price: number }) {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleCheckout = async () => {
    if (!isSignedIn) {
      alert("Please sign in to purchase.");
      // We could redirect to sign-in page here
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          price,
          userId: user?.id,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          pathname,
        }),
      });

      const { url, error } = await response.json();
      if (error) {
        throw new Error(error);
      }
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to initiate checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading || !isLoaded}
      className="w-full py-4 rounded-xl bg-foreground text-background font-bold tracking-wide hover:bg-accent hover:text-white transition-colors duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {loading ? (
        <span>Processing...</span>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Purchase Now — ${price}
        </>
      )}
    </button>
  );
}
