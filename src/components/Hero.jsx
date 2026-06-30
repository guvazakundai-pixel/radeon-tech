import { useEffect, useRef, useState } from "react";
import { Cpu, Monitor, HardDrive, CircuitBoard, Star } from "lucide-react";
import { motion } from "framer-motion";

const floatingIcons = [
  { icon: Cpu, label: "CPU", x: "8%", y: "18%", delay: 0, size: 32 },
  { icon: Monitor, label: "Monitor", x: "85%", y: "12%", delay: 0.5, size: 36 },
  { icon: CircuitBoard, label: "Motherboard", x: "90%", y: "65%", delay: 1, size: 30 },
  { icon: HardDrive, label: "SSD", x: "6%", y: "72%", delay: 1.5, size: 28 },
];

const stats = [
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Devices Repaired", value: 1000, suffix: "+" },
  { label: "Followers", value: 514, suffix: "+" },
  { label: "Turnaround", value: 24, suffix: "hrs", prefix: "<" },
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
          const duration = 2000;
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
      <div className="font-heading text-2xl md:text-3xl font-bold text-royal-blue">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-text-secondary mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-light-blue via-white to-bg-light-gray"
    >
      {floatingIcons.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            className="absolute pointer-events-none select-none text-royal-blue/8"
            style={{ left: item.x, top: item.y }}
            initial={{ y: 0 }}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <Icon size={item.size} />
          </motion.div>
        );
      })}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-text-white bg-royal-blue rounded-full">
            YOUR STOP ICT SOLUTION CENTRE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary leading-tight"
        >
          Radeon Tech{" "}
          <span className="text-royal-blue">Investments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-3 text-base sm:text-lg md:text-xl text-text-secondary font-medium"
        >
          Computer Repairs · Sales · ICT Solutions
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-4 text-sm sm:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Zimbabwe's trusted computer repair and ICT solutions provider. From virus removal to custom PC builds, we handle it all with speed, honesty, and expertise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary"
        >
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-royal-blue fill-royal-blue" />
            514+ Followers
          </span>
          <span className="text-border-medium hidden sm:inline">·</span>
          <span>10+ Years</span>
          <span className="text-border-medium hidden sm:inline">·</span>
          <span>1000+ Repairs</span>
          <span className="text-border-medium hidden sm:inline">·</span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-royal-blue fill-royal-blue" />
            <Star size={14} className="text-royal-blue fill-royal-blue" />
            <Star size={14} className="text-royal-blue fill-royal-blue" />
            <Star size={14} className="text-royal-blue fill-royal-blue" />
            <Star size={14} className="text-royal-blue fill-royal-blue" />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#process"
            className="inline-flex items-center gap-2 bg-royal-blue hover:bg-royal-blue/90 text-text-white font-semibold px-8 py-3.5 rounded-full transition-all no-underline text-sm sm:text-base shadow-sm"
          >
            Book a Repair
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-royal-blue/30 hover:border-royal-blue text-royal-blue font-semibold px-8 py-3.5 rounded-full transition-all no-underline text-sm sm:text-base"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 inset-x-0 z-10"
      >
        <div className="bg-white/80 backdrop-blur-sm border-t border-border-light">
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
