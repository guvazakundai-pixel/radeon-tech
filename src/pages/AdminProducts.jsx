import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search, Loader2, X, Star, Trophy, ChevronLeft, ChevronRight, Minus } from "lucide-react";
import ImageUpload from "../components/ImageUpload";

const CONDITIONS = ["Brand New", "Refurbished", "Pre-Owned Grade A", "Pre-Owned Grade B"];
const STOCK_STATUSES = ["In Stock", "Low Stock", "Out of Stock"];

function authHeaders(token) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

const emptyForm = {
  title: "", slug: "", brand: "", category: "", subcategory: "",
  condition: CONDITIONS[0], price: "", salePrice: "", originalPrice: "",
  stock: 0, description: "", short_desc: "",
  main_image_url: "", images: [], key_specs: "{}",
  is_featured: false, is_bestseller: false, tags: [],
};

function slugify(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ProductForm({ initial, categories, onSave, onClose, token }) {
  const [form, setForm] = useState(() => {
    if (!initial) return { ...emptyForm };
    return {
      title: initial.title || initial.name || "",
      slug: initial.slug || "",
      brand: initial.brand || "",
      category: initial.category || "",
      subcategory: initial.subcategory || "",
      condition: initial.condition || CONDITIONS[0],
      price: initial.price ?? "",
      salePrice: initial.salePrice ?? "",
      originalPrice: initial.originalPrice ?? "",
      stock: initial.stock_quantity ?? initial.stock ?? 0,
      description: initial.description || "",
      short_desc: initial.short_desc ?? initial.shortDesc ?? "",
      main_image_url: initial.main_image_url ?? null,
      images: initial.images || initial.gallery_urls || [],
      key_specs: JSON.stringify(initial.key_specs || initial.specs || {}, null, 2),
      is_featured: initial.is_featured ?? initial.featured ?? false,
      is_bestseller: initial.is_bestseller ?? false,
      tags: initial.tags || [],
    };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(", "));
  const [specsError, setSpecsError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let key_specs = {};
    try {
      key_specs = JSON.parse(form.key_specs || "{}");
      if (typeof key_specs !== "object" || Array.isArray(key_specs)) throw new Error();
      setSpecsError("");
    } catch {
      setSpecsError("Key specs must be valid JSON, e.g. { \"Processor\": \"i7-13700H\" }");
      return;
    }

    const payload = {
      ...form,
      key_specs,
      slug: form.slug || slugify(form.title),
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      price: form.price === "" ? 0 : Number(form.price),
      salePrice: form.salePrice === "" ? null : Number(form.salePrice),
      originalPrice: form.originalPrice === "" ? null : Number(form.originalPrice),
      stock: Math.max(0, Number(form.stock) || 0),
    };

    setSaving(true);
    try {
      const url = initial ? `/api/products/${initial.id}` : "/api/products";
      const res = await fetch(url, {
        method: initial ? "PUT" : "POST",
        headers: authHeaders(token),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleGallery = () => {
    setForm((f) => {
      if (f.images.length >= 4) return f;
      return { ...f, images: [...f.images, ""] };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Product Title *</label>
          <input value={form.title} onChange={(e) => {
            setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }));
          }} placeholder="e.g. Lenovo LOQ 15IRH8 Gaming Laptop" required className="input-ghost w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Slug</label>
          <input value={form.slug} onChange={set("slug")} placeholder="auto-generated" className="input-ghost w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Brand</label>
          <input value={form.brand} onChange={set("brand")} placeholder="e.g. Lenovo, ASUS, Dell" className="input-ghost w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Category</label>
          <input list="admin-categories" value={form.category} onChange={set("category")} placeholder="e.g. Gaming Laptops" className="input-ghost w-full" />
          <datalist id="admin-categories">
            {categories.map((c) => <option key={c.name || c} value={c.name || c} />)}
          </datalist>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Subcategory / Model</label>
          <input value={form.subcategory} onChange={set("subcategory")} placeholder="e.g. LOQ Series" className="input-ghost w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Condition</label>
          <select value={form.condition} onChange={set("condition")} className="input-ghost w-full">
            {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Price (USD)$</label>
          <input value={form.price} onChange={set("price")} type="number" step="0.01" min="0" placeholder="0.00" className="input-ghost w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Sale Price (USD)</label>
          <input value={form.salePrice} onChange={set("salePrice")} type="number" step="0.01" min="0" placeholder="0.00" className="input-ghost w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Original Price (USD)</label>
          <input value={form.originalPrice} onChange={set("originalPrice")} type="number" step="0.01" min="0" placeholder="0.00" className="input-ghost w-full" />
        </div>
        <div className="w-1/2">
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Stock Quantity</label>
          <input value={form.stock} onChange={set("stock")} type="number" min="0" placeholder="0" className="input-ghost w-full" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Key Specifications (JSON)</label>
        <textarea value={form.key_specs} onChange={(e) => { setForm((f) => ({ ...f, key_specs: e.target.value })); setSpecsError(""); }} rows={5} className="input-ghost w-full font-mono text-xs" spellCheck="false" />
        {specsError && <p className="text-xs text-red-400 mt-1">{specsError}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Description</label>
        <textarea value={form.description} onChange={set("description")} rows={6} placeholder="Full product description (HTML allowed)" className="input-ghost w-full" />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Short Description</label>
        <textarea value={form.short_desc} onChange={set("short_desc")} rows={2} placeholder="One-line summary" className="input-ghost w-full" />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Tags (comma separated)</label>
        <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="RTX 4060, 16GB RAM, 144Hz" className="input-ghost w-full" />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Main Image</label>
        <ImageUpload value={form.main_image_url} onChange={(url) => setForm((f) => ({ ...f, main_image_url: url }))} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-text-secondary ml-1">Gallery (up to 4)</label>
          <button type="button" onClick={toggleGallery} className="text-xs text-accent-blue hover:text-accent-cyan flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add</button>
        </div>
        <div className="space-y-3">
          {form.images.map((img, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="flex-1">
                <ImageUpload value={img} onChange={(url) => setForm((f) => ({ ...f, images: f.images.map((x, xi) => xi === i ? url : x) }))} />
              </div>
              <button type="button" onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, xi) => xi !== i) }))} className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 mb-1 cursor-pointer"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 rounded accent-[#4F6DFF]" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
          <input type="checkbox" checked={form.is_bestseller} onChange={(e) => setForm((f) => ({ ...f, is_bestseller: e.target.checked }))} className="w-4 h-4 rounded accent-[#4F6DFF]" />
          Bestseller
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex justify-end gap-3 pt-2 sticky bottom-0 bg-bg-secondary/95 backdrop-blur py-3 -mb-2 rounded-b-xl">
        <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer">Cancel</button>
        <button type="submit" disabled={saving} className="glass-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 cursor-pointer">
          {saving ? <span className="inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Saving...</span> : (initial ? "Save Changes" : "Create Product")}
        </button>
      </div>
    </form>
  );
}

function StockPill({ status }) {
  const s = String(status || "").toLowerCase();
  const tone = s.includes("out") ? "text-red-400 bg-red-400/12 border-red-400/20"
    : s.includes("low") ? "text-amber-400 bg-amber-400/12 border-amber-400/20"
    : "text-green-400 bg-green-400/12 border-green-400/20";
  return <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium border ${tone}`}>{status}</span>;
}

export default function AdminProducts() {
  const { token } = useAuth();
  const [cats, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // null | { initial } | "new"
  const [pace, setPace] = useState(0);

  const categories = useMemo(() => {
    const arr = Array.isArray(cats) ? cats : cats?.categories || [];
    const names = arr.map((c) => (typeof c === "string" ? c : c?.name)).filter(Boolean);
    const unique = [...new Set(names)];
    if (unique.length === 0) {
      return ["Gaming Laptops", "Workstation", "Ultra-Portable", "Pre-Owned", "Components", "Monitors", "Gaming Accessories", "Networking", "Power Solutions"];
    }
    return unique;
  }, [cats]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/categories")
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const arr = Array.isArray(json) ? json : json?.categories || [];
        if (Array.isArray(arr) && arr.length > 0) setCategories(arr);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "200" });
      if (search) params.set("search", search);
      if (catFilter) params.set("category", catFilter);
      if (stockFilter) params.set("stock", stockFilter);
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load products");
      setProducts(data.products || []);
      setPace(data.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, catFilter, stockFilter]);

  useEffect(() => {
    const t = setTimeout(() => loadProducts(), 250);
    return () => clearTimeout(t);
  }, [loadProducts]);

  const quickStock = async (p, delta) => {
    const newStock = Math.max(0, (p.stock_quantity ?? p.stock ?? 0) + delta);
    const res = await fetch(`/api/products/${p.id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify({ stock: newStock }),
    });
    if (res.ok) loadProducts();
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title || p.name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/products/${p.id}`, { method: "DELETE", headers: authHeaders(token) });
    if (res.ok) loadProducts();
  };

  const onSaved = () => { setModal(null); loadProducts(); };

  const paged = products; // API returns sorted; client pagination for the table
  const PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(paged.length / PAGE));
  const safePage = Math.min(page, totalPages);
  const rows = paged.slice((safePage - 1) * PAGE, safePage * PAGE);

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-white tracking-tight">Products</h1>
          <p className="text-text-muted text-sm mt-1">{pace} products in catalog · {products.filter((p) => String(p.stock_status || "").toLowerCase().includes("out")).length} out of stock</p>
        </div>
        <button onClick={() => setModal("new")} className="glass-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="glass-card p-4 mb-5">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, brand, description..." className="input-ghost w-full pl-10" />
          </div>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="input-ghost min-w-[160px]">
            <option value="">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="input-ghost min-w-[140px]">
            <option value="">All stock</option>
            {STOCK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted gap-2"><Loader2 size={18} className="animate-spin" /> Loading products...</div>
      ) : rows.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-text-muted text-sm">No products found{paged.length === 0 && products.length === 0 ? " yet" : ` matching your filters`}.</p>
          {paged.length === 0 && products.length === 0 && (
            <button onClick={() => setModal("new")} className="mt-4 text-accent-blue text-sm hover:text-accent-cyan inline-flex items-center gap-1.5 cursor-pointer"><Plus size={14} /> Add your first product</button>
          )}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-text-muted border-b border-white/[0.06]">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Condition</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium text-center">Flags</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => {
                  const img = p.main_image_url || p.images?.[0] || p.img;
                  const price = p.salePrice ?? p.sale_price ?? p.price;
                  const orig = p.originalPrice ?? p.original_price;
                  return (
                    <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {img ? <img src={img} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/[0.06]" loading="lazy" onError={(e) => { e.target.style.visibility = "hidden"; }} /> : <div className="w-12 h-12 rounded-lg bg-white/[0.03] flex items-center justify-center text-text-muted text-xs">—</div>}
                          <div className="min-w-0">
                            <p className="text-text-white font-medium truncate max-w-[260px]">{p.title || p.name}</p>
                            {p.brand && <p className="text-[11px] text-text-muted">{p.brand} · {p.stock_quantity ?? p.stock} units</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{p.category || "—"}</td>
                      <td className="px-4 py-3 text-text-secondary text-xs">{p.condition || "Brand New"}</td>
                      <td className="px-4 py-3">
                        <span className="text-text-white font-semibold">${Number(price).toLocaleString()}</span>
                        {orig && orig !== price && <span className="text-text-muted line-through text-xs ml-1.5">${Number(orig).toLocaleString()}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => quickStock(p, -1)} className="w-6 h-6 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-text-muted flex items-center justify-center cursor-pointer" title="Decrease stock"><Minus size={12} /></button>
                          <StockPill status={p.stock_status} />
                          <button onClick={() => quickStock(p, 1)} className="w-6 h-6 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-text-muted flex items-center justify-center cursor-pointer" title="Increase stock"><Plus size={12} /></button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          {(p.is_featured || p.featured) && <Star size={14} className="text-purple-400" fill="currentColor" />}
                          {p.is_bestseller && <Trophy size={14} className="text-amber-400" fill="currentColor" />}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => setModal({ initial: p })} className="p-2 rounded-lg text-text-muted hover:text-accent-blue hover:bg-accent-blue/10 transition-colors cursor-pointer" title="Edit"><Pencil size={15} /></button>
                          <button onClick={() => remove(p)} className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer" title="Delete"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-xs text-text-muted">Page {safePage} of {totalPages}</p>
              <div className="flex gap-2">
                <button disabled={safePage <= 1} onClick={() => setPage(safePage - 1)} className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-30 text-text-secondary cursor-pointer"><ChevronLeft size={15} /></button>
                <button disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)} className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-30 text-text-secondary cursor-pointer"><ChevronRight size={15} /></button>
              </div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 md:p-8 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ type: "spring", damping: 28, stiffness: 320 }} className="glass-card w-full max-w-3xl p-6 rounded-3xl my-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-text-white">{modal === "new" ? "Add Product" : "Edit Product"}</h2>
                <button onClick={() => setModal(null)} className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 cursor-pointer"><X size={18} /></button>
              </div>
              <ProductForm key={modal === "new" ? "new" : modal.initial.id} initial={modal === "new" ? null : modal.initial} categories={categories} token={token} onSave={onSaved} onClose={() => setModal(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}