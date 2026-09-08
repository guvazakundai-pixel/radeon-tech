import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 120 && !hidden) setHidden(true);
      else if (y < lastY.current && hidden) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

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
      className="lg:hidden fixed inset-0 z-50 pointer-events-none safe-area-bottom"
      aria-label="Mobile bottom navigation"
    >
      <div className={`bottom-capsule pointer-events-auto ${hidden ? "hidden" : ""}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab);
          return (
            <button
              key={tab.label}
              onClick={() => handleTabClick(tab)}
              className={`capsule-tab ${active ? "active" : ""}`}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={19} strokeWidth={active ? 2.2 : 1.6} />
              <span className="capsule-tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
