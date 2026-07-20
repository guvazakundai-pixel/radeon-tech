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

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
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

  if (req.method === "GET") {
    try {
      let products = await readDb();

      const { category, search, featured, brand, sort, page, limit: limitParam } = req.query;

      if (category) {
        products = products.filter(p => p.category === category);
      }
      if (brand) {
        products = products.filter(p => p.brand === brand);
      }
      if (featured === "true") {
        products = products.filter(p => p.featured === true);
      }
      if (search) {
        const q = search.toLowerCase();
        products = products.filter(p =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          (p.tags || []).some(t => t.toLowerCase().includes(q))
        );
      }

      products = products.filter(p => !p.archived);

      if (sort === "price-asc") {
        products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      } else if (sort === "price-desc") {
        products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      } else if (sort === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
      }

      const total = products.length;
      const pageNum = Math.max(1, parseInt(page) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limitParam) || 20));
      const start = (pageNum - 1) * limitNum;
      const paginated = products.slice(start, start + limitNum);

      return res.status(200).json({
        products: paginated,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  if (req.method === "POST") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const body = req.body || {};
      if (!body.name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const now = new Date().toISOString();
      const product = {
        id: genId(),
        name: body.name,
        slug: body.slug || slugify(body.name),
        description: body.description || "",
        shortDesc: body.shortDesc || "",
        specs: body.specs || {},
        price: body.price || 0,
        salePrice: body.salePrice || null,
        images: body.images || [],
        category: body.category || "",
        brand: body.brand || "",
        sku: body.sku || "",
        stock: body.stock || 0,
        featured: body.featured || false,
        archived: body.archived || false,
        related: body.related || [],
        tags: body.tags || [],
        createdAt: now,
        updatedAt: now,
      };

      const products = await readDb();
      products.push(product);
      await writeDb(products);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create product" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
