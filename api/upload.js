import { put } from "@vercel/blob";

const SECRET = "radeon-tech-admin-secret-2025";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64url").toString());
    if (decoded.secret !== SECRET) return null;
    if (decoded.exp < Date.now()) return null;
    return decoded.data;
  } catch { return null; }
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const token = authHeader.slice(7);
  if (!verifyToken(token)) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: "Blob store not connected. Please connect it in the Vercel Dashboard." });
  }

  try {
    const { filename, data, contentType } = req.body || {};
    if (!filename || !data) {
      return res.status(400).json({ error: "filename and data (base64) are required" });
    }

    const buffer = Buffer.from(data, "base64");
    const ext = filename.split(".").pop() || "png";
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const pathname = `radeon-uploads/${Date.now()}-${safeName}`;

    const blob = await put(pathname, buffer, {
      contentType: contentType || `image/${ext}`,
      access: "public",
    });

    return res.status(200).json({ url: blob.url, pathname: blob.pathname });
  } catch (err) {
    return res.status(500).json({ error: "Upload failed: " + err.message });
  }
}
