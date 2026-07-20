import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";

function RippleButton({ children, onClick, className }) {
  const btnRef = useRef(null);
  const handleClick = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add("ripple-effect");
    ripple.addEventListener("animationend", () => ripple.remove());
    btn.appendChild(ripple);
  }, []);
  return (
    <button ref={btnRef} type="button" className={`ripple-btn ${className}`} onClick={(e) => { handleClick(e); onClick?.(e); }}>
      {children}
    </button>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const [search, setSearch] = useState("");
  const { data: faqCategories } = useContent("faqCategories");
  const categories = faqCategories || [];

  const flatItems = useMemo(() => {
    const all = [];
    categories.forEach((cat) => {
      (cat.items || []).forEach((item) => {
        all.push({ ...item, category: cat.label });
      });
    });
    return all;
  }, [categories]);

  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return flatItems.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [search, flatItems]);

  const displayCategories = filtered
    ? [{ label: "Search Results", items: filtered }]
    : categories;

  let globalIndex = -1;

  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden bg-bg-primary">
      <div className="section-glow-top" />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-blue tracking-wide">FAQ</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="section-subtitle mt-3">
            Quick answers to the most common questions we get.
          </p>
        </motion.div>

        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIdx(null); }}
            placeholder="Search questions..."
            aria-label="Search frequently asked questions"
            className="w-full pl-11 pr-4 py-3 glass-card-static text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue/30 transition-all rounded-2xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-8"
        >
          {displayCategories.map((cat) => (
            <div key={cat.label}>
              <h3 className="font-heading text-sm font-semibold text-accent-blue uppercase tracking-wider mb-3">
                {cat.label}
              </h3>
              <div className="space-y-2">
                {(cat.items || []).map((faq) => {
                  globalIndex += 1;
                  const idx = globalIndex;
                  const isOpen = openIdx === idx;

                  return (
                    <motion.div
                      key={idx}
                      layout
                      className={`glass-card-static overflow-hidden transition-all duration-300 ${
                        isOpen ? "shadow-md shadow-accent-blue/10 border-accent-blue/20" : ""
                      }`}
                    >
                      <RippleButton
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-text-primary font-medium text-sm md:text-base hover:bg-accent-blue/5 transition-colors rounded-2xl"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-accent-blue" : "text-text-muted"
                          }`}
                        />
                      </RippleButton>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 text-text-secondary text-sm leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-text-secondary text-sm mb-4">Still have questions? We&apos;re here to help.</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn inline-flex items-center gap-2 text-sm px-6 py-3 no-underline"
          >
            <MessageCircle size={16} />
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
