import { ChevronUp, MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { WHATSAPP } from "../content/data";

export default function Footer() {
  const { data: contactInfo } = useContent("contactInfo");
  const { data: socialLinks } = useContent("socialLinks");
  const info = contactInfo || {};
  const socials = socialLinks || {};

  const quickLinks = [
    { label: "Repairs", to: "/repairs" },
    { label: "Services", to: "/services" },
    { label: "Store", to: "/store" },
    { label: "PC Builder", to: "/pc-builder" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 no-underline mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-heading font-bold text-white text-sm">
                RT
              </span>
              <span className="font-heading font-bold text-text-white text-lg tracking-tight">
                Radeon Tech
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Zimbabwe&apos;s trusted computer repair, sales, and technology solutions company since 2015.
            </p>
            <div className="mt-5 flex gap-2">
              {Object.entries(socials).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-text-muted hover:text-accent-blue hover:border-accent-blue/20 transition-all no-underline"
                >
                  <MessageCircle size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-white text-sm mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-white text-sm mb-5 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {["Laptop Repairs", "Desktop Repairs", "Data Recovery", "Custom Builds", "Business IT"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-white text-sm mb-5 tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-accent-blue shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm leading-relaxed">
                  {info.address1}, {info.address2}, {info.address3 || "Harare"}
                </span>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                  <Phone size={14} className="text-accent-blue shrink-0" />
                  {info.phone || "+263 77 306 6041"}
                </a>
              </li>
              <li>
                <a href={`mailto:${info.email}`} className="flex items-center gap-2.5 text-text-secondary hover:text-accent-blue text-sm transition-colors no-underline">
                  <Mail size={14} className="text-accent-blue shrink-0" />
                  {info.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
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

      <div className="border-t border-white/[0.03] py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            &copy; 2026 Radeon Tech Investments. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent-blue text-xs transition-colors cursor-pointer bg-transparent border-none"
          >
            <ChevronUp size={13} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
