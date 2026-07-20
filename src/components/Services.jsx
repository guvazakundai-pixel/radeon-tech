import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";
import { getIcon } from "../utils/icons";

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

export default function Services() {
  const [expanded, setExpanded] = useState(null);
  const { data: services } = useContent("services");
  const items = services || [];

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-bg-primary">
      <div className="section-glow-top" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-blue tracking-wide">SERVICES</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-white">
            Engineering <span className="text-gradient">Services</span>
          </h2>
          <p className="section-subtitle mt-3">
            From component-level hardware engineering to enterprise IT solutions — we deliver technical excellence.
          </p>
        </motion.div>

        <motion.div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((service, i) => {
            const isOpen = expanded === i;
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`glass-card-static overflow-hidden transition-all duration-300 ${
                  isOpen ? "shadow-lg shadow-accent-blue/5 border-accent-blue/20 sm:col-span-2 lg:col-span-3 xl:col-span-4" : ""
                }`}
              >
                <RippleButton
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left flex items-start gap-4"
                  aria-expanded={isOpen}
                >
                  {service.img ? (
                    <div className="w-24 h-24 shrink-0 overflow-hidden rounded-l-2xl">
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 shrink-0 rounded-l-2xl bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-accent-blue/30" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 py-4 pr-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-accent-blue" />
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-text-white text-base">{service.title}</h4>
                          <p className={`text-text-secondary text-sm mt-0.5 leading-relaxed ${isOpen ? "" : "line-clamp-2"}`}>{service.desc}</p>
                        </div>
                      </div>
                      <ChevronDown size={18} className={`shrink-0 mt-2 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-blue" : ""}`} />
                    </div>
                  </div>
                </RippleButton>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border-subtle pt-4">
                        <a
                          href={WHATSAPP}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-btn inline-flex items-center gap-1.5 text-xs px-5 py-2.5 no-underline"
                        >
                          <MessageCircle size={12} />
                          Book This Service <ChevronRight size={12} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
