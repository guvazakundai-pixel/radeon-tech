import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Thermometer, Battery, HardDrive, Zap, AlertTriangle,
  Shield, ClipboardCheck, Database, Wifi, Monitor, Search,
  Droplets, ChevronDown, Lightbulb,
} from "lucide-react";

const articles = [
  {
    icon: Thermometer,
    title: "Signs Your Laptop Needs Servicing",
    preview: "Slow performance, overheating, unusual noises, and battery issues are tell-tale signs your laptop needs professional attention.",
    content: "If your laptop is running slower than usual, getting uncomfortably hot, making clicking or grinding noises, or the battery drains within an hour, it's time for a check-up. Other signs include frequent crashes, unresponsive programs, and a loud fan running constantly. Bring your device to Radeon Tech for a free diagnosis and we'll get it back to peak condition.",
  },
  {
    icon: Battery,
    title: "How to Extend Laptop Battery Life",
    preview: "Simple charging habits and power settings can dramatically improve your battery lifespan.",
    content: "To extend your laptop battery life: avoid charging to 100% all the time (80% is ideal), don't let it drain to 0% regularly, use battery saver mode when unplugged, reduce screen brightness, close unused apps, and keep your laptop cool. Heat is the biggest enemy of battery health. If your battery no longer holds a charge, visit us for a replacement.",
  },
  {
    icon: HardDrive,
    title: "SSD vs HDD: Which One Do You Need?",
    preview: "Speed versus storage capacity — here's how to choose the right drive for your needs.",
    content: "SSDs (Solid State Drives) are significantly faster than HDDs (Hard Disk Drives). They boot Windows in seconds, load games and apps instantly, and have no moving parts so they're more durable. HDDs are cheaper per gigabyte and offer more storage — ideal for backups and media libraries. Our recommendation: use an SSD for your operating system and programs, and an HDD for file storage. We sell both and can install them for you.",
  },
  {
    icon: Zap,
    title: "Why Your Laptop Is Overheating",
    preview: "Common causes of overheating and how to fix them before permanent damage occurs.",
    content: "Overheating is usually caused by: dust buildup inside the laptop blocking airflow, a failed or clogged cooling fan, dried-out thermal paste between the CPU/GPU and heatsink, or using the laptop on soft surfaces like beds and couches. Solutions include internal cleaning, fan replacement, thermal paste reapplication, and using a laptop cooling pad. Bring your laptop to us for a thorough clean and thermal service.",
  },
  {
    icon: AlertTriangle,
    title: "Common Windows Errors and Fixes",
    preview: "Blue screens, update failures, and driver issues — what they mean and how to resolve them.",
    content: "Common Windows errors include: Blue Screen of Death (BSOD) — often caused by driver or hardware issues; 'Update failed' — usually due to corrupted system files or insufficient space; and driver errors — from outdated or incompatible drivers. We can diagnose the root cause, repair system files, update drivers correctly, and ensure your Windows installation is stable. Many fixes take less than a day.",
  },
  {
    icon: Shield,
    title: "How to Protect Your Computer from Viruses",
    preview: "Best practices for keeping your PC safe from malware, ransomware, and online threats.",
    content: "Essential protection steps: install reputable antivirus software (we recommend and install several options), keep Windows and all software updated, avoid clicking suspicious links or email attachments, don't download from untrusted sites, enable Windows Defender, and run weekly scans. For businesses, we recommend regular security audits. We offer antivirus installation and ongoing protection plans.",
  },
  {
    icon: ClipboardCheck,
    title: "Laptop Maintenance Checklist",
    preview: "Monthly, quarterly, and annual tasks to keep your laptop running like new.",
    content: "Monthly: run antivirus scan, check for Windows updates, clean keyboard and screen, clear temporary files. Quarterly: uninstall unused programs, defragment HDD (not SSD), check battery health, back up important files. Annually: deep clean internal components, replace thermal paste, inspect cooling fan, full system diagnostics. We offer annual servicing packages at Radeon Tech — book your laptop in for a health check.",
  },
  {
    icon: Database,
    title: "Data Backup Best Practices",
    preview: "Follow the 3-2-1 backup rule to never lose your important files again.",
    content: "The 3-2-1 backup rule: keep 3 copies of your data, on 2 different types of media, with 1 copy stored off-site. For most users: one copy on your computer's internal drive, one on an external hard drive or SSD, and one in the cloud (Google Drive, OneDrive, Dropbox). Automate backups where possible. We can set up backup solutions for home and business — from simple external drives to full NAS systems.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Troubleshooting Guide",
    preview: "Solve slow internet, connection drops, and dead zones with these proven tips.",
    content: "If your Wi-Fi is slow or dropping: restart your router and modem, move closer to the router, reduce interference from other electronics, check for ISP outages, update router firmware, and consider a mesh network for large homes. Channel congestion is common in Harare — we can optimise your router settings for better performance. Visit us for networking equipment and setup assistance.",
  },
  {
    icon: Monitor,
    title: "Slow Computer? Here's How to Fix It",
    preview: "Startup cleanup, disk cleanup, malware scans — practical steps to speed up your PC.",
    content: "A slow computer can often be fixed without buying new hardware. Start by: disabling unnecessary startup programs, running disk cleanup to free up space, scanning for malware, uninstalling unused software, and checking for Windows updates. If it's still slow, consider upgrading to an SSD or adding more RAM. We can diagnose the exact bottleneck and recommend the most cost-effective fix.",
  },
  {
    icon: Search,
    title: "Choosing the Right Laptop",
    preview: "Work, school, gaming, or content creation — find the perfect laptop for your needs.",
    content: "For students: lightweight (under 1.8kg), 8+ hours battery, reliable brand. For office work: comfortable keyboard, good screen, 16GB RAM, SSD storage. For gaming: dedicated GPU, high refresh rate display, good cooling system. For content creation: colour-accurate screen, powerful CPU, plenty of RAM and storage. Visit Radeon Tech and we'll help you choose the right laptop at the right price.",
  },
  {
    icon: Droplets,
    title: "How Often to Replace Thermal Paste",
    preview: "Thermal paste dries out over time — here's when and why to replace it.",
    content: "Thermal paste should be replaced every 1–2 years, depending on usage. Signs that it's time: your CPU or GPU temperatures are hitting 90°C+ under load, the fan runs loudly and constantly, or you're experiencing thermal throttling (performance drops during intensive tasks). We use high-quality thermal paste and professional application techniques for optimal heat transfer. Combined with a dust clean, this can significantly extend your laptop's life.",
  },
];

export default function KnowledgeCentre() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="knowledge" className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-lavender/5 blur-[100px] animate-float-slow" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-soft-purple tracking-wide">KNOWLEDGE</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Knowledge <span className="text-gradient">Centre</span>
          </h2>
          <p className="section-subtitle mt-3">
            Helpful tech tips, guides, and advice to keep your devices running smoothly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {articles.map((article, i) => {
            const isOpen = expanded === i;
            const Icon = article.icon;

            return (
              <motion.div
                key={article.title}
                layout
                className={`glass-card-static overflow-hidden transition-all duration-300 ${
                  isOpen ? "shadow-md shadow-soft-purple/10 border-soft-purple/20" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="text-left w-full p-5 flex flex-col"
                  aria-expanded={isOpen}
                  aria-controls={`article-content-${i}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-soft-purple" />
                  </div>
                  <h3 className="font-heading font-semibold text-base text-text-primary mb-1.5">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed flex-1">
                    {article.preview}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-soft-purple font-medium mt-3 transition-colors">
                    {isOpen ? "Show Less" : "Read More"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`article-content-${i}`}
                      role="region"
                      aria-labelledby={`article-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-text-secondary text-xs leading-relaxed border-t border-border-light pt-4">
                        {article.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
