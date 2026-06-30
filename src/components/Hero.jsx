import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const floatingIcons = [
  { icon: "💻", label: "Laptop", x: "10%", y: "20%", delay: 0 },
  { icon: "🖥️", label: "Desktop", x: "85%", y: "15%", delay: 0.5 },
  { icon: "🔧", label: "Repair", x: "90%", y: "60%", delay: 1 },
  { icon: "💾", label: "Storage", x: "8%", y: "70%", delay: 1.5 },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      o: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.o})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {floatingIcons.map((item) => (
        <motion.div
          key={item.label}
          className="absolute text-4xl md:text-5xl opacity-[0.06] pointer-events-none select-none"
          style={{ left: item.x, top: item.y }}
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase text-gold-accent border border-gold-accent/30 rounded-full">
            Trusted Tech Solutions in Zimbabwe
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight"
        >
          Radeon Tech
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-red-accent">
            Investments
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-text max-w-2xl mx-auto leading-relaxed"
        >
          Professional computer repairs, desktop & laptop sales, software solutions, accessories, antivirus, and data recovery across Zimbabwe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-red-accent hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-full transition-all no-underline text-sm sm:text-base shadow-lg shadow-red-accent/25"
          >
            Get a Quote
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-3.5 rounded-full transition-all no-underline text-sm sm:text-base"
          >
            <MessageCircle size={18} />
            Contact Us
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg-dark to-transparent pointer-events-none" />
    </section>
  );
}
