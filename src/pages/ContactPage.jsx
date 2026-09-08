import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ContactPage() {
  const { data: contactInfo } = useContent("contactInfo");
  const info = contactInfo || {};

  const contactMethods = [
    { icon: MapPin, label: "Visit Us", value: `${info.address1}, ${info.address2}`, sub: info.address3 || "Harare, Zimbabwe" },
    { icon: Phone, label: "Call Us", value: info.phone || "+263 77 306 6041", href: `tel:${(info.phone || "+263773066041").replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: info.whatsapp || "+263 77 306 6041", href: WHATSAPP },
    { icon: Mail, label: "Email", value: info.email || "mahunoobert85@gmail.com", href: `mailto:${info.email || "mahunoobert85@gmail.com"}` },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeIn(0)}>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Send size={13} className="text-accent-blue" />
              <span className="text-xs font-semibold text-accent-blue tracking-wide">CONTACT</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-text-white leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Ready to fix, upgrade, or build? Reach out and let&apos;s get started.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              const Wrapper = method.href ? "a" : "div";
              const wrapperProps = method.href
                ? { href: method.href, target: method.href.startsWith("http") ? "_blank" : undefined, rel: method.href.startsWith("http") ? "noopener noreferrer" : undefined, className: "no-underline block" }
                : {};
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Wrapper {...wrapperProps}>
                    <div className="glass-card p-5 h-full">
                      <div className="w-10 h-10 rounded-lg bg-accent-blue/[0.06] flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h4 className="font-heading font-semibold text-text-white text-sm mb-1">{method.label}</h4>
                      <p className="text-text-secondary text-sm">{method.value}</p>
                      {method.sub && <p className="text-text-muted text-xs mt-0.5">{method.sub}</p>}
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div {...fadeIn(0.1)}>
              <div className="glass-card-static p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/[0.06] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent-blue" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-white text-base">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                    <span className="text-text-secondary text-sm">Monday - Friday</span>
                    <span className="text-text-white text-sm font-medium">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                    <span className="text-text-secondary text-sm">Saturday</span>
                    <span className="text-text-white text-sm font-medium">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-secondary text-sm">Sunday</span>
                    <span className="text-text-muted text-sm">Closed</span>
                  </div>
                </div>
                <p className="text-text-muted text-xs mt-4 italic">Or contact us anytime on WhatsApp</p>
              </div>
            </motion.div>

            <motion.div {...fadeIn(0.2)}>
              <div className="glass-card-static overflow-hidden h-full min-h-[300px]">
                <iframe
                  src={info.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Radeon Tech Investments location"
                  aria-label="Google Maps location of Radeon Tech Investments in Harare"
                />
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeIn(0.3)} className="mt-12 text-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn inline-flex items-center gap-2 text-sm px-8 py-3.5 no-underline"
            >
              <MessageCircle size={16} />
              Start a Conversation on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
