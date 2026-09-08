import { handleCors, requireAuth, readProducts, writeProducts, normalizeProduct } from "../products.js";

export default async function handler(req, res) {
  if (handleCors(req, res, "GET, PUT, DELETE, OPTIONS")) return;

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const products = await readProducts();
      const product = products.find((p) => p.id === id || p.slug === id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(product);
    } catch {
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  }

  if (req.method === "PUT") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const products = await readProducts();
      const index = products.findIndex((p) => p.id === id || p.slug === id);
      if (index === -1) return res.status(404).json({ error: "Product not found" });

      products[index] = normalizeProduct(req.body || {}, products[index]);
      await writeProducts(products);
      return res.status(200).json(products[index]);
    } catch {
      return res.status(500).json({ error: "Failed to update product" });
    }
  }

  if (req.method === "DELETE") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const products = await readProducts();
      const index = products.findIndex((p) => p.id === id || p.slug === id);
      if (index === -1) return res.status(404).json({ error: "Product not found" });

      const [removed] = products.splice(index, 1);
      await writeProducts(products);
      return res.status(200).json({ deleted: true, product: removed });
    } catch {
      return res.status(500).json({ error: "Failed to delete product" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}