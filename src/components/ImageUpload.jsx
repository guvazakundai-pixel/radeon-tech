import { useState, useRef, useEffect } from "react";
import { Upload, X, Link as LinkIcon, Loader2 } from "lucide-react";

function getAuthToken() {
  return localStorage.getItem("rt_admin_token");
}

const MAX_DIM = 1280;
const TARGET_BYTES = 300 * 1024;
const THUMB_SIZE = 600;

// Draw an image onto a canvas, cover-cropping to a square, and encode as WebP.
async function makeThumbWebp(img, size) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const srcMin = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - srcMin) / 2;
  const sy = (img.naturalHeight - srcMin) / 2;
  ctx.drawImage(img, sx, sy, srcMin, srcMin, 0, 0, size, size);
  return canvas.toDataURL("image/webp", 0.8).split(",")[1];
}

// Scale down then encode WebP, walking quality down until we fit the budget.
async function fileToWebpBase64(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      try {
        const scale = Math.min(1, MAX_DIM / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.round(img.naturalWidth * scale);
        const h = Math.round(img.naturalHeight * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        let quality = 0.85;
        let dataUrl = canvas.toDataURL("image/webp", quality);
        while (dataUrl.length > TARGET_BYTES * 1.35 && quality > 0.55) {
          quality -= 0.07;
          dataUrl = canvas.toDataURL("image/webp", quality);
        }
        resolve({ data: dataUrl.split(",")[1], thumb: await makeThumbWebp(img, THUMB_SIZE) });
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

export default function ImageUpload({ value, onChange, onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  // Prefer showing the generated thumb as preview when available.
  const [preview, setPreview] = useState(value || "");
  useEffect(() => { setPreview(value || ""); }, [value]);

  const uploadFile = async (file) => {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Maximum size is 10MB.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Not authenticated. Please log in again.");
      return;
    }

    setUploading(true);
    try {
      const { data, thumb } = await fileToWebpBase64(file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: (file.name || "image").replace(/\.[a-z0-9]+$/i, "") + ".webp",
          data,
          thumbData: thumb,
          contentType: "image/webp",
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

      const result = await res.json();
      setPreview(result.url);
      onChange(result.url);
      onUpload?.(result);
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
      setPreview(urlInput.trim());
      onChange(urlInput.trim());
      setUrlInput("");
      setUrlMode(false);
    }
  };

  return (
    <div className="space-y-2">
      {preview && (
        <div className="relative inline-block w-full">
          <img src={preview} alt="Preview" className="w-full h-36 object-cover rounded-lg border border-border-subtle" onError={(e) => { e.target.style.display = "none"; }} />
          <button type="button" onClick={() => { onChange(""); setPreview(""); setError(""); }} className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white/60 hover:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"><X size={14} /></button>
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
          <p className="text-xs text-white/40">{uploading ? "Optimizing & uploading..." : "Drop image here or click to browse"}</p>
          <p className="text-[10px] text-white/20 mt-1">Auto-converted to WebP &lt;300KB · 600×600 thumb generated</p>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      ) : (
        <div className="flex gap-2">
          <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Paste image URL" onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()} className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
          <button type="button" onClick={handleUrlSubmit} className="px-3 py-2 rounded-lg bg-accent-blue/20 text-accent-blue text-xs font-medium hover:bg-accent-blue/30 transition-colors cursor-pointer">Load</button>
        </div>
      )}

      <button type="button" onClick={() => { setUrlMode(!urlMode); setError(""); }} className="text-[11px] text-white/30 hover:text-white/50 transition-colors cursor-pointer flex items-center gap-1">
        <LinkIcon size={10} /> {urlMode ? "Upload file instead" : "Paste URL instead"}
      </button>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}