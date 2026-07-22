export default function Hero() {
  return (
    <section id="hero" className="w-full pt-36 pb-24 md:pt-44 md:pb-32 bg-[#F7F1E8]">
      <div className="apple-container">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,0,0,0.08)] bg-[#FFFDF9] text-xs font-sans font-medium uppercase tracking-widest text-[#7C8DBB]">
            <span>Sector 126 · Noida</span>
          </div>

          {/* Main Title Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#2D2D2D] leading-[1.1] tracking-tight">
            LuxSpace
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg sm:text-xl text-[#2D2D2D]/70 font-light max-w-2xl leading-relaxed">
            Premium Co-Living Space in Noida Sector 126
          </p>

          {/* Hero Visual Container Frame */}
          <div className="w-full mt-10 aspect-[16/9] rounded-[24px] bg-[#FFFDF9] border border-[rgba(0,0,0,0.06)] shadow-sm flex items-center justify-center overflow-hidden">
            {/* Canvas / Image sequence container frame */}
          </div>
        </div>
      </div>
    </section>
  );
}
