import { ChevronUp, MapPin, Phone, Mail, MessageCircle, Clock, ShoppingBag, Wrench, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";

export default function Footer() {
  const { data: contactInfo } = useContent("contactInfo");
  const { data: socialLinks } = useContent("socialLinks");
  const { data: footerServiceLinks } = useContent("footerServiceLinks");
  const info = contactInfo || {};
  const socials = socialLinks || {};
  const services = footerServiceLinks || [];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Shop", to: "/shop", icon: ShoppingBag },
    { label: "PC Builder", to: "/pc-builder", icon: Wrench },
    { label: "Book Repair", to: "/repair", icon: PhoneCall },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Custom Builds", href: "#builds" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 no-underline mb-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-heading font-bold text-white text-sm">RT</span>
              <span className="font-heading font-bold text-text-white text-lg">Radeon Tech</span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Your Trusted ICT Solution Centre — Zimbabwe&apos;s trusted computer repair, sales, and tech solutions company since 2015.
            </p>
            <div className="mt-4 flex gap-3">
              {Object.entries(socials).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className="w-9 h-9 rounded-xl bg-bg-surface flex items-center justify-center text-text-secondary hover:text-accent-blue hover:bg-accent-blue/10 transition-all no-underline"
                >
                  <MessageCircle size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline flex items-center gap-1.5">
                      {link.icon && <link.icon size={12} />}
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-white text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-white text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-accent-blue shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">{info.address1}, {info.address2}, {info.address3 || "Harare"}</span>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                  <Phone size={14} className="text-accent-blue shrink-0" />
                  {info.phone || "+263 77 306 6041"}
                </a>
              </li>
              <li>
                <a href={`mailto:${info.email}`} className="flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                  <Mail size={14} className="text-accent-blue shrink-0" />
                  {info.email}
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                  <MessageCircle size={14} className="text-accent-blue shrink-0" />
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-accent-blue shrink-0 mt-0.5" />
                <div className="text-text-secondary text-sm">
                  <p>Mon-Fri: 8AM-5PM</p>
                  <p>Sat: 9AM-1PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border-subtle py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            &copy; 2026 Radeon Tech Investments. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1 text-text-muted hover:text-accent-blue text-xs transition-colors no-underline"
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
