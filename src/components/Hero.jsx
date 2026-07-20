import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, MessageCircle, CircuitBoard } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP, heroStats as defaultStats, heroText as defaultText } from "../content/data";

const orbs = [
  { cx: "20%", cy: "30%", size: 320, color: "accent-blue", delay: 0 },
  { cx: "75%", cy: "60%", size: 280, color: "accent-purple", delay: 2 },
  { cx: "50%", cy: "80%", size: 200, color: "accent-cyan", delay: 4 },
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
    <div ref={ref} className="text-center px-2">
      <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs md:text-sm text-text-muted mt-1 font-medium">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { data: heroText } = useContent("heroText");
  const { data: heroStats } = useContent("heroStats");

  const text = heroText || defaultText;
  const stats = heroStats && heroStats.length ? heroStats : defaultStats;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-${orb.color}/8 blur-3xl`}
            style={{ left: orb.cx, top: orb.cy, width: orb.size, height: orb.size, transform: "translate(-50%, -50%)" }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 12,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/30 to-bg-primary" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 md:pt-0 pb-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 glass px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-accent-blue rounded-full">
            <CircuitBoard size={12} />
            {text.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05]"
        >
          {text.headline1}{" "}
          <span className="text-gradient">{text.headline2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-5 text-lg sm:text-xl md:text-2xl text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed"
        >
          {text.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-4 text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {text.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="glass-btn inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 no-underline"
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          >
            Explore Shop
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn-outline inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 no-underline"
          >
            <MessageCircle size={16} />
            Book a Repair
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 flex items-center justify-center gap-2 text-text-muted text-xs"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-0 inset-x-0 z-10"
      >
        <div className="glass rounded-none border-x-0 border-b-0">
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
