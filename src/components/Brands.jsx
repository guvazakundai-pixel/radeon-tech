import { motion } from "framer-motion";

const brands = [
  "HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "Apple",
  "Toshiba", "Samsung", "Microsoft", "Huawei", "Gigabyte", "Alienware", "Fujitsu",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Brands() {
  return (
    <section id="brands" className="bg-navy py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            Brands We <span className="text-red-accent">Service</span>
          </h2>
          <p className="mt-3 text-gray-text text-center max-w-2xl mx-auto">
            We service, repair, and support all major computer brands — from consumer laptops to enterprise workstations.
          </p>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand}
              variants={cardVariants}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center min-h-[110px] hover:-translate-y-1 hover:border-red-accent/50 transition-all duration-300 cursor-default overflow-hidden"
            >
              <span className="font-heading font-bold text-lg text-white/90 group-hover:text-white transition-colors">
                {brand}
              </span>
              <span className="mt-2 text-[10px] text-gold-accent/0 group-hover:text-gold-accent transition-all duration-300 text-center leading-tight">
                Serviced with Expertise
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-red-accent/0 to-red-accent/0 group-hover:from-red-accent/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
