import { DollarSign, ShoppingCart, Eye } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [revenueAggr, ordersCount, viewsAggr] = await Promise.all([
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
    prisma.order.count(),
    prisma.product.aggregate({ _sum: { viewCount: true } })
  ]);

  const totalRevenue = revenueAggr._sum.totalAmount || 0;
  const totalViews = viewsAggr._sum.viewCount || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{ordersCount}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Views</h3>
            <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{totalViews}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
