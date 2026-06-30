import { motion } from "framer-motion";
import { Monitor, Shield, Users, Award } from "lucide-react";

const highlights = [
  { icon: Monitor, text: "Hardware & Software Experts" },
  { icon: Shield, text: "Certified Technicians" },
  { icon: Users, text: "1000+ Satisfied Clients" },
  { icon: Award, text: "10+ Years of Service" },
];

export default function About() {
  return (
    <section id="about" className="bg-bg-dark py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            About{" "}
            <span className="text-red-accent">Radeon Tech Investments</span>
          </h2>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-text leading-relaxed text-base md:text-lg">
              Radeon Tech Investments is a trusted Zimbabwean computer repair,
              sales, and tech solutions company. With over a decade of hands-on
              experience, we specialise in diagnosing and repairing all major
              computer brands, supplying quality new and refurbished desktops
              and laptops, and providing professional software and hardware
              solutions. Whether you need a virus removed, a broken screen
              replaced, or a complete office IT setup, we deliver fast,
              reliable, and affordable service — backed by genuine parts and
              honest advice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item) => (
              <div
                key={item.text}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-red-accent/50 transition-colors"
              >
                <item.icon className="w-8 h-8 text-red-accent mx-auto mb-2" />
                <p className="text-white text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
