import { motion } from "framer-motion";
import { Wrench, Gauge, DollarSign, ShieldCheck, Star, Users, Cpu, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Wrench, title: "Experienced Technicians", desc: "Certified professionals with 10+ years of combined experience across all major brands and technologies." },
  { icon: Gauge, title: "Fast Service", desc: "Most repairs completed within 24-48 hours. Same-day service available for common issues." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Free diagnosis, competitive rates, and honest recommendations. No unnecessary repairs — ever." },
  { icon: ShieldCheck, title: "Warranty", desc: "All repairs and products come with our service warranty. If the same issue recurs, we fix it free." },
  { icon: Star, title: "Trusted Company", desc: "Over 1,000 satisfied customers across Zimbabwe. Built on reputation, referrals, and results." },
  { icon: Cpu, title: "Quality Parts", desc: "We use genuine or high-quality compatible parts sourced from trusted suppliers. No cheap imitations." },
  { icon: Users, title: "Customer Satisfaction", desc: "Your satisfaction is our reputation. We go the extra mile for every single customer." },
  { icon: HeartHandshake, title: "Latest Equipment", desc: "Professional tools, diagnostic equipment, and BGA rework stations for precision repairs." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 overflow-hidden bg-bg-lavender">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-red/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-metallic-blue/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-primary-red tracking-wide">WHY CHOOSE US</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-text-primary tracking-tight">
            Why <span className="text-gradient">Radeon Tech</span>?
          </h2>
          <p className="section-subtitle mt-3">
            We take your trust seriously. Here&apos;s why customers choose us.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-red/10 to-deep-crimson/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary-red" />
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
