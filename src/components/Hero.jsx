import { useEffect, useRef, useState } from "react";
import { ArrowDown, MessageCircle, Cpu, CircuitBoard } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP = "https://wa.me/263773066041";

const stats = [
  { label: "Devices Repaired", value: 1000, suffix: "+" },
  { label: "Customer Satisfaction", value: 98, suffix: "%" },
  { label: "Average Response", value: 24, suffix: "hrs", prefix: "<" },
  { label: "Professional Support", value: 100, suffix: "%" },
];

function AnimatedCounter({ value, suffix, prefix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 2500;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-2xl md:text-3xl font-bold text-gradient">{prefix}{count}{suffix}</div>
      <div className="text-xs md:text-sm text-text-muted mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 glass px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-accent-blue rounded-full">
            <CircuitBoard size={12} />
            Zimbabwe&apos;s Trusted ICT Solution Centre
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-white leading-tight"
        >
          Radeon Tech{" "}
          <span className="text-gradient">Investments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 text-lg sm:text-xl md:text-2xl text-text-secondary font-medium max-w-3xl mx-auto"
        >
          Professional Computer Repairs, Custom Builds &amp; Enterprise ICT Solutions
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-4 text-sm sm:text-base text-text-secondary/70 max-w-2xl mx-auto leading-relaxed"
        >
          1,000+ devices repaired. 98% customer satisfaction. Trusted by businesses, schools, and individuals across Zimbabwe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 no-underline"
          >
            <MessageCircle size={18} />
            Book a Repair
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn-outline inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 no-underline"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex items-center justify-center gap-2 text-text-muted text-xs"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 inset-x-0 z-10"
      >
        <div className="glass">
          <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <AnimatedCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
