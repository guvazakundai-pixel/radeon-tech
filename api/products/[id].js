import { list, put } from "@vercel/blob";

const SECRET = "radeon-tech-admin-secret-2025";
const FILENAME = "products.json";

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

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const products = await readDb();
      const product = products.find(p => p.id === id || p.slug === id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  }

  if (req.method === "PUT") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const products = await readDb();
      const index = products.findIndex(p => p.id === id || p.slug === id);
      if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
      }

      const body = req.body || {};
      const existing = products[index];

      products[index] = {
        ...existing,
        ...body,
        id: existing.id,
        createdAt: existing.createdAt,
        slug: body.name && !body.slug ? slugify(body.name) : (body.slug || existing.slug),
        updatedAt: new Date().toISOString(),
      };

      await writeDb(products);
      return res.status(200).json(products[index]);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update product" });
    }
  }

  if (req.method === "DELETE") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const products = await readDb();
      const index = products.findIndex(p => p.id === id || p.slug === id);
      if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
      }

      const [removed] = products.splice(index, 1);
      await writeDb(products);
      return res.status(200).json({ deleted: true, product: removed });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete product" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
