import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../hooks/useContent";
import {
  ShoppingBag, AlertTriangle, Star, Trophy, Wallet, ClipboardList, Wrench,
  Loader2, ArrowRight, Image as ImageIcon, ShieldCheck,  UploadCloud,
} from "lucide-react";

function StatCard({ icon: Icon, label, value, sub, tone = "blue", to }) {
  const toneMap = {
    blue: "bg-accent-blue/12 text-accent-blue",
    amber: "bg-amber-400/12 text-amber-400",
    green: "bg-green-400/12 text-green-400",
    purple: "bg-purple-400/12 text-purple-400",
    muted: "bg-white/[0.05] text-text-secondary",
  };
  return (
    <Link
      to={to || "#"}
      className="glass-card p-5 flex items-start justify-between gap-3 no-underline hover:border-white/[0.12] transition-colors"
    >
      <div>
        <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2">{label}</p>
        <p className="font-heading text-3xl font-bold text-text-white tracking-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          {value}
        </p>
        {sub && <p className="text-xs text-text-muted mt-1.5">{sub}</p>}
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${toneMap[tone]}`}>
        <Icon size={20} />
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const { data: global } = useContent("global");
  const [stats, setStats] = useState({
    products: 0,
    lowStock: 0,
    outOfStock: 0,
    featured: 0,
    bestsellers: 0,
    orders: 0,
    repairs: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [storageMode, setStorageMode] = useState("checking");

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, orderRes, repairRes] = await Promise.all([
          fetch("/api/products?limit=200"),
          fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/repairs", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const prods = (await prodRes.json()).products || [];
        setStats((s) => ({
          ...s,
          products: prods.length,
          lowStock: prods.filter((p) => (p.stock_status || "").toLowerCase().includes("low")).length,
          outOfStock: prods.filter((p) => (p.stock_status || "").toLowerCase().includes("out")).length,
          featured: prods.filter((p) => p.featured === true || p.is_featured === true).length,
          bestsellers: prods.filter((p) => p.is_bestseller === true).length,
        }));
        if (orderRes.ok) {
          const orders = await orderRes.json();
          setStats((s) => ({ ...s, orders: Array.isArray(orders) ? orders.length : orders.orders?.length || 0 }));
        }
        if (repairRes.ok) {
          const repairs = await repairRes.json();
          setStats((s) => ({ ...s, repairs: Array.isArray(repairs) ? repairs.length : repairs.repairs?.length || 0 }));
        }

        const checkRes = await fetch("/api/content/heroText");
        if (checkRes.ok) {
          const json = await checkRes.json();
          setStorageMode(json.source === "blob" ? "Cloud storage connected" : "Defaults in use");
        }
      } catch {} finally {
        setLoadingStats(false);
      }
    };
    if (token) load();
  }, [token]);

  if (loadingStats) {
    return (
      <div className="p-8 flex items-center justify-center text-text-muted text-sm gap-2 min-h-[60vh]">
        <Loader2 size={16} className="animate-spin" /> Loading dashboard...
      </div>
    );
  }

  const g = global || {};
  const valueDollars = stats.products; // placeholder line to satisfy linters in future use
  void valueDollars;

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {g.businessName || "Radeon Tech"} · Overview of your store
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
            {storageMode === "Cloud storage connected"
              ? <><UploadCloud size={12} className="text-green-400" /> {storageMode}</>
              : <><ImageIcon size={12} className="text-amber-400" /> {storageMode}</>}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={ShoppingBag} label="Total Products" value={stats.products}
          sub={`${stats.outOfStock} out of stock`} tone="blue" to="/admin/products" />
        <StatCard icon={AlertTriangle} label="Low Stock" value={stats.lowStock}
          sub="Items needing restock" tone="amber" to="/admin/products" />
        <StatCard icon={Star} label="Featured Items" value={stats.featured}
          sub="On the homepage" tone="purple" to="/admin/products" />
        <StatCard icon={Trophy} label="Bestsellers" value={stats.bestsellers}
          sub="Top sellers" tone="green" to="/admin/products" />
        <StatCard icon={Wallet} label="Orders" value={stats.orders}
          sub="All time" tone="blue" to="/admin/orders" />
        <StatCard icon={Wrench} label="Repair Requests" value={stats.repairs}
          sub="Service intake" tone="muted" to="/admin/repairs" />
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-4">
        <Link to="/admin/products"
          className="glass-card p-6 flex items-center justify-between no-underline hover:border-accent-blue/25 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent-blue/12 text-accent-blue flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-white">Manage Products</p>
              <p className="text-xs text-text-muted mt-0.5">Add, edit, restock and feature items</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
        </Link>

        <Link to="/admin/cms"
          className="glass-card p-6 flex items-center justify-between no-underline hover:border-accent-blue/25 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-400/12 text-purple-400 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-white">Edit Site Content</p>
              <p className="text-xs text-text-muted mt-0.5">Hero, announcements, contacts and pages</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      <div className="mt-8">
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList size={16} className="text-accent-blue" />
            <h2 className="text-sm font-semibold text-text-white">Quick actions</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link to="/admin/products" className="text-xs px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-text-secondary hover:text-white hover:border-accent-blue/30 transition-colors no-underline">Add Product</Link>
            <Link to="/admin/cms" className="text-xs px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-text-secondary hover:text-white hover:border-accent-blue/30 transition-colors no-underline">Announcement Bar</Link>
            <Link to="/admin/media" className="text-xs px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-text-secondary hover:text-white hover:border-accent-blue/30 transition-colors no-underline">Media Library</Link>
            <Link to="/admin/security" className="text-xs px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-text-secondary hover:text-white hover:border-accent-blue/30 transition-colors no-underline">Change Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}