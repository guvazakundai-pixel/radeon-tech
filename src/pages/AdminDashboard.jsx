import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, HelpCircle, BarChart3,
  Phone, Link2, Type, LogOut, Save, Plus, Trash2, Shield, Package,
  Wrench, Cpu, Star, Newspaper, ShoppingCart, Award, Loader2, Cloud, HardDrive,
  ExternalLink, ClipboardList, AlertTriangle,
} from "lucide-react";
import ImageUpload from "../components/ImageUpload";
import { saveContentToServer } from "../hooks/useContent";

const sections = [
  { key: "heroText", label: "Hero Text", icon: Type },
  { key: "heroStats", label: "Hero Stats", icon: BarChart3 },
  { key: "highlights", label: "About Highlights", icon: Award },
  { key: "aboutValues", label: "Core Values", icon: Shield },
  { key: "services", label: "Services", icon: Wrench },
  { key: "builds", label: "Custom Builds", icon: Cpu },
  { key: "whyChooseUs", label: "Why Choose Us", icon: Star },
  { key: "processSteps", label: "Process Steps", icon: Package },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare },
  { key: "faqCategories", label: "FAQs", icon: HelpCircle },
  { key: "knowledgeArticles", label: "Knowledge Centre", icon: Newspaper },
  { key: "featuredProducts", label: "Featured Products", icon: ShoppingCart },
  { key: "brands", label: "Brands", icon: Package },
  { key: "contactInfo", label: "Contact Info", icon: Phone },
  { key: "socialLinks", label: "Social Links", icon: Link2 },
];

function KeyValueEditor({ data, onChange, fields }) {
  const [values, setValues] = useState(data || {});
  const update = (field, value) => {
    const next = { ...values, [field]: value };
    setValues(next);
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-xs text-text-secondary mb-1">{f.label}</label>
          {f.type === "image" ? (
            <ImageUpload value={values[f.key] || ""} onChange={(val) => update(f.key, val)} />
          ) : f.textarea ? (
            <textarea value={values[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} rows={3} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all resize-none" />
          ) : (
            <input value={values[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
          )}
        </div>
      ))}
    </div>
  );
}

function HeroStatsEditor({ data, onChange }) {
  const [items, setItems] = useState(data || []);
  const update = (idx, field, value) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: value };
    setItems(next);
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((s, i) => (
        <div key={i} className="rounded-xl border border-border-subtle bg-white/[0.02] p-3">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-text-secondary mb-1">Value</label>
              <input type="number" value={s.value} onChange={(e) => update(i, "value", parseInt(e.target.value) || 0)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Suffix</label>
              <input value={s.suffix} onChange={(e) => update(i, "suffix", e.target.value)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Prefix</label>
              <input value={s.prefix || ""} onChange={(e) => update(i, "prefix", e.target.value)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Label</label>
              <input value={s.label} onChange={(e) => update(i, "label", e.target.value)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
            </div>
          </div>
          <button onClick={() => { const next = items.filter((_, j) => j !== i); setItems(next); onChange(next); }} className="mt-2 text-xs text-red-400/60 hover:text-red-400 transition-colors cursor-pointer">Remove</button>
        </div>
      ))}
      <button onClick={() => { const next = [...items, { value: 0, suffix: "+", label: "New Stat" }]; setItems(next); onChange(next); }} className="flex items-center gap-2 text-xs font-medium text-accent-blue hover:text-accent-blue/80 transition-colors cursor-pointer"><Plus size={14} /> Add Stat</button>
    </div>
  );
}

function ListEditor({ data, onChange, fields, newItem }) {
  const [items, setItems] = useState(data || []);
  const [editIdx, setEditIdx] = useState(-1);

  const update = (idx, field, value) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: value };
    setItems(next);
    onChange(next);
  };

  const addItem = () => {
    const next = [...items, { ...newItem }];
    setItems(next);
    onChange(next);
    setEditIdx(next.length - 1);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-border-subtle bg-white/[0.02] overflow-hidden">
          <button onClick={() => setEditIdx(editIdx === i ? -1 : i)} className="w-full flex items-center justify-between p-3 text-left hover:bg-white/[0.03] transition-colors cursor-pointer">
            <span className="text-sm font-medium text-text-white truncate pr-4">{item.title || item.name || item.q || item.label || `Item ${i + 1}`}</span>
            <div className="flex items-center gap-2 shrink-0">
              {item.img && <div className="w-6 h-6 rounded bg-white/10 overflow-hidden"><img src={item.img} alt="" className="w-full h-full object-cover" /></div>}
              <button onClick={(e) => { e.stopPropagation(); const next = items.filter((_, j) => j !== i); setItems(next); onChange(next); setEditIdx(-1); }} className="p-1 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
              <span className={`text-xs text-text-muted transition-transform ${editIdx === i ? "rotate-180" : ""}`}>▾</span>
            </div>
          </button>
          {editIdx === i && (
            <div className="p-4 border-t border-border-subtle space-y-3">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-xs text-text-secondary mb-1">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea value={item[f.key] || ""} onChange={(e) => update(i, f.key, e.target.value)} rows={3} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all resize-none" />
                  ) : f.type === "number" ? (
                    <input type="number" min={f.min || 0} max={f.max || 999} value={item[f.key] || 0} onChange={(e) => update(i, f.key, parseInt(e.target.value) || 0)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
                  ) : f.type === "array" ? (
                    <input value={(item[f.key] || []).join(", ")} onChange={(e) => update(i, f.key, e.target.value.split(",").map(s => s.trim()).filter(Boolean))} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" placeholder="Comma-separated" />
                  ) : f.type === "image" ? (
                    <ImageUpload value={item[f.key] || ""} onChange={(val) => update(i, f.key, val)} />
                  ) : f.type === "rating" ? (
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" onClick={() => update(i, f.key, n)} className={`p-1 cursor-pointer ${n <= (item[f.key] || 0) ? "text-amber-400" : "text-text-muted"}`}>★</button>
                      ))}
                    </div>
                  ) : (
                    <input value={item[f.key] || ""} onChange={(e) => update(i, f.key, e.target.value)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-2 text-xs font-medium text-accent-blue hover:text-accent-blue/80 transition-colors cursor-pointer"><Plus size={14} /> Add Item</button>
    </div>
  );
}

function FAQCategoryEditor({ data, onChange }) {
  const [items, setItems] = useState(data || []);
  const [editCatIdx, setEditCatIdx] = useState(-1);
  const [editItemIdx, setEditItemIdx] = useState(-1);

  const updateCat = (idx, field, value) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: value };
    setItems(next);
    onChange(next);
  };

  const updateFaq = (catIdx, faqIdx, field, value) => {
    const next = [...items];
    const newItems = [...next[catIdx].items];
    newItems[faqIdx] = { ...newItems[faqIdx], [field]: value };
    next[catIdx] = { ...next[catIdx], items: newItems };
    setItems(next);
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {items.map((cat, ci) => (
        <div key={ci} className="rounded-xl border border-border-subtle bg-white/[0.02] overflow-hidden">
          <button onClick={() => setEditCatIdx(editCatIdx === ci ? -1 : ci)} className="w-full flex items-center justify-between p-3 text-left hover:bg-white/[0.03] transition-colors cursor-pointer">
            <span className="text-sm font-semibold text-accent-blue">{cat.label} <span className="text-text-muted font-normal">({cat.items?.length || 0} FAQs)</span></span>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); const next = items.filter((_, j) => j !== ci); setItems(next); onChange(next); }} className="p-1 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
              <span className={`text-xs text-text-muted transition-transform ${editCatIdx === ci ? "rotate-180" : ""}`}>▾</span>
            </div>
          </button>
          {editCatIdx === ci && (
            <div className="p-4 border-t border-border-subtle space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Category Label</label>
                <input value={cat.label} onChange={(e) => updateCat(ci, "label", e.target.value)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-text-secondary">FAQs in this category:</label>
                {(cat.items || []).map((faq, fi) => (
                  <div key={fi} className="rounded-lg border border-border-subtle bg-white/[0.01] overflow-hidden">
                    <button onClick={() => setEditItemIdx(editItemIdx === `${ci}-${fi}` ? null : `${ci}-${fi}`)} className="w-full flex items-center justify-between p-2 text-left hover:bg-white/[0.02] transition-colors cursor-pointer">
                      <span className="text-xs text-text-white truncate pr-2">{faq.q}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); const next = [...items]; next[ci] = { ...next[ci], items: next[ci].items.filter((_, j) => j !== fi) }; setItems(next); onChange(next); }} className="p-0.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={12} /></button>
                        <span className={`text-[10px] text-text-muted transition-transform ${editItemIdx === `${ci}-${fi}` ? "rotate-180" : ""}`}>▾</span>
                      </div>
                    </button>
                    {editItemIdx === `${ci}-${fi}` && (
                      <div className="p-3 border-t border-border-subtle space-y-2">
                        <div>
                          <label className="block text-[10px] text-text-secondary mb-0.5">Question</label>
                          <input value={faq.q} onChange={(e) => updateFaq(ci, fi, "q", e.target.value)} className="w-full bg-white/5 border border-border-subtle rounded-lg px-2 py-1.5 text-xs text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] text-text-secondary mb-0.5">Answer</label>
                          <textarea value={faq.a} onChange={(e) => updateFaq(ci, fi, "a", e.target.value)} rows={3} className="w-full bg-white/5 border border-border-subtle rounded-lg px-2 py-1.5 text-xs text-text-white focus:outline-none focus:border-accent-blue/50 transition-all resize-none" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <button onClick={() => { const next = [...items]; next[ci] = { ...next[ci], items: [...(next[ci].items || []), { q: "New question?", a: "" }] }; setItems(next); onChange(next); }} className="flex items-center gap-1 text-[11px] text-accent-blue hover:text-accent-blue/80 transition-colors cursor-pointer"><Plus size={10} /> Add FAQ</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => { const next = [...items, { label: "New Category", items: [] }]; setItems(next); onChange(next); setEditCatIdx(next.length - 1); }} className="flex items-center gap-2 text-xs font-medium text-accent-blue hover:text-accent-blue/80 transition-colors cursor-pointer"><Plus size={14} /> Add FAQ Category</button>
    </div>
  );
}

function StringListEditor({ data, onChange }) {
  const [items, setItems] = useState(data || []);
  const update = (idx, value) => {
    const next = [...items];
    next[idx] = value;
    setItems(next);
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={item} onChange={(e) => update(i, e.target.value)} className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-white focus:outline-none focus:border-accent-blue/50 transition-all" />
          <button onClick={() => { const next = items.filter((_, j) => j !== i); setItems(next); onChange(next); }} className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={() => { const next = [...items, "New Item"]; setItems(next); onChange(next); }} className="flex items-center gap-2 text-xs font-medium text-accent-blue hover:text-accent-blue/80 transition-colors cursor-pointer"><Plus size={14} /> Add Item</button>
    </div>
  );
}

function SectionEditor({ sectionKey, data, onSave, saving }) {
  const [value, setValue] = useState(data);

  const renderEditor = () => {
    switch (sectionKey) {
      case "heroText":
        return <KeyValueEditor data={value} onChange={setValue} fields={[
          { key: "badge", label: "Badge Text" },
          { key: "headline1", label: "Headline 1" },
          { key: "headline2", label: "Headline 2" },
          { key: "subtitle", label: "Subtitle" },
          { key: "description", label: "Description", textarea: true },
        ]} />;
      case "heroStats":
        return <HeroStatsEditor data={value} onChange={setValue} />;
      case "highlights":
        return <ListEditor data={value} onChange={setValue} newItem={{ icon: "Clock", text: "New Highlight", value: "0" }} fields={[
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "text", label: "Text" },
          { key: "value", label: "Value" },
        ]} />;
      case "aboutValues":
        return <ListEditor data={value} onChange={setValue} newItem={{ icon: "Cpu", title: "New Value", text: "" }} fields={[
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "title", label: "Title" },
          { key: "text", label: "Description", textarea: true },
        ]} />;
      case "services":
        return <ListEditor data={value} onChange={setValue} newItem={{ icon: "Laptop", title: "New Service", img: "", desc: "" }} fields={[
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "title", label: "Title" },
          { key: "img", label: "Image", type: "image" },
          { key: "desc", label: "Description", textarea: true },
        ]} />;
      case "builds":
        return <ListEditor data={value} onChange={setValue} newItem={{ icon: "Cpu", title: "New Build", desc: "", specs: [], img: "" }} fields={[
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "title", label: "Title" },
          { key: "img", label: "Image", type: "image" },
          { key: "desc", label: "Description", textarea: true },
          { key: "specs", label: "Specs (comma-separated)", type: "array" },
        ]} />;
      case "whyChooseUs":
        return <ListEditor data={value} onChange={setValue} newItem={{ icon: "Star", title: "New Reason", desc: "" }} fields={[
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "title", label: "Title" },
          { key: "desc", label: "Description", textarea: true },
        ]} />;
      case "processSteps":
        return <ListEditor data={value} onChange={setValue} newItem={{ num: 0, title: "New Step", desc: "", icon: "CheckCircle" }} fields={[
          { key: "num", label: "Step Number", type: "number" },
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "title", label: "Title" },
          { key: "desc", label: "Description", textarea: true },
        ]} />;
      case "testimonials":
        return <ListEditor data={value} onChange={setValue} newItem={{ name: "New Client", location: "", service: "", rating: 5, text: "", img: "" }} fields={[
          { key: "name", label: "Name" },
          { key: "location", label: "Location" },
          { key: "service", label: "Service" },
          { key: "img", label: "Client Photo", type: "image" },
          { key: "rating", label: "Rating", type: "rating" },
          { key: "text", label: "Review Text", textarea: true },
        ]} />;
      case "faqCategories":
        return <FAQCategoryEditor data={value} onChange={setValue} />;
      case "knowledgeArticles":
        return <ListEditor data={value} onChange={setValue} newItem={{ icon: "Cpu", title: "New Article", preview: "", content: "", img: "" }} fields={[
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "title", label: "Title" },
          { key: "img", label: "Article Image", type: "image" },
          { key: "preview", label: "Preview", textarea: true },
          { key: "content", label: "Full Content", textarea: true },
        ]} />;
      case "featuredProducts":
        return <ListEditor data={value} onChange={setValue} newItem={{ icon: "Laptop", name: "New Product", desc: "", img: "" }} fields={[
          { key: "icon", label: "Icon Name (lucide)" },
          { key: "name", label: "Name" },
          { key: "img", label: "Product Image", type: "image" },
          { key: "desc", label: "Description", textarea: true },
        ]} />;
      case "brands":
        return <StringListEditor data={value} onChange={setValue} />;
      case "contactInfo":
        return <KeyValueEditor data={value} onChange={setValue} fields={[
          { key: "address1", label: "Address Line 1" },
          { key: "address2", label: "Address Line 2" },
          { key: "address3", label: "Address Line 3" },
          { key: "phone", label: "Phone" },
          { key: "whatsapp", label: "WhatsApp" },
          { key: "email", label: "Email" },
          { key: "hours1", label: "Hours Line 1" },
          { key: "hours2", label: "Hours Line 2" },
          { key: "logo", label: "Logo Image", type: "image" },
          { key: "mapEmbed", label: "Google Maps Embed URL" },
        ]} />;
      case "socialLinks":
        return <KeyValueEditor data={value} onChange={setValue} fields={[
          { key: "facebook", label: "Facebook URL" },
          { key: "instagram", label: "Instagram URL" },
          { key: "linkedin", label: "LinkedIn URL" },
          { key: "whatsapp", label: "WhatsApp URL" },
        ]} />;
      default:
        return <p className="text-text-muted text-sm">No editor available for this section.</p>;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-white">{sections.find((s) => s.key === sectionKey)?.label || sectionKey}</h2>
        <button onClick={() => onSave(sectionKey, value)} disabled={saving} className="flex items-center gap-2 glass-btn text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Save"}
        </button>
      </div>
      {renderEditor()}
    </div>
  );
}

export default function AdminDashboard() {
  const { isAuthenticated, loading, logout, token } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("heroText");
  const [contentData, setContentData] = useState({});
  const [loadingContent, setLoadingContent] = useState(true);
  const [saveMsg, setSaveMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storageMode, setStorageMode] = useState("checking");

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/admin/login");
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchAll = async () => {
      const results = {};
      let mode = "default";
      for (const s of sections) {
        try {
          const res = await fetch(`/api/content/${s.key}`);
          if (res.ok) {
            const json = await res.json();
            results[s.key] = json.value;
            if (json.source === "blob") mode = "blob";
          }
        } catch {}
      }
      setContentData(results);
      setStorageMode(mode);
      setLoadingContent(false);
    };
    if (isAuthenticated) fetchAll();
  }, [isAuthenticated]);

  const handleSave = async (key, value) => {
    setSaveMsg("");
    setSaving(true);
    try {
      await saveContentToServer(key, value, token);
      setContentData((prev) => ({ ...prev, [key]: value }));
      setSaveMsg("Saved to server successfully");
      setTimeout(() => setSaveMsg(""), 3000);
    } catch {
      setSaveMsg("Failed to save to server");
      setTimeout(() => setSaveMsg(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-text-muted text-sm font-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-bg-primary">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-bg-secondary border-r border-border-subtle flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-text-white font-bold text-sm">Admin Panel</p>
              <p className="text-text-muted text-xs">Radeon Tech</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-2.5 border-b border-border-subtle">
          <div className={`flex items-center gap-2 text-[11px] px-2.5 py-1.5 rounded-lg ${
            storageMode === "blob"
              ? "bg-green-400/10 text-green-400"
              : storageMode === "default"
              ? "bg-amber-400/10 text-amber-400"
              : "bg-white/5 text-text-muted"
          }`}>
            {storageMode === "blob" ? <Cloud size={12} /> : <HardDrive size={12} />}
            {storageMode === "blob" ? "Cloud Storage" : storageMode === "default" ? "Default Content" : "Checking..."}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-[10px] font-semibold text-text-muted tracking-wider uppercase px-3 pt-1 pb-2">Content Editor</p>
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                onClick={() => { setActiveSection(s.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeSection === s.key
                    ? "bg-accent-blue/15 text-accent-blue"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/[0.03]"
                }`}
              >
                <Icon size={16} /> {s.label}
              </button>
            );
          })}

          <div className="border-t border-border-subtle my-2 pt-2">
            <p className="text-[10px] font-semibold text-text-muted tracking-wider uppercase px-3 pb-2">Management</p>
            {[
              { label: "Products", icon: Package, path: "/admin/products" },
              { label: "Orders", icon: ClipboardList, path: "/admin/orders" },
              { label: "Repair Requests", icon: AlertTriangle, path: "/admin/repairs" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.path}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-text-muted hover:text-text-secondary hover:bg-white/[0.03] no-underline"
                >
                  <Icon size={16} /> {item.label}
                  <ExternalLink size={12} className="ml-auto opacity-40" />
                </a>
              );
            })}
          </div>
        </nav>

        <div className="p-3 border-t border-border-subtle">
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <div className="lg:hidden sticky top-0 z-30 bg-bg-secondary border-b border-border-subtle px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg bg-white/5 text-text-secondary cursor-pointer">
            <LayoutDashboard size={18} />
          </button>
          <span className="text-sm font-medium text-text-white">Admin Dashboard</span>
        </div>

        <div className="p-6 md:p-8 max-w-4xl">
          {saveMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 text-xs font-medium px-4 py-2 rounded-lg ${
                saveMsg.includes("Failed") ? "bg-red-400/10 text-red-400 border border-red-400/20" : "bg-green-400/10 text-green-400 border border-green-400/20"
              }`}
            >
              {saveMsg}
            </motion.div>
          )}

          {loadingContent ? (
            <div className="text-text-muted text-sm font-light py-20 text-center">Loading content...</div>
          ) : (
            <SectionEditor
              key={activeSection}
              sectionKey={activeSection}
              data={contentData[activeSection]}
              onSave={handleSave}
              saving={saving}
            />
          )}
        </div>
      </main>
    </div>
  );
}
