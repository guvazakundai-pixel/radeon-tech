import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const categories = [
  {
    label: "Repairs & Services",
    items: [
      { q: "How long does a typical computer repair take?", a: "Most repairs are completed within 24–48 hours. Complex issues like motherboard repairs or data recovery may take 3–5 business days. We always provide a clear timeline after diagnosis." },
      { q: "Do you repair all laptop brands?", a: "Yes, we repair all major brands including HP, Dell, Lenovo, ASUS, Acer, MSI, Apple, Toshiba, Samsung, Huawei, and more. Bring it in for a free assessment regardless of the brand." },
      { q: "Can you recover data from a dead hard drive?", a: "In many cases, yes. Our data recovery specialists can retrieve files from failed hard drives, SSDs, flash drives, and memory cards. Success depends on the extent of physical damage — we offer a free assessment." },
      { q: "Do you offer on-site or remote support?", a: "We primarily operate from our Cyrus Mall shop, but we can arrange on-site visits for business clients. Remote support is available for software issues — contact us to discuss your needs." },
      { q: "How do I know if my laptop needs servicing?", a: "Common signs include slow performance, overheating, unusual noises (clicking, grinding), battery draining quickly, frequent crashes, and unresponsive programs. If you notice any of these, bring it in for a free check." },
      { q: "What does liquid damage repair involve?", a: "Liquid damage repair includes cleaning corrosion off the motherboard, replacing damaged components, and testing all subsystems. The sooner you bring it in after a spill, the better the chances of recovery." },
      { q: "Can you upgrade my old laptop?", a: "Yes, depending on the model. Common upgrades include adding an SSD for faster performance, increasing RAM, and replacing the battery. We'll assess your laptop and advise on cost-effective upgrades." },
      { q: "Do you repair gaming PCs?", a: "Absolutely. We handle GPU repairs, cooling system maintenance, PSU replacements, custom water cooling, and full gaming PC builds. Bring your rig in for a diagnosis." },
      { q: "How often should I replace thermal paste?", a: "We recommend replacing thermal paste every 1–2 years, or sooner if you notice your CPU/GPU temperatures rising above normal levels during use." },
      { q: "Do you offer emergency repair services?", a: "Yes, we prioritise emergency repairs for critical business equipment. Contact us directly to discuss urgent cases and we'll do our best to accommodate you." },
    ],
  },
  {
    label: "Products & Sales",
    items: [
      { q: "Do you sell both new and refurbished computers?", a: "Yes. We stock brand-new laptops and desktops from authorised suppliers, as well as high-quality refurbished units that are fully tested, cleaned, and warrantied." },
      { q: "What warranty do you offer on products?", a: "Warranty varies by product. New products come with manufacturer warranty. Refurbished units carry our in-house warranty. We clearly explain warranty terms before any purchase." },
      { q: "Can you build a custom PC for me?", a: "Yes — gaming rigs, workstations for design/video editing, or budget-friendly office PCs. We spec the build to your budget and needs, and assemble and test everything in-house." },
      { q: "Do you sell computer accessories?", a: "Yes, we stock a full range: keyboards, mice, chargers, cables, USB hubs, webcams, monitors, external drives, and more. Visit our shop to see what's available." },
      { q: "What brands of laptops do you stock?", a: "We stock HP, Dell, Lenovo, ASUS, Acer, and Apple. Availability varies — contact us or visit the shop for current stock." },
      { q: "Do you offer business bulk purchases?", a: "Yes, we offer special pricing for businesses, schools, NGOs, and government departments. Bulk orders are fully configured and delivered with warranty support." },
    ],
  },
  {
    label: "Pricing & Warranty",
    items: [
      { q: "How much does a typical repair cost?", a: "Costs vary depending on the issue. We provide a free diagnosis and a clear quote before any work begins. You'll never be charged without your approval." },
      { q: "Do you charge for diagnostics?", a: "No — diagnosis is completely free. We assess the issue, explain what needs to be done, and provide a quote with no obligation." },
      { q: "What payment methods do you accept?", a: "We accept cash, EcoCash, bank transfers, and SWIFT for international payments. We're flexible — ask us what works best." },
      { q: "Is there a warranty on repair work?", a: "Yes, all repairs come with a service warranty. If the same issue recurs within the warranty period, we fix it at no extra cost." },
      { q: "Do you offer student discounts?", a: "Yes — we offer special pricing for students. Visit the shop with your student ID and we'll give you our best rate." },
      { q: "Why should I repair instead of replacing my device?", a: "Repairing is often much cheaper than replacing, it's better for the environment, and you get to keep your data, software, and settings intact. We'll always recommend the most cost-effective option." },
    ],
  },
  {
    label: "Technical Questions",
    items: [
      { q: "SSD vs HDD — which is better?", a: "SSDs are significantly faster, more durable, and silent — ideal for your operating system and frequently used programs. HDDs offer more storage at a lower cost, good for backups and media. Many people use both." },
      { q: "How much RAM do I need?", a: "8GB is the minimum for basic tasks. 16GB is recommended for most users (gaming, multitasking, office work). 32GB or more is ideal for video editing, 3D rendering, and heavy professional workloads." },
      { q: "Why is my laptop overheating?", a: "Common causes: dust buildup inside the laptop, a failed cooling fan, dried-out thermal paste, or poor ventilation (using it on soft surfaces). Bring it in for a cleaning and diagnosis." },
      { q: "How can I protect my computer from viruses?", a: "Use reputable antivirus software, keep your OS and applications updated, avoid clicking suspicious links, don't download from untrusted sources, and run regular scans. We can set all this up for you." },
      { q: "Why is my computer running slow?", a: "Common causes: too many startup programs, low storage space, malware or viruses, insufficient RAM, outdated hardware, or background processes. We can diagnose and fix the root cause." },
      { q: "How do I back up my data?", a: "The best approach is the 3-2-1 rule: 3 copies of your data, on 2 different types of media, with 1 copy off-site. We recommend external drives for local backups and cloud services for off-site." },
      { q: "What's the best laptop for a student?", a: "It depends on their course, but generally: lightweight (under 1.8 kg), good battery life (8+ hours), reliable brand (HP, Dell, Lenovo), and at least 8GB RAM. Visit us and we'll help you choose." },
      { q: "Can you help with Wi-Fi problems?", a: "Yes — we can help with router setup, signal issues, dead zones, network configuration, and troubleshooting slow or intermittent connections. We also sell networking equipment." },
    ],
  },
];

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
    <section id="faq" className="bg-navy/30 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            Frequently Asked <span className="text-red-accent">Questions</span>
          </h2>
          <p className="mt-3 text-gray-text text-center max-w-xl mx-auto">
            Quick answers to the most common questions we get at our shop.
          </p>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-text pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIdx(null); }}
            placeholder="Search questions..."
            aria-label="Search frequently asked questions"
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-red-accent/50 transition-colors"
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
              <h3 className="font-heading text-sm font-semibold text-red-accent uppercase tracking-wider mb-3">
                {cat.label}
              </h3>
              <div className="space-y-2">
                {cat.items.map((faq) => {
                  globalIndex += 1;
                  const idx = globalIndex;
                  const isOpen = openIdx === idx;
                  const btnId = `faq-btn-${idx}`;
                  const panelId = `faq-panel-${idx}`;

                  return (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                    >
                      <button
                        id={btnId}
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-white font-medium text-sm md:text-base hover:bg-white/5 transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-gold-accent" : "text-gray-text"
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={btnId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 text-gray-text text-sm leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
