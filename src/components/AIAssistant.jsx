import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle, Send, Loader2, ExternalLink } from "lucide-react";
import { WHATSAPP } from "../content/data";

const KB = [
  { q: "services|what do you do|what services|repair", a: "We offer: Laptop Repairs, Desktop Repairs, MacBook Repairs, Gaming PC Repairs, Virus Removal, Data Recovery, Windows Installation, Networking Setup, Business IT Support, and Custom PC Builds. What can we help with?", link: "#services" },
  { q: "hours|open|when|time|schedule", a: "We're open Monday–Friday 8:00 AM–5:00 PM and Saturday 9:00 AM–1:00 PM. Closed Sundays.", link: null },
  { q: "location|where|address|find you|directions", a: "We're at Cyrus Mall Shop C20, Corner Mbuya Nehanda & Speke, Harare, Zimbabwe. Come visit us!", link: null },
  { q: "price|cost|how much|quote|pricing", a: "We offer free diagnosis and no-obligation quotes. Costs depend on the issue and parts needed. You'll get a clear quote before any work begins.", link: null },
  { q: "booking|book|schedule|appointment|repair", a: "You can book a repair directly through WhatsApp for fastest response, or fill out our online repair form.", link: "/repair" },
  { q: "custom build|build a pc|gaming pc|workstation|pc builder", a: "Use our interactive PC Builder to spec out your dream machine! Choose components, see pricing, and send us your build via WhatsApp.", link: "/pc-builder" },
  { q: "shop|buy|laptop|desktop|product|store|purchase", a: "Browse our shop for new and refurbished laptops, desktops, components, and accessories. All products come with warranty.", link: "/shop" },
  { q: "warranty|guarantee|return", a: "All repairs and products come with our service warranty. If the same issue recurs, we fix it free. Manufacturer warranties apply to all new components.", link: null },
  { q: "payment|pay|ecocash|cash|transfer", a: "We accept Cash, EcoCash, Bank Transfers, and SWIFT for international payments. Ask us what works best for you.", link: null },
  { q: "data recovery|recover files|deleted files|lost data", a: "Yes! We recover data from failed drives, corrupted storage, accidental formatting, and physical damage. Bring your device in for a free assessment.", link: "#services" },
  { q: "macbook|apple|mac repair", a: "We repair all MacBook models — screen replacement, logic board repair, battery issues, keyboard replacement, and charging port repairs.", link: "#services" },
  { q: "virus|malware|slow|computer slow|performance", a: "We remove viruses, malware, and ransomware. We also optimize slow computers — often the fix is simple and affordable. Bring it in for a free diagnosis!", link: null },
  { q: "business|office|company|enterprise|bulk", a: "We offer Managed IT, Maintenance Contracts, Office Networking, Computer Deployment, Bulk Repairs, and IT Consulting. Perfect for businesses, schools, and NGOs.", link: "#business" },
  { q: "ssd|ram|upgrade|memory|storage", a: "Yes! Common upgrades include SSD installation, RAM upgrades, and battery replacement. They can make an old laptop feel brand new. Visit us for a cost-effective upgrade.", link: null },
  { q: "whatsapp|contact|phone|call|reach", a: "Reach us on WhatsApp at +263 77 306 6041 — it's the fastest way to get a response!", link: WHATSAPP },
];

const QUICK_ACTIONS = [
  { label: "Book a Repair", msg: "I'd like to book a repair" },
  { label: "Browse Shop", msg: "Show me your shop" },
  { label: "PC Builder", msg: "I want to build a custom PC" },
  { label: "Get a Quote", msg: "I need a price quote" },
];

function findAnswer(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    const keywords = entry.q.split("|");
    if (keywords.some((kw) => lower.includes(kw))) {
      return entry;
    }
  }
  return null;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent-blue/60"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <span className="text-[11px] text-text-muted ml-1">typing...</span>
    </div>
  );
}

function ChatMessage({ msg }) {
  const isBot = msg.role === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
        isBot
          ? "bg-white/[0.06] border border-border-subtle text-text-secondary text-[13px] leading-relaxed"
          : "bg-accent-blue/15 border border-accent-blue/20 text-text-white text-[13px]"
      }`}>
        {msg.text}
        {msg.link && (
          <a href={msg.link} className="inline-flex items-center gap-1 text-accent-blue hover:underline text-xs mt-1.5">
            Learn more <ExternalLink size={10} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Radeon Tech's virtual assistant. How can I help you today? 🖥️" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-ai-assistant", handler);
    return () => window.removeEventListener("toggle-ai-assistant", handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (isOpen) setUnread(false);
  }, [isOpen]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const match = findAnswer(text);
      let botMsg;
      if (match) {
        botMsg = { role: "bot", text: match.a, link: match.link };
      } else {
        botMsg = {
          role: "bot",
          text: "I'd love to help with that! For detailed assistance, connect with us directly on WhatsApp where our team can assist you immediately.",
          link: WHATSAPP,
        };
      }
      setTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setUnread(true);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-[80] w-[calc(100vw-2rem)] sm:w-[400px] h-[min(600px,calc(100vh-140px))] bg-bg-primary/98 backdrop-blur-2xl border border-border-subtle rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-white">Radeon AI</p>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => <ChatMessage key={i} msg={m} />)}
              {typing && <TypingIndicator />}

              {messages.length <= 2 && !typing && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {QUICK_ACTIONS.map((a) => (
                    <button key={a.label} onClick={() => sendMessage(a.msg)}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-border-subtle bg-white/[0.03] text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all cursor-pointer">
                      {a.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* WhatsApp CTA */}
            <div className="px-4 pb-2 shrink-0">
              <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi Radeon Tech! I need assistance.")}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-colors no-underline">
                <MessageCircle size={13} /> Chat on WhatsApp for instant support
              </a>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2 bg-white/[0.04] border border-border-subtle rounded-xl px-3 py-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-text-white placeholder:text-text-muted focus:outline-none" />
                <button type="submit" disabled={!input.trim() || typing}
                  className="p-1.5 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors cursor-pointer disabled:opacity-30">
                  {typing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 right-4 sm:right-6 z-[80] w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-lg shadow-accent-blue/30 flex items-center justify-center text-white cursor-pointer"
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

        {unread && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
          >
            <span className="text-[10px] text-white font-bold">1</span>
          </motion.div>
        )}
      </motion.button>
    </>
  );
}
