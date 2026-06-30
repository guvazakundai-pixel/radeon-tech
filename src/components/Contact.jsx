import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";

const servicesList = [
  "Computer Repairs", "Desktop & Laptop Sales", "Software Installation",
  "Computer Accessories", "Antivirus Solutions", "Data Recovery",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
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
            Ready to fix, upgrade, or buy? Reach out and we'll get back to you within hours.
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
                  <p className="text-gray-text">Shop C20 — [FULL ADDRESS PLACEHOLDER]</p>
                  <p className="text-gray-text text-xs mt-1 italic">
                    (Full street address needed — update when available)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-text">[PHONE NUMBER]</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">WhatsApp</p>
                  <p className="text-gray-text">[WHATSAPP NUMBER]</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-text">[EMAIL ADDRESS]</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Business Hours</p>
                  <p className="text-gray-text">[BUSINESS HOURS — e.g., Mon–Fri 8:00–17:00, Sat 8:00–13:00]</p>
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

            <div className="mt-6">
              <button
                type="button"
                disabled
                className="px-4 py-2 text-xs text-gray-text bg-white/5 border border-white/10 rounded-lg opacity-60 cursor-not-allowed"
              >
                Get Directions — [TODO: add Google Maps embed when address is confirmed]
              </button>
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
                  Thank you for reaching out. We'll respond within 24 hours.
                </p>
                <p className="text-gray-text text-xs mt-3">
                  (Note: This form is frontend-only. Connect a backend or email service to actually send messages.)
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
                    Name <span className="text-red-accent">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors ${
                      errors.name ? "border-red-accent" : "border-white/10"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-accent">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                    Email <span className="text-red-accent">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors ${
                      errors.email ? "border-red-accent" : "border-white/10"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-accent">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
                    Message <span className="text-red-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors resize-none ${
                      errors.message ? "border-red-accent" : "border-white/10"
                    }`}
                    placeholder="Tell us what you need..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-accent">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-accent hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  <Send size={16} />
                  Send Message
                </button>

                <p className="text-xs text-gray-text text-center">
                  * Required fields. This form is frontend-only — needs backend integration to send.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
