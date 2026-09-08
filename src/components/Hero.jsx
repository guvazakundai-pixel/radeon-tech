import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP, heroStats as defaultStats, heroText as defaultText } from "../content/data";

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
      <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text-white">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-text-muted mt-1 tracking-wide uppercase">{label}</div>
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 md:pt-0 pb-40 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.02]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {text.headline1}{" "}
            <span className="text-gradient">{text.headline2}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed"
        >
          {text.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {text.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="glass-btn inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 no-underline"
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          >
            Explore Shop
            <ArrowRight size={16} />
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-20 md:bottom-16 inset-x-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass rounded-2xl border border-white/[0.03]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/[0.04]">
              {stats.map((s) => (
                <div key={s.label} className="py-5 px-4">
                  <AnimatedCounter {...s} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 inset-x-0 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-text-muted"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
