import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import { useContent } from "../hooks/useContent";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function StorePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const { data: products } = useContent("products");
  const items = useMemo(() => products || [], [products]);

  const categories = useMemo(() => {
    const cats = new Set(items.map((p) => p.category || "Other"));
    return ["All", ...Array.from(cats)];
  }, [items]);

  const filtered = useMemo(() => {
    let result = items;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }
    if (category !== "All") {
      result = result.filter((p) => (p.category || "Other") === category);
    }
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        result = [...result].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      default:
        break;
    }
    return result;
  }, [items, search, category, sortBy]);

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeIn(0)}>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <ShoppingCart size={13} className="text-accent-blue" />
              <span className="text-xs font-semibold text-accent-blue tracking-wide">TECH STORE</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-text-white leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Tech <span className="text-gradient">Store</span>
            </h1>
            <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              New and refurbished laptops, desktops, components, and accessories. All products tested and warrantied.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-8">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/30 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white text-sm focus:outline-none focus:border-accent-blue/30 appearance-none cursor-pointer min-w-[140px]"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#141414] text-white">{c}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white text-sm focus:outline-none focus:border-accent-blue/30 appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="featured" className="bg-[#141414]">Featured</option>
                <option value="price-low" className="bg-[#141414]">Price: Low</option>
                <option value="price-high" className="bg-[#141414]">Price: High</option>
                <option value="name" className="bg-[#141414]">Name</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">No products found.</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="mt-4 text-accent-blue text-sm hover:underline bg-transparent border-none cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id || product._id || i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <Link
                    to={`/shop/${product.id || product._id}`}
                    className="no-underline block"
                    onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  >
                    <div className="glass-card overflow-hidden group">
                      <div className="aspect-[4/3] bg-white/[0.01] overflow-hidden relative">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart size={32} className="text-text-muted/30" />
                          </div>
                        )}
                        {product.onSale && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-accent-blue/90 text-white text-[10px] font-semibold tracking-wide">
                            SALE
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        {product.brand && (
                          <p className="text-accent-blue text-[10px] font-semibold tracking-wider uppercase mb-1">{product.brand}</p>
                        )}
                        <h4 className="font-heading font-semibold text-text-white text-sm leading-tight mb-1.5 line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          {product.price != null && (
                            <span className="text-text-white font-bold text-base">
                              ${product.price.toLocaleString()}
                            </span>
                          )}
                          {product.onSale && product.originalPrice != null && (
                            <span className="text-text-muted text-xs line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
