import { motion } from "framer-motion";
import { Shield, Users, Award, Clock, Wrench, CheckCircle, Headphones, Cpu } from "lucide-react";

const highlights = [
  { icon: Clock, text: "10+ Years Experience", value: "10+" },
  { icon: Shield, text: "Certified Technicians", value: "100%" },
  { icon: Users, text: "1,000+ Clients", value: "1K+" },
  { icon: Award, text: "Quality Guarantee", value: "100%" },
];

const values = [
  { icon: Cpu, title: "Technical Excellence", text: "Our engineers have over a decade of combined experience across every major platform and technology stack." },
  { icon: CheckCircle, title: "Uncompromising Integrity", text: "We only recommend what's needed. No unnecessary repairs, no hidden fees, no surprises. Ever." },
  { icon: Headphones, title: "Client Partnership", text: "Every engagement is built on transparency and respect. Your success drives everything we do." },
  { icon: Shield, title: "Quality Assurance", text: "We use genuine components, and every repair is certified and backed by our warranty." },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay },
});

export default function About() {
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
              Founded in Harare, Radeon Tech Investments has grown from a specialized repair workshop into one of Zimbabwe's most trusted ICT solution centres. We have served over 1,000 clients — individuals, businesses, schools, and NGOs — with a commitment to technical excellence and transparent service.
            </p>
            <p className="text-text-secondary leading-relaxed text-base">
              We identified a gap in the market: too many providers overcharged, under-delivered, or couldn't resolve complex engineering challenges. Radeon Tech was built on the conviction that premium technology services should be accessible, honest, and dependable. Today, we are the definitive destination for computer repairs, custom engineering, and enterprise IT solutions in Zimbabwe.
            </p>

            <div className="glass-card-static p-6">
              <h3 className="font-heading font-semibold text-text-white text-sm uppercase tracking-wider mb-2">Our Mission</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                To deliver accessible, reliable, and advanced ICT solutions that empower individuals and organisations to excel in a digital world. We achieve this through technical mastery, transparent pricing, and genuine care for every client.
              </p>
            </div>

            <div className="glass-card-static p-6">
              <h3 className="font-heading font-semibold text-text-white text-sm uppercase tracking-wider mb-2">Our Vision</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                To be Zimbabwe's most trusted technology partner — recognised for integrity, engineering excellence, and outstanding service. We envision a Zimbabwe where world-class technology support is available to everyone.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeIn(0.3)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => {
                const Icon = item.icon;
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
              {values.map((v) => {
                const Icon = v.icon;
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
