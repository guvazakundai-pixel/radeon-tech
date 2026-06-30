import { useState, useEffect, useRef } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 1000, suffix: "+", label: "Devices Repaired" },
  { value: 48, suffix: "hrs", label: "Fast Turnaround" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function CountUp({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-extrabold text-royal-blue">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative -mt-20 z-10 max-w-6xl mx-auto px-4 pb-16">
      <div className="bg-white rounded-2xl shadow-sm border border-border-light grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border-light">
        {stats.map((s) => (
          <div key={s.label} className="py-8 px-4 text-center">
            <CountUp end={s.value} suffix={s.suffix} />
            <p className="mt-1 text-sm text-text-secondary font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
