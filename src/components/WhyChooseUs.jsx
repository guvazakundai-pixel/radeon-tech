import { motion } from "framer-motion";
import { useContent } from "../hooks/useContent";
import { getIcon } from "../utils/icons";

export default function WhyChooseUs() {
  const { data: reasons } = useContent("whyChooseUs");
  const items = reasons || [];

  return (
    <section id="why-us" className="relative py-24 overflow-hidden bg-bg-primary">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-blue tracking-wide">WHY CHOOSE US</span>
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
          {items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-accent-blue" />
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
