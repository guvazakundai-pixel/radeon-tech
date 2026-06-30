import { motion } from "framer-motion";
import { Toolbox, Search, Wrench, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: Toolbox,
    step: 1,
    title: "Bring Your Device",
    desc: "Drop off your computer at our shop or contact us for pickup.",
  },
  {
    icon: Search,
    step: 2,
    title: "Free Diagnosis",
    desc: "We thoroughly diagnose the issue and provide a clear, no-obligation quote.",
  },
  {
    icon: Wrench,
    step: 3,
    title: "Professional Repair",
    desc: "Our certified technicians repair your device using genuine parts.",
  },
  {
    icon: ClipboardCheck,
    step: 4,
    title: "Collect Your Computer",
    desc: "Pick up your fully tested, working device with a service warranty.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-navy/30 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            Our Repair <span className="text-red-accent">Process</span>
          </h2>
          <p className="mt-3 text-gray-text text-center max-w-xl mx-auto">
            From drop-off to pick-up — fast, transparent, professional.
          </p>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="relative mt-16">
          <div className="hidden lg:block absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-white/10 -translate-y-1/2" />

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex lg:flex-col items-center lg:text-center gap-4 lg:gap-3"
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-red-accent flex items-center justify-center shadow-lg shadow-red-accent/25 relative z-10">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-red-accent text-xs font-bold flex items-center justify-center z-20">
                    {s.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white text-lg">{s.title}</h3>
                  <p className="text-gray-text text-sm mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
