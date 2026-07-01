import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Gauge, DollarSign, Star } from "lucide-react";

const reasons = [
  { icon: Wrench, title: "Expert Technicians", desc: "Certified professionals with 10+ years of combined experience across all major brands." },
  { icon: ShieldCheck, title: "Quality Parts", desc: "We use only genuine or high-quality compatible parts. Every repair is backed by our warranty." },
  { icon: Gauge, title: "Fast Turnaround", desc: "Most repairs completed within 24–48 hours. Same-day service available for common issues." },
  { icon: DollarSign, title: "Affordable Prices", desc: "Free diagnosis, competitive rates, and honest recommendations. No unnecessary repairs — ever." },
  { icon: Star, title: "Satisfaction Guaranteed", desc: "Over 1,000 satisfied customers across Zimbabwe. Your satisfaction is our reputation." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-soft-purple/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-lavender/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-soft-purple tracking-wide">WHY CHOOSE US</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-text-primary tracking-tight">
            Why <span className="text-gradient">Radeon Tech</span>?
          </h2>
          <p className="section-subtitle mt-3">
            We take your trust seriously. Here's why customers choose us.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-soft-purple" />
                </div>
                <h3 className="font-heading font-bold text-text-primary text-base mb-2">{item.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
