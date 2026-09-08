import { motion } from "framer-motion";
import { Monitor, MessageCircle } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";
import { getIcon } from "../utils/icons";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ServicesPage() {
  const { data: services } = useContent("services");
  const { data: businessServices } = useContent("businessServices");
  const items = services || [];
  const business = businessServices || [];

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeIn(0)}>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Monitor size={13} className="text-accent-blue" />
              <span className="text-xs font-semibold text-accent-blue tracking-wide">TECHNOLOGY SERVICES</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-text-white leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Technology <span className="text-gradient">Services</span>
            </h1>
            <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Enterprise IT support, networking, data recovery, and professional technology solutions for businesses and individuals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div {...fadeIn(0.1)}>
            <h2 className="font-heading text-2xl font-bold text-text-white mb-8">All Services</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-start gap-4">
                    {service.img ? (
                      <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl">
                        <img src={service.img} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 shrink-0 rounded-xl bg-white/[0.02] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-blue/30" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-accent-blue shrink-0" />
                        <h4 className="font-heading font-semibold text-text-white text-sm">{service.title}</h4>
                      </div>
                      <p className="text-text-secondary text-xs leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div {...fadeIn(0)}>
            <h2 className="font-heading text-2xl font-bold text-text-white mb-3">Business IT Solutions</h2>
            <p className="text-text-secondary text-sm mb-10 max-w-xl">
              Managed IT services, maintenance contracts, and enterprise technology support for businesses, schools, and NGOs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {business.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass-card p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/[0.06] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent-blue" />
                  </div>
                  <h4 className="font-heading font-semibold text-text-white text-sm mb-1.5">{service.title}</h4>
                  <p className="text-text-secondary text-xs leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeIn(0.2)} className="mt-12 text-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn inline-flex items-center gap-2 text-sm px-8 py-3.5 no-underline"
            >
              <MessageCircle size={16} />
              Discuss Your IT Needs
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
