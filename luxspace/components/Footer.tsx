export default function Footer() {
  return (
    <footer className="w-full bg-[#F7F1E8] border-t border-[rgba(0,0,0,0.06)] py-16 sm:py-20">
      <div className="apple-container flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Details Skeleton */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-xl font-bold text-[#2D2D2D]">
            LuxSpace
          </span>
          <span className="text-xs font-sans text-[#2D2D2D]/50">
            Sector 126 Noida
          </span>
        </div>

        {/* Footer Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 text-xs font-sans font-medium text-[#2D2D2D]/70">
          <a href="#hero" className="hover:text-[#2D2D2D] transition-colors">Overview</a>
          <a href="#features" className="hover:text-[#2D2D2D] transition-colors">Features</a>
          <a href="#gallery" className="hover:text-[#2D2D2D] transition-colors">Gallery</a>
          <a href="#visit" className="hover:text-[#2D2D2D] transition-colors">Schedule Visit</a>
          <a href="#location" className="hover:text-[#2D2D2D] transition-colors">Location</a>
        </nav>

        {/* Copyright */}
        <div className="text-xs font-sans text-[#2D2D2D]/40 text-center md:text-right">
          © {new Date().getFullYear()} LuxSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
