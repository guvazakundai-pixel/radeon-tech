import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, Monitor, ShoppingCart, Building2, ArrowRight } from "lucide-react";

const panels = [
  {
    icon: Wrench,
    title: "Computer Repairs",
    description: "Expert diagnostics and precision repairs for laptops, desktops, and MacBooks. Fast turnaround, honest pricing.",
    link: "/repairs",
    linkText: "Explore Repairs",
  },
  {
    icon: Monitor,
    title: "Technology Services",
    description: "Enterprise IT support, networking, data recovery, virus removal, and professional system deployment.",
    link: "/services",
    linkText: "Explore Services",
  },
  {
    icon: ShoppingCart,
    title: "Tech Store",
    description: "New and refurbished laptops, desktops, components, and accessories. All products tested and warrantied.",
    link: "/store",
    linkText: "Explore Store",
  },
  {
    icon: Building2,
    title: "About Radeon",
    description: "Zimbabwe's trusted ICT solution centre since 2015. Our story, our team, and how to reach us.",
    link: "/about",
    linkText: "Learn More",
  },
];

const fadeIn = (delay) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ServicePanels() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div {...fadeIn(0)} className="mb-20">
          <p className="text-xs tracking-[0.2em] uppercase text-text-muted mb-4">
            What we do
          </p>
          <h2 className="section-title">
            Choose your <span className="text-gradient">path</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-4">
          {panels.map((panel, i) => {
            const Icon = panel.icon;
            return (
              <motion.div key={panel.title} {...fadeIn(0.08 + i * 0.06)}>
                <Link to={panel.link} className="no-underline block h-full">
                  <div className="service-panel h-full flex flex-col">
                    <div className="panel-icon">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-text-white mb-2 tracking-tight">
                      {panel.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">
                      {panel.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-accent-blue text-sm font-medium">
                      {panel.linkText}
                      <span className="panel-arrow">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}