import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, Shield, ShoppingCart, ChevronDown, Laptop, Monitor, Gamepad2,
  Apple, Cpu, MonitorCheck, Smartphone, Keyboard, Battery, Plug, Orbit,
  Droplets, Bug, FileWarning, Database, Zap, Usb, ArrowUpDown, HardDrive,
  MemoryStick, Computer, Printer, Wifi, Camera, Users, Clock, CheckCircle,
  AlertTriangle, ChevronRight,
} from "lucide-react";

const serviceData = [
  {
    category: "Repair Services",
    icon: Wrench,
    services: [
      { icon: Laptop, title: "Laptop Repairs", desc: "Comprehensive laptop repair for all brands — HP, Dell, Lenovo, ASUS, Acer, and more. From cracked screens to motherboard failure, we handle it all.", bullets: ["Screen, keyboard, hinge & battery issues", "Charging port & motherboard repairs", "All major brands supported"], detail: { what: "Full diagnostic and repair service covering every laptop component — display, keyboard, trackpad, motherboard, battery, charging system, and chassis.", symptoms: "Cracked screen, unresponsive keys, broken hinge, battery not charging, random shutdowns, no power, overheating, strange noises.", benefits: "Extends your laptop's life by 2-4 years at a fraction of replacement cost. Restore full performance and reliability.", steps: ["Free diagnostic assessment", "Component-level repair or replacement with genuine parts", "Full system testing including stress tests", "Quality check and final calibration"], turnaround: "1-3 business days (same-day available for common issues)" } },
      { icon: Monitor, title: "Desktop Repairs", desc: "Expert desktop repair services for branded PCs and custom builds. We diagnose and fix hardware and software issues quickly.", bullets: ["PSU, motherboard, GPU & RAM repairs", "Hard drive replacement & data transfer", "Cooling system & thermal paste service"], detail: { what: "Complete desktop computer repair covering all internal and external components, from power supply units to peripheral ports.", symptoms: "PC won't turn on, blue screen errors, random restarts, no display, loud fan noise, overheating, slow performance, peripheral not working.", benefits: "Restore your desktop to like-new condition. Avoid costly replacement with targeted, professional repairs.", steps: ["Thorough hardware diagnostic", "Targeted component repair or replacement", "OS and driver optimization", "Burn-in testing for stability verification"], turnaround: "1-2 business days" } },
      { icon: Gamepad2, title: "Gaming PC Repairs", desc: "Specialized repair for gaming desktops and laptops. We fix high-performance rigs with precision and care.", bullets: ["GPU artifacts, overheating & failure", "Liquid damage & PSU failure recovery", "Performance tuning & thermal optimization"], detail: { what: "Dedicated gaming PC repair service for enthusiast-grade hardware. We understand the unique demands of gaming systems.", symptoms: "Game crashes, low FPS, GPU artifacts on screen, system shutting down under load, loud fan noise, liquid cooling leaks, no display.", benefits: "Get back to peak gaming performance. Our repairs include thermal optimization for better frame rates and system longevity.", steps: ["Stress test to identify failure points", "Component-level GPU and PSU repair", "Thermal paste reapplication and cooling system service", "Extended gaming stress test (4+ hours)"], turnaround: "2-4 business days" } },
      { icon: Apple, title: "MacBook Repairs", desc: "Authorized MacBook repair services. From screen replacement to logic board repair, we service all MacBook models.", bullets: ["Screen replacement (Retina & LCD)", "Battery & charging system repair", "Logic board (motherboard) diagnostics"], detail: { what: "Professional MacBook repair covering all models including MacBook Air, MacBook Pro 13-inch and 16-inch, and older MacBook models.", symptoms: "Cracked or flickering display, battery not charging, swollen trackpad, keyboard keys sticking, no power, kernel panics, overheating.", benefits: "Restore your MacBook to full functionality with quality parts. Save 60-70% compared to Apple's replacement costs.", steps: ["Apple-specific diagnostic tools assessment", "Precision component repair or replacement", "macOS reinstallation and firmware update", "Full functionality and battery calibration test"], turnaround: "2-5 business days" } },
      { icon: Cpu, title: "Motherboard Repairs", desc: "Chip-level motherboard repair for laptops and desktops. We fix what most repair shops won't touch.", bullets: ["Capacitor & resistor replacement", "Chip-level BGA rework & reballing", "Trace repair & power IC replacement"], detail: { what: "Advanced chip-level motherboard repair using professional-grade soldering and diagnostic equipment including BGA rework stations.", symptoms: "No power, intermittent boot failure, USB/charging ports not working, short circuit, burnt components, liquid damage residue.", benefits: "Save 80-90% versus motherboard replacement. Many boards are repairable that other shops declare dead. Reduces e-waste.", steps: ["Visual inspection and multimeter testing", "Schematic analysis to trace fault", "Component-level repair (soldering, reballing, trace repair)", "Power-on and full functional testing"], turnaround: "3-7 business days (complex repairs)" } },
      { icon: MonitorCheck, title: "GPU Repairs", desc: "Graphics card repair for gaming, workstation, and productivity GPUs. We fix NVIDIA, AMD, and Intel graphics cards.", bullets: ["Graphics card failure & artifact issues", "No display & overheating diagnosis", "VRAM replacement & reballing"], detail: { what: "Dedicated GPU repair service covering discreet graphics cards, integrated graphics issues, and external GPU enclosures.", symptoms: "Artifacts on screen (colored squares/lines), no display output, driver crashes, black screen during gaming, fan not spinning, overheating.", benefits: "Restore your GPU to full working condition. Much more affordable than buying a new card in the current market.", steps: ["Visual inspection and benchmark testing", "VRAM and core voltage testing", "BGA rework or component replacement as needed", "Extended 3D rendering and gaming stress test"], turnaround: "3-7 business days" } },
      { icon: Smartphone, title: "Screen Replacement", desc: "Professional screen replacement for all laptop brands. We use high-quality displays with full warranty.", bullets: ["Cracked/broken screen repair", "All laptop brands and models", "High-quality replacement displays"], detail: { what: "Complete laptop screen replacement service using OEM-grade or high-quality compatible displays matched to your laptop model.", symptoms: "Cracked glass, broken LCD panel, lines on screen, dead pixels, flickering display, black spots, backlight failure.", benefits: "Restore your laptop's display to like-new condition. Cheaper than buying a new laptop and much faster.", steps: ["Model verification and display matching", "Careful screen disassembly and cable disconnect", "New screen installation and cable routing", "Display calibration and final quality check"], turnaround: "Same day to 1 business day" } },
      { icon: Keyboard, title: "Keyboard Replacement", desc: "Keyboard repair and replacement for all laptop models. Fix sticky keys, unresponsive keys, and liquid damage.", bullets: ["Stuck or unresponsive keys", "Liquid damage keyboard repair", "Backlit keyboard replacement"], detail: { what: "Laptop keyboard replacement service. We replace individual keycaps or entire keyboard assemblies depending on the damage and model.", symptoms: "Keys not registering, sticky keys, keys falling off, liquid spill residue, keyboard not detected by OS, backlight not working.", benefits: "Restore full typing functionality. A new keyboard is far cheaper than an external USB solution or replacing the whole laptop.", steps: ["Diagnose keyboard type (individual vs. integrated)", "Key cap or full keyboard assembly removal", "New keyboard installation with proper cable routing", "Full key function test across all keys"], turnaround: "Same day to 1 business day" } },
      { icon: Battery, title: "Battery Replacement", desc: "Safe battery replacement for laptops and devices. We handle swollen, dead, and failing batteries properly.", bullets: ["Swollen battery replacement", "Short battery life diagnostics", "Not charging — battery circuit repair"], detail: { what: "Laptop battery replacement service including battery diagnostics, replacement, and charging circuit repair when needed.", symptoms: "Battery swelling (bulging trackpad or chassis), laptop only works when plugged in, battery dies in minutes, battery not detected, overheating.", benefits: "Restore portability and battery life. Prevent safety hazards from swollen batteries. Extend laptop usability by 2-3 more years.", steps: ["Battery health diagnostic and cycle count check", "Safe removal and disposal of old battery", "Compatible new battery installation", "Battery calibration and charging test"], turnaround: "Same day to 1 business day" } },
      { icon: Plug, title: "Charging Port Repairs", desc: "Charging port repair and replacement for laptops. Fix loose, damaged, or non-functional charging ports.", bullets: ["Loose or broken charging port", "No power delivery diagnosis", "DC jack and USB-C port repair"], detail: { what: "Charging port repair covering barrel DC jacks, USB-C charging ports, and MagSafe connectors on all laptop brands.", symptoms: "Charger falls out easily, laptop only charges at a specific angle, no charging light, intermittent charging, bent/broken pins inside port.", benefits: "Fix the most common laptop failure point. Much cheaper than motherboard replacement. Restore reliable charging.", steps: ["Port inspection and continuity testing", "Solder removal and old port extraction", "New port soldering and reinforcement", "Charging voltage and amperage verification"], turnaround: "1-3 business days" } },
      { icon: Orbit, title: "Hinge Repairs", desc: "Laptop hinge repair for loose screens, broken hinges, and cracked chassis around hinge mounts.", bullets: ["Broken or loose hinge", "Screen wobble and instability", "Cracked chassis around hinge area"], detail: { what: "Laptop hinge repair including hinge replacement, hinge bracket reattachment, and chassis crack repair around hinge mounting points.", symptoms: "Screen wobbles when typing, hinge is very stiff or very loose, cracking sound when opening/closing, plastic breaking around screen corners.", benefits: "Restore proper screen stability and prevent further chassis damage. A small hinge fix now prevents a full chassis replacement later.", steps: ["Hinge mechanism assessment", "Hinge assembly removal and replacement", "Chassis crack repair with epoxy reinforcement if needed", "Screen alignment and smooth open/close test"], turnaround: "1-3 business days" } },
      { icon: Droplets, title: "Liquid Damage Repair", desc: "Emergency liquid damage recovery for laptops and devices. Fast response to minimize corrosion and save your device.", bullets: ["Water, juice, coffee spill recovery", "Corrosion cleaning & treatment", "Component-level restoration"], detail: { what: "Urgent liquid damage recovery service. We disassemble, clean, and treat all affected components to stop corrosion and restore function.", symptoms: "Spilled liquid on keyboard or chassis, device won't turn on, random behavior, keyboard not working, screen flickering, burning smell.", benefits: "Immediate response can save 70-90% of liquid-damaged devices. Every hour matters — corrosion spreads quickly inside electronics.", steps: ["Immediate power-off and battery disconnect", "Full disassembly and ultrasonic cleaning", "Corrosion treatment and component testing", "Reassembly and full functional verification"], turnaround: "3-7 business days (emergency service available)" } },
    ],
  },
  {
    category: "Software & Security",
    icon: Shield,
    services: [
      { icon: Bug, title: "Virus & Malware Removal", desc: "Thorough virus and malware removal to clean and protect your devices from all types of digital threats.", bullets: ["Trojans, ransomware & spyware removal", "Adware & browser hijacker cleanup", "Ongoing protection setup"], detail: { what: "Comprehensive malware removal service using professional-grade tools. We remove everything from simple adware to advanced rootkits and ransomware.", symptoms: "Slow PC, pop-up ads everywhere, browser redirects, files encrypted (ransomware), antivirus disabled, unknown programs running, high CPU usage.", benefits: "Clean, fast, secure device. Protect your personal data, banking info, and files. Prevent identity theft and data loss.", steps: ["Boot into safe mode for initial scan", "Full system scan with multiple professional tools", "Rootkit and registry cleanup", "Install and configure ongoing protection"], turnaround: "Same day to 1 business day" } },
      { icon: Monitor, title: "Windows Installation", desc: "Professional Windows 10 and Windows 11 installation with drivers, updates, and full configuration.", bullets: ["Windows 10/11 clean installation", "Driver installation & updates", "Activation & configuration"], detail: { what: "Complete Windows operating system installation service including driver setup, Windows Update, and software configuration.", symptoms: "Slow Windows performance, frequent crashes, corrupted system files, unable to update, virus-infected OS, new SSD/HDD needs OS.", benefits: "A fresh Windows install dramatically improves speed and stability. Removes all bloatware, viruses, and accumulated junk.", steps: ["Backup important user data", "Secure erase or partition setup", "Clean Windows installation with latest build", "Driver installation, Windows Update, and essential software setup"], turnaround: "Same day to 1 business day" } },
      { icon: FileWarning, title: "Software Troubleshooting", desc: "Diagnose and fix software issues — crashes, errors, compatibility problems, and application failures.", bullets: ["Application crash & error diagnosis", "Compatibility issue resolution", "Blue screen error analysis"], detail: { what: "Software troubleshooting for Windows and macOS. We identify root causes of application failures, system errors, and compatibility issues.", symptoms: "Program crashes on launch, error messages, blue screen of death (BSOD), program won't install, missing DLL files, compatibility issues after update.", benefits: "Get your applications working reliably. Avoid costly data loss from corrupted files. Save hours of frustration.", steps: ["Error code analysis and log review", "Root cause identification", "Targeted fix (registry repair, reinstall, patch, compatibility mode)", "Verification testing across multiple scenarios"], turnaround: "Same day to 1 business day" } },
      { icon: Database, title: "Data Backup & Recovery", desc: "Recover lost data from failed drives, deleted files, formatted partitions, and corrupted storage media.", bullets: ["HDD/SSD failure data recovery", "Deleted file & formatted drive recovery", "Flash drive & memory card recovery"], detail: { what: "Data recovery service for hard drives, SSDs, USB flash drives, and memory cards. We handle logical failures, accidental deletion, and physical damage.", symptoms: "Drive not detected, clicking sounds from HDD, file not found errors, accidentally deleted important files, formatted wrong drive, corrupted files.", benefits: "Recover irreplaceable photos, documents, business data, and family memories. Professional recovery has a much higher success rate than DIY software.", steps: ["Drive evaluation and recovery feasibility assessment", "Disk imaging to prevent further damage", "File extraction using professional software", "Data transfer to your new drive or external storage"], turnaround: "1-5 business days (depending on drive condition)" } },
      { icon: Zap, title: "Performance Optimisation", desc: "Speed up your slow computer with comprehensive performance optimization. Make it feel like new again.", bullets: ["Slow PC diagnosis & speed boost", "Startup program cleanup", "Disk defrag & system tuning"], detail: { what: "Complete system optimization service to restore your computer's speed and responsiveness. We address both software and hardware bottlenecks.", symptoms: "Slow boot time, programs take forever to open, system lag and stutter, high disk or memory usage, fan running constantly, slow internet.", benefits: "Extend your computer's useful life by 1-3 years. No need to buy a new machine — optimization can restore 50-80% of original speed.", steps: ["Baseline performance benchmark", "Startup program and service optimization", "Disk cleanup, defragmentation (HDD), or TRIM (SSD)", "Registry cleanup and final benchmark comparison"], turnaround: "Same day to 1 business day" } },
      { icon: Usb, title: "Driver Installation", desc: "Proper driver installation for all hardware components. Fix device conflicts and missing driver issues.", bullets: ["GPU, chipset & network drivers", "Audio & peripheral driver setup", "BIOS/UEFI firmware updates"], detail: { what: "Professional driver installation and update service ensuring all your hardware components work correctly with optimal performance.", symptoms: "Device not recognized, yellow exclamation in Device Manager, no sound, network not working, poor graphics performance, unknown device errors.", benefits: "Unlock full hardware performance. Proper drivers are essential for gaming, creative work, and everyday computing.", steps: ["Hardware inventory and driver audit", "Download latest manufacturer drivers (not generic)", "Clean installation and configuration", "Driver verification and performance check"], turnaround: "Same day" } },
      { icon: ArrowUpDown, title: "Operating System Upgrades", desc: "Smooth OS upgrades and migration — Windows 10 to 11, macOS updates, and Linux installations.", bullets: ["Windows 10 → 11 upgrade", "macOS version upgrades", "Linux installation & dual-boot setup"], detail: { what: "Operating system upgrade and migration service. We handle the entire upgrade process safely, preserving your files and applications.", symptoms: "Current OS no longer supported, missing new features, security vulnerabilities in old OS, need specific OS for certain software.", benefits: "Get the latest security patches, new features, and better performance. We ensure all your software still works after the upgrade.", steps: ["Compatibility check for hardware and software", "Full data backup before upgrade", "OS upgrade installation", "Driver, software, and functionality verification"], turnaround: "1-2 business days" } },
      { icon: Monitor, title: "BIOS/UEFI Configuration", desc: "BIOS/UEFI troubleshooting and configuration — boot issues, password reset, and firmware updates.", bullets: ["Boot order & device configuration", "BIOS password reset", "Firmware/BIOS update"], detail: { what: "BIOS and UEFI firmware configuration service for desktop and laptop motherboards. We handle low-level system settings.", symptoms: "Can't boot from USB, BIOS password forgotten, boot device not found, incompatible hardware after update, black screen on boot.", benefits: "Resolve boot-related issues that prevent your computer from starting. Enable hardware features like virtualization, XMP, and secure boot.", steps: ["Boot failure analysis", "CMOS reset or password removal", "Firmware update or configuration change", "Boot sequence verification and OS boot test"], turnaround: "Same day to 1 business day" } },
    ],
  },
  {
    category: "Sales & Upgrades",
    icon: ShoppingCart,
    services: [
      { icon: HardDrive, title: "SSD Upgrades", desc: "Dramatically speed up your computer with an SSD upgrade. The single biggest performance improvement you can make.", bullets: ["SATA & NVMe SSD installation", "OS migration to new SSD", "Up to 10x faster boot & load times"], detail: { what: "SSD (Solid State Drive) upgrade service. We replace your old hard drive or add an SSD alongside it for maximum performance.", symptoms: "Slow boot times (3-5 minutes), programs loading slowly, file transfers crawling, loud hard drive noise, constant 100% disk usage.", benefits: "10x faster boot times, instantaneous program loading, quieter operation, better battery life, more durable (no moving parts).", steps: ["Drive compatibility check and selection", "Data migration from old drive (cloning or fresh install)", "SSD installation and mounting", "Boot optimization and TRIM verification"], turnaround: "Same day to 1 business day" } },
      { icon: MemoryStick, title: "RAM Upgrades", desc: "Upgrade your RAM for smoother multitasking and better performance in demanding applications.", bullets: ["4GB→8GB→16GB→32GB upgrades", "Compatible RAM selection", "Dual-channel optimization"], detail: { what: "RAM (memory) upgrade service. We install compatible memory modules to boost your computer's multitasking capability.", symptoms: "Computer slow with multiple programs open, tabs reloading in browser, out of memory errors, stuttering in games, slow performance in creative apps.", benefits: "Run more programs simultaneously without slowdown. Smoother gaming, faster video editing, better multitasking. One of the cheapest upgrades.", steps: ["Memory compatibility verification", "Existing RAM assessment and configuration", "New RAM installation", "Memory test and dual-channel verification"], turnaround: "Same day (while you wait)" } },
      { icon: Computer, title: "Custom PC Building", desc: "Custom-built desktop PCs tailored to your needs — gaming, workstation, office, or budget builds.", bullets: ["Gaming, workstation & office builds", "Part selection & compatibility check", "Cable management & BIOS configuration"], detail: { what: "Custom PC building service. We design, source, assemble, and configure a desktop PC tailored exactly to your needs and budget.", symptoms: ["Need a new PC but don't know where to start", "Pre-built options too expensive or poorly configured", "Want a specific performance level for your budget"], benefits: "Get exactly the performance you need. Better value than pre-built systems. Full warranty on all parts plus our build warranty.", steps: ["Requirements consultation and budget planning", "Part selection with compatibility verification", "Professional assembly with cable management", "OS installation, BIOS config, and burn-in testing"], turnaround: "3-7 business days (depending on part availability)" } },
      { icon: Laptop, title: "Laptop Sales", desc: "New and refurbished laptops from top brands — HP, Dell, Lenovo, ASUS, Acer, and Apple. Fully tested and warrantied.", bullets: ["New & refurbished laptops", "All major brands available", "Fully tested with warranty"], detail: { what: "Laptop sales offering both brand-new and professionally refurbished laptops. Each refurbished unit is fully tested, cleaned, and warrantied.", symptoms: ["Need a reliable laptop for work, school, or personal use", "Want quality hardware on a budget", "Unsure which laptop suits your needs"], benefits: "Affordable options for every budget. Refurbished laptops offer huge savings (30-60% off retail) without compromising reliability.", steps: ["Understand your needs and budget", "Select from available inventory or special order", "Full configuration and software setup", "Warranty registration and pickup"], turnaround: "Ready for pickup same day or next day" } },
      { icon: Monitor, title: "Desktop Sales", desc: "Branded and custom-built desktops for home, office, gaming, and enterprise use. Quality guaranteed.", bullets: ["Branded desktops (HP, Dell, Lenovo)", "Custom-built desktops", "Business & enterprise workstations"], detail: { what: "Desktop computer sales covering both branded OEM systems and custom-built configurations for any use case.", symptoms: ["Old computer too slow to replace", "Need multiple computers for office", "Want a reliable system for years to come"], benefits: "Reliable systems backed by warranty. Custom builds offer better value. Business-grade systems for mission-critical work.", steps: ["Requirements assessment", "System recommendation and quotation", "Build or preparation and testing", "Delivery and setup assistance"], turnaround: "1-7 business days depending on configuration" } },
      { icon: Gamepad2, title: "Gaming PC Sales", desc: "Pre-built and custom gaming PCs built for performance. From entry-level to ultra-high-end gaming rigs.", bullets: ["Pre-built & custom gaming rigs", "Entry-level to enthusiast builds", "VR-ready configuration option"], detail: { what: "Gaming PC sales offering pre-configured gaming systems and fully custom builds tailored to your gaming preferences and budget.", symptoms: ["Current PC can't run new games", "Console player ready to upgrade to PC", "Want a specific performance target for games"], benefits: "Optimized for gaming performance. Better price-to-performance than retail pre-builts. Upgrade-friendly configurations.", steps: ["Gaming requirements and budget discussion", "Component selection for target resolution/fps", "Professional build with gaming-focused BIOS config", "Game benchmark testing and performance verification"], turnaround: "3-10 business days" } },
      { icon: Users, title: "Business Workstations", desc: "Reliable workstations for offices and enterprises. Built for productivity, durability, and professional use.", bullets: ["Reliable office-ready machines", "Enterprise-grade components", "Network-ready configuration"], detail: { what: "Business workstation sales and configuration. We supply reliable, network-ready computers for offices, schools, NGOs, and government departments.", symptoms: ["Office needs reliable computers", "Current fleet is aging and failing", "Need standardized systems for easier IT management"], benefits: "Reduced downtime with business-grade hardware. Standardized configurations simplify IT support. Bulk pricing available for organizations.", steps: ["Business needs assessment and volume discussion", "Standardized configuration proposal", "Bulk preparation with consistent setup", "Delivery and on-site deployment support"], turnaround: "5-15 business days (bulk orders)" } },
      { icon: Usb, title: "Computer Accessories", desc: "Quality computer accessories — mice, keyboards, monitors, chargers, cables, adapters, and USB hubs.", bullets: ["Mice, keyboards & monitors", "Chargers, cables & adapters", "USB hubs & docking stations"], detail: { what: "Computer accessory sales offering a wide range of peripherals and accessories from trusted brands.", symptoms: ["Need replacement charger or cable", "Want to upgrade keyboard or mouse", "Need additional ports or connectivity"], benefits: "Quality accessories that last. We only stock products we'd use ourselves. Competitive pricing with warranty on all items.", steps: ["Identify your accessory needs", "Recommendation based on compatibility and quality", "Product demonstration if needed", "Purchase with warranty card"], turnaround: "Immediate (in-stock items)" } },
      { icon: Printer, title: "Printer Setup & Repair", desc: "Printer installation, configuration, and repair. We handle setup, driver installation, and ongoing maintenance.", bullets: ["Printer installation & driver setup", "Network printing configuration", "Printer repair & maintenance"], detail: { what: "Printer support covering setup, driver installation, network configuration, and hardware repair for inkjet and laser printers.", symptoms: "Printer not detected, print jobs stuck in queue, poor print quality, paper jams, network printer not found, driver errors.", benefits: "Get your printer working reliably. Proper network setup enables printing from any device in your office or home.", steps: ["Printer model and connection assessment", "Driver installation and configuration", "Network or USB connection setup", "Test print and quality check"], turnaround: "Same day to 1 business day" } },
      { icon: Wifi, title: "Network Setup", desc: "Wi-Fi and wired network configuration for homes and offices. Reliable, secure connectivity solutions.", bullets: ["Wi-Fi router configuration", "Office network setup & expansion", "Network security & troubleshooting"], detail: { what: "Network setup service covering wireless and wired networks for homes, small offices, and businesses.", symptoms: ["Weak Wi-Fi signal in parts of building", "Internet keeps dropping", "Setting up new office network", "Need better network security"], benefits: "Reliable, fast internet throughout your space. Proper network security protects your data. Reduce downtime from connectivity issues.", steps: ["Site survey and signal assessment", "Router/access point placement and configuration", "Network security setup (WPA3, firewall)", "Speed test and full coverage verification"], turnaround: "1-2 business days (on-site service)" } },
      { icon: Camera, title: "CCTV Installation", desc: "Security camera installation for homes and businesses. Complete surveillance solutions with remote viewing.", bullets: ["Security camera installation", "DVR/NVR system setup", "Remote viewing configuration"], detail: { what: "CCTV installation service including cameras, DVR/NVR recorders, cabling, and remote viewing setup for monitoring from your phone.", symptoms: ["Need to secure your property", "Existing system outdated or not working", "Want to monitor your business remotely"], benefits: "24/7 security monitoring from anywhere. Deter crime and keep an eye on your property. Systems scalable from single camera to multi-camera setups.", steps: ["Site assessment and security needs analysis", "Camera and recorder selection", "Professional installation and cable management", "System configuration and remote viewing setup"], turnaround: "2-5 business days" } },
    ],
  },
];

function RippleButton({ children, onClick, className }) {
  const btnRef = useRef(null);
  const handleClick = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add("ripple-effect");
    ripple.addEventListener("animationend", () => ripple.remove());
    btn.appendChild(ripple);
  }, []);
  return (
    <button ref={btnRef} type="button" className={`ripple-btn ${className}`} onClick={(e) => { handleClick(e); onClick?.(e); }}>
      {children}
    </button>
  );
}

export default function Services() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-bg-lavender">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-soft-purple/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-lavender/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold text-soft-purple tracking-wide">SERVICES</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="section-subtitle mt-3">
            From hardware repairs to software solutions, sales to installations — we've got you covered.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {serviceData.map((category, catIdx) => {
            const CatIcon = category.icon;
            return (
              <div key={category.category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center">
                    <CatIcon className="w-5 h-5 text-soft-purple" />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary">{category.category}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-border-light to-transparent ml-4" />
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, i) => {
                    const idx = `${catIdx}-${i}`;
                    const isOpen = expanded === idx;
                    const Icon = service.icon;

                    return (
                      <motion.div
                        key={service.title}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className={`glass-card-static overflow-hidden transition-all duration-300 ${
                          isOpen ? "shadow-md shadow-soft-purple/10 border-soft-purple/20 sm:col-span-2 lg:col-span-3" : ""
                        }`}
                      >
                        <RippleButton
                          onClick={() => setExpanded(isOpen ? null : idx)}
                          className="w-full text-left p-5 flex items-start gap-4"
                          aria-expanded={isOpen}
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-5 h-5 text-soft-purple" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-heading font-semibold text-text-primary text-base">{service.title}</h4>
                                <p className={`text-text-secondary text-sm mt-1 leading-relaxed ${isOpen ? "" : "line-clamp-2"}`}>{service.desc}</p>
                              </div>
                              <ChevronDown size={18} className={`shrink-0 mt-1 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-soft-purple" : ""}`} />
                            </div>
                            {!isOpen && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {service.bullets.map((b) => (
                                  <span key={b} className="text-[10px] text-soft-purple bg-soft-purple/10 px-2 py-0.5 rounded-full">{b}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </RippleButton>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 border-t border-border-light pt-4">
                                <div className="grid md:grid-cols-5 gap-6">
                                  <div className="md:col-span-3 space-y-4">
                                    <div>
                                      <h5 className="flex items-center gap-1.5 font-semibold text-text-primary text-xs uppercase tracking-wider mb-2">
                                        <Clock size={12} className="text-soft-purple" />
                                        What This Service Covers
                                      </h5>
                                      <p className="text-text-secondary text-sm leading-relaxed">{service.detail.what}</p>
                                    </div>
                                    <div>
                                      <h5 className="flex items-center gap-1.5 font-semibold text-text-primary text-xs uppercase tracking-wider mb-2">
                                        <AlertTriangle size={12} className="text-amber-500" />
                                        Common Symptoms
                                      </h5>
                                      <p className="text-text-secondary text-sm leading-relaxed">{service.detail.symptoms}</p>
                                    </div>
                                    <div>
                                      <h5 className="flex items-center gap-1.5 font-semibold text-text-primary text-xs uppercase tracking-wider mb-2">
                                        <CheckCircle size={12} className="text-green-500" />
                                        Why Fix It
                                      </h5>
                                      <p className="text-text-secondary text-sm leading-relaxed">{service.detail.benefits}</p>
                                    </div>
                                  </div>
                                  <div className="md:col-span-2 space-y-4">
                                    <div className="glass rounded-2xl p-4">
                                      <h5 className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                        <Clock size={12} className="text-soft-purple" />
                                        Repair Steps
                                      </h5>
                                      <ol className="space-y-2.5">
                                        {service.detail.steps.map((step, si) => (
                                          <li key={si} className="flex items-start gap-2 text-text-secondary text-sm">
                                            <span className="w-5 h-5 rounded-full bg-soft-purple/10 flex items-center justify-center text-[10px] font-bold text-soft-purple shrink-0 mt-0.5">{si + 1}</span>
                                            {step}
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                    <div className="glass rounded-2xl p-4 flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-purple/10 to-lavender/10 flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-soft-purple" />
                                      </div>
                                      <div>
                                        <p className="text-[10px] text-text-muted uppercase tracking-wider">Typical Turnaround</p>
                                        <p className="text-sm font-semibold text-text-primary">{service.detail.turnaround}</p>
                                      </div>
                                    </div>
                                    <a
                                      href="#contact"
                                      className="glass-btn inline-flex items-center justify-center gap-1.5 text-xs w-full px-4 py-2.5 no-underline"
                                    >
                                      Book This Service <ChevronRight size={12} />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
