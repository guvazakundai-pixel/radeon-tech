import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop, Monitor, Gamepad2, Apple, Bug, MonitorCheck, FileWarning,
  Database, Cpu, Keyboard, Plug, Smartphone, Battery, Search,
  Wifi, Printer, Briefcase, ChevronDown, ChevronRight, MessageCircle,
} from "lucide-react";

const WHATSAPP = "https://wa.me/263773066041";

const services = [
  { icon: Laptop, title: "Laptop Repairs", img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80", desc: "Comprehensive laptop repair for all brands — screen, keyboard, motherboard, battery, and component-level diagnostics." },
  { icon: Monitor, title: "Desktop Repairs", img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80", desc: "Expert desktop repair including PSU, motherboard, GPU, RAM, cooling systems, and full engineering diagnostics." },
  { icon: Apple, title: "MacBook Repairs", img: "https://images.unsplash.com/photo-1611186871348-b1ce696dd52a?w=400&q=80", desc: "Professional MacBook repair — screen, logic board, battery, keyboard, and charging system engineering." },
  { icon: Gamepad2, title: "Gaming PC Repairs", img: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&q=80", desc: "Specialized gaming rig repair — GPU rework, liquid cooling service, PSU replacement, and thermal optimization." },
  { icon: Bug, title: "Virus & Malware Removal", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80", desc: "Enterprise-grade malware, ransomware, and spyware removal. Full system sanitization and protection deployment." },
  { icon: MonitorCheck, title: "Windows Installation", img: "https://images.unsplash.com/photo-1560264280-88b68371db81?w=400&q=80", desc: "Professional Windows 10/11 deployment with driver optimization, security hardening, and software configuration." },
  { icon: FileWarning, title: "Software Installation", img: "https://images.unsplash.com/photo-1537432376077-2173002a6c23?w=400&q=80", desc: "Application deployment, driver engineering, compatibility resolution, and enterprise software configuration." },
  { icon: Database, title: "Data Recovery", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80", desc: "Professional data recovery from failed drives, corrupted storage, accidental formatting, and physical damage." },
  { icon: Cpu, title: "Motherboard Repairs", img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80", desc: "Chip-level motherboard engineering — BGA rework, capacitor replacement, trace repair, and power IC restoration." },
  { icon: Keyboard, title: "Keyboard Repairs", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", desc: "Precision keyboard repair — stuck keys, liquid damage restoration, backlit replacement, and individual keycap service." },
  { icon: Plug, title: "Charging Port Repairs", img: "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=400&q=80", desc: "DC jack, USB-C, and MagSafe charging port repair and replacement for all laptop platforms." },
  { icon: Smartphone, title: "Screen Replacement", img: "https://images.unsplash.com/photo-1600476788122-09c3e5cd40ae?w=400&q=80", desc: "Precision screen replacement using OEM-quality displays. Full calibration and quality assurance included." },
  { icon: Battery, title: "Battery Replacement", img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80", desc: "Safe battery replacement and charging circuit diagnosis. Swollen battery disposal and power system restoration." },
  { icon: Search, title: "Hardware Diagnostics", img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&q=80", desc: "Complete hardware engineering analysis — CPU, GPU, RAM, storage, motherboard, and thermal system profiling." },
  { icon: Wifi, title: "Networking Setup", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80", desc: "Enterprise Wi-Fi deployment, router configuration, office network infrastructure, and security hardening." },
  { icon: Printer, title: "Printer Support", img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa2?w=400&q=80", desc: "Printer installation, driver engineering, network configuration, and maintenance for inkjet and laser systems." },
  { icon: Briefcase, title: "Business IT Support", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", desc: "Managed IT infrastructure, bulk computer deployment, office support, and annual maintenance contracts." },
];

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
          {services.map((service, i) => {
            const isOpen = expanded === i;
            const Icon = service.icon;
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
                  <div className="w-24 h-24 shrink-0 overflow-hidden rounded-l-2xl">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
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
