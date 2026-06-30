import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does a typical computer repair take?",
    a: "Most repairs are completed within 24–48 hours. Complex issues like motherboard repairs or data recovery may take 3–5 business days. We always provide a timeline during diagnosis.",
  },
  {
    q: "Do you offer a warranty on repairs and products?",
    a: "Yes. All repairs come with a service warranty, and all products sold (new or refurbished) include a warranty. Warranty periods vary by product — we explain clearly before you commit.",
  },
  {
    q: "What brands do you repair?",
    a: "We repair all major brands including HP, Dell, Lenovo, Acer, ASUS, Apple, Toshiba, and Samsung. If you're unsure, bring it in for a free assessment.",
  },
  {
    q: "Do you sell both new and refurbished computers?",
    a: "Yes. We stock brand-new laptops and desktops from authorised suppliers, as well as high-quality refurbished units that are fully tested, cleaned, and warrantied.",
  },
  {
    q: "Can you recover data from a dead hard drive?",
    a: "In most cases, yes. Our data recovery specialists can retrieve files from failed hard drives, SSDs, flash drives, and memory cards. Success depends on the extent of physical damage.",
  },
  {
    q: "Do you offer on-site or remote support?",
    a: "We primarily operate from our shop, but we can arrange on-site visits for business clients. Remote support is available for software issues — contact us to discuss your needs.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

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
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 space-y-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            const btnId = `faq-btn-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  id={btnId}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
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
        </motion.div>
      </div>
    </section>
  );
}
