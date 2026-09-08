import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, Wrench, Loader2, Smartphone, MessageCircle,
} from "lucide-react";
import { WHATSAPP } from "../content/data";

const STATUS_COLORS = {
  pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "in-progress": "bg-blue-400/10 text-blue-400 border-blue-400/20",
  completed: "bg-green-400/10 text-green-400 border-green-400/20",
  cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
};

const URGENCY_COLORS = {
  low: "text-text-muted",
  normal: "text-blue-400",
  high: "text-amber-400",
  urgent: "text-red-400",
};

export default function AdminRepairs() {
  const { isAuthenticated, loading, token } = useAuth();
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/admin/login");
  }, [loading, isAuthenticated, navigate]);

  const fetchRepairs = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/repairs", { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setRepairs(await res.json());
    } catch {}
    setFetching(false);
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) fetchRepairs();
  }, [isAuthenticated, fetchRepairs]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/repairs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMsg(`Repair status updated to ${status}`);
        fetchRepairs();
        if (selected?.id === id) setSelected({ ...selected, status });
      }
    } catch {}
    setTimeout(() => setMsg(""), 3000);
  };

  const filtered = repairs.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.name?.toLowerCase().includes(q) || r.phone?.includes(q) || r.deviceType?.toLowerCase().includes(q) || r.brand?.toLowerCase().includes(q);
  });

  const openWhatsApp = (repair) => {
    const msg = encodeURIComponent(
      `Hi Radeon Tech! Following up on repair request:\n\nName: ${repair.name}\nDevice: ${repair.deviceType} ${repair.brand || ""} ${repair.model || ""}\nProblem: ${repair.problem}\nStatus: ${repair.status}\n\nPlease let me know the update. Thank you!`
    );
    window.open(`${WHATSAPP}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

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
            <h1 className="text-lg font-bold text-text-white">Repair Requests</h1>
            <p className="text-xs text-text-muted">{repairs.length} total requests</p>
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
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, device, phone..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all" />
              </div>
            </div>

            {fetching ? (
              <div className="text-center py-20 text-text-muted text-sm flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Loading repairs...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Wrench size={48} className="mx-auto mb-4 text-text-muted/30" />
                <p className="text-text-muted text-sm">No repair requests {search ? "match your search" : "yet"}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((r) => (
                  <button key={r.id} onClick={() => setSelected(r)}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-border-subtle bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                      <Smartphone size={16} className="text-accent-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-text-white truncate">{r.name}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[r.status] || STATUS_COLORS.pending}`}>
                          {r.status}
                        </span>
                        <span className={`text-[10px] font-medium ${URGENCY_COLORS[r.urgency] || "text-text-muted"}`}>
                          {r.urgency}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-text-muted">{r.deviceType}{r.brand ? ` · ${r.brand}` : ""}</span>
                        <span className="text-xs text-text-muted truncate max-w-[200px]">{r.problem}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-text-muted shrink-0 hidden sm:block">
                      {new Date(r.createdAt).toLocaleDateString()}
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
                <h2 className="text-lg font-bold text-text-white">Repair Details</h2>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_COLORS[selected.status] || STATUS_COLORS.pending}`}>
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-text-muted">Customer</span><p className="text-text-white font-medium">{selected.name}</p></div>
                <div><span className="text-text-muted">Phone</span><p className="text-text-white font-medium">{selected.phone}</p></div>
                <div><span className="text-text-muted">Device</span><p className="text-text-white font-medium">{selected.deviceType}</p></div>
                <div><span className="text-text-muted">Brand/Model</span><p className="text-text-white font-medium">{selected.brand || "—"} {selected.model || ""}</p></div>
                <div><span className="text-text-muted">Urgency</span><p className={`font-medium ${URGENCY_COLORS[selected.urgency] || ""}`}>{selected.urgency}</p></div>
                <div><span className="text-text-muted">Submitted</span><p className="text-text-white font-medium">{new Date(selected.createdAt).toLocaleString()}</p></div>
                {selected.preferredDate && (
                  <div><span className="text-text-muted">Preferred Date</span><p className="text-text-white font-medium">{selected.preferredDate} {selected.preferredTime || ""}</p></div>
                )}
              </div>

              <div className="border-t border-border-subtle pt-4">
                <span className="text-xs text-text-muted">Problem Description:</span>
                <p className="text-sm text-text-secondary mt-1 leading-relaxed">{selected.problem}</p>
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
                {["pending", "in-progress", "completed", "cancelled"].map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    disabled={selected.status === s}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer disabled:opacity-30 ${
                      selected.status === s ? STATUS_COLORS[s] : "border-border-subtle text-text-muted hover:text-text-white hover:bg-white/5"
                    }`}>
                    {s.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => openWhatsApp(selected)}
              className="w-full flex items-center justify-center gap-2 glass-btn text-white px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer">
              <MessageCircle size={16} /> Contact via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
