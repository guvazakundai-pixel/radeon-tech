import { motion } from "framer-motion";
import { Shield, Users, Award, Clock, CheckCircle, Headphones, Cpu } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { getIcon } from "../utils/icons";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay },
});

export default function About() {
  const { data: highlights } = useContent("highlights");
  const { data: aboutValues } = useContent("aboutValues");
  const { data: aboutText } = useContent("aboutText");

  const hl = highlights || [];
  const vals = aboutValues || [];
  const txt = aboutText || {};

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-bg-secondary">
      <div className="section-glow-top" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div {...fadeIn(0)} className="text-center">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-blue tracking-wide">ABOUT</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-white">
            About <span className="text-gradient">Radeon Tech</span>
          </h2>
          <p className="text-text-secondary mt-3 text-sm md:text-base">
            Your Trusted ICT Partner Since 2015
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeIn(0.1)} className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-text-white">Who We Are</h3>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              {txt.whoWeAre1}
            </p>
            <p className="text-text-secondary leading-relaxed text-base">
              {txt.whoWeAre2}
            </p>

            <div className="glass-card-static p-6">
              <h3 className="font-heading font-semibold text-text-white text-sm uppercase tracking-wider mb-2">Our Mission</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {txt.mission}
              </p>
            </div>

            <div className="glass-card-static p-6">
              <h3 className="font-heading font-semibold text-text-white text-sm uppercase tracking-wider mb-2">Our Vision</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {txt.vision}
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeIn(0.3)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {hl.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={item.text} className="glass-card p-6 text-center">
                    <div className="font-heading text-2xl font-bold text-gradient">{item.value}</div>
                    <Icon className="w-5 h-5 text-accent-blue mx-auto my-2" />
                    <p className="text-text-secondary text-xs font-medium">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <h3 className="font-heading text-xl font-bold text-text-white mt-8">Our Core Values</h3>
            <div className="space-y-3">
              {vals.map((v) => {
                const Icon = getIcon(v.icon);
                return (
                  <div key={v.title} className="glass-card-static p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-text-white text-sm">{v.title}</h4>
                      <p className="text-text-secondary text-xs leading-relaxed mt-0.5">{v.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
