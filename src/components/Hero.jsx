import { useEffect, useRef, useState, useCallback } from "react";
import { Cpu, Monitor, HardDrive, CircuitBoard, Star, ArrowDown } from "lucide-react";
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

function AnimatedCounter({ value, suffix, prefix }) {
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
      <div className="font-heading text-2xl md:text-3xl font-bold text-gradient">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-text-secondary mt-1">{label}</div>
    </div>
  );
}

function RippleButton({ children, href, className, ...props }) {
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

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={`ripple-btn ${className}`}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button ref={btnRef} type="button" className={`ripple-btn ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-lavender via-white to-bg-lilac"
    >
      {/* Floating gradient blobs */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-soft-purple/10 via-lavender/10 to-transparent blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-light-indigo/10 via-soft-purple/10 to-transparent blur-[120px] animate-float-slow" style={{ animationDelay: "-4s" }} />
      <div className="absolute top-[40%] right-[20%] w-[200px] h-[200px] rounded-full bg-lavender/20 blur-[80px] animate-pulse-glow" />

      {/* Floating icons */}
      {floatingIcons.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            className="absolute pointer-events-none select-none text-soft-purple/10"
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

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-soft-purple/20"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block glass px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-soft-purple rounded-full">
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
          <span className="text-gradient">Investments</span>
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
            <Star size={14} className="text-amber-400 fill-amber-400" />
            514+ Followers
          </span>
          <span className="text-border-medium hidden sm:inline">·</span>
          <span>10+ Years</span>
          <span className="text-border-medium hidden sm:inline">·</span>
          <span>1000+ Repairs</span>
          <span className="text-border-medium hidden sm:inline">·</span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <Star size={14} className="text-amber-400 fill-amber-400" />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <RippleButton
            href="#process"
            className="glass-btn inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 no-underline"
          >
            Book a Repair
          </RippleButton>
          <RippleButton
            href="#contact"
            className="glass-btn-outline inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 no-underline"
          >
            Get a Quote
          </RippleButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex items-center justify-center gap-2 text-text-muted text-xs"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
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
