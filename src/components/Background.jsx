import { useMemo } from "react";

const nodes = Array.from({ length: 30 }).map(() => ({
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 5}s`,
}));

const particles = Array.from({ length: 8 }).map((_, i) => ({
  yOffset: `${(Math.random() - 0.5) * 200}px`,
  duration: `${8 + Math.random() * 12}s`,
  delay: `${Math.random() * 8}s`,
  top: `${10 + Math.random() * 80}%`,
}));

const gears = [
  { left: "8%", top: "15%", size: 80, delay: "0s" },
  { left: "85%", top: "70%", size: 60, delay: "-8s" },
  { left: "70%", top: "10%", size: 50, delay: "-15s" },
  { left: "15%", top: "80%", size: 45, delay: "-22s" },
  { left: "45%", top: "90%", size: 35, delay: "-5s" },
  { left: "92%", top: "40%", size: 55, delay: "-12s" },
];

export default function Background() {
  return (
    <div className="bg-circuit" aria-hidden="true">
      <div className="bg-circuit-layer-2" />
      <div className="bg-circuit-traces" />
      <div className="bg-circuit-nodes">
        {nodes.map((n, i) => (
          <span key={i} style={{ left: n.left, top: n.top, animationDelay: n.delay }} />
        ))}
      </div>
      <div className="bg-circuit-flow">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ top: p.top, "--duration": p.duration, "--delay": p.delay, "--y-offset": p.yOffset } as any} />
        ))}
      </div>
      <div className="bg-circuit-layer-3" />
      <div className="bg-circuit-gears">
        {gears.map((g, i) => (
          <div key={i} className="gear" style={{ left: g.left, top: g.top, width: g.size, height: g.size, animationDelay: g.delay }} />
        ))}
      </div>
      <div className="bg-circuit-light">
        <div className="ray" style={{ top: "20%" }} />
        <div className="ray" style={{ top: "50%" }} />
        <div className="ray" style={{ top: "75%" }} />
      </div>
    </div>
  );
}
