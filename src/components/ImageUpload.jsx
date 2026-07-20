import { useState, useRef } from "react";
import { Upload, X, Link as LinkIcon, Loader2 } from "lucide-react";

function getAuthToken() {
  return localStorage.getItem("rt_admin_token");
}

export default function ImageUpload({ value, onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Not authenticated. Please log in again.");
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      const base64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: file.name,
          data: base64,
          contentType: file.type,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        if (res.status === 503) {
          setError("Image storage not connected. Paste an image URL instead, or ask admin to connect the Blob store.");
        } else {
          setError(err.error || "Upload failed");
        }
        return;
      }

      const { url } = await res.json();
      onChange(url);
    } catch {
      setError("Upload failed. Try pasting an image URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    uploadFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    uploadFile(file);
  };

  const handleUrlSubmit = () => {
    setError("");
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setUrlMode(false);
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-border-subtle" onError={(e) => { e.target.style.display = "none"; }} />
          <button onClick={() => { onChange(""); setError(""); }} className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white/60 hover:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"><X size={14} /></button>
        </div>
      )}

      {!urlMode ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${dragOver ? "border-accent-blue/50 bg-accent-blue/5" : "border-border-subtle hover:border-white/20 bg-white/[0.02]"} ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {uploading ? (
            <Loader2 size={20} className="mx-auto mb-2 text-accent-blue animate-spin" />
          ) : (
            <Upload size={20} className="mx-auto mb-2 text-white/30" />
          )}
          <p className="text-xs text-white/40">{uploading ? "Uploading..." : "Drop image here or click to browse"}</p>
          <p className="text-[10px] text-white/20 mt-1">Max 5MB</p>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      ) : (
        <div className="flex gap-2">
          <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Paste image URL" onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()} className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
          <button onClick={handleUrlSubmit} className="px-3 py-2 rounded-lg bg-accent-blue/20 text-accent-blue text-xs font-medium hover:bg-accent-blue/30 transition-colors cursor-pointer">Load</button>
        </div>
      )}

      <button onClick={() => { setUrlMode(!urlMode); setError(""); }} className="text-[11px] text-white/30 hover:text-white/50 transition-colors cursor-pointer flex items-center gap-1">
        <LinkIcon size={10} /> {urlMode ? "Upload file instead" : "Paste URL instead"}
      </button>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
