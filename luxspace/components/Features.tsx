export default function Features() {
  return (
    <section id="features" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Amenities & Services
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Key Features
          </h2>
        </div>

        {/* Features Grid Skeleton Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="luxury-card p-8 flex flex-col min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#A7B7E7]/20 mb-6" />
              <div className="h-5 w-3/4 bg-[#2D2D2D]/10 rounded mb-3" />
              <div className="h-4 w-full bg-[#2D2D2D]/5 rounded mb-2" />
              <div className="h-4 w-2/3 bg-[#2D2D2D]/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
