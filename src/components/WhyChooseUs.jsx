import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "Professional Technicians — certified and experienced",
  "Affordable Pricing — transparent quotes, no hidden fees",
  "Genuine Parts — only quality, original components",
  "Fast Repairs — most jobs completed within 48 hours",
  "Honest Service — we tell you what you need, not what you don't",
  "Customer Satisfaction — your device works right, or we make it right",
];

export default function WhyChooseUs() {
  return (
    <section className="bg-navy/50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            Why Choose <span className="text-red-accent">Us</span>
          </h2>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((reason) => (
            <div
              key={reason}
              className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-red-accent/30 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-red-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-red-accent" />
              </div>
              <p className="text-white text-sm leading-relaxed">{reason}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
