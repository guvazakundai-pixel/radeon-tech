import { put } from "@vercel/blob";
import { handleCors, requireAuth } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (handleCors(req, res, "POST, OPTIONS")) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const auth = requireAuth(req, res);
  if (!auth) return;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: "Blob store not connected. Connect it in the Vercel Dashboard." });
  }

  try {
    const { filename, data, contentType, thumbData, thumbContentType } = req.body || {};

    if (!filename || !data) {
      return res.status(400).json({ error: "filename and data (base64) are required" });
    }

    // Guard payload size (~2.5MB ceiling for the base64 body, images are pre-compressed client-side).
    const buffer = Buffer.from(data, "base64");
    if (buffer.length > 1.5 * 1024 * 1024) {
      return res.status(400).json({ error: "Encoded image exceeds 1.5MB. Images are pre-optimized to WebP (<300KB)." });
    }

    const base = filename.replace(/\.[a-z0-9]+$/i, "").replace(/[^a-zA-Z0-9._-]/g, "_");

    const putOpts = { access: "public", contentType: contentType || "image/webp" };

    // Main image (optimized WebP, <300KB, ≤1280px)
    const mainPathname = `radeon-uploads/${Date.now()}-${base}.webp`;
    const main = await put(mainPathname, buffer, putOpts);

    // Square thumbnail 600x600 (auto-generated client-side, uploaded alongside)
    let thumbBlob = null;
    if (thumbData) {
      const thumbPathname = `radeon-uploads/${Date.now()}-${base}-thumb.webp`;
      thumbBlob = await put(
        thumbPathname,
        Buffer.from(thumbData, "base64"),
        { access: "public", contentType: thumbContentType || "image/webp" }
      );
    }

    return res.status(200).json({
      url: main.url,
      pathname: main.pathname,
      thumbUrl: thumbBlob ? thumbBlob.url : null,
      size: buffer.length,
    });
  } catch (err) {
    return res.status(500).json({ error: "Upload failed: " + err.message });
  }
}