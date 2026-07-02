import { motion } from "framer-motion";
import { MessageCircle, ClipboardCheck, Search, Wrench, CheckCircle, Laptop } from "lucide-react";

const WHATSAPP = "https://wa.me/263773066041";

const steps = [
  { num: 1, title: "Contact Us", desc: "Reach out via WhatsApp, phone, or visit our shop. Tell us about your issue.", icon: MessageCircle },
  { num: 2, title: "Free Consultation", desc: "We listen, ask the right questions, and advise on the best course of action.", icon: ClipboardCheck },
  { num: 3, title: "Diagnosis", desc: "Thorough assessment of your device using professional diagnostic tools.", icon: Search },
  { num: 4, title: "Repair", desc: "Expert repair using quality parts and precision tools by certified technicians.", icon: Wrench },
  { num: 5, title: "Testing", desc: "Every repair goes through rigorous testing to ensure it meets our quality standards.", icon: CheckCircle },
  { num: 6, title: "Collection", desc: "Pick up your fully repaired device or arrange delivery. Enjoy peace of mind.", icon: Laptop },
];

export default function Process() {
  return (
    <section id="process" className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-red/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-metallic-blue/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-primary-red tracking-wide">REPAIR PROCESS</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="section-subtitle mt-3">
            From contact to collection — a smooth, transparent repair experience.
          </p>
        </motion.div>

        <div className="hidden lg:block mt-16">
          <div className="relative">
            <div className="absolute top-16 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-primary-red/10 via-primary-red/30 to-primary-red/10" />
            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="relative flex flex-col items-center text-center group"
                  >
                    <div className="glass w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10 group-hover:shadow-lg group-hover:shadow-primary-red/20 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary-red" />
                    </div>
                    <span className="text-xs font-bold text-primary-red bg-primary-red/10 px-2.5 py-0.5 rounded-full mb-2">
                      Step {step.num}
                    </span>
                    <h3 className="font-heading font-bold text-text-primary text-sm mb-1">{step.title}</h3>
                    <p className="text-text-secondary text-xs leading-relaxed max-w-[140px]">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden md:grid lg:hidden mt-16 grid-cols-2 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-5 flex items-start gap-4"
              >
                <div className="glass w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-red" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary-red">Step {step.num}</span>
                  <h3 className="font-heading font-bold text-text-primary text-sm mt-0.5">{step.title}</h3>
                  <p className="text-text-secondary text-xs mt-1">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="md:hidden mt-12 space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card-static p-4 flex items-start gap-4"
              >
                <div className="glass w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary-red" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary-red bg-primary-red/10 px-2 py-0.5 rounded-full">Step {step.num}</span>
                  </div>
                  <h3 className="font-heading font-bold text-text-primary text-sm mt-0.5">{step.title}</h3>
                  <p className="text-text-secondary text-xs mt-0.5">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn inline-flex items-center gap-2 text-sm px-8 py-3.5 no-underline"
          >
            Start Your Repair
          </a>
        </motion.div>
      </div>
    </section>
  );
}
