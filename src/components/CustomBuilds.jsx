import { motion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";
import { getIcon } from "../utils/icons";

export default function CustomBuilds() {
  const { data: builds } = useContent("builds");
  const { data: buildReasons } = useContent("buildReasons");
  const items = builds || [];
  const reasons = buildReasons || [];

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
              const Icon = getIcon(r.icon);
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
            {items.map((build, i) => {
              const Icon = getIcon(build.icon);
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
                      {(build.specs || []).map((s) => (
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
