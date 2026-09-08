import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, ChevronRight, Wrench } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";
import { getIcon } from "../utils/icons";

function RippleButton({ children, onClick, className }) {
  const handleClick = (e) => {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add("ripple-effect");
    ripple.addEventListener("animationend", () => ripple.remove());
    btn.appendChild(ripple);
  };
  return (
    <button type="button" className={`ripple-btn ${className}`} onClick={(e) => { handleClick(e); onClick?.(e); }}>
      {children}
    </button>
  );
}

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function RepairsPage() {
  const [expanded, setExpanded] = useState(null);
  const { data: services } = useContent("services");
  const items = services || [];

  const repairServices = items.filter((s) =>
    ["Laptop Repairs", "Desktop Repairs", "MacBook Repairs", "Gaming PC Repairs",
     "Virus & Malware Removal", "Windows Installation", "Software Installation",
     "Data Recovery", "Motherboard Repairs", "Keyboard Repairs", "Charging Port Repairs",
     "Screen Replacement", "Battery Replacement", "Hardware Diagnostics"].includes(s.title)
  );

  const displayServices = repairServices.length > 0 ? repairServices : items.slice(0, 14);

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeIn(0)}>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Wrench size={13} className="text-accent-blue" />
              <span className="text-xs font-semibold text-accent-blue tracking-wide">COMPUTER REPAIRS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-text-white leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Expert Computer <span className="text-gradient">Repairs</span>
            </h1>
            <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              From component-level motherboard engineering to software diagnostics — precision repairs for every device.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div className="space-y-3">
            {displayServices.map((service, i) => {
              const isOpen = expanded === i;
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={service.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className={`glass-card-static overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-accent-blue/15" : ""
                  }`}
                >
                  <RippleButton
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full text-left flex items-start gap-4 p-5"
                    aria-expanded={isOpen}
                  >
                    {service.img ? (
                      <div className="w-20 h-20 shrink-0 overflow-hidden rounded-xl">
                        <img src={service.img} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 shrink-0 rounded-xl bg-white/[0.02] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-accent-blue/30" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent-blue/[0.06] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-accent-blue" />
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-text-white text-base">{service.title}</h4>
                          <p className={`text-text-secondary text-sm mt-0.5 leading-relaxed ${isOpen ? "" : "line-clamp-2"}`}>
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ChevronDown size={18} className={`shrink-0 mt-2 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-blue" : ""}`} />
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
                        <div className="px-5 pb-5 border-t border-white/[0.03] pt-4">
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

          <motion.div {...fadeIn(0.2)} className="mt-12 text-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn inline-flex items-center gap-2 text-sm px-8 py-3.5 no-underline"
            >
              <MessageCircle size={16} />
              Book a Repair on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
