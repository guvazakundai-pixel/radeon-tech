import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Tendai M.",
    location: "Harare",
    service: "Laptop Repair",
    text: "Radeon Tech saved my laptop after a nasty virus wiped everything. Fast turnaround, honest pricing, and they even recovered my files. Highly recommend!",
  },
  {
    name: "Chiedza N.",
    location: "Bulawayo",
    service: "Refurbished Laptop Purchase",
    text: "I bought a refurbished laptop from them and it's been running perfectly for over a year. Great quality and fantastic after-sales support.",
  },
  {
    name: "Takudzwa B.",
    location: "Mutare",
    service: "Office Network Setup",
    text: "Professional, reliable, and affordable. They set up our entire office network and supplied all the hardware. Couldn't ask for better service.",
  },
  {
    name: "Rudo C.",
    location: "Gweru",
    service: "Data Recovery",
    text: "Thought I'd lost all my thesis data when my hard drive crashed. Radeon Tech recovered everything. I'm forever grateful!",
  },
  {
    name: "Simba K.",
    location: "Harare",
    service: "Gaming PC Build",
    text: "They built my custom gaming rig from scratch. Every component was explained, the build is clean, and it performs like a beast.",
  },
  {
    name: "Nyasha D.",
    location: "Masvingo",
    service: "Screen Replacement",
    text: "Dropped my laptop and cracked the screen. Radeon Tech replaced it in under 24 hours at a very fair price. Excellent work.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-bg-dark py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center">
            What Our <span className="text-red-accent">Clients Say</span>
          </h2>
          <p className="mt-3 text-gray-text text-center max-w-xl mx-auto">
            Real feedback from our customers across Zimbabwe.
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
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-accent/50 hover:shadow-lg hover:shadow-red-accent/5 transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-red-accent fill-red-accent" />
                ))}
              </div>
              <p className="text-gray-text text-sm leading-relaxed mb-4 italic flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="pt-3 border-t border-white/10">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-text text-xs">{t.location}</p>
                <span className="inline-block mt-1.5 text-[10px] text-red-accent/80 bg-red-accent/10 px-2 py-0.5 rounded-full">
                  {t.service}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
