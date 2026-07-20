import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, MessageCircle, Search, ChevronDown,
  Wrench, Laptop, Monitor, Cpu, Shield, Headphones,
  Briefcase, ArrowRight,
} from "lucide-react";
import { WHATSAPP } from "../content/data";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", to: "/shop" },
  {
    label: "Services",
    href: "#services",
    dropdown: [
      { label: "All Services", href: "#services", icon: Wrench },
      { label: "Laptop Repairs", href: "#services", icon: Laptop },
      { label: "Desktop Repairs", href: "#services", icon: Monitor },
      { label: "MacBook Repairs", href: "#services", icon: Cpu },
      { label: "Data Recovery", href: "#services", icon: Shield },
      { label: "Networking", href: "#services", icon: Headphones },
      { label: "Business IT", href: "#business", icon: Briefcase },
    ],
  },
  { label: "Custom Builds", to: "/pc-builder" },
  { label: "Repairs", to: "/repair" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (!isHome) return;
    const sections = ["home", "about", "services", "builds", "process", "business", "faq", "gallery", "testimonials", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = useCallback((link, e) => {
    setMobileOpen(false);
    setActiveDropdown(null);

    if (link.to) {
      navigate(link.to);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    if (link.href?.startsWith("#")) {
      e?.preventDefault();
      if (!isHome) {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(link.href);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isHome, navigate]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  }, [searchQuery, navigate]);

  const handleDropdownHover = (label) => setActiveDropdown(label);
  const handleDropdownLeave = () => setActiveDropdown(null);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0 group" aria-label="Radeon Tech Home">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-heading font-bold text-white text-sm shadow-lg shadow-accent-blue/20 group-hover:shadow-accent-blue/40 transition-shadow">
              RT
            </span>
            <span className="font-heading font-bold text-lg md:text-xl tracking-tight text-white hidden sm:block">
              Radeon Tech
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.href && isHome && activeSection === link.href.replace("#", "");
              const isRouteActive = link.to && location.pathname === link.to;

              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleDropdownHover(link.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      onClick={(e) => handleNavClick(link, e)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                        isActive || isRouteActive
                          ? "text-accent-blue"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-64 py-2 rounded-2xl bg-bg-card/95 backdrop-blur-xl border border-border-subtle shadow-xl shadow-black/30 overflow-hidden"
                        >
                          {link.dropdown.map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.label}
                                onClick={(e) => handleNavClick(item, e)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                              >
                                <span className="w-8 h-lg rounded-lg bg-accent-blue/10 flex items-center justify-center shrink-0">
                                  <Icon size={14} className="text-accent-blue" />
                                </span>
                                {item.label}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.to || link.href}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg no-underline ${
                    isActive || isRouteActive
                      ? "text-accent-blue"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
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
              className="p-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
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
              className="lg:hidden p-2.5 text-white hover:text-accent-blue transition-colors"
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
            className="lg:hidden fixed inset-y-0 right-0 w-full sm:w-[85vw] max-w-sm bg-bg-primary/98 backdrop-blur-2xl z-[60] flex flex-col border-l border-border-subtle"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle shrink-0">
              <Link to="/" className="flex items-center gap-2 no-underline" onClick={() => setMobileOpen(false)}>
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-heading font-bold text-white text-xs">
                  RT
                </span>
                <span className="font-heading font-bold text-white text-base">Radeon Tech</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-text-secondary hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = link.href && isHome && activeSection === link.href.replace("#", "");
                const isRouteActive = link.to && location.pathname === link.to;

                if (link.dropdown) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={(e) => handleNavClick(link, e)}
                        className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium rounded-lg transition-colors cursor-pointer ${
                          isActive ? "text-accent-blue bg-accent-blue/5" : "text-text-secondary hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-4"
                          >
                            {link.dropdown.map((item) => {
                              const Icon = item.icon;
                              return (
                                <button
                                  key={item.label}
                                  onClick={(e) => handleNavClick(item, e)}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Icon size={14} className="text-accent-blue" />
                                  {item.label}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.to || link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors no-underline ${
                      isActive || isRouteActive
                        ? "text-accent-blue bg-accent-blue/5"
                        : "text-text-secondary hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="px-5 py-5 border-t border-border-subtle shrink-0 space-y-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 glass-btn text-sm w-full py-3 no-underline"
              >
                <MessageCircle size={16} />
                Book a Repair on WhatsApp
              </a>
              <p className="text-center text-text-muted text-xs">+263 77 306 6041</p>
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
                  className="w-full pl-14 pr-24 py-5 rounded-2xl bg-bg-card/95 backdrop-blur-xl border border-border-subtle text-white text-base placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors cursor-pointer"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
              <p className="text-center text-text-muted text-xs mt-3">
                Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-border-subtle rounded text-text-secondary text-xs">ESC</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && (
        <SearchEscHandler onClose={() => setSearchOpen(false)} />
      )}
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
