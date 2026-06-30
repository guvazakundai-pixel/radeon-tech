import { motion } from "framer-motion";
import { Laptop, Monitor, Cpu, Zap, Mouse, Gamepad2, Briefcase, ExternalLink } from "lucide-react";

const products = [
  {
    icon: Laptop,
    name: "Laptops",
    desc: "New & refurbished laptops from HP, Dell, Lenovo, Acer, and more.",
  },
  {
    icon: Monitor,
    name: "Desktop Computers",
    desc: "Custom-built and branded desktops for home, office, and gaming.",
  },
  {
    icon: Cpu,
    name: "SSD Storage",
    desc: "High-speed SSDs to boost your system performance instantly.",
  },
  {
    icon: Zap,
    name: "RAM Upgrades",
    desc: "Memory upgrades for faster multitasking and smoother performance.",
  },
  {
    icon: Mouse,
    name: "Computer Accessories",
    desc: "Keyboards, mice, chargers, cables, and USB devices.",
  },
  {
    icon: Gamepad2,
    name: "Gaming PCs",
    desc: "Performance gaming rigs built to your specifications.",
  },
  {
    icon: Briefcase,
    name: "Business Computers",
    desc: "Reliable workstations for offices, schools, and enterprises.",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="products" className="bg-bg-dark py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            Featured <span className="text-red-accent">Products</span>
          </h2>
          <p className="mt-3 text-gray-text text-center max-w-xl mx-auto">
            Explore our range of quality computers, components, and accessories.
          </p>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {products.map((product) => (
            <div
              key={product.name}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:-translate-y-1 hover:border-red-accent/50 transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-red-accent/10 flex items-center justify-center mb-4 group-hover:bg-red-accent/20 transition-colors">
                <product.icon className="w-7 h-7 text-red-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-1">
                {product.name}
              </h3>
              <p className="text-gray-text text-sm leading-relaxed flex-1">
                {product.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-gold-accent text-xs font-semibold mb-2">
                  Price on request
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-red-accent hover:text-white transition-colors"
                >
                  View Details <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
