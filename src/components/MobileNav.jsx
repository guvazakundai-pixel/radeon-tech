import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ShoppingBag, Wrench, Phone, Bot } from "lucide-react";
import { WHATSAPP } from "../content/data";

const tabs = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Shop", icon: ShoppingBag, to: "/store" },
  { label: "Repairs", icon: Wrench, to: "/repairs" },
  { label: "Call", icon: Phone, external: true, href: WHATSAPP },
  { label: "AI", icon: Bot, action: "ai" },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (tab) => {
    if (tab.to) {
      if (tab.to === "/") return location.pathname === "/";
      return location.pathname.startsWith(tab.to);
    }
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
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 safe-area-bottom"
      aria-label="Mobile bottom navigation"
    >
      <div className="bottom-bar relative">
        <div className="flex items-center justify-around h-16 px-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab);
            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab)}
                className={`relative flex flex-col items-center justify-center gap-1 w-14 py-1.5 rounded-xl transition-all duration-300 cursor-pointer ${
                  active
                    ? "text-accent-blue"
                    : "text-text-muted hover:text-text-secondary"
                }`}
                aria-label={tab.label}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-0.5 w-5 h-0.5 rounded-full bg-accent-blue"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon size={19} strokeWidth={active ? 2.2 : 1.6} />
                <span className="text-[10px] font-medium leading-none tracking-wide">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
