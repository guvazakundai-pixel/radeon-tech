import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Cpu, Monitor, MemoryStick, CircuitBoard, BatteryCharging,
  Box, Fan, HardDrive, MonitorCheck, Keyboard, Mouse,
  MessageCircle, Loader2, CheckCircle, AlertTriangle,
  ChevronDown, Trash2, Zap, Star, TrendingUp,
  Sparkles,
} from "lucide-react";
import { WHATSAPP } from "../content/data";

const CATEGORIES = [
  { key: "cpu", label: "CPU", icon: Cpu, emoji: "🔲" },
  { key: "gpu", label: "GPU", icon: Monitor, emoji: "🎮" },
  { key: "ram", label: "RAM", icon: MemoryStick, emoji: "🧠" },
  { key: "motherboard", label: "Motherboard", icon: CircuitBoard, emoji: "📋" },
  { key: "psu", label: "Power Supply", icon: BatteryCharging, emoji: "⚡" },
  { key: "pcCase", label: "PC Case", icon: Box, emoji: "📦" },
  { key: "cooling", label: "Cooling", icon: Fan, emoji: "❄️" },
  { key: "storage", label: "Storage", icon: HardDrive, emoji: "💾" },
  { key: "monitor", label: "Monitor", icon: MonitorCheck, emoji: "🖥️" },
  { key: "keyboard", label: "Keyboard", icon: Keyboard, emoji: "⌨️" },
  { key: "mouse", label: "Mouse", icon: Mouse, emoji: "🖱️" },
];

const PARTS = {
  cpu: [
    { name: "Intel Core i3-12100F", brand: "Intel", price: 110 },
    { name: "Intel Core i5-12400F", brand: "Intel", price: 165 },
    { name: "Intel Core i5-13400F", brand: "Intel", price: 210 },
    { name: "Intel Core i7-13700F", brand: "Intel", price: 320 },
    { name: "Intel Core i9-13900K", brand: "Intel", price: 480 },
    { name: "AMD Ryzen 5 5600X", brand: "AMD", price: 155 },
    { name: "AMD Ryzen 7 5800X", brand: "AMD", price: 245 },
    { name: "AMD Ryzen 7 7800X3D", brand: "AMD", price: 340 },
    { name: "AMD Ryzen 9 7900X", brand: "AMD", price: 420 },
  ],
  gpu: [
    { name: "NVIDIA GTX 1650", brand: "NVIDIA", price: 150 },
    { name: "NVIDIA RTX 3060", brand: "NVIDIA", price: 280 },
    { name: "NVIDIA RTX 4060", brand: "NVIDIA", price: 310 },
    { name: "NVIDIA RTX 4060 Ti", brand: "NVIDIA", price: 420 },
    { name: "NVIDIA RTX 4070", brand: "NVIDIA", price: 550 },
    { name: "NVIDIA RTX 4070 Ti", brand: "NVIDIA", price: 720 },
    { name: "NVIDIA RTX 4080", brand: "NVIDIA", price: 1050 },
    { name: "NVIDIA RTX 4090", brand: "NVIDIA", price: 1600 },
    { name: "AMD RX 6600", brand: "AMD", price: 180 },
    { name: "AMD RX 7600", brand: "AMD", price: 260 },
    { name: "AMD RX 7800 XT", brand: "AMD", price: 480 },
  ],
  ram: [
    { name: "8GB DDR4 3200MHz", brand: "", price: 25 },
    { name: "16GB DDR4 3200MHz", brand: "", price: 45 },
    { name: "32GB DDR4 3200MHz", brand: "", price: 85 },
    { name: "16GB DDR5 5200MHz", brand: "", price: 60 },
    { name: "32GB DDR5 5600MHz", brand: "", price: 105 },
    { name: "64GB DDR5 5600MHz", brand: "", price: 200 },
  ],
  motherboard: [
    { name: "B550 (AMD)", brand: "AMD", price: 95 },
    { name: "B650 (AMD)", brand: "AMD", price: 145 },
    { name: "X670 (AMD)", brand: "AMD", price: 220 },
    { name: "B660 (Intel)", brand: "Intel", price: 105 },
    { name: "B760 (Intel)", brand: "Intel", price: 135 },
    { name: "Z790 (Intel)", brand: "Intel", price: 230 },
  ],
  psu: [
    { name: "550W 80+ Bronze", brand: "", price: 55 },
    { name: "650W 80+ Bronze", brand: "", price: 65 },
    { name: "750W 80+ Gold", brand: "", price: 95 },
    { name: "850W 80+ Gold", brand: "", price: 120 },
    { name: "1000W 80+ Platinum", brand: "", price: 180 },
  ],
  pcCase: [
    { name: "Budget ATX", brand: "", price: 45 },
    { name: "Mid-Tower Mesh", brand: "", price: 65 },
    { name: "Premium Mid-Tower", brand: "", price: 95 },
    { name: "Full Tower", brand: "", price: 130 },
    { name: "Mini-ITX", brand: "", price: 55 },
  ],
  cooling: [
    { name: "Stock Cooler (Included)", brand: "", price: 0 },
    { name: "Tower Air Cooler", brand: "", price: 30 },
    { name: "120mm AIO", brand: "", price: 55 },
    { name: "240mm AIO", brand: "", price: 85 },
    { name: "360mm AIO", brand: "", price: 120 },
  ],
  storage: [
    { name: "256GB SATA SSD", brand: "", price: 25 },
    { name: "500GB NVMe SSD", brand: "", price: 40 },
    { name: "1TB NVMe SSD", brand: "", price: 70 },
    { name: "2TB NVMe SSD", brand: "", price: 130 },
    { name: "1TB HDD", brand: "", price: 40 },
    { name: "2TB HDD", brand: "", price: 55 },
  ],
  monitor: [
    { name: '24" 1080p 60Hz', brand: "", price: 120 },
    { name: '24" 1080p 144Hz', brand: "", price: 170 },
    { name: '27" 1440p 144Hz', brand: "", price: 280 },
    { name: '32" 4K 60Hz', brand: "", price: 350 },
    { name: '34" Ultrawide', brand: "", price: 400 },
  ],
  keyboard: [
    { name: "Basic Keyboard", brand: "", price: 15 },
    { name: "Mechanical Keyboard", brand: "", price: 45 },
    { name: "RGB Gaming Keyboard", brand: "", price: 65 },
  ],
  mouse: [
    { name: "Basic Mouse", brand: "", price: 10 },
    { name: "Wireless Mouse", brand: "", price: 25 },
    { name: "Gaming Mouse", brand: "", price: 40 },
  ],
};

function getCompatibilityWarnings(selections) {
  const warnings = [];
  const cpu = selections.cpu;
  const mobo = selections.motherboard;

  if (cpu && mobo) {
    const cpuIsAmd = cpu.brand === "AMD";
    const moboIsAmd = mobo.name.includes("AMD") || ["B550", "B650", "X670"].some((m) => mobo.name.startsWith(m));
    const cpuIsIntel = cpu.brand === "Intel";
    const moboIsIntel = mobo.name.includes("Intel") || ["B660", "B760", "Z790"].some((m) => mobo.name.startsWith(m));

    if (cpuIsAmd && moboIsIntel) {
      warnings.push("AMD CPU is not compatible with an Intel motherboard.");
    }
    if (cpuIsIntel && moboIsAmd) {
      warnings.push("Intel CPU is not compatible with an AMD motherboard.");
    }
  }

  const psu = selections.psu;
  const gpu = selections.gpu;
  if (psu && gpu) {
    const psuWatt = parseInt(psu.name) || 0;
    if (gpu.price >= 1050 && psuWatt < 850) {
      warnings.push("High-end GPU may require a higher wattage PSU (850W+ recommended).");
    } else if (gpu.price >= 550 && psuWatt < 650) {
      warnings.push("This GPU recommends at least a 650W PSU.");
    }
  }

  return warnings;
}

function getPerformanceEstimate(total, selections) {
  let gaming = 0;
  let productivity = 0;

  if (selections.gpu) {
    gaming += selections.gpu.price * 0.5;
  }
  if (selections.cpu) {
    gaming += selections.cpu.price * 0.3;
    productivity += selections.cpu.price * 0.6;
  }
  if (selections.ram) {
    productivity += selections.ram.price * 0.4;
  }

  const gamingRating = Math.min(Math.round((gaming / 600) * 100), 100);
  const productivityRating = Math.min(Math.round((productivity / 500) * 100), 100);

  let value = "Low";
  if (total >= 2000) value = "Ultra";
  else if (total >= 1200) value = "High";
  else if (total >= 600) value = "Medium";

  return { gamingRating, productivityRating, value };
}

function CategorySelector({ categoryKey, selected, onSelect }) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  const parts = PARTS[categoryKey] || [];
  const Icon = cat.icon;

  return (
    <div className="glass-card-static p-4 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-accent-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-white">{cat.label}</h4>
        </div>
        {selected && (
          <button
            type="button"
            onClick={() => onSelect(categoryKey, null)}
            className="p-1.5 rounded-lg hover:bg-red-400/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"
            title="Remove selection"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="relative">
        <select
          value={selected ? selected.name : ""}
          onChange={(e) => {
            const part = parts.find((p) => p.name === e.target.value);
            onSelect(categoryKey, part || null);
          }}
          className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all appearance-none cursor-pointer pr-10"
        >
          <option value="" className="bg-bg-card">Select {cat.label}</option>
          {parts.map((p) => (
            <option key={p.name} value={p.name} className="bg-bg-card">
              {p.name} — ${p.price}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-center justify-between text-xs"
        >
          <span className="text-text-muted">{selected.brand || cat.label}</span>
          <span className="font-bold text-accent-blue">${selected.price}</span>
        </motion.div>
      )}
    </div>
  );
}

function PerformanceBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-muted">{label}</span>
        <span className="text-text-secondary font-medium">{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

export default function PCBuilder() {
  const [selections, setSelections] = useState(
    Object.fromEntries(CATEGORIES.map((c) => [c.key, null]))
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = useCallback((key, part) => {
    setSelections((prev) => ({ ...prev, [key]: part }));
  }, []);

  const total = useMemo(
    () => Object.values(selections).reduce((sum, p) => sum + (p?.price || 0), 0),
    [selections]
  );

  const selectedCount = useMemo(
    () => Object.values(selections).filter(Boolean).length,
    [selections]
  );

  const warnings = useMemo(() => getCompatibilityWarnings(selections), [selections]);
  const performance = useMemo(() => getPerformanceEstimate(total, selections), [total, selections]);

  const generateMessage = () => {
    const lines = CATEGORIES.map((cat) => {
      const part = selections[cat.key];
      return `${cat.emoji} ${cat.label}: ${part ? `${part.name} - $${part.price}` : "Not selected"}`;
    }).join("\n");

    return `🖥️ Custom PC Build Request

Selected Components:

${lines}

💰 Total: $${total}

Please provide a quote for this build.`;
  };

  const handleSubmit = async () => {
    if (selectedCount === 0) return;

    setSubmitting(true);

    const message = generateMessage();
    const whatsappUrl = `${WHATSAPP}?text=${encodeURIComponent(message)}`;

    try {
      await fetch("/api/builds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selections: Object.fromEntries(
            Object.entries(selections).filter(([, v]) => v !== null)
          ),
          total,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Continue to WhatsApp even if API fails
    }

    window.open(whatsappUrl, "_blank");
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-bg-primary flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-static p-10 md:p-14 text-center max-w-lg w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-white mb-3">
            Build Sent!
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            Your custom PC build configuration has been sent via WhatsApp. We&apos;ll prepare a detailed quote for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn inline-flex items-center justify-center gap-2 text-sm px-6 py-3 no-underline"
            >
              <MessageCircle size={16} />
              Open WhatsApp
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setSelections(Object.fromEntries(CATEGORIES.map((c) => [c.key, null])));
              }}
              className="glass-btn-outline inline-flex items-center justify-center gap-2 text-sm px-6 py-3 cursor-pointer"
            >
              Start New Build
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-bg-primary px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4">
            <Cpu size={14} className="text-accent-blue" />
            <span className="text-xs font-semibold text-accent-blue tracking-wide">PC CONFIGURATOR</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-white">
            Build Your <span className="text-gradient">Dream PC</span>
          </h1>
          <p className="section-subtitle mt-3">
            Select your components, review the build, and get a quote — all in one place.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">
                <span className="font-bold text-accent-blue">{selectedCount}</span> of {CATEGORIES.length} components selected
              </span>
              <div className="flex-1 max-w-[200px] ml-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(selectedCount / CATEGORIES.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                />
              </div>
            </div>

            {CATEGORIES.map((cat) => (
              <CategorySelector
                key={cat.key}
                categoryKey={cat.key}
                selected={selections[cat.key]}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 space-y-5 self-start"
          >
            <div className="glass-card-static p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-text-white">Build Summary</h3>
                <span className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded-full">
                  {selectedCount}/{CATEGORIES.length}
                </span>
              </div>

              <div className="space-y-2.5 mb-6">
                {CATEGORIES.map((cat) => {
                  const part = selections[cat.key];
                  return (
                    <div
                      key={cat.key}
                      className={`flex items-center justify-between text-xs py-1.5 ${part ? "" : "opacity-40"}`}
                    >
                      <span className="text-text-muted flex items-center gap-1.5">
                        <span>{cat.emoji}</span>
                        <span className="truncate max-w-[120px]">{cat.label}</span>
                      </span>
                      {part ? (
                        <span className="text-text-secondary font-medium truncate max-w-[150px] text-right">
                          ${part.price}
                        </span>
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border-subtle pt-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-white">Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-gradient"
                  >
                    ${total.toLocaleString()}
                  </motion.span>
                </div>
              </div>

              {warnings.length > 0 && (
                <div className="space-y-2 mb-5">
                  {warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs bg-orange-400/10 border border-orange-400/20 text-orange-400 rounded-lg px-3 py-2">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting || selectedCount === 0}
                className="glass-btn flex items-center justify-center gap-2 text-sm w-full py-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <MessageCircle size={16} />
                )}
                {submitting ? "Sending..." : "Send Build via WhatsApp"}
              </button>

              <p className="text-[11px] text-text-muted text-center mt-3">
                Or call us at +263 77 306 6041
              </p>
            </div>

            <div className="glass-card-static p-6 rounded-2xl">
              <h3 className="font-heading text-sm font-bold text-text-white mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-accent-blue" />
                Estimated Performance
              </h3>

              <div className="space-y-3 mb-5">
                <PerformanceBar
                  label="Gaming"
                  value={performance.gamingRating}
                  color="bg-gradient-to-r from-accent-blue to-accent-purple"
                />
                <PerformanceBar
                  label="Productivity"
                  value={performance.productivityRating}
                  color="bg-gradient-to-r from-accent-cyan to-accent-blue"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-border-subtle">
                <span className="text-xs text-text-muted">Overall Value</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  performance.value === "Ultra"
                    ? "bg-purple-400/15 text-purple-400"
                    : performance.value === "High"
                    ? "bg-accent-blue/15 text-accent-blue"
                    : performance.value === "Medium"
                    ? "bg-accent-cyan/15 text-accent-cyan"
                    : "bg-white/5 text-text-muted"
                }`}>
                  {performance.value}
                </span>
              </div>
            </div>

            <div className="glass-card-static p-6 rounded-2xl">
              <h3 className="font-heading text-sm font-bold text-text-white mb-3">Why Radeon Tech?</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Zap, text: "Expert component selection advice" },
                  { icon: Star, text: "Competitive Zimbabwe pricing" },
                  { icon: CheckCircle, text: "Professional assembly & testing" },
                  { icon: TrendingUp, text: "Upgrade-ready configurations" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-text-secondary">
                      <Icon size={13} className="text-accent-blue shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
