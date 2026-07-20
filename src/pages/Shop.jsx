import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, ShoppingCart, MessageCircle, Filter, ChevronDown, X,
  Package, ChevronLeft, ChevronRight, SlidersHorizontal, Star,
} from "lucide-react";
import { WHATSAPP } from "../content/data";

const CATEGORIES = [
  "All", "Laptops", "Desktop PCs", "PC Parts", "GPUs", "CPUs", "RAM",
  "SSDs", "HDDs", "Monitors", "Keyboards", "Mice", "Chargers",
  "Batteries", "Screens", "Accessories", "Repairs",
];

const BRANDS = [
  "HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "Apple",
  "Toshiba", "Samsung", "Microsoft", "Huawei", "Gigabyte", "Alienware", "Fujitsu",
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "newest", label: "Newest" },
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $300", min: 100, max: 300 },
  { label: "$300 - $500", min: 300, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000+", min: 1000, max: Infinity },
];

const PRODUCTS_PER_PAGE = 12;

function StockBadge({ stock }) {
  if (stock === 0) return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/20">Out of Stock</span>;
  if (stock <= 5) return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">Low Stock</span>;
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">In Stock</span>;
}

function formatPrice(price) {
  if (price == null) return "Price on Request";
  return `$${Number(price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ProductCard({ product, index }) {

  const whatsappMessage = encodeURIComponent(
    `Hi Radeon Tech! I'm interested in:\n\n📦 *${product.name}*\n` +
    (product.brand ? `🏷️ Brand: ${product.brand}\n` : "") +
    (product.salePrice ? `💰 Sale Price: ${formatPrice(product.salePrice)}\n` : product.price ? `💰 Price: ${formatPrice(product.price)}\n` : "") +
    `\nPlease send me more details.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="glass-card overflow-hidden flex flex-col group"
    >
      <Link to={`/shop/${product.id || product.slug || product._id}`} className="no-underline block">
        {product.images?.[0] || product.img ? (
          <div className="relative h-48 overflow-hidden bg-bg-surface">
            <img
              src={product.images?.[0] || product.img}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.onSale && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white shadow-lg shadow-red-500/30">
                Sale
              </span>
            )}
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-accent-purple/5 to-accent-blue/5 relative">
            <categoryIcon className="w-14 h-14 text-accent-purple/25" />
            {product.onSale && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white shadow-lg shadow-red-500/30">
                Sale
              </span>
            )}
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {product.brand && (
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-accent-blue bg-accent-blue/10 border border-accent-blue/20 rounded-full">
              {product.brand}
            </span>
          )}
          {product.category && (
            <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-text-muted bg-white/5 border border-border-subtle rounded-full">
              {product.category}
            </span>
          )}
        </div>

        <Link to={`/shop/${product.id || product.slug || product._id}`} className="no-underline block">
          <h3 className="font-heading font-semibold text-sm text-text-primary mb-2 line-clamp-2 group-hover:text-accent-blue transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            {product.salePrice != null ? (
              <>
                <span className="text-lg font-bold text-red-400">{formatPrice(product.salePrice)}</span>
                <span className="text-sm text-text-muted line-through">{formatPrice(product.price)}</span>
              </>
            ) : product.price != null ? (
              <span className="text-lg font-bold text-text-primary">{formatPrice(product.price)}</span>
            ) : (
              <span className="text-sm font-medium text-accent-purple">Price on Request</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            {product.stock != null && <StockBadge stock={product.stock} />}
          </div>

          <div className="flex gap-2">
            <Link
              to={`/shop/${product.id || product.slug || product._id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-accent-purple to-accent-blue hover:from-accent-purple/90 hover:to-accent-blue/90 rounded-xl px-3 py-2.5 transition-all duration-300 shadow-md shadow-accent-purple/20 no-underline"
            >
              <ShoppingCart size={13} /> Add to Quote
            </Link>
            <a
              href={`${WHATSAPP}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all"
              aria-label={`WhatsApp about ${product.name}`}
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Sidebar({ filters, setFilters, mobileOpen, setMobileOpen }) {
  const [expandedSections, setExpandedSections] = useState({ brand: true, price: true, stock: true, sale: true });

  const toggle = (section) => setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const content = (
    <div className="space-y-6">
      <div>
        <button onClick={() => toggle("brand")} className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted mb-3 cursor-pointer">
          <span className="flex items-center gap-2"><Filter size={12} /> Brand</span>
          <ChevronDown size={12} className={`transition-transform ${expandedSections.brand ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.brand && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => setFilters((p) => ({ ...p, brand: "" }))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${!filters.brand ? "text-accent-blue bg-accent-blue/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"}`}
            >
              All Brands
            </button>
            {BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => setFilters((p) => ({ ...p, brand: p.brand === b ? "" : b }))}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${filters.brand === b ? "text-accent-blue bg-accent-blue/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"}`}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border-subtle" />

      <div>
        <button onClick={() => toggle("price")} className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted mb-3 cursor-pointer">
          <span className="flex items-center gap-2"><SlidersHorizontal size={12} /> Price Range</span>
          <ChevronDown size={12} className={`transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.price && (
          <div className="space-y-1.5">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                onClick={() => setFilters((p) => ({ ...p, priceRange: range.label }))}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${filters.priceRange === range.label ? "text-accent-blue bg-accent-blue/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"}`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border-subtle" />

      <div>
        <button onClick={() => toggle("stock")} className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted mb-3 cursor-pointer">
          <span>Availability</span>
          <ChevronDown size={12} className={`transition-transform ${expandedSections.stock ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.stock && (
          <div className="space-y-1.5">
            {[
              { label: "All", value: "" },
              { label: "In Stock", value: "in-stock" },
              { label: "Out of Stock", value: "out-of-stock" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters((p) => ({ ...p, availability: opt.value }))}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${filters.availability === opt.value ? "text-accent-blue bg-accent-blue/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border-subtle" />

      <div>
        <button onClick={() => toggle("sale")} className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted mb-3 cursor-pointer">
          <span className="flex items-center gap-2"><Star size={12} /> On Sale</span>
          <ChevronDown size={12} className={`transition-transform ${expandedSections.sale ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.sale && (
          <div className="space-y-1.5">
            <button
              onClick={() => setFilters((p) => ({ ...p, onSale: false }))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${!filters.onSale ? "text-accent-blue bg-accent-blue/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"}`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilters((p) => ({ ...p, onSale: true }))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${filters.onSale ? "text-accent-blue bg-accent-blue/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"}`}
            >
              On Sale Only
            </button>
          </div>
        )}
      </div>

      {(filters.brand || filters.priceRange !== "All Prices" || filters.availability || filters.onSale) && (
        <button
          onClick={() => setFilters({ brand: "", priceRange: "All Prices", availability: "", onSale: false })}
          className="w-full text-center text-xs font-medium text-red-400 hover:text-red-300 py-2 rounded-lg border border-red-500/20 hover:bg-red-500/5 transition-all cursor-pointer"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block sticky top-24">
        <div className="glass-card-static p-5">
          <h3 className="font-heading font-semibold text-sm text-text-primary mb-4 flex items-center gap-2">
            <Filter size={14} className="text-accent-blue" /> Filters
          </h3>
          {content}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-bg-secondary border-r border-border-subtle z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-semibold text-text-primary flex items-center gap-2">
                    <Filter size={14} className="text-accent-blue" /> Filters
                  </h3>
                  <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted cursor-pointer">
                    <X size={18} />
                  </button>
                </div>
                {content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-card-static overflow-hidden animate-pulse">
          <div className="h-48 bg-white/5" />
          <div className="p-5 space-y-3">
            <div className="flex gap-2">
              <div className="h-4 w-12 bg-white/5 rounded-full" />
              <div className="h-4 w-16 bg-white/5 rounded-full" />
            </div>
            <div className="h-4 w-3/4 bg-white/5 rounded" />
            <div className="h-6 w-1/3 bg-white/5 rounded" />
            <div className="h-4 w-1/4 bg-white/5 rounded" />
            <div className="flex gap-2">
              <div className="h-10 flex-1 bg-white/5 rounded-xl" />
              <div className="h-10 w-10 bg-white/5 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ query, category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-border-subtle flex items-center justify-center mx-auto mb-5">
        <Package size={32} className="text-text-muted" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">No products found</h3>
      <p className="text-text-secondary text-sm max-w-sm mx-auto">
        {query
          ? `No results for "${query}"${category !== "All" ? ` in ${category}` : ""}. Try adjusting your search or filters.`
          : `No products available${category !== "All" ? ` in ${category}` : ""} at the moment. Check back soon!`}
      </p>
    </motion.div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filters, setFilters] = useState({ brand: "", priceRange: "All Prices", availability: "", onSale: false });
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortRef = useRef(null);
  const categoryScrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (category !== "All") params.set("category", category);
      if (filters.brand) params.set("brand", filters.brand);
      if (filters.availability) params.set("availability", filters.availability);
      if (filters.onSale) params.set("onSale", "true");
      if (filters.priceRange !== "All Prices") {
        const range = PRICE_RANGES.find((r) => r.label === filters.priceRange);
        if (range) {
          if (range.max !== Infinity) params.set("maxPrice", range.max);
          if (range.min > 0) params.set("minPrice", range.min);
        }
      }
      params.set("sort", sort);
      params.set("page", page);
      params.set("limit", PRODUCTS_PER_PAGE);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products || data || []);
      setTotalProducts(data.total ?? (data.products || data || []).length);
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, filters, sort, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => { setPage(1); }, [debouncedSearch, category, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setMobileFiltersOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="section-glow-top" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <div className="glass inline-block px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold text-accent-purple tracking-wide">SHOP</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              Browse Our <span className="text-gradient">Products</span>
            </h1>
            <p className="section-subtitle mt-3">
              Quality computers, components, and accessories — all backed by our service guarantee.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-border-subtle rounded-2xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue/40 focus:bg-white/[0.06] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/5 text-text-muted cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 overflow-x-auto scrollbar-none -mx-4 px-4">
            <div ref={categoryScrollRef} className="flex gap-2 min-w-max pb-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    category === cat
                      ? "bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-md shadow-accent-purple/20"
                      : "bg-white/[0.04] border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-border-subtle text-xs font-medium text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              >
                <Filter size={14} /> Filters
              </button>
              <p className="text-text-muted text-xs">
                <span className="text-text-secondary font-medium">{totalProducts}</span> product{totalProducts !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-border-subtle text-xs font-medium text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              >
                {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                <ChevronDown size={12} className={`transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {sortDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-bg-surface border border-border-subtle rounded-xl shadow-xl overflow-hidden z-30"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setSortDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                          sort === opt.value ? "text-accent-blue bg-accent-blue/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex gap-8">
            <Sidebar filters={filters} setFilters={setFilters} mobileOpen={mobileFiltersOpen} setMobileOpen={setMobileFiltersOpen} />

            <div className="flex-1 min-w-0">
              {loading ? (
                <LoadingSkeleton />
              ) : error ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <Package size={24} className="text-red-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary mb-2">Something went wrong</h3>
                  <p className="text-text-secondary text-sm mb-4">{error}</p>
                  <button
                    onClick={fetchProducts}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-accent-blue/80 transition-colors cursor-pointer"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : products.length === 0 ? (
                <EmptyState query={debouncedSearch} category={category} />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                      {products.map((product, i) => (
                        <ProductCard key={product.id || product.slug || product._id || i} product={product} index={i} />
                      ))}
                    </AnimatePresence>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 rounded-xl bg-white/[0.04] border border-border-subtle text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                        .reduce((acc, p, idx, arr) => {
                          if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((p, i) =>
                          p === "..." ? (
                            <span key={`ellipsis-${i}`} className="px-2 text-text-muted text-xs">...</span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`min-w-[36px] h-9 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                page === p
                                  ? "bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-md shadow-accent-purple/20"
                                  : "bg-white/[0.04] border border-border-subtle text-text-secondary hover:text-text-primary"
                              }`}
                            >
                              {p}
                            </button>
                          )
                        )}
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-2 rounded-xl bg-white/[0.04] border border-border-subtle text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
