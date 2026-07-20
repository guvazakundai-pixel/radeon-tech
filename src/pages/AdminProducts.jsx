import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Plus, Search, Package, Loader2, Trash2, Edit3,
  X, Save, Eye, EyeOff, Tag, DollarSign, Image as ImageIcon,
} from "lucide-react";
import ImageUpload from "../components/ImageUpload";

const emptyProduct = {
  name: "", description: "", shortDesc: "", price: "", salePrice: "",
  category: "", brand: "", sku: "", stock: "0", featured: false, images: [],
  tags: [], specs: {},
};

function ProductForm({ product, onSave, onCancel, saving }) {
  const [form, setForm] = useState(product || { ...emptyProduct });
  const [specKey, setSpecKey] = useState("");
  const [specVal, setSpecVal] = useState("");
  const [tagInput, setTagInput] = useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const addSpec = () => {
    if (!specKey.trim()) return;
    update("specs", { ...form.specs, [specKey.trim()]: specVal.trim() });
    setSpecKey("");
    setSpecVal("");
  };

  const removeSpec = (key) => {
    const s = { ...form.specs };
    delete s[key];
    update("specs", s);
  };

  const addTag = () => {
    if (!tagInput.trim() || form.tags.includes(tagInput.trim())) return;
    update("tags", [...form.tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (t) => update("tags", form.tags.filter((x) => x !== t));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: parseFloat(form.price) || 0,
      salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      stock: parseInt(form.stock) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs text-text-secondary mb-1.5">Product Name *</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)}
            className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Brand</label>
          <input value={form.brand} onChange={(e) => update("brand", e.target.value)}
            className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">SKU</label>
          <input value={form.sku} onChange={(e) => update("sku", e.target.value)}
            className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Category</label>
          <input value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="e.g. Laptops, Desktops, Components"
            className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Stock</label>
          <input type="number" min="0" value={form.stock} onChange={(e) => update("stock", e.target.value)}
            className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Price (USD) *</label>
          <input type="number" step="0.01" min="0" required value={form.price} onChange={(e) => update("price", e.target.value)}
            className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Sale Price (USD) — leave empty if none</label>
          <input type="number" step="0.01" min="0" value={form.salePrice} onChange={(e) => update("salePrice", e.target.value)}
            className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Short Description</label>
        <input value={form.shortDesc} onChange={(e) => update("shortDesc", e.target.value)} placeholder="One-liner for product cards"
          className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Full Description</label>
        <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)}
          className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all resize-none" />
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Product Images</label>
        <div className="space-y-2">
          {(form.images || []).map((img, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-16 h-16 rounded-lg bg-white/5 overflow-hidden border border-border-subtle">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
              <input value={img} onChange={(e) => { const imgs = [...form.images]; imgs[i] = e.target.value; update("images", imgs); }}
                className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
              <button type="button" onClick={() => update("images", form.images.filter((_, j) => j !== i))}
                className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
            </div>
          ))}
          <ImageUpload value="" onChange={(val) => { if (val) update("images", [...(form.images || []), val]); }} />
        </div>
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Specifications</label>
        <div className="space-y-2">
          {Object.entries(form.specs || {}).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-accent-blue font-medium min-w-[100px]">{key}</span>
              <input value={val} onChange={(e) => update("specs", { ...form.specs, [key]: e.target.value })}
                className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-3 py-1.5 text-xs text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
              <button type="button" onClick={() => removeSpec(key)}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"><X size={12} /></button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input value={specKey} onChange={(e) => setSpecKey(e.target.value)} placeholder="Key (e.g. RAM)"
              className="w-32 bg-white/5 border border-border-subtle rounded-lg px-3 py-1.5 text-xs text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
            <input value={specVal} onChange={(e) => setSpecVal(e.target.value)} placeholder="Value (e.g. 16GB DDR5)"
              className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-3 py-1.5 text-xs text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
            <button type="button" onClick={addSpec}
              className="p-1.5 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors cursor-pointer"><Plus size={12} /></button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Tags</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue">
              {t}
              <button type="button" onClick={() => removeTag(t)} className="cursor-pointer hover:text-white transition-colors"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            placeholder="Add tag"
            className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-3 py-1.5 text-xs text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
          <button type="button" onClick={addTag}
            className="p-1.5 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors cursor-pointer"><Plus size={12} /></button>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)}
          className="w-4 h-4 rounded border-border-subtle bg-white/5 text-accent-blue focus:ring-accent-blue/50" />
        <span className="text-sm text-text-secondary">Featured product (shown on homepage)</span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 glass-btn text-white px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : product?.id ? "Update Product" : "Create Product"}
        </button>
        <button type="button" onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminProducts() {
  const { isAuthenticated, loading, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/admin/login");
  }, [loading, isAuthenticated, navigate]);

  const fetchProducts = useCallback(async () => {
    setFetching(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("limit", "100");
      const res = await fetch(`/api/products?${params}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch {}
    setFetching(false);
  }, [search]);

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated, fetchProducts]);

  const handleSave = async (form) => {
    setSaving(true);
    try {
      const isEdit = !!form.id;
      const url = isEdit ? `/api/products/${form.id}` : "/api/products";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMsg(isEdit ? "Product updated" : "Product created");
        setView("list");
        setEditing(null);
        fetchProducts();
      } else {
        const data = await res.json();
        setMsg(data.error || "Failed to save");
      }
    } catch {
      setMsg("Network error");
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMsg("Product deleted");
        fetchProducts();
      }
    } catch {}
    setTimeout(() => setMsg(""), 3000);
  };

  const handleToggleFeatured = async (product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ featured: !product.featured }),
      });
      if (res.ok) fetchProducts();
    } catch {}
  };

  const handleToggleArchived = async (product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ archived: !product.archived }),
      });
      if (res.ok) {
        setMsg(product.archived ? "Product restored" : "Product archived");
        fetchProducts();
      }
    } catch {}
    setTimeout(() => setMsg(""), 3000);
  };

  if (loading || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-bg-primary"><div className="text-text-muted text-sm">Loading...</div></div>;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="sticky top-0 z-30 bg-bg-secondary/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => view === "list" ? navigate("/admin/dashboard") : (setView("list"), setEditing(null))}
              className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white transition-colors cursor-pointer">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-text-white">Products</h1>
              <p className="text-xs text-text-muted">{products.length} total</p>
            </div>
          </div>
          {view === "list" && (
            <button onClick={() => { setView("create"); setEditing({ ...emptyProduct }); }}
              className="flex items-center gap-2 glass-btn text-white px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">
              <Plus size={14} /> Add Product
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <AnimatePresence>
          {msg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`mb-4 text-xs font-medium px-4 py-2 rounded-lg ${
                msg.includes("Failed") || msg.includes("error") ? "bg-red-400/10 text-red-400 border border-red-400/20" : "bg-green-400/10 text-green-400 border border-green-400/20"
              }`}>{msg}</motion.div>
          )}
        </AnimatePresence>

        {view === "list" && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-all" />
              </div>
            </div>

            {fetching ? (
              <div className="text-center py-20 text-text-muted text-sm flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Package size={48} className="mx-auto mb-4 text-text-muted/30" />
                <p className="text-text-muted text-sm mb-3">No products yet</p>
                <button onClick={() => { setView("create"); setEditing({ ...emptyProduct }); }}
                  className="inline-flex items-center gap-2 glass-btn text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer">
                  <Plus size={14} /> Add First Product
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {products.map((p) => (
                  <div key={p.id} className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-border-subtle bg-white/[0.02] hover:bg-white/[0.04] transition-all ${p.archived ? "opacity-50" : ""}`}>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 overflow-hidden border border-border-subtle shrink-0">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package size={20} className="text-text-muted/30" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-text-white truncate">{p.name}</h3>
                        {p.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 font-medium shrink-0">Featured</span>}
                        {p.archived && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-400/10 text-red-400 font-medium shrink-0">Archived</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-text-muted">{p.brand || "—"}</span>
                        <span className="text-xs text-text-muted">{p.category || "—"}</span>
                        <span className="text-xs text-text-muted">Stock: {p.stock}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      {p.salePrice ? (
                        <div>
                          <span className="text-sm font-bold text-green-400">${p.salePrice}</span>
                          <span className="text-xs text-text-muted line-through ml-1.5">${p.price}</span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-text-white">${p.price}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => { setView("edit"); setEditing(p); }} title="Edit"
                        className="p-2 rounded-lg hover:bg-accent-blue/10 text-text-muted hover:text-accent-blue transition-colors cursor-pointer"><Edit3 size={15} /></button>
                      <button onClick={() => handleToggleFeatured(p)} title={p.featured ? "Unfeature" : "Feature"}
                        className="p-2 rounded-lg hover:bg-amber-400/10 text-text-muted hover:text-amber-400 transition-colors cursor-pointer"><Star size={15} /></button>
                      <button onClick={() => handleToggleArchived(p)} title={p.archived ? "Restore" : "Archive"}
                        className="p-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-text-white transition-colors cursor-pointer">
                        {p.archived ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} title="Delete"
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {(view === "create" || view === "edit") && editing && (
          <div className="max-w-3xl">
            <h2 className="text-lg font-bold text-text-white mb-5">{view === "edit" ? "Edit Product" : "New Product"}</h2>
            <ProductForm product={editing} onSave={handleSave} onCancel={() => { setView("list"); setEditing(null); }} saving={saving} />
          </div>
        )}
      </div>
    </div>
  );
}

function Star({ size, ...props }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}
