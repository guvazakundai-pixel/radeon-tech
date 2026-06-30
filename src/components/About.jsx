import { motion } from "framer-motion";
import { Monitor, Shield, Users, Award } from "lucide-react";

const highlights = [
  { icon: Monitor, text: "10+ Years Experience" },
  { icon: Shield, text: "Certified Technicians" },
  { icon: Users, text: "1000+ Satisfied Clients" },
  { icon: Award, text: "Genuine Parts Guarantee" },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay },
});

export default function About() {
  return (
    <section id="about" className="bg-bg-dark py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div {...fadeIn(0)}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            About <span className="text-red-accent">Radeon Tech</span> Investments
          </h2>
          <p className="text-center text-gray-text mt-2 text-sm md:text-base">
            Your Stop ICT Solution Centre — Since 2015
          </p>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeIn(0.1)} className="space-y-6">
            <p className="text-gray-text leading-relaxed text-base md:text-lg">
              Founded in Harare, Radeon Tech Investments has grown from a small repair shop into one of the city's most trusted ICT solution centres. We've served over 1,000 individual customers, businesses, schools, and NGOs across Zimbabwe.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-1">Our Mission</h3>
              <p className="text-gray-text text-sm leading-relaxed">
                To provide accessible, reliable, and affordable ICT solutions that empower individuals and organisations to thrive in a digital world.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-1">Our Vision</h3>
              <p className="text-gray-text text-sm leading-relaxed">
                To be Zimbabwe's most trusted technology partner — known for integrity, expertise, and exceptional service.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-1">Our Values</h3>
              <p className="text-gray-text text-sm leading-relaxed">
                Integrity, Expertise, Speed, Transparency, Customer First
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeIn(0.3)} className="grid grid-cols-2 gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:border-red-accent/50 transition-colors"
                >
                  <Icon className="w-8 h-8 text-red-accent mx-auto mb-3" />
                  <p className="text-white text-sm font-medium">{item.text}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
