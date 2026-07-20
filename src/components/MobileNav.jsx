import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ShoppingBag, Wrench, Phone, Bot } from "lucide-react";
import { WHATSAPP } from "../content/data";

const tabs = [
  { label: "Home", icon: Home, href: "#home", isHash: true },
  { label: "Shop", icon: ShoppingBag, to: "/shop" },
  { label: "Build", icon: Wrench, to: "/pc-builder" },
  { label: "Repair", icon: Phone, external: true, href: WHATSAPP },
  { label: "AI", icon: Bot, action: "ai" },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const isActive = (tab) => {
    if (tab.to) return location.pathname === tab.to;
    if (tab.isHash && isHome) return true;
    return false;
  };

  const handleTabClick = (tab) => {
    if (tab.action === "ai") {
      window.dispatchEvent(new Event("toggle-ai-assistant"));
      return;
    }
    if (tab.external) {
      window.open(tab.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (tab.to) {
      navigate(tab.to);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    if (tab.isHash) {
      if (!isHome) {
        navigate("/");
      } else {
        const el = document.querySelector(tab.href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 safe-area-bottom"
      aria-label="Mobile bottom navigation"
    >
      <div className="bg-bg-primary/80 backdrop-blur-xl border-t border-border-subtle/50">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab);
            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab)}
                className={`relative flex flex-col items-center justify-center gap-0.5 w-14 py-1 rounded-xl transition-colors cursor-pointer ${
                  active ? "text-accent-blue" : "text-text-muted"
                }`}
                aria-label={tab.label}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-0.5 w-6 h-0.5 rounded-full bg-accent-blue"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-[10px] font-medium leading-none">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
