import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle, Check, Wand2, ArrowRight, RotateCcw } from "lucide-react";
import { WHATSAPP } from "../content/data";

const BOT_ID = "rt-ai";

function formatSummary(task) {
  const lines = [];
  lines.push("NEW SERVICE REQUEST");
  lines.push("──────────────────");
  if (task.service) lines.push(`Service: ${task.service}`);
  if (task.device) lines.push(`Device: ${task.device}`);
  if (task.issue) lines.push(`Issue: ${task.issue}`);
  if (task.name) lines.push(`Name: ${task.name}`);
  if (task.preferred) lines.push(`Preferred contact: ${task.preferred}`);
  return lines.join("\n");
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("menu"); // menu | intake | reviewing | sent
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [task, setTask] = useState({ service: "", device: "", issue: "", name: "", preferred: "WhatsApp" });
  const [step, setStep] = useState(0); // which field is being captured
  const bottomRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-ai-assistant", handler);
    return () => window.removeEventListener("toggle-ai-assistant", handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, mode]);

  const fields = [
    { key: "service", label: "Which service do you need?", hint: "e.g. laptop repair, data recovery, virus removal…" },
    { key: "device", label: "What type of device is it?", hint: "Laptop, Desktop, MacBook, Gaming PC, Tablet…" },
    { key: "issue", label: "Briefly describe the issue", hint: "What's going wrong? e.g. won't turn on, screen cracked, slow…" },
    { key: "name", label: "Your name (so we know who to expect)", hint: "" },
    { key: "preferred", label: "Preferred way to contact you?", hint: "WhatsApp / Phone / Email" },
  ];

  const startIntake = () => {
    setTask({ service: "", device: "", issue: "", name: "", preferred: "WhatsApp" });
    setStep(0);
    setMode("intake");
    askField(0);
  };

  const askField = (index) => {
    const f = fields[index];
    if (!f) return;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: `${BOT_ID}-q-${index}`, role: "bot", text: f.label, hint: f.hint || undefined }]);
    }, 400);
  };

  const capture = (value) => {
    const field = fields[step];
    if (!field) return;
    setTask((prev) => ({ ...prev, [field.key]: value }));
    setMessages((prev) => [...prev, { id: `${BOT_ID}-u-${step}-${Date.now()}`, role: "user", text: value }]);

    const next = step + 1;
    if (next < fields.length) {
      setStep(next);
      setTimeout(() => askField(next), 300);
    } else {
      setStep(next);
      setMode("reviewing");
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { id: `${BOT_ID}-done`, role: "bot", text: "Got it! Here's a summary of your request. Send it to our team on WhatsApp to get started." }]);
      }, 400);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (mode === "intake" && step < fields.length) {
      capture(input.trim());
      setInput("");
    }
  };

  const sendWhatsApp = () => {
    const msg = formatSummary(task);
    window.open(`${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setMode("sent");
  };

  const reset = () => {
    setMessages([]);
    setMode("menu");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-4 sm:right-6 z-[80] sm:w-[420px] sm:h-[min(620px,calc(100vh-140px))] sm:rounded-2xl bg-bg-secondary border border-white/[0.07] sm:shadow-2xl sm:shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center shadow-lg shadow-accent-blue/20">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-white tracking-tight">Service Assistant</p>
                  <p className="text-[11px] text-green-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Describe your request
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {mode === "menu" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-3">
                      <Wand2 size={18} className="text-accent-blue" />
                    </div>
                    <h3 className="text-base font-semibold text-text-white mb-1">Start a service request</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Tell me what you need and I'll prepare a ready-to-send request for our team on WhatsApp.
                    </p>
                    <button
                      onClick={startIntake}
                      className="mt-4 w-full flex items-center justify-center gap-2 glass-btn text-sm py-3 cursor-pointer"
                    >
                      Start Service Request <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="pt-1">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2.5">Or ask a quick question</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Where are you located?", "What are your hours?", "Do you accept EcoCash?"].map((q) => (
                        <button
                          key={q}
                          onClick={() => startIntake()}
                          className="text-[11px] px-3 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-text-secondary hover:text-white hover:border-white/[0.16] transition-colors cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {mode !== "menu" && (
                <>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        m.role === "user"
                          ? "bg-accent-blue/15 border border-accent-blue/20 text-text-white text-[13px]"
                          : "bg-white/[0.04] border border-white/[0.06] text-text-secondary text-[13px] leading-relaxed"
                      }`}>
                        <p>{m.text}</p>
                        {m.hint && <p className="text-[11px] text-text-muted mt-1">{m.hint}</p>}
                      </div>
                    </motion.div>
                  ))}

                  {typing && (
                    <div className="flex items-center gap-1.5 px-4">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-accent-blue/50"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Task summary panel */}
              {mode === "reviewing" && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                  className="bg-accent-blue/[0.05] border border-accent-blue/15 rounded-2xl p-5"
                >
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-3 flex items-center gap-1.5">
                    <Check size={12} /> Request Summary
                  </h4>
                  <div className="space-y-2.5">
                    {fields.map((f) => (
                      <div key={f.key} className="flex justify-between items-baseline">
                        <span className="text-[11px] text-text-muted">{f.label}</span>
                        <span className="text-xs text-text-white text-right max-w-[60%]">
                          {task[f.key] || <span className="text-text-muted">—</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={sendWhatsApp}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-[#0B2D1E] text-sm font-semibold hover:bg-[#2FE479] transition-colors cursor-pointer border-none"
                  >
                    <MessageCircle size={15} /> Send via WhatsApp
                  </button>
                  <button
                    onClick={reset}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <RotateCcw size={11} /> Start over
                  </button>
                </motion.div>
              )}

              {mode === "sent" && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-3">
                    <Check size={22} className="text-[#25D366]" />
                  </div>
                  <h4 className="text-sm font-semibold text-text-white mb-1">Request sent!</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Your request is being opened in WhatsApp. Our team will respond shortly with a quote or next steps.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-4 text-xs text-accent-blue hover:underline cursor-pointer bg-transparent border-none"
                  >
                    Start another request
                  </button>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {mode === "intake" && step < fields.length && (
              <div className="px-4 pb-4 pt-2 shrink-0">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={fields[step].hint || "Type your answer…"}
                    autoFocus
                    className="flex-1 bg-transparent text-sm text-text-white placeholder:text-text-muted focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="p-2 rounded-lg bg-accent-blue/15 text-accent-blue hover:bg-accent-blue/25 transition-colors cursor-pointer disabled:opacity-30 border-none"
                    aria-label="Next"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB - desktop only (mobile uses capsule AI tab) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden lg:flex fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full bg-accent-blue shadow-lg shadow-accent-blue/25 items-center justify-center text-white cursor-pointer"
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
