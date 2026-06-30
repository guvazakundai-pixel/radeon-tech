import { motion } from "framer-motion";
import {
  Wrench,
  Laptop,
  Download,
  Mouse,
  ShieldCheck,
  HardDrive,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Computer Repairs",
    desc: "Expert diagnosis and repair for all major brands — HP, Dell, Lenovo, Acer, and more. Hardware fixes, screen replacements, motherboard repairs, and system troubleshooting.",
  },
  {
    icon: Laptop,
    title: "Desktop & Laptop Sales",
    desc: "Quality new and refurbished desktops and laptops from leading brands. Fully tested, warrantied, and configured to your needs.",
  },
  {
    icon: Download,
    title: "Software Installation",
    desc: "Professional installation of Windows, Microsoft Office, drivers, professional software, and system updates. Licensed and genuine software only.",
    list: ["Windows OS", "Microsoft Office", "Drivers & Updates", "Professional Software", "System Optimization"],
  },
  {
    icon: Mouse,
    title: "Computer Accessories",
    desc: "Quality peripherals and components to upgrade or complete your setup.",
    list: ["Mouse & Keyboards", "SSDs & RAM", "Chargers & Cables", "Monitors", "USB Devices"],
  },
  {
    icon: ShieldCheck,
    title: "Antivirus Solutions",
    desc: "Protect your devices with professional antivirus installation, malware removal, and ongoing security optimisation.",
    list: ["Virus Removal", "Malware Removal", "Internet Security", "Antivirus Installation", "System Optimization"],
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    desc: "Lost important files? We recover data from failed hard drives, SSDs, flash drives, and memory cards.",
    list: ["Deleted File Recovery", "Hard Drive Recovery", "SSD Recovery", "Flash Drive Recovery", "Memory Card Recovery"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="bg-navy py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            Our <span className="text-red-accent">Services</span>
          </h2>
          <p className="mt-3 text-gray-text text-center max-w-xl mx-auto">
            Comprehensive tech solutions — from repairs to sales, software to security.
          </p>
          <div className="w-20 h-1 bg-red-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:-translate-y-1 hover:border-red-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-red-accent/10 flex items-center justify-center mb-4 group-hover:bg-red-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-red-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-text text-sm leading-relaxed">{service.desc}</p>
              {service.list && (
                <ul className="mt-3 space-y-1">
                  {service.list.map((item) => (
                    <li key={item} className="text-gray-text text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-red-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
