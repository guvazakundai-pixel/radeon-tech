import { motion } from "framer-motion";
import { Laptop, Monitor, Gamepad2, Briefcase, HardDrive, MemoryStick, Mouse, Printer, ExternalLink } from "lucide-react";

const products = [
  { icon: Laptop, name: "Laptops", desc: "New & refurbished laptops from HP, Dell, Lenovo, ASUS, Acer, Apple, and more. Fully tested and warrantied." },
  { icon: Monitor, name: "Desktops", desc: "Branded and custom-built desktops for home, office, school, and enterprise use." },
  { icon: Gamepad2, name: "Gaming PCs", desc: "High-performance gaming rigs built to your spec. RGB, liquid cooling, top-tier GPUs." },
  { icon: Briefcase, name: "Business Workstations", desc: "Reliable workstations for offices, schools, NGOs, and enterprises. Bulk orders welcome." },
  { icon: HardDrive, name: "SSDs", desc: "High-speed solid-state drives to boost boot times, load speeds, and overall system performance." },
  { icon: MemoryStick, name: "RAM", desc: "Memory upgrades from 4GB to 64GB. Faster multitasking, smoother performance." },
  { icon: Mouse, name: "Accessories", desc: "Keyboards, mice, chargers, cables, USB hubs, webcams, and all peripherals." },
  { icon: Printer, name: "Printers", desc: "Inkjet and laser printers for home and office. Sales, setup, and cartridge supply." },
];

export default function FeaturedProducts() {
  return (
    <section id="products" className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-lavender/5 blur-[100px] animate-pulse-glow" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-soft-purple tracking-wide">PRODUCTS</span>
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
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 flex flex-col group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <product.icon className="w-7 h-7 text-soft-purple" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
                {product.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {product.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-border-light">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-soft-purple bg-soft-purple/10 border border-soft-purple/20 rounded-full mb-3">
                  Price on Request
                </span>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-gradient-to-r from-soft-purple to-light-indigo hover:from-soft-purple/90 hover:to-light-indigo/90 rounded-xl px-4 py-2.5 transition-all duration-300 shadow-md shadow-soft-purple/20"
                >
                  View Details <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
