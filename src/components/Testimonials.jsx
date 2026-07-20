import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useContent } from "../hooks/useContent";

export default function Testimonials() {
  const { data: testimonials } = useContent("testimonials");
  const items = testimonials || [];

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden bg-bg-primary">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-blue tracking-wide">TESTIMONIALS</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="section-subtitle mt-3">
            Real feedback from real customers across Zimbabwe.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 flex flex-col relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-accent-blue/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, i) => (
                  <Star key={`empty-${i}`} size={16} className="text-text-muted" />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 italic flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="pt-3 border-t border-border-subtle">
                <p className="text-text-primary font-semibold text-sm">{t.name}</p>
                <p className="text-text-muted text-xs">{t.location}</p>
                <span className="inline-block mt-1.5 text-[10px] text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full font-medium">
                  {t.service}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
