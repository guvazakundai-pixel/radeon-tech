import { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "lucide-react";
import { useContent } from "../hooks/useContent";

export default function Gallery() {
  const { data: categories } = useContent("galleryCategories");
  const { data: gallery } = useContent("gallery");
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const cats = categories || ["All"];
  const items = gallery || [];
  const filtered = active === "All" ? items : items.filter((g) => g.category === active);

  return (
    <section id="gallery" className="relative py-20 md:py-28 overflow-hidden">
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
            <span className="text-xs font-semibold text-accent-blue tracking-wide">GALLERY</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="section-subtitle mt-3">
            A glimpse into our workshop, builds, and technology world.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {cats.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                active === cat
                  ? "glass-btn text-white"
                  : "glass text-text-secondary hover:text-accent-blue"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={`${item.title}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`glass-card-static overflow-hidden transition-all duration-300 ${
                  isOpen ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left relative group"
                  aria-label={`View ${item.title}`}
                >
                  <div className={`overflow-hidden ${isOpen ? "" : "aspect-[4/3]"}`}>
                    <img
                      src={item.src}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        isOpen ? "max-h-[500px]" : ""
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <div className="flex items-center gap-2">
                      <Image size={14} className="text-white" />
                      <span className="text-white text-xs font-medium">{item.title}</span>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
