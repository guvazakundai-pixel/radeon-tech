import { list, put } from "@vercel/blob";

const SECRET = "radeon-tech-admin-secret-2025";
const FILENAME = "orders.json";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
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

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
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

  if (req.method === "GET") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const orders = await readDb();
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch orders" });
    }
  }

  if (req.method === "POST") {
    try {
      const body = req.body || {};
      if (!body.customerName || !body.email || !body.phone || !body.items || !body.items.length) {
        return res.status(400).json({ error: "customerName, email, phone, and items are required" });
      }

      const now = new Date().toISOString();
      const order = {
        id: genId(),
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
        address: body.address || "",
        city: body.city || "",
        items: body.items,
        subtotal: body.subtotal || 0,
        shipping: body.shipping || 0,
        total: body.total || 0,
        paymentMethod: body.paymentMethod || "",
        paymentProof: body.paymentProof || "",
        notes: body.notes || "",
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };

      const orders = await readDb();
      orders.push(order);
      await writeDb(orders);

      return res.status(201).json(order);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create order" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
