import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, User, AlertTriangle, Calendar,
  MessageCircle, ChevronRight, ChevronLeft, CheckCircle,
  Camera, X, Loader2, Clock, Search, Stethoscope,
  ShieldCheck,
} from "lucide-react";
import { WHATSAPP } from "../content/data";

const DEVICE_TYPES = ["Laptop", "Desktop", "MacBook", "Gaming Console", "Tablet", "Printer", "Other"];

const URGENCY_LEVELS = [
  { value: "Low", label: "Low", desc: "No rush, within a week", color: "text-green-400" },
  { value: "Medium", label: "Medium", desc: "Within 2-3 days", color: "text-yellow-400" },
  { value: "High", label: "High", desc: "Within 24 hours", color: "text-orange-400" },
  { value: "Critical", label: "Critical", desc: "ASAP — urgent", color: "text-red-400" },
];

const TIME_SLOTS = ["Morning", "Afternoon", "Any Time"];

const HOW_IT_WORKS = [
  { icon: MessageCircle, title: "Submit Request", desc: "Fill in your device details and problem description" },
  { icon: Search, title: "Free Diagnosis", desc: "Our technicians assess your device at no cost" },
  { icon: Stethoscope, title: "Get a Quote", desc: "We provide a transparent repair quote before starting" },
  { icon: Wrench, title: "Expert Repair", desc: "Quality parts and professional repair by certified techs" },
  { icon: ShieldCheck, title: "Warranty Backed", desc: "All repairs come with our service warranty" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ProgressBar({ step, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < step
                ? "bg-gradient-to-br from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-blue/20"
                : i === step
                ? "bg-accent-blue/20 text-accent-blue border-2 border-accent-blue"
                : "bg-white/5 text-text-muted border border-border-subtle"
            }`}
          >
            {i < step ? <CheckCircle size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-8 h-0.5 rounded-full transition-all duration-300 ${i < step ? "bg-accent-blue" : "bg-border-subtle"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function RepairBooking() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    deviceType: "",
    brand: "",
    model: "",
    problem: "",
    urgency: "Medium",
    preferredDate: "",
    preferredTime: "Any Time",
    photos: [],
  });

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validateStep = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.fullName.trim()) e.fullName = "Full name is required";
      if (!form.phone.trim()) e.phone = "Phone number is required";
      if (!form.deviceType) e.deviceType = "Please select a device type";
    }
    if (s === 1) {
      if (!form.problem.trim()) e.problem = "Problem description is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = 3 - form.photos.length;
    const newPhotos = files.slice(0, remaining).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    update("photos", [...form.photos, ...newPhotos]);
  };

  const removePhoto = (idx) => {
    const updated = form.photos.filter((_, i) => i !== idx);
    update("photos", updated);
  };

  const generateMessage = () => {
    const dateStr = form.preferredDate
      ? new Date(form.preferredDate + "T00:00:00").toLocaleDateString("en-ZW", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
      : "Not specified";

    return `🔧 New Repair Request

👤 Name: ${form.fullName}
📱 Phone: +263 ${form.phone}

💻 Device Information:
• Type: ${form.deviceType}
• Brand: ${form.brand || "Not specified"}
• Model: ${form.model || "Not specified"}

⚠️ Problem: ${form.problem}
⏰ Urgency: ${form.urgency}

📅 Preferred: ${dateStr} | ${form.preferredTime}

Please assist.`;
  };

  const handleSubmit = async () => {
    if (!validateStep(0) || !validateStep(1)) return;

    setSubmitting(true);

    const message = generateMessage();
    const whatsappUrl = `${WHATSAPP}?text=${encodeURIComponent(message)}`;

    try {
      await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: `+263 ${form.phone}`,
          preferredDate: form.preferredDate || null,
          photos: form.photos.map((p) => p.name),
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
            Request Submitted!
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            Your repair request has been sent via WhatsApp. Our team will review it and get back to you promptly.
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
                setStep(0);
                setForm({
                  fullName: "", phone: "", deviceType: "", brand: "",
                  model: "", problem: "", urgency: "Medium",
                  preferredDate: "", preferredTime: "Any Time", photos: [],
                });
              }}
              className="glass-btn-outline inline-flex items-center justify-center gap-2 text-sm px-6 py-3 cursor-pointer"
            >
              Submit Another Request
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
            <Wrench size={14} className="text-accent-blue" />
            <span className="text-xs font-semibold text-accent-blue tracking-wide">REPAIR SERVICES</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-white">
            Book a <span className="text-gradient">Repair</span>
          </h1>
          <p className="section-subtitle mt-3">
            Describe your issue and we&apos;ll get your device back to perfect condition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card-static p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <ProgressBar step={step} total={3} />
                <span className="text-xs text-text-muted hidden sm:block">Step {step + 1} of 3</span>
              </div>

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3 className="font-heading text-lg font-bold text-text-white flex items-center gap-2">
                      <User size={18} className="text-accent-blue" />
                      Personal & Device Info
                    </h3>

                    <InputField label="Full Name" required error={errors.fullName}>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="e.g. John Moyo"
                        className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all"
                      />
                    </InputField>

                    <InputField label="Phone Number" required error={errors.phone}>
                      <div className="flex">
                        <span className="flex items-center gap-1.5 bg-white/[0.03] border border-border-subtle border-r-0 rounded-l-lg px-3 text-sm text-text-secondary">
                          <span className="text-xs">🇿🇼</span> +263
                        </span>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 9))}
                          placeholder="77 306 6041"
                          className="flex-1 bg-white/5 border border-border-subtle rounded-r-lg px-4 py-3 text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all"
                        />
                      </div>
                    </InputField>

                    <InputField label="Device Type" required error={errors.deviceType}>
                      <select
                        value={form.deviceType}
                        onChange={(e) => update("deviceType", e.target.value)}
                        className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-bg-card">Select device type</option>
                        {DEVICE_TYPES.map((d) => (
                          <option key={d} value={d} className="bg-bg-card">{d}</option>
                        ))}
                      </select>
                    </InputField>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Brand" error={errors.brand}>
                        <input
                          type="text"
                          value={form.brand}
                          onChange={(e) => update("brand", e.target.value)}
                          placeholder="e.g. HP, Dell, ASUS"
                          className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all"
                        />
                      </InputField>
                      <InputField label="Model" error={errors.model}>
                        <input
                          type="text"
                          value={form.model}
                          onChange={(e) => update("model", e.target.value)}
                          placeholder="e.g. Pavilion 15"
                          className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all"
                        />
                      </InputField>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3 className="font-heading text-lg font-bold text-text-white flex items-center gap-2">
                      <AlertTriangle size={18} className="text-accent-blue" />
                      Problem Details
                    </h3>

                    <InputField label="Describe the Problem" required error={errors.problem}>
                      <textarea
                        value={form.problem}
                        onChange={(e) => update("problem", e.target.value)}
                        rows={5}
                        placeholder="Please describe the issue in detail — when it started, any error messages, what happens when you try to use the device..."
                        className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all resize-none"
                      />
                    </InputField>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-3">
                        How urgent is this? <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {URGENCY_LEVELS.map((u) => (
                          <button
                            key={u.value}
                            type="button"
                            onClick={() => update("urgency", u.value)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              form.urgency === u.value
                                ? "border-accent-blue/50 bg-accent-blue/10"
                                : "border-border-subtle bg-white/[0.02] hover:bg-white/[0.04]"
                            }`}
                          >
                            <span className={`text-sm font-semibold ${form.urgency === u.value ? u.color : "text-text-white"}`}>
                              {u.label}
                            </span>
                            <p className="text-[11px] text-text-muted mt-0.5">{u.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Photos (optional)
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {form.photos.map((photo, idx) => (
                          <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border-subtle">
                            <img src={photo.preview} alt={photo.name} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-500 transition-colors cursor-pointer"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                        {form.photos.length < 3 && (
                          <label className="w-20 h-20 rounded-xl border-2 border-dashed border-border-subtle flex flex-col items-center justify-center text-text-muted hover:border-accent-blue/40 hover:text-accent-blue transition-all cursor-pointer">
                            <Camera size={18} />
                            <span className="text-[10px] mt-1">Add</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-[11px] text-text-muted mt-1.5">Max 3 images. JPG, PNG accepted.</p>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3 className="font-heading text-lg font-bold text-text-white flex items-center gap-2">
                      <Calendar size={18} className="text-accent-blue" />
                      Schedule & Confirm
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Preferred Date" error={errors.preferredDate}>
                        <input
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => update("preferredDate", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all cursor-pointer"
                        />
                      </InputField>
                      <InputField label="Preferred Time" error={errors.preferredTime}>
                        <select
                          value={form.preferredTime}
                          onChange={(e) => update("preferredTime", e.target.value)}
                          className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all appearance-none cursor-pointer"
                        >
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t} className="bg-bg-card">{t}</option>
                          ))}
                        </select>
                      </InputField>
                    </div>

                    <div className="glass p-5 rounded-xl space-y-3">
                      <h4 className="text-sm font-semibold text-text-white">Request Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-muted">Name</span>
                          <span className="text-text-secondary">{form.fullName || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Phone</span>
                          <span className="text-text-secondary">+263 {form.phone || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Device</span>
                          <span className="text-text-secondary">
                            {form.deviceType}{form.brand ? ` (${form.brand})` : ""}{form.model ? ` — ${form.model}` : ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Urgency</span>
                          <span className={`font-medium ${URGENCY_LEVELS.find((u) => u.value === form.urgency)?.color}`}>
                            {form.urgency}
                          </span>
                        </div>
                        {form.preferredDate && (
                          <div className="flex justify-between">
                            <span className="text-text-muted">Date</span>
                            <span className="text-text-secondary">
                              {new Date(form.preferredDate + "T00:00:00").toLocaleDateString("en-ZW", { year: "numeric", month: "short", day: "numeric" })} — {form.preferredTime}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="glass-card-static p-4 rounded-xl">
                      <div className="flex items-start gap-3">
                        <MessageCircle size={18} className="text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-text-white">Send via WhatsApp</p>
                          <p className="text-xs text-text-muted mt-0.5">
                            Your request will be sent directly to our WhatsApp for a fast response. You can also call us at +263 77 306 6041.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-subtle">
                {step > 0 ? (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 2 ? (
                  <button
                    onClick={nextStep}
                    className="glass-btn flex items-center gap-2 text-sm px-6 py-2.5 cursor-pointer"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="glass-btn flex items-center gap-2 text-sm px-8 py-2.5 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <MessageCircle size={16} />
                    )}
                    {submitting ? "Sending..." : "Send Request"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card-static p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold text-text-white mb-5">How It Works</h3>
              <div className="space-y-4">
                {HOW_IT_WORKS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-accent-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-white">{item.title}</p>
                        <p className="text-xs text-text-muted leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-card-static p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold text-text-white mb-4">Need Help?</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Contact us directly on WhatsApp for immediate assistance or to ask any questions.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn flex items-center justify-center gap-2 text-sm w-full py-3 no-underline"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
              <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                <Clock size={12} />
                <span>Mon–Fri 8AM–5PM · Sat 9AM–1PM</span>
              </div>
            </div>

            <div className="glass-card-static p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold text-text-white mb-4">What We Fix</h3>
              <div className="flex flex-wrap gap-2">
                {["Screen Repair", "Battery", "Keyboard", "Motherboard", "Data Recovery", "Virus Removal", "Charging Port", "Overheating", "Software Issues"].map((tag) => (
                  <span key={tag} className="text-[11px] text-text-secondary bg-white/5 border border-border-subtle px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
