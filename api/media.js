import { list, del } from "@vercel/blob";
import { handleCors, requireAuth } from "../_lib/auth.js";

const PREFIX = "radeon-uploads/";

export default async function handler(req, res) {
  if (handleCors(req, res, "GET, DELETE, OPTIONS")) return;

  const auth = requireAuth(req, res);
  if (!auth) return;

  if (req.method === "GET") {
    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(503).json({ error: "Blob store not connected.", media: [] });
      }
      const { blobs } = await list({ prefix: PREFIX });
      const media = blobs
        .map((b) => ({
          url: b.url,
          pathname: b.pathname,
          size: b.size,
          uploadedAt: b.uploadedAt,
        }))
        .sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0));

      return res.status(200).json({ media });
    } catch {
      return res.status(200).json({ media: [] });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { url } = req.query;
      if (!url) return res.status(400).json({ error: "url query param is required" });

      const { blobs } = await list({ prefix: PREFIX });
      const match = blobs.find((b) => b.url === url);
      if (match) {
        await del(match.url);
      } else {
        return res.status(404).json({ error: "Media not found" });
      }
      return res.status(200).json({ deleted: true, url });
    } catch {
      return res.status(500).json({ error: "Failed to delete media" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}