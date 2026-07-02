import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, ChevronDown } from "lucide-react";

const categories = ["All", "Repairs", "Gaming PCs", "Workshop", "Networking", "Office"];

const gallery = [
  { src: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80", title: "Laptop Repair", category: "Repairs" },
  { src: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80", title: "Gaming PC Build", category: "Gaming PCs" },
  { src: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80", title: "Repair Bench", category: "Workshop" },
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", title: "Server Room", category: "Networking" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", title: "Modern Office Setup", category: "Office" },
  { src: "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=600&q=80", title: "Motherboard Repair", category: "Repairs" },
  { src: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=600&q=80", title: "Desktop Repair", category: "Repairs" },
  { src: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=600&q=80", title: "Custom Gaming Rig", category: "Gaming PCs" },
  { src: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&q=80", title: "Technician at Work", category: "Workshop" },
  { src: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80", title: "Networking Equipment", category: "Networking" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", title: "Team Collaboration", category: "Office" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", title: "Conference Setup", category: "Office" },
  { src: "https://images.unsplash.com/photo-1600476788122-09c3e5cd40ae?w=600&q=80", title: "PC Components", category: "Gaming PCs" },
  { src: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80", title: "Diagnostic Tools", category: "Workshop" },
  { src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&q=80", title: "IT Support Desk", category: "Networking" },
];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered = active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <section id="gallery" className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-metallic-blue/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-primary-red/5 blur-[80px] animate-float-slow" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-primary-red tracking-wide">GALLERY</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="section-subtitle mt-3">
            A glimpse into our workshop, builds, and technology world.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                active === cat
                  ? "glass-btn text-white"
                  : "glass text-text-secondary hover:text-primary-red"
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
