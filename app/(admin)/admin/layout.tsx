import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  
  let isAdmin = false;
  let diagnostic = "";
  
  if (!userId) {
    diagnostic = "The server sees you as completely LOGGED OUT (userId is null). This means your Windows clock is STILL out of sync, or your browser cookie hasn't been refreshed! Please LOG OUT in your browser, click 'Sync Now' in Windows Time Settings, and log back in.";
  } else {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const primaryEmail = user.emailAddresses[0]?.emailAddress;
      isAdmin = user.publicMetadata?.role === "admin" || primaryEmail === process.env.ADMIN_EMAIL;
      
      if (!isAdmin) {
        diagnostic = `You are logged in, but you are not an admin. Your metadata is: ${JSON.stringify(user.publicMetadata)}. Your email is: ${primaryEmail}`;
      }
    } catch (e: any) {
      console.error("Clerk fetch error:", e);
      diagnostic = `Clerk API Error: ${e.message}`;
    }
  }
  
  if (!isAdmin) {
    return (
      <div className="p-10 bg-red-50 text-red-500 font-bold">
        <h2>Error: You are not an admin.</h2>
        <p className="mt-4 text-sm font-normal bg-red-100 p-4 rounded-xl border border-red-200">
          <strong>Diagnostic Reason:</strong> {diagnostic}
        </p>
      </div>
    );
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
