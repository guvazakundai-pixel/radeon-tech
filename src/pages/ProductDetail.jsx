import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight, ChevronLeft, ShoppingCart, MessageCircle, Minus, Plus,
  Package, ArrowLeft, Star, Truck, Shield, RotateCcw, AlertTriangle,
} from "lucide-react";
import { WHATSAPP } from "../content/data";

function formatPrice(price) {
  if (price == null) return "Price on Request";
  return `$${Number(price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function StockBadge({ stock }) {
  if (stock === 0) return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/20"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Out of Stock</span>;
  if (stock <= 5) return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Low Stock — {stock} left</span>;
  return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> In Stock — {stock} available</span>;
}

function ImageGallery({ images, name }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const allImages = images?.length ? images : [];

  if (allImages.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent-purple/5 to-accent-blue/5 border border-border-subtle flex items-center justify-center">
        <Package size={64} className="text-accent-purple/20" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-surface border border-border-subtle group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={allImages[activeIdx]}
            alt={`${name} — image ${activeIdx + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((i) => (i - 1 + allImages.length) % allImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveIdx((i) => (i + 1) % allImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                i === activeIdx ? "border-accent-blue shadow-md shadow-accent-blue/20" : "border-border-subtle hover:border-white/20"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecTable({ specs }) {
  if (!specs || (Array.isArray(specs) && specs.length === 0) || (typeof specs === "object" && !Array.isArray(specs) && Object.keys(specs).length === 0)) {
    return null;
  }

  const entries = Array.isArray(specs)
    ? specs.map((s) => [s.label || s.key || s.name, s.value || s.detail])
    : Object.entries(specs);

  return (
    <div className="glass-card-static overflow-hidden">
      <h3 className="font-heading font-semibold text-base text-text-primary px-6 pt-5 pb-3">Specifications</h3>
      <div className="border-t border-border-subtle" />
      <div className="divide-y divide-border-subtle">
        {entries.map(([key, value], i) => (
          <div key={i} className="flex items-start px-6 py-3 hover:bg-white/[0.01] transition-colors">
            <span className="text-xs font-medium text-text-muted w-36 md:w-44 shrink-0">{key}</span>
            <span className="text-xs text-text-secondary">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedProducts({ products, currentId }) {
  const related = (products || []).filter((p) => (p.id || p.slug || p._id) !== currentId).slice(0, 8);
  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-heading font-semibold text-xl text-text-primary mb-6">Related Products</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4">
        {related.map((product) => {
          const pid = product.id || product.slug || product._id;
          const img = product.images?.[0] || product.img;
          return (
            <Link
              key={pid}
              to={`/shop/${pid}`}
              className="shrink-0 w-56 glass-card overflow-hidden flex flex-col group no-underline"
            >
              {img ? (
                <div className="h-36 overflow-hidden bg-bg-surface">
                  <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="h-36 flex items-center justify-center bg-gradient-to-br from-accent-purple/5 to-accent-blue/5">
                  <Package size={24} className="text-accent-purple/25" />
                </div>
              )}
              <div className="p-3">
                <h4 className="font-heading text-xs font-semibold text-text-primary line-clamp-2 group-hover:text-accent-blue transition-colors mb-1.5">{product.name}</h4>
                {product.salePrice != null ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-red-400">{formatPrice(product.salePrice)}</span>
                    <span className="text-[10px] text-text-muted line-through">{formatPrice(product.price)}</span>
                  </div>
                ) : product.price != null ? (
                  <span className="text-sm font-bold text-text-primary">{formatPrice(product.price)}</span>
                ) : (
                  <span className="text-[10px] font-medium text-accent-purple">Price on Request</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="aspect-square rounded-2xl bg-white/5" />
        <div className="space-y-4 py-4">
          <div className="h-4 w-20 bg-white/5 rounded-full" />
          <div className="h-8 w-3/4 bg-white/5 rounded" />
          <div className="h-4 w-1/3 bg-white/5 rounded" />
          <div className="h-10 w-1/4 bg-white/5 rounded" />
          <div className="h-4 w-1/2 bg-white/5 rounded" />
          <div className="h-24 w-full bg-white/5 rounded" />
          <div className="flex gap-3">
            <div className="h-12 flex-1 bg-white/5 rounded-xl" />
            <div className="h-12 w-12 bg-white/5 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error(res.status === 404 ? "Product not found" : "Failed to load product");
      const data = await res.json();
      setProduct(data.product || data);
      if (data.related?.length) setRelated(data.related);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchProduct(); }, [fetchProduct]);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    if (product && !related.length) {
      const fetchRelated = async () => {
        try {
          const params = new URLSearchParams({ limit: "8" });
          if (product.category) params.set("category", product.category);
          const res = await fetch(`/api/products?${params.toString()}`);
          if (res.ok) {
            const data = await res.json();
            setRelated(data.products || data || []);
          }
        } catch {}
      };
      fetchRelated();
    }
  }, [product, related.length]);

  const whatsappMessage = product
    ? encodeURIComponent(
        `Hi Radeon Tech! I'm interested in:\n\n📦 *${product.name}*\n` +
        (product.brand ? `🏷️ Brand: ${product.brand}\n` : "") +
        (product.salePrice ? `💰 Sale Price: ${formatPrice(product.salePrice)}\n` : product.price ? `💰 Price: ${formatPrice(product.price)}\n` : "") +
        (quantity > 1 ? `🔢 Quantity: ${quantity}\n` : "") +
        `\nPlease send me more details.`
      )
    : "";

  const handleAddToQuote = () => {
    if (!product) return;
    const msg = encodeURIComponent(
      `Hi Radeon Tech! I'd like a quote for:\n\n` +
      (quantity > 1 ? `🔢 Quantity: ${quantity}\n` : "") +
      `📦 *${product.name}*\n` +
      (product.brand ? `🏷️ Brand: ${product.brand}\n` : "") +
      (product.salePrice ? `💰 Listed Price: ${formatPrice(product.salePrice)}\n` : product.price ? `💰 Listed Price: ${formatPrice(product.price)}\n` : "") +
      `\nPlease provide a quote. Thank you!`
    );
    window.open(`${WHATSAPP}?text=${msg}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <DetailSkeleton />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
          <h2 className="font-heading font-semibold text-xl text-text-primary mb-2">
            {error === "Product not found" ? "Product Not Found" : "Something Went Wrong"}
          </h2>
          <p className="text-text-secondary text-sm mb-6 max-w-sm">
            {error === "Product not found"
              ? "The product you're looking for doesn't exist or may have been removed."
              : "We couldn't load the product details. Please try again."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={fetchProduct} className="glass-btn-outline text-sm px-5 py-2.5 cursor-pointer">
              Try Again
            </button>
            <Link to="/shop" className="glass-btn text-sm px-5 py-2.5 no-underline inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Back to Shop
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : product.img ? [product.img] : [];

  return (
    <div className="min-h-screen bg-bg-primary">
      <section className="pt-28 pb-4 md:pt-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex items-center gap-1.5 text-xs text-text-muted flex-wrap">
            <Link to="/" className="hover:text-accent-blue transition-colors no-underline text-text-muted">Home</Link>
            <ChevronRight size={10} />
            <Link to="/shop" className="hover:text-accent-blue transition-colors no-underline text-text-muted">Shop</Link>
            {product.category && (
              <>
                <ChevronRight size={10} />
                <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-accent-blue transition-colors no-underline text-text-muted">
                  {product.category}
                </Link>
              </>
            )}
            <ChevronRight size={10} />
            <span className="text-text-secondary truncate max-w-[200px]">{product.name}</span>
          </motion.nav>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <ImageGallery images={images} name={product.name} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {product.brand && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-accent-blue bg-accent-blue/10 border border-accent-blue/20 rounded-full">
                    {product.brand}
                  </span>
                )}
                {product.category && (
                  <span className="inline-block px-3 py-1 text-xs font-medium text-text-muted bg-white/5 border border-border-subtle rounded-full">
                    {product.category}
                  </span>
                )}
                {product.onSale && (
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-500 rounded-full shadow-lg shadow-red-500/30">
                    Sale
                  </span>
                )}
              </div>

              <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">{product.name}</h1>

              <div className="flex items-center gap-3 mb-4">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} className={i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-text-muted/30"} />
                    ))}
                    <span className="text-xs text-text-muted ml-1">({product.reviewCount || 0})</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                {product.salePrice != null ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-red-400">{formatPrice(product.salePrice)}</span>
                    <span className="text-lg text-text-muted line-through">{formatPrice(product.price)}</span>
                    {product.price && product.salePrice && (
                      <span className="text-xs font-bold text-white bg-red-500/80 px-2 py-0.5 rounded-full">
                        Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                ) : product.price != null ? (
                  <span className="text-3xl font-bold text-text-primary">{formatPrice(product.price)}</span>
                ) : (
                  <span className="text-lg font-semibold text-accent-purple">Price on Request</span>
                )}
              </div>

              {product.stock != null && <div className="mb-5"><StockBadge stock={product.stock} /></div>}

              {product.description && (
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{product.description}</p>
              )}

              {product.stock > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-medium text-text-muted">Quantity</span>
                  <div className="flex items-center border border-border-subtle rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/[0.04] disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-text-primary">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                      className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition-all cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToQuote}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-purple to-accent-blue hover:from-accent-purple/90 hover:to-accent-blue/90 text-white font-semibold text-sm rounded-xl px-6 py-3.5 transition-all duration-300 shadow-md shadow-accent-purple/20 cursor-pointer"
                >
                  <ShoppingCart size={16} />
                  {product.price || product.salePrice ? "Add to Quote" : "Request Quote"}
                </button>
                <a
                  href={`${WHATSAPP}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl px-6 py-3.5 transition-all duration-300 shadow-md shadow-emerald-600/20 no-underline"
                >
                  <MessageCircle size={16} />
                  Ask on WhatsApp
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-border-subtle">
                  <Truck size={16} className="text-accent-blue mb-1.5" />
                  <span className="text-[10px] text-text-muted leading-tight">Delivery<br />Available</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-border-subtle">
                  <Shield size={16} className="text-accent-blue mb-1.5" />
                  <span className="text-[10px] text-text-muted leading-tight">Service<br />Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-border-subtle">
                  <RotateCcw size={16} className="text-accent-blue mb-1.5" />
                  <span className="text-[10px] text-text-muted leading-tight">Easy<br />Returns</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12">
            <SpecTable specs={product.specs || product.specifications} />
          </div>

          <RelatedProducts products={related} currentId={product.id || product.slug || product._id} />

          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-accent-blue transition-colors no-underline"
            >
              <ArrowLeft size={14} /> Back to Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
