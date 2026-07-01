import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";

const servicesList = [
  "Computer Repairs", "Desktop & Laptop Sales", "Software Installation",
  "Computer Accessories", "Antivirus Solutions", "Data Recovery",
  "Gaming PC Builds", "Network Setup", "Screen Replacements",
];

const serviceOptions = [
  "Computer Repair", "Laptop/Desktop Purchase", "Software Installation",
  "Data Recovery", "Gaming PC Build", "Accessories Inquiry",
  "Business Bulk Order", "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^(\+263|0)[0-9\s\-]{8,12}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid Zimbabwe phone number (e.g., +263 77 306 6041)";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden bg-bg-lilac">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-soft-purple/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-lavender/5 blur-[80px] animate-float-slow" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-soft-purple tracking-wide">CONTACT</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle mt-3">
            Ready to fix, upgrade, or buy? Reach out and we&apos;ll get back to you within hours.
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-soft-purple" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Address</p>
                  <p className="text-text-secondary">Cyrus Mall Shop C20</p>
                  <p className="text-text-secondary">Cnr Mbuya Nehanda &amp; Speke</p>
                  <p className="text-text-secondary">Harare, Zimbabwe</p>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-soft-purple" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Phone</p>
                  <a href="tel:+263773066041" className="text-text-secondary hover:text-soft-purple transition-colors no-underline">
                    +263 77 306 6041
                  </a>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-soft-purple" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">WhatsApp</p>
                  <a
                    href="https://wa.me/263773066041"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-soft-purple transition-colors no-underline"
                  >
                    +263 77 306 6041
                  </a>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-soft-purple" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Email</p>
                  <a href="mailto:mahunoobert85@gmail.com" className="text-text-secondary hover:text-soft-purple transition-colors no-underline">
                    mahunoobert85@gmail.com
                  </a>
                </div>
              </div>
              <div className="glass-card-static p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-soft-purple" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Business Hours</p>
                  <p className="text-text-secondary">[BUSINESS HOURS]</p>
                  <p className="text-text-muted text-xs mt-1 italic">
                    Contact us to confirm current hours
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-heading font-semibold text-text-primary text-sm mb-3">
                Our Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {servicesList.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs text-text-secondary glass rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/263773066041"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn inline-flex items-center gap-2 text-sm px-5 py-2.5 no-underline"
              >
                <MessageCircle size={16} />
                Book a Repair
              </a>
              <a
                href="tel:+263773066041"
                className="glass-btn-outline inline-flex items-center gap-2 text-sm px-5 py-2.5 no-underline"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>

            <div className="mt-8 glass-card-static overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.5!2d31.0333!3d-17.825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHarare!5e0!3m2!1sen!2szw!4v1"
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
            {submitted ? (
              <div className="glass-card-static p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-soft-purple to-light-indigo flex items-center justify-center mx-auto mb-4 shadow-lg shadow-soft-purple/20">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-secondary text-sm">
                  Thank you for reaching out. We&apos;ll respond within 24 hours.
                </p>
                <p className="text-text-muted text-xs mt-3">
                  (This is a frontend demo — connect a backend to send for real.)
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-soft-purple hover:text-light-indigo transition-colors font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="glass-card-static p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-text-primary mb-1.5">
                    Name <span className="text-soft-purple">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/60 border rounded-xl text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-soft-purple/30 transition-all ${
                      errors.name ? "border-red-accent" : "border-border-light"
                    }`}
                    placeholder="Your name"
                    aria-required="true"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-accent">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-text-primary mb-1.5">
                    Email <span className="text-soft-purple">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/60 border rounded-xl text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-soft-purple/30 transition-all ${
                      errors.email ? "border-red-accent" : "border-border-light"
                    }`}
                    placeholder="your@email.com"
                    aria-required="true"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-accent">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-text-primary mb-1.5">
                    Phone <span className="text-soft-purple">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/60 border rounded-xl text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-soft-purple/30 transition-all ${
                      errors.phone ? "border-red-accent" : "border-border-light"
                    }`}
                    placeholder="+263 77 306 6041"
                    aria-required="true"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-accent">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-sm font-medium text-text-primary mb-1.5">
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-border-light rounded-xl text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-soft-purple/30 transition-all appearance-none"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-text-primary mb-1.5">
                    Message <span className="text-soft-purple">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/60 border rounded-xl text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-soft-purple/30 transition-all resize-none ${
                      errors.message ? "border-red-accent" : "border-border-light"
                    }`}
                    placeholder="Tell us what you need..."
                    aria-required="true"
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-accent">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full glass-btn inline-flex items-center justify-center gap-2 text-sm px-6 py-3"
                >
                  <Send size={16} />
                  Send Message
                </button>

                <p className="text-xs text-text-muted text-center">
                  * Required fields. Messages are demo-only — connect a backend to send.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
