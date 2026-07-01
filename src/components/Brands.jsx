import { motion } from "framer-motion";

const brands = [
  "HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "Apple",
  "Toshiba", "Samsung", "Microsoft", "Huawei", "Gigabyte", "Alienware", "Fujitsu",
];

export default function Brands() {
  return (
    <section id="brands" className="relative py-20 md:py-28 overflow-hidden bg-bg-lavender">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-soft-purple tracking-wide">BRANDS</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Brands We <span className="text-gradient">Service</span>
          </h2>
          <p className="section-subtitle mt-3">
            We service, repair, and support all major computer brands — from consumer laptops to enterprise workstations.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4"
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card p-6 flex flex-col items-center justify-center min-h-[110px] cursor-default"
            >
              <span className="font-heading font-bold text-lg text-text-primary group-hover:text-soft-purple transition-colors">
                {brand}
              </span>
              <span className="mt-2 text-[10px] text-soft-purple/0 group-hover:text-soft-purple transition-all duration-300 text-center leading-tight font-medium">
                Serviced with Expertise
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
