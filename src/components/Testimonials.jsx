import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Tendai M.",
    role: "Harare",
    text: "Radeon Tech saved my laptop after a nasty virus wiped everything. Fast turnaround, honest pricing, and they even recovered my files. Highly recommend!",
    rating: 5,
  },
  {
    name: "Chiedza N.",
    role: "Bulawayo",
    text: "I bought a refurbished laptop from them and it's been running perfectly for over a year. Great quality and fantastic after-sales support.",
    rating: 5,
  },
  {
    name: "Takudzwa B.",
    role: "Mutare",
    text: "Professional, reliable, and affordable. They set up our entire office network and supplied all the hardware. Couldn't ask for better service.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-dark py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            What Our <span className="text-red-accent">Clients Say</span>
          </h2>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-accent/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-red-accent fill-red-accent"
                  />
                ))}
              </div>
              <p className="text-gray-text text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="pt-3 border-t border-white/10">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-text text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
