import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle, Check, Wand2, ArrowRight, RotateCcw } from "lucide-react";
import { WHATSAPP } from "../content/data";

const DEVICE_KEYWORDS = [
  "hp", "dell", "lenovo", "asus", "acer", "msi", "macbook", "imac", "mac",
  "apple", "iphone", "ipad", "samsung", "huawei", "toshiba", "fujitsu",
  "razer", "alienware", "omen", "legion", "rog", "predator", "thinkpad",
  "gigabyte", "xbox", "playstation", "ps4", "ps5", "monitor", "printer",
  "server", "tablet", "tower", "desktop", "pc", "laptop",
];

const CONTEXT_PATTERNS = [
  /\b(fc\s?\d{2}|cod|gta|fortnite|minecraft|valorant|league of legends|fifa|cyberpunk|cs2|csgo|pubg|elden ring|red dead|warzone|destiny|apex|overwatch)\b/i,
  /(?:when|while|during|whenever)\b[^.,!]{0,90}/i,
];

const SYMPTOM_MAP = [
  {
    id: "shutdown",
    keywords: ["shut", "shutting", "turn off", "turns off", "powers off", "restart", "reboot", "crash", "freez", "dies", "cut off", "blue screen", "bsod"],
    services: ["Investigate unexpected shutdowns / restarts", "Check system stability"],
  },
  {
    id: "fans",
    keywords: ["fan", "noisy", "noise", "loud", "whirring", "whine"],
    services: ["Inspect cooling system & fans"],
  },
  {
    id: "overheat",
    keywords: ["overheat", "overheating", "hot", "thermal", "burn"],
    services: ["Diagnose overheating", "Inspect cooling system"],
  },
  {
    id: "power",
    keywords: ["won't turn on", "wont turn on", "no power", "not powering", "doesn't turn on", "does not turn on", "dead", "no display", "black screen"],
    services: ["Diagnose power & start-up fault", "Check display / no-signal issue"],
  },
  {
    id: "performance",
    keywords: ["slow", "laggy", "lag", "performance", "stuck", "hangs", "hanging"],
    services: ["Diagnose performance issues"],
  },
  {
    id: "virus",
    keywords: ["virus", "malware", "hacked", "ransom", "popup", "pop up", "adware", "trojan"],
    services: ["Run security scan", "Virus & malware removal"],
  },
  {
    id: "screen",
    keywords: ["screen", "cracked", "display", "backlight", "crack", "lines on"],
    services: ["Screen & display inspection"],
  },
  {
    id: "battery",
    keywords: ["battery", "charging", "not charging", "charge", "drain"],
    services: ["Battery & charging system check"],
  },
  {
    id: "hardware",
    keywords: ["clicking", "grinding", "rattling", "smell", "burning smell"],
    services: ["Full hardware diagnostics"],
  },
  {
    id: "liquid",
    keywords: ["liquid", "water", "spill", "spilled", "fell in", "rain"],
    services: ["Liquid damage assessment & cleaning"],
  },
  {
    id: "keyboard",
    keywords: ["keyboard", "keys", "key not", "stuck key"],
    services: ["Keyboard inspection & repair"],
  },
  {
    id: "network",
    keywords: ["wifi", "wi-fi", "internet", "network", "disconnect", "bluetooth"],
    services: ["Network & connectivity diagnostics"],
  },
  {
    id: "data",
    keywords: ["recover", "data", "recovery", "lost files", "delete", "deleted", "backup"],
    services: ["Data recovery service"],
  },
];

const BRAND_CAPS = { hp: "HP", dell: "Dell", lenovo: "Lenovo", asus: "ASUS", acer: "Acer", msi: "MSI", macbook: "MacBook", imac: "iMac", mac: "Mac", apple: "Apple", iphone: "iPhone", ipad: "iPad", samsung: "Samsung", huawei: "Huawei", toshiba: "Toshiba", fujitsu: "Fujitsu", razer: "Razer", alienware: "Alienware", omen: "OMEN", legion: "Legion", rog: "ROG", predator: "Predator", thinkpad: "ThinkPad", gigabyte: "Gigabyte", xbox: "Xbox", playstation: "PlayStation", ps4: "PS4", ps5: "PS5", monitor: "Monitor", printer: "Printer", server: "Server", tablet: "Tablet", tower: "Tower", desktop: "Desktop", pc: "PC", laptop: "Laptop" };

function extractFromFreeText(text) {
  const t = text.toLowerCase();
  const hits = DEVICE_KEYWORDS.filter((k) => new RegExp(`\\b${k.replace(/\s+/g, "\\s+")}\\b`).test(t));
  const ordered = DEVICE_KEYWORDS.filter((k) => hits.includes(k));
  let device = ordered.map((k) => BRAND_CAPS[k] || k).join(" ");

  // "HP Omen" style compound brand + model line
  if (t.includes("omen") && (t.includes("hp") || t.includes("hewlett"))) device = "HP OMEN";
  if (t.includes("legion") && t.includes("lenovo")) device = "Lenovo Legion";
  if (t.includes("rog") && t.includes("asus")) device = "ASUS ROG";

  // Symptom → service tasks
  const services = [];
  const issueLines = [];
  SYMPTOM_MAP.forEach((s) => {
    const matched = s.keywords.some((k) => t.includes(k));
    if (matched) {
      s.services.forEach((sv) => services.push(sv));
      issueLines.push(s.id);
    }
  });
  if (services.length === 0) services.push("Full diagnostic & inspection");

  // Context clause: what / when
  let context = "";
  for (const re of CONTEXT_PATTERNS) {
    const m = text.match(re);
    if (m && m[0].length > 3) {
      context = m[0].replace(/\s+/g, " ").trim().replace(/[.;:,]+$/, "");
      break;
    }
  }

  return { device, services: [...new Set(services)], context: context || "" };
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("menu"); // menu | intake | followup | review | done
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [pendingField, setPendingField] = useState(""); // which follow-up is pending
  const [task, setTask] = useState({ device: "", services: [], context: "", name: "" });
  const bottomRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-ai-assistant", handler);
    return () => window.removeEventListener("toggle-ai-assistant", handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, mode]);

  const botSay = (text, hint) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: `b-${Date.now()}-${Math.random()}`, role: "bot", text, hint }]);
    }, 380);
  };

  const userSay = (text, id) => setMessages((prev) => [...prev, { id: id || `u-${Date.now()}-${Math.random()}`, role: "user", text }]);

  const startIntake = () => {
    setTask({ device: "", services: [], context: "", name: "" });
    setMessages([]);
    setMode("intake");
    botSay("Tell me what's wrong in your own words — for example: “My HP Omen shuts down when I play and the fans are loud.” I'll turn it into a ready-to-send service request.");
  };

  const handleFreeText = (text) => {
    userSay(text);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const extracted = extractFromFreeText(text);
      const needsDevice = !extracted.device;
      setTask((prev) => ({
        device: extracted.device,
        services: extracted.services,
        context: extracted.context,
        name: prev.name,
      }));

      if (needsDevice) {
        setPendingField("device");
        setMode("followup");
        setMessages((prev) => [...prev, { id: `b-dev-${Date.now()}`, role: "bot", text: "Which device is it? (e.g. Dell Inspiron 15, desktop, MacBook…)" }]);
      } else {
        setPendingField("name");
        setMode("followup");
        setMessages((prev) => [...prev, { id: `b-name-${Date.now()}`, role: "bot", text: "Lastly — your name? (Type “skip” to continue without it.)", hint: "optional" }]);
      }
    }, 500);
  };

  const handleFollowup = (text) => {
    userSay(text);
    if (pendingField === "device") {
      if (text.toLowerCase() !== "skip") {
        setTask((prev) => ({ ...prev, device: text }));
      } else {
        setTask((prev) => ({ ...prev, device: prev.device || "Not specified" }));
      }
    } else if (pendingField === "name") {
      if (text.toLowerCase() !== "skip") setTask((prev) => ({ ...prev, name: text }));
    }
    setPendingField("");
    setMode("review");
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: `b-sum-${Date.now()}`,
        role: "bot",
        text: "Here's your request. You can send it straight to our team on WhatsApp.",
      }]);
    }, 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    if (mode === "intake") handleFreeText(text);
    else if (mode === "followup") handleFollowup(text);
  };

  const buildWhatsAppMessage = () => {
    const lines = [];
    lines.push("Hello Radeon Tech 👋");
    lines.push("");
    lines.push("I would like assistance with the following.");
    lines.push("");
    lines.push("CUSTOMER SERVICE REQUEST");
    lines.push("────────────────────────");
    lines.push("");
    lines.push(`Device: ${task.device || "Not specified"}`);
    lines.push(`Name: ${task.name || "Not provided"}`);
    lines.push("");
    lines.push("Requested service:");
    task.services.forEach((s) => lines.push(`• ${s}`));
    if (task.context) {
      lines.push("");
      lines.push(`Notes / context: ${task.context}`);
    }
    lines.push("");
    lines.push("Source: Radeon Tech Website AI Assistant");
    lines.push("");
    lines.push("Please let me know the next steps and estimated cost.");
    return lines.join("\n");
  };

  const sendWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    if (typeof window !== "undefined") {
      window.open(`${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    }
    setMode("done");
  };

  const reset = () => {
    setMessages([]);
    setTask({ device: "", services: [], context: "", name: "" });
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
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[80] sm:w-[420px] sm:h-[min(620px,calc(100vh-140px))] sm:rounded-2xl bg-bg-secondary border border-white/[0.07] sm:shadow-2xl flex flex-col overflow-hidden"
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
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-3">
                      <Wand2 size={18} className="text-accent-blue" />
                    </div>
                    <h3 className="text-base font-semibold text-text-white mb-1">Start a service request</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Describe your problem and I'll prepare a clear, ready-to-send request for our team on WhatsApp — no lengthy forms needed.
                    </p>
                    <button
                      onClick={startIntake}
                      className="mt-4 w-full flex items-center justify-center gap-2 glass-btn text-sm py-3.5 cursor-pointer"
                    >
                      Start Service Request <ArrowRight size={14} />
                    </button>
                  </div>
                  <p className="text-[11px] text-text-muted uppercase tracking-wider">What can you help with?</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Laptop won't turn on", "Overheating & loud fans", "Virus / slow device", "Screen cracked", "Data recovery"].map((q) => (
                      <button
                        key={q}
                        onClick={() => { startIntake(); setTimeout(() => handleFreeText(q), 450); }}
                        className="text-[11px] px-3 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-text-secondary hover:text-white hover:border-white/[0.16] transition-colors cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
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
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-accent-blue/50"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Review panel */}
              {mode === "review" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                  className="bg-accent-blue/[0.05] border border-accent-blue/15 rounded-2xl p-5"
                >
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-3 flex items-center gap-1.5">
                    <Check size={12} /> Your request
                  </h4>
                  <dl className="space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <dt className="text-[11px] text-text-muted">Device</dt>
                      <dd className="text-xs text-text-white text-right">{task.device || "Not specified"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-text-muted mb-1.5">Requested service</dt>
                      <dd className="space-y-1.5">
                        {task.services.map((s) => (
                          <div key={s} className="flex items-start gap-2 text-xs text-text-white">
                            <Check size={13} className="text-green-400 shrink-0 mt-0.5" /> {s}
                          </div>
                        ))}
                      </dd>
                    </div>
                    {task.context && (
                      <div className="flex justify-between items-baseline">
                        <dt className="text-[11px] text-text-muted">Notes</dt>
                        <dd className="text-xs text-text-secondary text-right max-w-[65%]">“{task.context}”</dd>
                      </div>
                    )}
                  </dl>
                  <button
                    onClick={sendWhatsApp}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-[#0B2D1E] text-sm font-semibold hover:bg-[#2FE479] transition-colors cursor-pointer border-none"
                  >
                    <MessageCircle size={15} /> Send Request to Radeon Tech
                  </button>
                  <button
                    onClick={reset}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <RotateCcw size={11} /> Start over
                  </button>
                </motion.div>
              )}

              {/* Done state — WhatsApp opened, user must press send */}
              {mode === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-3">
                    <MessageCircle size={22} className="text-[#25D366]" />
                  </div>
                  <h4 className="text-sm font-semibold text-text-white mb-1">WhatsApp is opening…</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Your request is pre-filled and ready. Press <strong className="text-text-white">Send</strong> in WhatsApp to confirm — our team will reply with next steps and a quote.
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
            {mode !== "review" && mode !== "done" && (
              <div className="px-4 pb-4 pt-2 shrink-0">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      mode === "intake"
                        ? "Describe the issue…"
                        : mode === "followup"
                          ? (pendingField === "device" ? "e.g. HP Omen 17…" : "Your name…")
                          : ""
                    }
                    autoFocus
                    className="flex-1 bg-transparent text-sm text-text-white placeholder:text-text-muted focus:outline-none"
                    aria-label="Message"
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
                {mode === "followup" && pendingField === "name" && (
                  <button
                    onClick={() => handleFollowup("skip")}
                    className="mt-2 text-[11px] text-text-muted hover:text-text-secondary transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Skip name
                  </button>
                )}
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