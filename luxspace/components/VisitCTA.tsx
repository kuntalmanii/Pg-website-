export default function VisitCTA() {
  return (
    <section id="visit" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Accommodations & Tariffs
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Schedule Visit
          </h2>
        </div>

        {/* Pricing Cards Grid Layout Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="luxury-card p-8 flex flex-col justify-between min-h-[360px]"
            >
              <div>
                <div className="h-4 w-1/3 bg-[#2D2D2D]/10 rounded mb-4" />
                <div className="h-8 w-1/2 bg-[#2D2D2D]/15 rounded mb-6" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-[#2D2D2D]/5 rounded" />
                  <div className="h-4 w-5/6 bg-[#2D2D2D]/5 rounded" />
                  <div className="h-4 w-4/6 bg-[#2D2D2D]/5 rounded" />
                </div>
              </div>
              <div className="h-12 w-full bg-[#7C8DBB]/20 rounded-full mt-8" />
            </div>
          ))}
        </div>

        {/* Schedule Visit Action Banner Container Skeleton */}
        <div className="luxury-card p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#A7B7E7]/15">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <div className="h-6 w-2/3 bg-[#2D2D2D]/15 rounded" />
            <div className="h-4 w-full bg-[#2D2D2D]/10 rounded" />
          </div>
          <div className="h-12 w-48 bg-[#7C8DBB] rounded-full shrink-0" />
        </div>
      </div>
    </section>
  );
}
