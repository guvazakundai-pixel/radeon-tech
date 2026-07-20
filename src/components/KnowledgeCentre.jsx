import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { getIcon } from "../utils/icons";

export default function KnowledgeCentre() {
  const [expanded, setExpanded] = useState(null);
  const { data: knowledgeArticles } = useContent("knowledgeArticles");
  const articles = knowledgeArticles || [];

  return (
    <section id="knowledge" className="relative py-20 md:py-28 overflow-hidden bg-bg-secondary">
      <div className="section-glow-top" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-purple tracking-wide">KNOWLEDGE</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Knowledge <span className="text-gradient">Centre</span>
          </h2>
          <p className="section-subtitle mt-3">
            Helpful tech tips, guides, and advice to keep your devices running smoothly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {articles.map((article, i) => {
            const isOpen = expanded === i;
            const Icon = getIcon(article.icon);

            return (
              <motion.div
                key={article.title}
                layout
                className={`glass-card-static overflow-hidden transition-all duration-300 ${
                  isOpen ? "shadow-md shadow-accent-purple/10 border-accent-purple/20" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="text-left w-full p-5 flex flex-col"
                  aria-expanded={isOpen}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-accent-purple" />
                  </div>
                  <h3 className="font-heading font-semibold text-base text-text-primary mb-1.5">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed flex-1">
                    {article.preview}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-accent-purple font-medium mt-3 transition-colors">
                    {isOpen ? "Show Less" : "Read More"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-text-secondary text-xs leading-relaxed border-t border-border-subtle pt-4">
                        {article.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
