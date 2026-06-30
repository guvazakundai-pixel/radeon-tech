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
    <section id="contact" className="bg-bg-dark py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            Get In <span className="text-red-accent">Touch</span>
          </h2>
          <p className="mt-3 text-gray-text text-center max-w-xl mx-auto">
            Ready to fix, upgrade, or buy? Reach out and we&apos;ll get back to you within hours.
          </p>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-xl font-bold text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-gray-text">Cyrus Mall Shop C20</p>
                  <p className="text-gray-text">Cnr Mbuya Nehanda &amp; Speke</p>
                  <p className="text-gray-text">Harare, Zimbabwe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:+263773066041" className="text-gray-text hover:text-white transition-colors no-underline">
                    +263 77 306 6041
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">WhatsApp</p>
                  <a
                    href="https://wa.me/263773066041"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-text hover:text-white transition-colors no-underline"
                  >
                    +263 77 306 6041
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:mahunoobert85@gmail.com" className="text-gray-text hover:text-white transition-colors no-underline">
                    mahunoobert85@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Business Hours</p>
                  <p className="text-gray-text">[BUSINESS HOURS]</p>
                  <p className="text-gray-text text-xs mt-1 italic">
                    Contact us to confirm current hours
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-heading font-semibold text-white text-sm mb-3">
                Our Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {servicesList.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs text-gray-text bg-white/5 border border-white/10 rounded-full"
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
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm no-underline"
              >
                <MessageCircle size={16} />
                Book a Repair
              </a>
              <a
                href="tel:+263773066041"
                className="inline-flex items-center gap-2 bg-red-accent hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm no-underline"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>

            <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
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
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-red-accent flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-text text-sm">
                  Thank you for reaching out. We&apos;ll respond within 24 hours.
                </p>
                <p className="text-gray-text text-xs mt-3">
                  (This is a frontend demo — connect a backend to send for real.)
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-red-accent hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-white mb-1.5">
                    Name <span className="text-red-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors ${
                      errors.name ? "border-red-accent" : "border-white/10"
                    }`}
                    placeholder="Your name"
                    aria-required="true"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-accent">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-white mb-1.5">
                    Email <span className="text-red-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors ${
                      errors.email ? "border-red-accent" : "border-white/10"
                    }`}
                    placeholder="your@email.com"
                    aria-required="true"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-accent">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-white mb-1.5">
                    Phone <span className="text-red-accent">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors ${
                      errors.phone ? "border-red-accent" : "border-white/10"
                    }`}
                    placeholder="+263 77 306 6041"
                    aria-required="true"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-accent">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-sm font-medium text-white mb-1.5">
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors appearance-none"
                  >
                    <option value="" className="bg-navy">Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-navy">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-white mb-1.5">
                    Message <span className="text-red-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors resize-none ${
                      errors.message ? "border-red-accent" : "border-white/10"
                    }`}
                    placeholder="Tell us what you need..."
                    aria-required="true"
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-accent">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-accent hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  <Send size={16} />
                  Send Message
                </button>

                <p className="text-xs text-gray-text text-center">
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
