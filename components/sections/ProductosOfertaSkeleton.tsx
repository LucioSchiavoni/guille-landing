// 🎭 Skeleton para ProductosOferta - Se muestra mientras carga el Server Component
export default function ProductosOfertaSkeleton() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-50/30 to-white">
      <div className="container mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-80 bg-gray-200 rounded-lg animate-pulse mx-auto mb-3" />
        </div>

        {/* Carousel skeleton */}
        <div className="relative">
          <div className="flex gap-4 sm:gap-6 overflow-hidden pb-8 px-4 sm:px-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-none w-[85vw] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
              >
                <div className="bg-white rounded-xl overflow-hidden border-2 border-green-100 h-full">
                  {/* Image skeleton */}
                  <div className="aspect-square bg-gray-200 animate-pulse" />

                  {/* Content skeleton */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />

                    <div className="pt-3 border-t border-gray-100">
                      <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-3" />
                      <div className="h-10 w-full bg-green-100 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
