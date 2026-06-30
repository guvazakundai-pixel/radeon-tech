import { motion } from "framer-motion";
import { Check, Globe, ShieldCheck, Clock, DollarSign, Star, Wrench, Cpu, Monitor, Cctv } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Certified Technicians",
    desc: "Our team holds industry certifications and undergoes continuous training to stay ahead of the latest technology.",
  },
  {
    icon: Wrench,
    title: "Genuine Parts Only",
    desc: "We use only authentic, manufacturer-grade components — no cheap knockoffs that fail after a month.",
  },
  {
    icon: Globe,
    title: "Warranty on All Work",
    desc: "Every repair and product we sell comes with a clear warranty. If it's not right, we make it right.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    desc: "Most repairs completed within 24-48 hours. Emergency services available for critical equipment.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Free diagnosis, no-obligation quotes, no hidden fees. You approve all costs before we start work.",
  },
  {
    icon: Star,
    title: "100% Satisfaction",
    desc: "We don't rest until your device works perfectly. Our repeat customers and referrals speak for themselves.",
  },
];

const trustBadges = [
  { name: "Microsoft", icon: Monitor },
  { name: "Intel", icon: Cpu },
  { name: "AMD", icon: Cpu },
  { name: "NVIDIA", icon: Monitor },
  { name: "Windows 11", icon: Monitor },
  { name: "CCTV Certified", icon: Cctv },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">
            Why Choose <span className="text-royal-blue">Us</span>
          </h2>
          <p className="section-subtitle mt-3">
            We don't just fix computers — we build trust. Here's why Radeon Tech is Harare's preferred ICT partner.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-sm border border-border-light p-6 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-accent/10 flex items-center justify-center shrink-0">
                  <reason.icon className="w-5 h-5 text-blue-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text-primary text-base mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-bg-light-gray rounded-3xl p-8 md:p-10">
            <h3 className="font-heading text-xl font-bold text-text-primary text-center mb-8">
              Trusted by Customers, <span className="text-royal-blue">Backed by Leaders</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.name}
                  className="flex items-center gap-2.5 bg-white rounded-xl shadow-sm border border-border-light px-5 py-3.5 hover:border-blue-accent/30 hover:shadow-md transition-all duration-300"
                >
                  <badge.icon className="w-5 h-5 text-royal-blue" />
                  <span className="text-text-primary text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
