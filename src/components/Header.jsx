import { Menu, X, Download } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#020817]/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="group flex items-baseline gap-0.5"
          >
            <span
              className="text-xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mb-0.5 group-hover:bg-cyan-400 transition-colors duration-300" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Download CV */}
          <a
            href="/Mohammed-Rerhaye-CV.pdf"
            download="Mohammed-Rerhaye-CV.pdf"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2.5 rounded-lg transition-all duration-300 font-medium hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            <Download size={15} />
            Download CV
          </a>

          {/* Mobile toggle */}
          <button
            className="text-slate-300 hover:text-white md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 pb-3 border-t border-white/5 pt-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-lg text-sm font-medium"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2">
              <a
                href="/Mohammed-Rerhaye-CV.pdf"
                download="Mohammed-Rerhaye-CV.pdf"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
              >
                <Download size={15} />
                Download CV
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
