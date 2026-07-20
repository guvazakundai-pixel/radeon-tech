import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";

export default function Contact() {
  const { data: contactInfo } = useContent("contactInfo");
  const info = contactInfo || {};

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden bg-bg-primary">
      <div className="section-glow-top" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-blue tracking-wide">CONTACT</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle mt-3">
            Ready to fix, upgrade, or build? Reach out and let&apos;s get started.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-xl font-bold text-text-primary mb-6">
              Contact Information
            </h3>
            <div className="space-y-4 text-sm">
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Address</p>
                  <p className="text-text-secondary">{info.address1}</p>
                  <p className="text-text-secondary">{info.address2}</p>
                  <p className="text-text-secondary">{info.address3}</p>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Phone</p>
                  <a href={`tel:${info.phone?.replace(/\s/g, "")}`} className="text-text-secondary hover:text-accent-blue transition-colors no-underline">
                    {info.phone}
                  </a>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">WhatsApp</p>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-accent-blue transition-colors no-underline"
                  >
                    {info.whatsapp}
                  </a>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Email</p>
                  <a href={`mailto:${info.email}`} className="text-text-secondary hover:text-accent-blue transition-colors no-underline">
                    {info.email}
                  </a>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Business Hours</p>
                  <p className="text-text-secondary">{info.hours1}</p>
                  <p className="text-text-secondary">{info.hours2}</p>
                  <p className="text-text-muted text-xs mt-1 italic">Or contact us anytime on WhatsApp</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn inline-flex items-center justify-center gap-2 text-sm w-full px-5 py-3.5 no-underline"
              >
                <MessageCircle size={18} />
                Book a Repair on WhatsApp
              </a>
            </div>

            <div className="mt-6 glass-card-static overflow-hidden rounded-2xl">
              <iframe
                src={info.mapEmbed}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Radeon Tech Investments location"
                aria-label="Google Maps location of Radeon Tech Investments in Harare"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src={WHATSAPP}
              className="w-full h-[600px] glass-card-static rounded-2xl"
              title="WhatsApp Chat"
              style={{ border: 0 }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
