import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle } from "lucide-react";

const WHATSAPP = "https://wa.me/263773066041";

const categories = [
  {
    label: "Repairs & Services",
    items: [
      { q: "How long does a typical repair take?", a: "Most repairs are completed within 24-48 hours. Complex issues like motherboard repairs or data recovery may take 3-5 business days. We always provide a clear timeline after diagnosis." },
      { q: "Do you repair MacBooks?", a: "Yes, we repair all MacBook models including MacBook Air, MacBook Pro 13-inch and 16-inch. We handle screen replacement, logic board repair, battery issues, keyboard replacement, and charging port repairs." },
      { q: "Do you repair gaming laptops?", a: "Absolutely. We repair all gaming laptop brands including ASUS ROG, MSI, Alienware, Acer Predator, Lenovo Legion, and HP Omen. GPU repair, cooling system service, and performance optimization included." },
      { q: "Do you offer warranties on repairs?", a: "Yes, all repairs come with a service warranty. If the same issue recurs within the warranty period, we fix it at no extra cost. Warranty length varies by the type of repair." },
      { q: "Can I get a quotation first?", a: "Yes — we provide free, no-obligation quotations. You'll receive a detailed quote before any work begins and we never proceed without your approval." },
      { q: "Do you repair liquid damage?", a: "Yes, we specialize in liquid damage recovery. The sooner you bring your device in after a spill, the better our chances of saving it. We disassemble, clean, and treat all affected components." },
      { q: "Can you recover deleted files?", a: "In most cases, yes. We use professional data recovery tools to retrieve deleted files from hard drives, SSDs, flash drives, and memory cards. Success depends on whether the data has been overwritten." },
      { q: "Can I book through WhatsApp?", a: "Yes! Simply send us a message on WhatsApp at +263 77 306 6041 and we'll help you schedule a repair, get a quote, or answer any questions." },
      { q: "Do you repair business computers?", a: "Yes, we provide IT support for businesses including bulk repairs, computer deployment, networking, and annual maintenance contracts." },
      { q: "Do you use genuine parts?", a: "We use genuine or high-quality compatible parts sourced from trusted suppliers. We clearly explain the options and let you choose what works best for your budget." },
      { q: "How do I know if my laptop needs servicing?", a: "Common signs: slow performance, overheating, unusual noises (clicking/grinding), battery draining quickly, frequent crashes, and unresponsive programs. Bring it in for a free check." },
      { q: "Can you upgrade my old laptop?", a: "Yes, depending on the model. Common upgrades include SSD installation, RAM upgrades, and battery replacement. We'll assess your laptop and advise on cost-effective improvements." },
    ],
  },
  {
    label: "Custom Builds & Products",
    items: [
      { q: "Can you build a custom PC for me?", a: "Yes — gaming rigs, workstations for design/video editing, streaming PCs, or budget-friendly office PCs. We spec the build to your budget, assemble professionally, and test everything in-house." },
      { q: "Do you sell both new and refurbished computers?", a: "Yes. We stock brand-new laptops and desktops from authorised suppliers and professionally refurbished units that are fully tested, cleaned, and warrantied." },
      { q: "What warranty comes with a custom build?", a: "All components carry their manufacturer warranty, and the build itself is covered by our workmanship warranty. We clearly explain all warranty terms before purchase." },
      { q: "What brands of laptops do you stock?", a: "We stock HP, Dell, Lenovo, ASUS, Acer, Apple, and more. Availability varies — contact us or visit the shop for current stock." },
    ],
  },
  {
    label: "Pricing & Payments",
    items: [
      { q: "How much does a typical repair cost?", a: "Costs vary depending on the issue. We provide a free diagnosis and a clear quote before any work begins. You'll never be charged without your approval." },
      { q: "Do you charge for diagnostics?", a: "No — diagnosis is completely free. We assess the issue, explain what needs to be done, and provide a quote with no obligation." },
      { q: "What payment methods do you accept?", a: "We accept cash, EcoCash, bank transfers, and SWIFT for international payments. We're flexible — ask us what works best." },
      { q: "Do you offer student discounts?", a: "Yes — we offer special pricing for students. Visit the shop with your student ID and we'll give you our best rate." },
      { q: "Do you offer business bulk pricing?", a: "Yes, we offer competitive pricing for businesses, schools, NGOs, and government departments. Bulk orders are fully configured and delivered with warranty support." },
    ],
  },
  {
    label: "Technical Advice",
    items: [
      { q: "SSD vs HDD — which is better?", a: "SSDs are significantly faster, more durable, and silent — ideal for your operating system and programs. HDDs offer more storage at a lower cost, good for backups. Many people use both." },
      { q: "How much RAM do I need?", a: "8GB is the minimum. 16GB is recommended for most users. 32GB or more is ideal for video editing, 3D rendering, and heavy workloads." },
      { q: "Why is my laptop overheating?", a: "Common causes: dust buildup, failed cooling fan, dried-out thermal paste, or poor ventilation. We offer thorough cleaning and thermal service." },
      { q: "How can I protect my computer from viruses?", a: "Use reputable antivirus software, keep your OS updated, avoid suspicious links, don't download from untrusted sources, and run regular scans. We can set this up for you." },
      { q: "Why is my computer running slow?", a: "Too many startup programs, low storage space, malware, insufficient RAM, or outdated hardware. We can diagnose and fix the root cause." },
      { q: "How do I back up my data?", a: "Follow the 3-2-1 rule: 3 copies of data on 2 different media types, with 1 copy off-site. We recommend external drives and cloud services." },
      { q: "What's the best laptop for a student?", a: "Lightweight (under 1.8 kg), good battery life (8+ hours), reliable brand, and at least 8GB RAM. Visit us and we'll help you choose." },
      { q: "Can you help with Wi-Fi problems?", a: "Yes — router setup, signal issues, network configuration, troubleshooting slow connections. We also sell networking equipment." },
    ],
  },
];

function RippleButton({ children, onClick, className }) {
  const btnRef = useRef(null);
  const handleClick = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add("ripple-effect");
    ripple.addEventListener("animationend", () => ripple.remove());
    btn.appendChild(ripple);
  }, []);
  return (
    <button ref={btnRef} type="button" className={`ripple-btn ${className}`} onClick={(e) => { handleClick(e); onClick?.(e); }}>
      {children}
    </button>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const [search, setSearch] = useState("");

  const flatItems = useMemo(() => {
    const all = [];
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        all.push({ ...item, category: cat.label });
      });
    });
    return all;
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return flatItems.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [search, flatItems]);

  const displayCategories = filtered
    ? [{ label: "Search Results", items: filtered }]
    : categories;

  let globalIndex = -1;

  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden bg-bg-lavender">
      <div className="absolute top-[-100px] right-1/4 w-80 h-80 rounded-full bg-primary-red/5 blur-[100px] animate-float-slow" />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-primary-red tracking-wide">FAQ</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="section-subtitle mt-3">
            Quick answers to the most common questions we get.
          </p>
        </motion.div>

        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIdx(null); }}
            placeholder="Search questions..."
            aria-label="Search frequently asked questions"
            className="w-full pl-11 pr-4 py-3 glass-card-static text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-red/30 transition-all rounded-2xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-8"
        >
          {displayCategories.map((cat) => (
            <div key={cat.label}>
              <h3 className="font-heading text-sm font-semibold text-primary-red uppercase tracking-wider mb-3">
                {cat.label}
              </h3>
              <div className="space-y-2">
                {cat.items.map((faq) => {
                  globalIndex += 1;
                  const idx = globalIndex;
                  const isOpen = openIdx === idx;

                  return (
                    <motion.div
                      key={idx}
                      layout
                      className={`glass-card-static overflow-hidden transition-all duration-300 ${
                        isOpen ? "shadow-md shadow-primary-red/10 border-primary-red/20" : ""
                      }`}
                    >
                      <RippleButton
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-text-primary font-medium text-sm md:text-base hover:bg-primary-red/5 transition-colors rounded-2xl"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-primary-red" : "text-text-muted"
                          }`}
                        />
                      </RippleButton>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 text-text-secondary text-sm leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-text-secondary text-sm mb-4">Still have questions? We&apos;re here to help.</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn inline-flex items-center gap-2 text-sm px-6 py-3 no-underline"
          >
            <MessageCircle size={16} />
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
