import { motion } from "framer-motion";
import { Search, FileText, Wrench, CheckCircle, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: 1,
    title: "Diagnosis",
    desc: "We thoroughly diagnose your device using professional tools and identify every issue — hardware, software, or both.",
  },
  {
    icon: FileText,
    step: 2,
    title: "Quote",
    desc: "You receive a clear, itemised quote with no hidden fees. Approve only what you want, and we proceed.",
  },
  {
    icon: Wrench,
    step: 3,
    title: "Repair",
    desc: "Our certified technicians perform the repair using genuine parts and industry-best practices.",
  },
  {
    icon: CheckCircle,
    step: 4,
    title: "Testing",
    desc: "Every repaired device undergoes rigorous testing — stress tests, benchmarks, and full functionality checks.",
  },
  {
    icon: Truck,
    step: 5,
    title: "Delivery",
    desc: "Pick up your device or request delivery. You receive a service report, warranty card, and care tips.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Process() {
  return (
    <section id="process" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">
            Our Repair <span className="text-royal-blue">Process</span>
          </h2>
          <p className="section-subtitle mt-3">
            From drop-off to pick-up — five simple steps to get your device working like new.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-border-light" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-5 gap-8 lg:gap-4 relative"
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={stepVariants}
                className="relative flex lg:flex-col items-center lg:text-center gap-4 lg:gap-3"
              >
                {/* Mobile connecting line */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute left-7 top-14 bottom-0 w-0.5 bg-border-light -z-0" />
                )}

                <div className="relative shrink-0 z-10">
                  <div className="w-14 h-14 rounded-full bg-royal-blue flex items-center justify-center shadow-md shadow-royal-blue/20">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-royal-blue text-xs font-bold flex items-center justify-center shadow-sm border border-border-light">
                    {s.step}
                  </span>
                </div>
                <div className="lg:text-center">
                  <h3 className="font-heading font-semibold text-text-primary text-lg">{s.title}</h3>
                  <p className="text-text-secondary text-sm mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="tel:+263773066041"
            className="inline-flex items-center gap-2 bg-royal-blue hover:bg-royal-blue/90 text-white font-heading font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <Wrench className="w-5 h-5" />
            Book a Repair Now
          </a>
          <p className="mt-3 text-text-secondary text-sm">
            Call us at <a href="tel:+263773066041" className="text-royal-blue hover:underline">+263 77 306 6041</a> or visit Cyrus Mall Shop C20
          </p>
        </motion.div>
      </div>
    </section>
  );
}
