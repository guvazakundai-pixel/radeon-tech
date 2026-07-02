import { ChevronUp, MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

const WHATSAPP = "https://wa.me/263773066041";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Custom Builds", href: "#builds" },
  { label: "Repairs", href: "#process" },
  { label: "Business Solutions", href: "#business" },
  { label: "FAQ", href: "#faq" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Laptop Repairs", "Desktop Repairs", "MacBook Repairs", "Gaming PC Repairs",
  "Virus Removal", "Data Recovery", "Custom Builds", "Business IT Support",
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: WHATSAPP, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-light">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 no-underline mb-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-red to-deep-crimson flex items-center justify-center font-heading font-bold text-white text-sm">RT</span>
              <span className="font-heading font-bold text-text-primary text-lg">Radeon Tech</span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Your Stop ICT Solution Centre — Zimbabwe&apos;s trusted computer repair, sales, and tech solutions company since 2015.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${s.label} page`}
                  className="w-9 h-9 rounded-xl bg-bg-light flex items-center justify-center text-text-secondary hover:text-primary-red hover:bg-primary-red/10 transition-all no-underline"
                >
                  <MessageCircle size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-text-secondary hover:text-primary-red text-sm transition-colors no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-text-secondary hover:text-primary-red text-sm transition-colors no-underline">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary-red shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">Cyrus Mall Shop C20, Harare</span>
              </li>
              <li>
                <a href="tel:+263773066041" className="flex items-center gap-2 text-text-secondary hover:text-primary-red text-sm transition-colors no-underline">
                  <Phone size={14} className="text-primary-red shrink-0" />
                  +263 77 306 6041
                </a>
              </li>
              <li>
                <a href="mailto:mahunoobert85@gmail.com" className="flex items-center gap-2 text-text-secondary hover:text-primary-red text-sm transition-colors no-underline">
                  <Mail size={14} className="text-primary-red shrink-0" />
                  mahunoobert85@gmail.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-primary-red text-sm transition-colors no-underline">
                  <MessageCircle size={14} className="text-primary-red shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-primary-red shrink-0 mt-0.5" />
                <div className="text-text-secondary text-sm">
                  <p>Mon-Fri: 8AM-5PM</p>
                  <p>Sat: 9AM-1PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border-light py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            &copy; 2026 Radeon Tech Investments. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1 text-text-muted hover:text-primary-red text-xs transition-colors no-underline"
            aria-label="Scroll to top"
          >
            <ChevronUp size={14} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
