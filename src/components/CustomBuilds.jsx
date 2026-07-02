import { motion } from "framer-motion";
import { Gamepad2, Monitor, Cpu, Video, Edit3, Zap, Fan, Cable, ArrowUpRight, CheckCircle, MessageCircle } from "lucide-react";

const WHATSAPP = "https://wa.me/263773066041";

const builds = [
  {
    icon: Gamepad2, title: "Gaming PCs",
    desc: "High-performance gaming rigs engineered for dominance. Ray tracing, high refresh rates, ultra settings.",
    specs: ["Latest NVIDIA/AMD GPUs", "NVMe SSD Arrays", "Custom Liquid Cooling", "Premium Cable Management"],
    img: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&q=80",
  },
  {
    icon: Monitor, title: "Office PCs",
    desc: "Reliable, silent, energy-efficient workstations engineered for maximum productivity.",
    specs: ["Energy-Efficient Processors", "Quick SSD Storage", "Quiet Thermal Design", "Compact Professional Chassis"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  },
  {
    icon: Cpu, title: "Workstations",
    desc: "Powerful engineering workstations for design, rendering, and data-intensive professional workloads.",
    specs: ["Multi-Core Xeon/Ryzen CPUs", "ECC Memory Support", "Professional GPUs", "Massive Storage Arrays"],
    img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
  },
  {
    icon: Video, title: "Streaming PCs",
    desc: "Dual-PC or single-rig streaming engineering. Zero dropped frames, maximum production quality.",
    specs: ["Dedicated Encoding", "High Core-Count CPUs", "Capture Card Ready", "OBS/Streamlabs Optimized"],
    img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
  },
  {
    icon: Edit3, title: "Video Editing PCs",
    desc: "Render 4K and 8K footage with ease. Engineered for DaVinci Resolve, Premiere Pro, After Effects.",
    specs: ["High-End Multi-Core CPUs", "64GB+ RAM Capacity", "NVMe RAID Arrays", "Color-Accurate GPUs"],
    img: "https://images.unsplash.com/photo-1537432376077-2173002a6c23?w=400&q=80",
  },
];

const reasons = [
  { icon: Zap, title: "Superior Performance", text: "Every component hand-picked and optimized for your specific workload — zero bottlenecks, zero compromises." },
  { icon: Fan, title: "Premium Thermal Engineering", text: "Expert airflow design, high-quality fans, and custom liquid cooling options for optimal temperatures." },
  { icon: Cable, title: "Meticulous Cable Architecture", text: "Every build features precision cable routing for optimal airflow, aesthetics, and effortless future upgrades." },
  { icon: ArrowUpRight, title: "Future-Ready Upgrade Paths", text: "We engineer with expansion in mind — ample slots, extra RAM channels, and modular power supplies." },
];

export default function CustomBuilds() {
  return (
    <section id="builds" className="relative py-20 md:py-28 overflow-hidden bg-bg-secondary">
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
            <span className="text-xs font-semibold text-accent-blue tracking-wide">CUSTOM BUILDS</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-white">
            Custom PC <span className="text-gradient">Engineering</span>
          </h2>
          <p className="section-subtitle mt-3">
            Why settle for off-the-shelf when you can have a machine precision-engineered for your needs?
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
          <motion.div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-text-white">Why Custom Engineering</h3>
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card-static p-5 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-text-white text-sm">{r.title}</h4>
                    <p className="text-text-secondary text-xs leading-relaxed mt-0.5">{r.text}</p>
                  </div>
                </motion.div>
              );
            })}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn inline-flex items-center gap-2 text-sm px-6 py-3 no-underline mt-4"
            >
              <MessageCircle size={16} />
              Request a Custom Build
            </a>
          </motion.div>

          <motion.div className="grid gap-4">
            {builds.map((build, i) => {
              const Icon = build.icon;
              return (
                <motion.div
                  key={build.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card p-4 flex items-start gap-4"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={build.img} alt={build.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-accent-blue shrink-0" />
                      <h4 className="font-heading font-semibold text-text-white text-sm">{build.title}</h4>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed">{build.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {build.specs.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 text-[10px] text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">
                          <CheckCircle size={8} />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
