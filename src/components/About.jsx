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
    <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-bg-lavender">
      <div className="absolute top-[-100px] left-1/3 w-72 h-72 rounded-full bg-lavender/5 blur-[100px] animate-float-slow" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div {...fadeIn(0)} className="text-center">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-soft-purple tracking-wide">ABOUT</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            About <span className="text-gradient">Radeon Tech</span> Investments
          </h2>
          <p className="text-text-secondary mt-3 text-sm md:text-base">
            Your Stop ICT Solution Centre — Since 2015
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeIn(0.1)} className="space-y-6">
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              Founded in Harare, Radeon Tech Investments has grown from a small repair shop into one of the city's most trusted ICT solution centres. We've served over 1,000 individual customers, businesses, schools, and NGOs across Zimbabwe.
            </p>

            <div className="glass-card-static p-6">
              <h3 className="font-heading font-semibold text-text-primary text-sm uppercase tracking-wider mb-1">Our Mission</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                To provide accessible, reliable, and affordable ICT solutions that empower individuals and organisations to thrive in a digital world.
              </p>
            </div>

            <div className="glass-card-static p-6">
              <h3 className="font-heading font-semibold text-text-primary text-sm uppercase tracking-wider mb-1">Our Vision</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                To be Zimbabwe's most trusted technology partner — known for integrity, expertise, and exceptional service.
              </p>
            </div>

            <div className="glass-card-static p-6">
              <h3 className="font-heading font-semibold text-text-primary text-sm uppercase tracking-wider mb-1">Our Values</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
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
                  className="glass-card p-6 text-center"
                >
                  <Icon className="w-8 h-8 text-soft-purple mx-auto mb-3" />
                  <p className="text-text-primary text-sm font-medium">{item.text}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
