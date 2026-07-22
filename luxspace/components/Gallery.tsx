export default function Gallery() {
  return (
    <section id="gallery" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Space Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Gallery
          </h2>
        </div>

        {/* Gallery Grid Skeleton Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="luxury-card aspect-[4/3] relative overflow-hidden flex flex-col justify-end p-6"
            >
              <div className="h-4 w-1/3 bg-[#2D2D2D]/10 rounded mb-2" />
              <div className="h-5 w-2/3 bg-[#2D2D2D]/15 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
