import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { getIcon } from "../utils/icons";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutPage() {
  const { data: highlights } = useContent("highlights");
  const { data: aboutValues } = useContent("aboutValues");
  const { data: aboutText } = useContent("aboutText");

  const hl = highlights || [];
  const vals = aboutValues || [];
  const txt = aboutText || {};

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeIn(0)}>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Building2 size={13} className="text-accent-blue" />
              <span className="text-xs font-semibold text-accent-blue tracking-wide">ABOUT US</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-text-white leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              About <span className="text-gradient">Radeon Tech</span>
            </h1>
            <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Zimbabwe&apos;s trusted ICT solution centre since 2015. Technical excellence, transparent service, and genuine care for every client.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeIn(0.1)} className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-text-white">Who We Are</h2>
              <p className="text-text-secondary leading-relaxed text-base">{txt.whoWeAre1}</p>
              <p className="text-text-secondary leading-relaxed text-base">{txt.whoWeAre2}</p>
            </motion.div>

            <motion.div {...fadeIn(0.2)} className="space-y-4">
              <div className="glass-card-static p-6">
                <h3 className="font-heading font-semibold text-text-white text-sm uppercase tracking-wider mb-3">Our Mission</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{txt.mission}</p>
              </div>
              <div className="glass-card-static p-6">
                <h3 className="font-heading font-semibold text-text-white text-sm uppercase tracking-wider mb-3">Our Vision</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{txt.vision}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hl.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="font-heading text-3xl font-bold text-gradient mb-1">{item.value}</div>
                  <Icon className="w-5 h-5 text-accent-blue mx-auto my-2" />
                  <p className="text-text-secondary text-xs font-medium">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn(0)}>
            <h2 className="font-heading text-2xl font-bold text-text-white mb-8">Our Core Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {vals.map((v, i) => {
              const Icon = getIcon(v.icon);
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card-static p-5 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent-blue/[0.06] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-text-white text-sm">{v.title}</h4>
                    <p className="text-text-secondary text-xs leading-relaxed mt-1">{v.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
