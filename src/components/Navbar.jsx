import { useState, useEffect } from "react";
import { Menu, X, Phone, Wrench } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Brands", href: "#brands" },
  { label: "Repairs", href: "#process" },
  { label: "Knowledge", href: "#knowledge" },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

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
        <a href="#home" className="flex items-center gap-2 no-underline shrink-0" aria-label="Radeon Tech Home">
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
            href="#process"
            className="hidden lg:inline-flex items-center gap-2 border border-red-accent text-red-accent hover:bg-red-accent hover:text-white text-sm font-semibold px-4 py-2 rounded-full transition-all no-underline"
          >
            <Wrench size={14} />
            <span>Book a Repair</span>
          </a>
          <a
            href="tel:+263773066041"
            className="inline-flex items-center gap-2 bg-red-accent hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors no-underline"
            aria-label="Call us at +263 77 306 6041"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">Call Now</span>
          </a>
          <button
            className="lg:hidden p-2 text-white hover:text-red-accent transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="lg:hidden fixed inset-0 top-16 md:top-20 z-40 bg-bg-dark/98 backdrop-blur-xl"
        >
          <div className="px-4 py-6 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="block px-3 py-3 text-base font-medium text-gray-text hover:text-white hover:bg-white/5 rounded-lg transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="#process"
                onClick={close}
                className="flex items-center justify-center gap-2 border border-red-accent text-red-accent hover:bg-red-accent hover:text-white text-sm font-semibold px-4 py-3 rounded-full transition-all no-underline"
              >
                <Wrench size={16} />
                <span>Book a Repair</span>
              </a>
              <a
                href="tel:+263773066041"
                onClick={close}
                className="flex items-center justify-center gap-2 bg-red-accent hover:bg-red-700 text-white text-sm font-semibold px-4 py-3 rounded-full transition-colors no-underline"
              >
                <Phone size={16} />
                <span>Call Now — +263 77 306 6041</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
