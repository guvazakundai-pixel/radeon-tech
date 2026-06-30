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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedProducts() {
  return (
    <section id="products" className="bg-bg-light-blue py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">
            Browse Our <span className="text-royal-blue">Range</span>
          </h2>
          <p className="section-subtitle mt-3 text-center">
            Quality computers, components, and accessories — all backed by our service guarantee.
          </p>
          <div className="w-20 h-1 bg-royal-blue mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {products.map((product) => (
            <motion.div
              key={product.name}
              variants={cardVariants}
              className="group bg-white rounded-2xl shadow-sm border border-border-light p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-royal-blue/10 flex items-center justify-center mb-4 group-hover:bg-royal-blue/20 transition-colors">
                <product.icon className="w-7 h-7 text-royal-blue" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
                {product.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {product.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-border-light">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-royal-blue bg-royal-blue/10 border border-royal-blue/20 rounded-full mb-3">
                  Price on Request
                </span>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-royal-blue hover:text-white bg-royal-blue/5 hover:bg-royal-blue border border-royal-blue/20 hover:border-royal-blue rounded-lg px-4 py-2 transition-all duration-300"
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
