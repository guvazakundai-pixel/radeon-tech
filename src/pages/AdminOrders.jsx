import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, ShoppingCart, Loader2,
} from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  confirmed: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  shipped: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  delivered: "bg-green-400/10 text-green-400 border-green-400/20",
  cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
};

export default function AdminOrders() {
  const { isAuthenticated, loading, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/admin/login");
  }, [loading, isAuthenticated, navigate]);

  const fetchOrders = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setOrders(await res.json());
    } catch {}
    setFetching(false);
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated, fetchOrders]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMsg(`Order status updated to ${status}`);
        fetchOrders();
        if (selected?.id === id) setSelected({ ...selected, status });
      }
    } catch {}
    setTimeout(() => setMsg(""), 3000);
  };

  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return o.customerName?.toLowerCase().includes(q) || o.email?.toLowerCase().includes(q) || o.id?.toLowerCase().includes(q) || o.phone?.includes(q);
  });

  if (loading || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-bg-primary"><div className="text-text-muted text-sm">Loading...</div></div>;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="sticky top-0 z-30 bg-bg-secondary/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={() => selected ? setSelected(null) : navigate("/admin/dashboard")}
            className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white transition-colors cursor-pointer">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-text-white">Orders</h1>
            <p className="text-xs text-text-muted">{orders.length} total orders</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <AnimatePresence>
          {msg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-4 text-xs font-medium px-4 py-2 rounded-lg bg-green-400/10 text-green-400 border border-green-400/20">{msg}</motion.div>
          )}
        </AnimatePresence>

        {!selected ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, phone..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all" />
              </div>
            </div>

            {fetching ? (
              <div className="text-center py-20 text-text-muted text-sm flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Loading orders...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart size={48} className="mx-auto mb-4 text-text-muted/30" />
                <p className="text-text-muted text-sm">No orders {search ? "match your search" : "yet"}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((o) => (
                  <button key={o.id} onClick={() => setSelected(o)}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-border-subtle bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                      <User size={16} className="text-accent-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-text-white truncate">{o.customerName}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[o.status] || STATUS_COLORS.pending}`}>
                          {o.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-text-muted flex items-center gap-1"><Phone size={10} />{o.phone}</span>
                        <span className="text-xs text-text-muted">{o.items?.length || 0} items</span>
                        <span className="text-xs text-text-muted font-medium">${o.total || 0}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-text-muted shrink-0 hidden sm:block">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl space-y-5">
            <div className="rounded-xl border border-border-subtle bg-white/[0.02] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-white">Order Details</h2>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_COLORS[selected.status] || STATUS_COLORS.pending}`}>
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-text-muted">Customer</span><p className="text-text-white font-medium">{selected.customerName}</p></div>
                <div><span className="text-text-muted">Phone</span><p className="text-text-white font-medium">{selected.phone}</p></div>
                <div><span className="text-text-muted">Email</span><p className="text-text-white font-medium">{selected.email}</p></div>
                <div><span className="text-text-muted">Date</span><p className="text-text-white font-medium">{new Date(selected.createdAt).toLocaleString()}</p></div>
                {selected.address && <div className="col-span-2"><span className="text-text-muted">Address</span><p className="text-text-white font-medium">{selected.address}{selected.city ? `, ${selected.city}` : ""}</p></div>}
              </div>

              <div className="border-t border-border-subtle pt-4">
                <h3 className="text-xs font-semibold text-text-secondary mb-3">ITEMS</h3>
                {selected.items?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border-subtle/50 last:border-0">
                    <div>
                      <p className="text-sm text-text-white">{item.name || item.productName}</p>
                      <p className="text-xs text-text-muted">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="text-sm font-medium text-text-white">${item.price || 0}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border-subtle pt-4 flex items-center justify-between">
                <span className="text-sm text-text-muted">Total</span>
                <span className="text-lg font-bold text-accent-blue">${selected.total || 0}</span>
              </div>

              {selected.notes && (
                <div className="border-t border-border-subtle pt-4">
                  <span className="text-xs text-text-muted">Notes:</span>
                  <p className="text-sm text-text-secondary mt-1">{selected.notes}</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-border-subtle bg-white/[0.02] p-5">
              <h3 className="text-xs font-semibold text-text-secondary mb-3">UPDATE STATUS</h3>
              <div className="flex flex-wrap gap-2">
                {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    disabled={selected.status === s}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer disabled:opacity-30 ${
                      selected.status === s ? STATUS_COLORS[s] : "border-border-subtle text-text-muted hover:text-text-white hover:bg-white/5"
                    }`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
