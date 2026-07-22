export default function Location() {
  return (
    <section id="location" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Address Details Container Skeleton */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
                Connectivity & Access
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
                Location
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="luxury-card p-6 min-h-[120px] flex flex-col justify-center">
                  <div className="h-4 w-1/2 bg-[#2D2D2D]/15 rounded mb-2" />
                  <div className="h-3 w-4/5 bg-[#2D2D2D]/10 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Map Frame Container Skeleton */}
          <div className="luxury-card w-full aspect-[4/3] overflow-hidden flex items-center justify-center bg-[#FFFDF9]">
            {/* Map Frame */}
          </div>
        </div>
      </div>
    </section>
  );
}
