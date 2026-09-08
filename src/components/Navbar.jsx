import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Search, ArrowRight } from "lucide-react";
import { WHATSAPP } from "../content/data";

const navLinks = [
  { label: "Repairs", to: "/repairs" },
  { label: "Services", to: "/services" },
  { label: "Store", to: "/store" },
  { label: "PC Builder", to: "/pc-builder" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/store?q=${encodeURIComponent(searchQuery.trim())}`);
  }, [searchQuery, navigate]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.03]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0" aria-label="Radeon Tech Home">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-heading font-bold text-white text-sm">
              RT
            </span>
            <span className="font-heading font-bold text-lg tracking-tight text-white hidden sm:block">
              Radeon Tech
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg no-underline ${
                    isActive
                      ? "text-accent-blue"
                      : "text-text-secondary hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-3 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.03] transition-colors cursor-pointer bg-transparent border-none"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 glass-btn text-sm px-5 py-2.5 no-underline"
            >
              <MessageCircle size={15} />
              Book Repair
            </a>

            <button
              className="lg:hidden p-3 text-white hover:text-accent-blue transition-colors cursor-pointer bg-transparent border-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="lg:hidden fixed inset-y-0 right-0 w-full sm:w-[85vw] max-w-sm bg-[#0A0A0A]/98 backdrop-blur-2xl z-[60] flex flex-col border-l border-white/[0.03]"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.03] shrink-0">
              <Link to="/" className="flex items-center gap-2.5 no-underline" onClick={() => setMobileOpen(false)}>
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-heading font-bold text-white text-xs">
                  RT
                </span>
                <span className="font-heading font-bold text-white text-base">Radeon Tech</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => {
                      setMobileOpen(false);
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                    className={`flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-colors no-underline ${
                      isActive
                        ? "text-accent-blue bg-accent-blue/[0.06]"
                        : "text-text-secondary hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {link.label}
                    <ArrowRight size={14} className="text-text-muted" />
                  </Link>
                );
              })}
            </div>

            <div className="px-6 py-6 border-t border-white/[0.03] shrink-0">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 glass-btn text-sm w-full py-3.5 no-underline"
              >
                <MessageCircle size={16} />
                Book a Repair
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/60 z-[55]"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
            onClick={() => setSearchOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, services..."
                  autoFocus
                  className="w-full pl-14 pr-24 py-5 rounded-2xl bg-[#141414]/95 backdrop-blur-xl border border-white/[0.04] text-white text-base placeholder:text-text-muted focus:outline-none focus:border-accent-blue/40 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors cursor-pointer border-none"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
              <p className="text-center text-text-muted text-xs mt-3">
                Press <kbd className="px-1.5 py-0.5 bg-white/[0.03] border border-white/[0.04] rounded text-text-secondary text-xs">ESC</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && <SearchEscHandler onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function SearchEscHandler({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return null;
}
