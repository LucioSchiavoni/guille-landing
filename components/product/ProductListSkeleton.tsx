// 🎭 Skeleton para ProductList - Se muestra mientras carga el Server Component
export default function ProductListSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header skeleton */}
      <div className="h-9 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-8" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-card rounded-xl overflow-hidden border border-border/50 h-full"
          >
            {/* Image skeleton */}
            <div className="aspect-square bg-gray-200 animate-pulse" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />

              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-9 w-24 bg-gray-100 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
