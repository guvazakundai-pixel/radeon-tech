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
    <section id="brands" className="bg-bg-light-gray py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">
            Brands We <span className="text-royal-blue">Service</span>
          </h2>
          <p className="section-subtitle mt-3">
            We service, repair, and support all major computer brands — from consumer laptops to enterprise workstations.
          </p>
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
              className="group bg-white rounded-2xl shadow-sm border border-border-light p-6 flex flex-col items-center justify-center min-h-[110px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default"
            >
              <span className="font-heading font-bold text-lg text-text-primary group-hover:text-royal-blue transition-colors">
                {brand}
              </span>
              <span className="mt-2 text-[10px] text-royal-blue/0 group-hover:text-royal-blue transition-all duration-300 text-center leading-tight font-medium">
                Serviced with Expertise
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
