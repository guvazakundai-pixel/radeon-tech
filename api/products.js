import { handleCors, requireAuth, readJson, writeJson } from "../_lib/auth.js";

const PRODUCTS_FILE = "radeon-db/products.json";
export { PRODUCTS_FILE };

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function readProducts() {
  const data = await readJson(PRODUCTS_FILE);
  return Array.isArray(data) ? data : [];
}

export async function writeProducts(products) {
  return writeJson(PRODUCTS_FILE, products);
}

// Derive a stock status from quantity unless one is explicitly provided.
export function resolveStockStatus(stock, explicit) {
  const s = Number(stock) || 0;
  if (explicit) return explicit;
  if (s <= 0) return "Out of Stock";
  if (s <= 5) return "Low Stock";
  return "In Stock";
}

// Normalize an incoming product payload against the canonical Product schema,
// while keeping legacy aliases (name, images, featured, salePrice, specs)
// in sync so the existing storefront keeps working untouched.
export function normalizeProduct(body, existing = null) {
  const now = new Date().toISOString();
  const prev = existing || {};

  const price = body.price !== undefined ? body.price : prev.price || 0;
  const salePrice =
    body.salePrice !== undefined
      ? body.salePrice
      : prev.salePrice !== undefined && prev.salePrice !== null
        ? prev.salePrice
        : null;
  const originalPrice =
    body.originalPrice !== undefined && body.originalPrice !== null
      ? body.originalPrice
      : salePrice || null;
  const stock =
    body.stock !== undefined ? body.stock : body.stock_quantity !== undefined ? body.stock_quantity : prev.stock || 0;

  const title = body.title || body.name || prev.title || prev.name || "";
  const name = body.name || body.title || prev.name || prev.title || "";
  const slug = body.slug || ((body.title || body.name) ? slugify(title) : prev.slug || slugify(title));

  return {
    // canonical fields
    id: prev.id || genId(),
    title,
    name,
    brand: body.brand || prev.brand || "",
    category: body.category || prev.category || "",
    subcategory: body.subcategory ?? prev.subcategory ?? "",
    condition: body.condition || prev.condition || "Brand New",
    price,
    sale_price: salePrice,
    salePrice,
    original_price: originalPrice,
    originalPrice: originalPrice,
    stock_quantity: Number(stock) || 0,
    stock: Number(stock) || 0,
    stock_status: resolveStockStatus(stock, body.stock_status || prev.stock_status),
    key_specs:
      body.key_specs || body.keySpecs || prev.key_specs || prev.specs || {},
    specs: body.specs || body.key_specs || prev.specs || prev.key_specs || {},
    description: body.description || prev.description || "",
    short_desc: body.short_desc ?? body.shortDesc ?? prev.short_desc ?? prev.shortDesc ?? "",
    shortDesc: body.shortDesc ?? body.short_desc ?? prev.shortDesc ?? prev.short_desc ?? "",
    main_image_url: body.main_image_url ?? body.mainImage ?? prev.main_image_url ?? null,
    images:
      body.images || body.gallery_urls || body.gallery || prev.images || prev.gallery_urls || [],
    gallery_urls:
      body.gallery_urls || body.gallery || body.images || prev.gallery_urls || prev.images || [],
    sku: body.sku ?? prev.sku ?? "",
    tags: body.tags || prev.tags || [],
    is_featured: body.is_featured ?? body.featured ?? prev.is_featured ?? prev.featured ?? false,
    featured: body.featured ?? body.is_featured ?? prev.featured ?? prev.is_featured ?? false,
    is_bestseller: body.is_bestseller ?? prev.is_bestseller ?? false,
    archived: body.archived ?? prev.archived ?? false,
    createdAt: prev.createdAt || now,
    created_at: prev.created_at || prev.createdAt || now,
    updatedAt: now,
    updated_at: now,
  };
}

export default async function handler(req, res) {
  if (handleCors(req, res, "GET, POST, OPTIONS")) return;

  // GET — public (storefront)
  if (req.method === "GET") {
    try {
      let products = await readProducts();

      const { category, subcategory, search, featured, bestseller, brand, condition, stock, sort, page, limit: limitParam } = req.query;

      if (category) products = products.filter((p) => p.category === category);
      if (subcategory) products = products.filter((p) => p.subcategory === subcategory);
      if (brand) products = products.filter((p) => p.brand === brand);
      if (condition) products = products.filter((p) => p.condition === condition);
      if (stock) products = products.filter((p) => p.stock_status === stock);
      if (featured === "true") products = products.filter((p) => p.featured === true || p.is_featured === true);
      if (bestseller === "true") products = products.filter((p) => p.is_bestseller === true);

      if (search) {
        const q = search.toLowerCase();
        products = products.filter((p) =>
          (p.name || p.title || "")
            .toLowerCase()
            .includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q) ||
          (p.tags || []).some((t) => String(t).toLowerCase().includes(q))
        );
      }

      products = products.filter((p) => !p.archived);

      if (sort === "price-asc") products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      else if (sort === "price-desc") products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      else if (sort === "newest") products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      else if (sort === "name") products.sort((a, b) => (a.name || a.title || "").localeCompare(b.name || b.title || ""));

      const total = products.length;
      const pageNum = Math.max(1, parseInt(page) || 1);
      const limitNum = Math.min(200, Math.max(1, parseInt(limitParam) || 20));
      const start = (pageNum - 1) * limitNum;
      const paginated = products.slice(start, start + limitNum);

      return res.status(200).json({
        products: paginated,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      });
    } catch {
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  // POST — admin only
  if (req.method === "POST") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const body = req.body || {};
      if (!body.name && !body.title) {
        return res.status(400).json({ error: "Product title is required" });
      }

      const product = normalizeProduct(body);
      const products = await readProducts();
      products.push(product);
      await writeProducts(products);

      return res.status(201).json(product);
    } catch {
      return res.status(500).json({ error: "Failed to create product" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}