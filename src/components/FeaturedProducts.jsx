import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { getIcon } from "../utils/icons";

export default function FeaturedProducts() {
  const { data: featuredProducts } = useContent("featuredProducts");
  const items = featuredProducts || [];

  return (
    <section id="products" className="relative py-20 md:py-28 overflow-hidden">
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
            <span className="text-xs font-semibold text-accent-purple tracking-wide">PRODUCTS</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Browse Our <span className="text-gradient">Range</span>
          </h2>
          <p className="section-subtitle mt-3">
            Quality computers, components, and accessories — all backed by our service guarantee.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {items.map((product, i) => {
            const Icon = getIcon(product.icon);
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card overflow-hidden flex flex-col group"
              >
                {product.img ? (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-44 flex items-center justify-center bg-gradient-to-br from-accent-purple/5 to-accent-blue/5">
                    <Icon className="w-14 h-14 text-accent-purple/30" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
                    {product.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    {product.desc}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border-subtle">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-accent-purple bg-accent-purple/10 border border-accent-purple/20 rounded-full mb-3">
                      Price on Request
                    </span>
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-gradient-to-r from-accent-purple to-accent-blue hover:from-accent-purple/90 hover:to-accent-blue/90 rounded-xl px-4 py-2.5 transition-all duration-300 shadow-md shadow-accent-purple/20"
                    >
                      View Details <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
