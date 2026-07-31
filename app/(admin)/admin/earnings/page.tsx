import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function EarningsPage() {
  const earningsByProduct = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: {
      price: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      id: { in: earningsByProduct.map((e: any) => e.productId) }
    }
  });

  const productEarningsMap = earningsByProduct.map((earning: any) => {
    const product = products.find((p: any) => p.id === earning.productId);
    return {
      name: product?.name || "Unknown Product",
      revenue: earning._sum.price || 0
    };
  }).sort((a: any, b: any) => b.revenue - a.revenue);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Earnings & Payments</h1>
      
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden p-8">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Revenue by Template</h2>
        
        {productEarningsMap.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Not enough data to display earnings yet.
          </div>
        ) : (
          <div className="space-y-6">
            {productEarningsMap.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="font-bold text-green-600">${item.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
