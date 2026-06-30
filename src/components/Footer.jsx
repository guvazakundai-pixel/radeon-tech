import { Globe, ChevronUp } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Repairs", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "Twitter" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-navy/80 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 no-underline mb-3">
              <span className="w-8 h-8 rounded-lg bg-red-accent flex items-center justify-center font-heading font-bold text-white text-sm">RT</span>
              <span className="font-heading font-bold text-white text-lg">Radeon Tech</span>
            </a>
            <p className="text-gray-text text-sm leading-relaxed max-w-xs">
              Zimbabwe's trusted computer repair, sales, and tech solutions company. Quality service, genuine parts, honest advice.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-text hover:text-white text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Connect With Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-text hover:text-red-accent hover:border-red-accent/50 transition-all no-underline"
                >
                  <Globe size={18} />
                </a>
              ))}
            </div>
            <p className="mt-4 text-gray-text text-xs">
              Phone: [PHONE NUMBER]<br />
              Email: [EMAIL ADDRESS]
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-text text-xs">
            &copy; {new Date().getFullYear()} Radeon Tech Investments. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1 text-gray-text hover:text-white text-xs transition-colors no-underline"
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
