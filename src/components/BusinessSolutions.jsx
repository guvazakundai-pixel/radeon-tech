import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";
import { getIcon } from "../utils/icons";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function BusinessSolutions() {
  const { data: services } = useContent("businessServices");
  const items = services || [];

  return (
    <section id="business" className="relative py-20 md:py-28 overflow-hidden bg-bg-primary">
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
            <span className="text-xs font-semibold text-accent-blue tracking-wide">BUSINESS</span>
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
          {items.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.div
                key={s.title}
                {...fadeIn(i * 0.08)}
                className="glass-card p-6 flex flex-col group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-accent-blue" />
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
