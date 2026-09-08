import { handleCors, requireAuth, readJson, writeJson } from "../_lib/auth.js";

const CATEGORIES_FILE = "radeon-db/categories.json";
const DEFAULT_CATEGORIES = [
  { id: "gaming-laptops", name: "Gaming Laptops", slug: "gaming-laptops", description: "", image_url: "", sort_order: 1 },
  { id: "workstation-laptops", name: "Workstation Laptops", slug: "workstation-laptops", description: "", image_url: "", sort_order: 2 },
  { id: "ultraportable-laptops", name: "Ultra-Portable Laptops", slug: "ultraportable-laptops", description: "", image_url: "", sort_order: 3 },
  { id: "pre-owned-laptops", name: "Pre-Owned Laptops", slug: "pre-owned-laptops", description: "", image_url: "", sort_order: 4 },
  { id: "components", name: "PC Components", slug: "components", description: "", image_url: "", sort_order: 5 },
  { id: "monitors", name: "Monitors", slug: "monitors", description: "", image_url: "", sort_order: 6 },
  { id: "gaming-accessories", name: "Gaming Accessories", slug: "gaming-accessories", description: "", image_url: "", sort_order: 7 },
  { id: "networking", name: "Networking", slug: "networking", description: "", image_url: "", sort_order: 8 },
  { id: "power-solutions", name: "Power Solutions", slug: "power-solutions", description: "", image_url: "", sort_order: 9 },
];

export async function readCategories() {
  const data = await readJson(CATEGORIES_FILE);
  if (Array.isArray(data) && data.length > 0) return data;
  return DEFAULT_CATEGORIES;
}

function genId() {
  return `cat-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function handler(req, res) {
  if (handleCors(req, res, "GET, POST, PUT, DELETE, OPTIONS")) return;

  if (req.method === "GET") {
    try {
      const categories = await readCategories();
      return res.status(200).json({ categories });
    } catch {
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  if (req.method === "POST") {
    const auth = requireAuth(req, res);
    if (!auth) return;
    try {
      const body = req.body || {};
      if (!body.name) return res.status(400).json({ error: "Category name is required" });
      const categories = await readCategories();
      const exists = categories.some((c) => c.slug === slugify(body.name));
      if (exists) return res.status(409).json({ error: "A category with this name already exists" });

      const category = {
        id: body.id || genId(),
        name: body.name,
        slug: body.slug || slugify(body.name),
        description: body.description || "",
        image_url: body.image_url || "",
        sort_order: Number(body.sort_order) || categories.length + 1,
        created_at: new Date().toISOString(),
      };
      categories.push(category);
      await writeJson(CATEGORIES_FILE, categories);
      return res.status(201).json(category);
    } catch {
      return res.status(500).json({ error: "Failed to create category" });
    }
  }

  if (req.method === "PUT") {
    const auth = requireAuth(req, res);
    if (!auth) return;
    try {
      const { id } = req.query;
      const body = req.body || {};
      const categories = await readCategories();
      const index = categories.findIndex((c) => c.id === id || c.slug === id);
      if (index === -1) return res.status(404).json({ error: "Category not found" });
      categories[index] = {
        ...categories[index],
        ...body,
        id: categories[index].id,
        slug: body.slug || body.name ? slugify(body.name || categories[index].name) : categories[index].slug,
        updated_at: new Date().toISOString(),
      };
      await writeJson(CATEGORIES_FILE, categories);
      return res.status(200).json(categories[index]);
    } catch {
      return res.status(500).json({ error: "Failed to update category" });
    }
  }

  if (req.method === "DELETE") {
    const auth = requireAuth(req, res);
    if (!auth) return;
    try {
      const { id } = req.query;
      const categories = await readCategories();
      const next = categories.filter((c) => c.id !== id && c.slug !== id);
      if (next.length === categories.length) return res.status(404).json({ error: "Category not found" });
      await writeJson(CATEGORIES_FILE, next);
      return res.status(200).json({ deleted: true });
    } catch {
      return res.status(500).json({ error: "Failed to delete category" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}