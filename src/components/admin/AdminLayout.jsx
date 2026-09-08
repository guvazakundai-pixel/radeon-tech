import { useState } from "react";
import { NavLink, Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, FileText, Images, ShieldCheck,
  LogOut, Menu, X, Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", to: "/admin/products", icon: ShoppingBag },
  { label: "Site Content", to: "/admin/cms", icon: FileText },
  { label: "Media Library", to: "/admin/media", icon: Images },
  { label: "Security", to: "/admin/security", icon: ShieldCheck },
];

function SidebarContent({ onNavigate }) {
  const { admin, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5 no-underline" onClick={onNavigate}>
          <div className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center shadow-lg shadow-accent-blue/20">
            <Zap size={17} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-text-white font-bold text-sm leading-tight tracking-tight">Radeon Tech</p>
            <p className="text-text-muted text-[11px] leading-tight">Admin Panel</p>
          </div>
        </Link>
      </div>

      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="w-7 h-7 rounded-lg bg-accent-blue/15 flex items-center justify-center font-heading font-bold text-accent-blue text-xs">
            {(admin?.username || "A").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-white truncate leading-tight">
              {admin?.username || "admin"}
            </p>
            <p className="text-[10px] text-text-muted truncate leading-tight">
              {admin?.role === "MASTER_ADMIN" ? "Master Admin" : "Admin"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Admin navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            location.pathname === item.to ||
            (item.to === "/admin/dashboard" && location.pathname === "/admin");
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                  isActive || active
                    ? "bg-accent-blue/15 text-accent-blue"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/[0.03]"
                }`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <button
          onClick={() => {
            logout();
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-text-muted text-sm font-light">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-bg-primary">
      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-bg-secondary border-r border-white/[0.06] lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 cursor-pointer z-10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              <SidebarContent onNavigate={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-bg-secondary border-r border-white/[0.06] min-h-screen">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden sticky top-0 z-30 bg-bg-secondary/90 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <span className="text-sm font-semibold text-text-white">Admin Panel</span>
        </div>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}