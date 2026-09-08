import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { heroStats as defaultStats, heroText as defaultText } from "../content/data";

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
          const duration = 1800;
          const steps = 45;
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
    <div ref={ref} className="text-left">
      <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text-white tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-text-muted mt-1.5 tracking-wide uppercase">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { data: heroText } = useContent("heroText");
  const { data: heroStats } = useContent("heroStats");

  const text = heroText || defaultText;
  const stats = heroStats && heroStats.length ? heroStats : defaultStats;

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 md:pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted mb-6">
            {text.badge}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {text.headline1}{" "}
          <span className="text-gradient">{text.headline2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
        >
          {text.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-sm text-text-muted max-w-lg leading-relaxed"
        >
          {text.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <Link
            to="/store"
            className="glass-btn inline-flex items-center justify-center gap-2 text-sm sm:text-base px-8 py-4 no-underline min-h-[48px]"
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          >
            Explore Shop
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => window.dispatchEvent(new Event("toggle-ai-assistant"))}
            className="glass-btn-outline inline-flex items-center justify-center gap-2 text-sm sm:text-base px-8 py-4 no-underline min-h-[48px] cursor-pointer"
          >
            <MessageCircle size={16} />
            Book a Repair
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-6 pb-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-t border-white/[0.07] pt-10">
          {stats.map((s) => (
            <AnimatedCounter key={s.label} {...s} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
