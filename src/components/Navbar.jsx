import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Repairs", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2 no-underline">
          <span className="w-8 h-8 rounded-lg bg-red-accent flex items-center justify-center font-heading font-bold text-white text-sm">RT</span>
          <span className="font-heading font-bold text-white text-lg md:text-xl tracking-tight">
            Radeon Tech
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-text hover:text-white transition-colors rounded-lg hover:bg-white/5 no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:[PHONE NUMBER]"
            className="hidden sm:inline-flex items-center gap-2 bg-red-accent hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors no-underline"
          >
            <Phone size={14} />
            <span>Call Now</span>
          </a>
          <button
            className="lg:hidden p-2 text-white hover:text-red-accent transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-bg-dark/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-sm font-medium text-gray-text hover:text-white hover:bg-white/5 rounded-lg transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:[PHONE NUMBER]"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 mt-3 bg-red-accent hover:bg-red-700 text-white text-sm font-semibold px-4 py-3 rounded-full transition-colors no-underline"
            >
              <Phone size={16} />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
