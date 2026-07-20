import { list, put } from "@vercel/blob";

const SECRET = "radeon-tech-admin-secret-2025";
const FILENAME = "repairs.json";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
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

function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }
  const payload = verifyToken(authHeader.slice(7));
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return null;
  }
  return payload;
}

async function readDb() {
  const { blobs } = await list({ prefix: `radeon-db/${FILENAME}`, limit: 1 });
  if (blobs.length === 0) return [];
  const res = await fetch(blobs[0].url);
  if (!res.ok) return [];
  return await res.json();
}

async function writeDb(data) {
  await put(`radeon-db/${FILENAME}`, JSON.stringify(data), {
    contentType: "application/json",
    access: "public",
    addRandomSuffix: false,
  });
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const auth = requireAuth(req, res);
  if (!auth) return;

  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const repairs = await readDb();
      const index = repairs.findIndex((r) => r.id === id);
      if (index === -1) return res.status(404).json({ error: "Repair not found" });

      const body = req.body || {};
      const allowed = ["status", "notes", "urgency"];
      allowed.forEach((field) => {
        if (body[field] !== undefined) repairs[index][field] = body[field];
      });
      repairs[index].updatedAt = new Date().toISOString();

      await writeDb(repairs);
      return res.status(200).json(repairs[index]);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update repair" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const repairs = await readDb();
      const index = repairs.findIndex((r) => r.id === id);
      if (index === -1) return res.status(404).json({ error: "Repair not found" });

      const [removed] = repairs.splice(index, 1);
      await writeDb(repairs);
      return res.status(200).json({ deleted: true, repair: removed });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete repair" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
