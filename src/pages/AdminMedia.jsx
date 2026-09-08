import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Copy, Trash2, Loader2, Check, Link2, ImageIcon, CloudOff, RefreshCw } from "lucide-react";
import { saveContentToServer } from "../hooks/useContent";

function formatBytes(b) {
  if (!b) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(b) / Math.log(k));
  return `${(b / Math.pow(k, i)).toFixed(i ? 1 : 0)} ${units[i]}`;
}

function formatDate(s) {
  if (!s) return "";
  try {
    return new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

export default function AdminMedia() {
  const { token } = useAuth();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blobOff, setBlobOff] = useState(false);
  const [copied, setCopied] = useState(null);
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media", { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (res.status === 503 || (json?.media && json.error)) setBlobOff(true);
      setMedia(json?.media || []);
      if (json?.media) setBlobOff(false);
    } catch {
      setBlobOff(true);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { if (token) load(); }, [load, token]);

  const copy = (url) => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(url);
      setTimeout(() => setCopied((c) => (c === url ? null : c)), 1500);
    });
  };

  const remove = async (m) => {
    if (!window.confirm("Delete this image permanently? This cannot be undone.")) return;
    const url = encodeURIComponent(m.url);
    const res = await fetch(`/api/media?url=${url}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      setMedia((mArr) => mArr.filter((x) => x.url !== m.url));
    }
  };

  const copyAllToCms = async () => {
    const items = media.map((m) => ({ url: m.url, alt: "", caption: "" }));
    await saveContentToServer("gallery", items, token);
    window.alert("Imported media into the storefront gallery.");
  };

  const totalSize = media.reduce((sum, m) => sum + (m.size || 0), 0);

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-white tracking-tight">Media Library</h1>
          <p className="text-text-muted text-sm mt-1">{media.length} images · {formatBytes(totalSize)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary bg-white/[0.04] border border-white/[0.06] hover:text-white hover:border-white/[0.14] transition-colors cursor-pointer">
            <RefreshCw size={15} /> Refresh
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async () => {
              const base64 = reader.result.split(",")[1];
              const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ filename: file.name, data: base64, contentType: file.type }),
              });
              if (res.ok) load();
            };
            reader.readAsDataURL(file);
          }} />
          <button onClick={() => fileRef.current?.click()} className="glass-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer">
            <ImageIcon size={16} /> Upload
          </button>
        </div>
      </div>

      {blobOff && (
        <div className="glass-card p-6 mb-5 flex items-center gap-3 text-amber-400/90 text-sm">
          <CloudOff size={18} />
          Image storage (Vercel Blob) isn't connected, so uploads/listing are unavailable. Connect the <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">BLOB_READ_WRITE_TOKEN</code> in Vercel to store images permanently.
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted gap-2"><Loader2 size={18} className="animate-spin" /> Loading media...</div>
      ) : media.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <ImageIcon size={28} className="mx-auto mb-3 text-white/15" />
          <p className="text-text-muted text-sm">No images uploaded yet. Upload the first one to build your library.</p>
          <button onClick={() => fileRef.current?.click()} className="mt-4 text-accent-blue text-sm hover:text-accent-cyan inline-flex items-center gap-1.5 cursor-pointer">
            <ImageIcon size={14} /> Upload an image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {media.map((m, i) => (
            <motion.div key={m.url} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(i * 0.02, 0.3) }} className="glass-card group overflow-hidden rounded-xl flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-white/[0.02]">
                <img src={m.url} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.style.display = "none"; }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => copy(m.url)} className="p-2 rounded-lg bg-white/90 text-black hover:bg-white transition-colors cursor-pointer" title="Copy URL">
                    {copied === m.url ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                  <button onClick={() => remove(m)} className="p-2 rounded-lg bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer" title="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="px-2.5 py-2 truncate">
                <p className="text-[10px] text-text-muted truncate flex items-center gap-1"><Link2 size={9} /> {m.pathname?.split("/").pop() || "image"}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{formatBytes(m.size)} · {formatDate(m.uploadedAt)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {media.length > 0 && !blobOff && (
        <div className="mt-6 flex justify-end">
          <button onClick={copyAllToCms} className="text-xs px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-text-secondary hover:text-white hover:border-accent-blue/30 transition-colors cursor-pointer inline-flex items-center gap-1.5">
            <ImageIcon size={13} /> Import all into storefront gallery
          </button>
        </div>
      )}
    </div>
  );
}