import { motion } from "framer-motion";
import { Monitor, Wrench, Wifi, Computer, Users, Headphones, CalendarCheck, ClipboardList, MessageCircle } from "lucide-react";

const WHATSAPP = "https://wa.me/263773066041";

const services = [
  { icon: Monitor, title: "Managed IT", desc: "Complete IT management for your business — monitoring, maintenance, support, and strategic planning. We keep your systems running smoothly." },
  { icon: Wrench, title: "Maintenance", desc: "Regular PC maintenance, software updates, hardware checkups, and system optimization to prevent downtime." },
  { icon: Wifi, title: "Networking", desc: "Office network design, installation, and management. Wired and wireless solutions with robust security." },
  { icon: Computer, title: "Computer Deployment", desc: "Bulk computer setup, configuration, and deployment for new offices, upgrades, and expansions." },
  { icon: Users, title: "Bulk Repairs", desc: "Volume repair services for businesses, schools, and organisations. Fleet-wide diagnostics and repairs at competitive rates." },
  { icon: Headphones, title: "Office Support", desc: "On-call IT support for your office. Remote and on-site assistance for staff, hardware, and software issues." },
  { icon: CalendarCheck, title: "Annual Maintenance", desc: "Comprehensive annual IT maintenance contracts covering all your technology assets with priority support." },
  { icon: ClipboardList, title: "IT Consulting", desc: "Technology strategy, hardware procurement advice, network planning, and digital transformation guidance." },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function BusinessSolutions() {
  return (
    <section id="business" className="relative py-20 md:py-28 overflow-hidden bg-bg-lavender">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-metallic-blue/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary-red/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-primary-red tracking-wide">BUSINESS</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Business <span className="text-gradient">Solutions</span>
          </h2>
          <p className="section-subtitle mt-3">
            Enterprise-grade IT services tailored for businesses, schools, NGOs, and government organisations.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                {...fadeIn(i * 0.08)}
                className="glass-card p-6 flex flex-col group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-metallic-blue/10 to-primary-red/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-metallic-blue" />
                </div>
                <h3 className="font-heading font-bold text-text-primary text-base mb-2">{s.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed flex-1">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary text-sm mb-4">
            Need a custom IT solution for your organisation? Let&apos;s talk.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn inline-flex items-center gap-2 text-sm px-6 py-3 no-underline"
          >
            <MessageCircle size={16} />
            Talk to Our Business Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
