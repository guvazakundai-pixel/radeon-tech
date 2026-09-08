import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useContent, saveContentToServer } from "../hooks/useContent";
import { motion } from "framer-motion";
import { Check, Loader2, Megaphone, Image as ImageIcon, Phone, FileText, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import ImageUpload from "../components/ImageUpload";

const TABS = [
  { id: "global", label: "Global & Announcement", icon: Megaphone },
  { id: "promo", label: "Hero & Promos", icon: ImageIcon },
  { id: "contact", label: "Contact & Socials", icon: Phone },
  { id: "pages", label: "Page Content", icon: FileText },
];

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">{label}</label>
      {children}
    </div>
  );
}

function SaveBar({ dirty, saving, saved, onSave, onReset }) {
  return (
    <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
      {saved && (
        <span className="inline-flex items-center gap-1.5 text-green-400 text-xs">
          <Check size={13} /> Saved
        </span>
      )}
      <button onClick={onReset} className="px-4 py-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
        Reset to default
      </button>
      <button onClick={onSave} disabled={!dirty || saving} className="glass-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-2">
        {saving ? <Loader2 size={14} className="animate-spin" /> : null}
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

function useTabSave(keys, makePayload) {
  const { token } = useAuth();
  const loaded = Object.fromEntries(keys.map((k) => [k, useContent(k)]));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Snapshot defaults so "Reset" can restore them without a reload.
  const [defaults, setDefaults] = useState(null);
  const ready = Object.values(loaded).every((l) => !l.loading);
  useEffect(() => {
    if (ready && !defaults) {
      setDefaults(Object.fromEntries(keys.map((k) => [k, loaded[k].data ?? null])));
    }
  }, [ready, defaults, keys, loaded]);

  const pending = Object.fromEntries(keys.map((k) => [k, loaded[k].data ?? null]));

  const setValue = useCallback((key, val) => {
    const hook = loaded[key];
    if (hook?.setData) hook.setData(val);
    else loaded[key].setData?.(val);
    setDirty(true);
    setSaved(false);
  }, [loaded]);

  const save = async () => {
    if (!dirty) return;
    setSaving(true);
    setError("");
    try {
      const payload = makePayload(pending);
      for (const k of keys) {
        await saveContentToServer(k, payload[k], token);
      }
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    for (const k of keys) {
      const res = await fetch(`/api/content/${k}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        loaded[k].setData(defaults?.[k] ?? null);
        window.location.reload();
      }
    }
    setDirty(false);
  };

  return { pending, setValue, dirty, saving, saved, error, save, reset, ready };
}

function GlobalTab() {
  const { pending, setValue, ...bar } = useTabSave(["global"], (p) => ({ global: p.global }));
  const g = pending.global || {};
  if (!bar.ready) return null;
  return (
    <div className="space-y-5">
      <Field label="Announcement text (top bar)">
        <input value={g.announcement || ""} onChange={(e) => setValue("global", { ...g, announcement: e.target.value })} className="input-ghost w-full" />
      </Field>
      <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer w-fit">
        <input type="checkbox" checked={!!g.announcementEnabled} onChange={(e) => setValue("global", { ...g, announcementEnabled: e.target.checked })} className="w-4 h-4 rounded accent-[#4F6DFF]" />
        Show announcement bar
      </label>
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Business name">
          <input value={g.businessName || ""} onChange={(e) => setValue("global", { ...g, businessName: e.target.value })} className="input-ghost w-full" />
        </Field>
        <Field label="Copyright year">
          <input value={g.copyrightYear || ""} onChange={(e) => setValue("global", { ...g, copyrightYear: e.target.value })} className="input-ghost w-full" />
        </Field>
        <Field label="Currency symbol">
          <input value={g.currencySymbol || ""} onChange={(e) => setValue("global", { ...g, currencySymbol: e.target.value })} className="input-ghost w-full" />
        </Field>
      </div>
      {bar.error && <p className="text-red-400 text-sm">{bar.error}</p>}
      <SaveBar {...bar} />
    </div>
  );
}

function PromoTab() {
  const { pending, setValue, ...bar } = useTabSave(["heroText", "promoBanners"], (p) => ({ heroText: p.heroText, promoBanners: p.promoBanners }));
  const hero = pending.heroText || {};
  const banners = Array.isArray(pending.promoBanners) ? pending.promoBanners : [];
  if (!bar.ready) return null;

  const setBanner = (i, patch) => {
    const next = banners.map((b, bi) => (bi === i ? { ...b, ...patch } : b));
    setValue("promoBanners", next);
  };
  const addBanner = () => {
    setValue("promoBanners", [...banners, { title: "", subtitle: "", cta: "Shop Now", link: "/shop", image: "", active: true }]);
  };
  const removeBanner = (i) => setValue("promoBanners", banners.filter((_, bi) => bi !== i));

  return (
    <div className="space-y-7">
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-text-white mb-4">Hero Section</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Badge">
            <input value={hero.badge || ""} onChange={(e) => setValue("heroText", { ...hero, badge: e.target.value })} className="input-ghost w-full" />
          </Field>
          <Field label="Headline (line 1)">
            <input value={hero.headline1 || ""} onChange={(e) => setValue("heroText", { ...hero, headline1: e.target.value })} className="input-ghost w-full" />
          </Field>
          <Field label="Headline (line 2)">
            <input value={hero.headline2 || ""} onChange={(e) => setValue("heroText", { ...hero, headline2: e.target.value })} className="input-ghost w-full" />
          </Field>
          <Field label="Subtitle">
            <input value={hero.subtitle || ""} onChange={(e) => setValue("heroText", { ...hero, subtitle: e.target.value })} className="input-ghost w-full" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <textarea value={hero.description || ""} onChange={(e) => setValue("heroText", { ...hero, description: e.target.value })} rows={3} className="input-ghost w-full" />
            </Field>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-text-white">Promotional Banners</h3>
          <button type="button" onClick={addBanner} className="text-xs text-accent-blue hover:text-accent-cyan inline-flex items-center gap-1 cursor-pointer"><Plus size={13} /> Add banner</button>
        </div>
        <p className="text-xs text-text-muted mb-4">Shown as rotating promos on key storefront sections.</p>

        {banners.length === 0 && (
          <p className="text-sm text-text-muted py-4 text-center border border-dashed border-white/[0.08] rounded-xl">No banners yet.</p>
        )}

        <div className="space-y-4">
          {banners.map((b, i) => (
            <div key={i} className="border border-white/[0.07] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text-muted">Banner {i + 1}</span>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => setBanner(i, { active: !b.active })} title={b.active ? "Active" : "Hidden"} className={`p-1.5 rounded-lg transition-colors cursor-pointer ${b.active ? "text-green-400 bg-green-400/10" : "text-text-muted hover:text-white"}`}>
                    {b.active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button type="button" onClick={() => removeBanner(i)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 cursor-pointer"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Title">
                  <input value={b.title || ""} onChange={(e) => setBanner(i, { title: e.target.value })} className="input-ghost w-full" />
                </Field>
                <Field label="CTA label">
                  <input value={b.cta || ""} onChange={(e) => setBanner(i, { cta: e.target.value })} className="input-ghost w-full" />
                </Field>
                <Field label="Link">
                  <input value={b.link || ""} onChange={(e) => setBanner(i, { link: e.target.value })} className="input-ghost w-full" />
                </Field>
                <Field label="Subtitle">
                  <input value={b.subtitle || ""} onChange={(e) => setBanner(i, { subtitle: e.target.value })} className="input-ghost w-full" />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="Banner image">
                  <ImageUpload value={b.image || ""} onChange={(url) => setBanner(i, { image: url })} />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bar.error && <p className="text-red-400 text-sm">{bar.error}</p>}
      <SaveBar {...bar} />
    </div>
  );
}

function ContactTab() {
  const { pending, setValue, ...bar } = useTabSave(["contactInfo", "socialLinks"], (p) => ({ contactInfo: p.contactInfo, socialLinks: p.socialLinks }));
  const c = pending.contactInfo || {};
  const s = pending.socialLinks || {};
  if (!bar.ready) return null;
  return (
    <div className="space-y-5">
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-text-white mb-4">Contact Info</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Address line 1"><input value={c.address1 || ""} onChange={(e) => setValue("contactInfo", { ...c, address1: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="Address line 2"><input value={c.address2 || ""} onChange={(e) => setValue("contactInfo", { ...c, address2: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="Address line 3"><input value={c.address3 || ""} onChange={(e) => setValue("contactInfo", { ...c, address3: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="Phone"><input value={c.phone || ""} onChange={(e) => setValue("contactInfo", { ...c, phone: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="WhatsApp"><input value={c.whatsapp || ""} onChange={(e) => setValue("contactInfo", { ...c, whatsapp: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="Email"><input value={c.email || ""} onChange={(e) => setValue("contactInfo", { ...c, email: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="Hours (weekdays)"><input value={c.hours1 || ""} onChange={(e) => setValue("contactInfo", { ...c, hours1: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="Hours (Saturday)"><input value={c.hours2 || ""} onChange={(e) => setValue("contactInfo", { ...c, hours2: e.target.value })} className="input-ghost w-full" /></Field>
          <div className="md:col-span-2">
            <Field label="Google Maps embed URL"><input value={c.mapEmbed || ""} onChange={(e) => setValue("contactInfo", { ...c, mapEmbed: e.target.value })} className="input-ghost w-full font-mono text-xs" /></Field>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-text-white mb-4">Social Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Facebook"><input value={s.facebook || ""} onChange={(e) => setValue("socialLinks", { ...s, facebook: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="Instagram"><input value={s.instagram || ""} onChange={(e) => setValue("socialLinks", { ...s, instagram: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="LinkedIn"><input value={s.linkedin || ""} onChange={(e) => setValue("socialLinks", { ...s, linkedin: e.target.value })} className="input-ghost w-full" /></Field>
          <Field label="WhatsApp"><input value={s.whatsapp || ""} onChange={(e) => setValue("socialLinks", { ...s, whatsapp: e.target.value })} className="input-ghost w-full" /></Field>
        </div>
      </div>

      {bar.error && <p className="text-red-400 text-sm">{bar.error}</p>}
      <SaveBar {...bar} />
    </div>
  );
}

const PAGE_FIELDS = [
  { key: "aboutUs", label: "About Us" },
  { key: "warrantyReturns", label: "Warranty & Returns" },
  { key: "termsOfService", label: "Terms of Service" },
  { key: "deliveryRates", label: "Delivery Rates" },
];

function PagesTab() {
  const { pending, setValue, ...bar } = useTabSave(["pages"], (p) => ({ pages: p.pages }));
  const p = pending.pages || {};
  if (!bar.ready) return null;
  return (
    <div className="space-y-5">
      <p className="text-xs text-text-muted -mb-2">These pages render as HTML on the storefront. Basic tags (<code>&lt;h3&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;strong&gt;</code>) are supported.</p>
      {PAGE_FIELDS.map((f) => (
        <Field key={f.key} label={f.label}>
          <textarea value={p[f.key] || ""} onChange={(e) => setValue("pages", { ...p, [f.key]: e.target.value })} rows={8} placeholder="Start writing..." className="input-ghost w-full" />
        </Field>
      ))}
      {bar.error && <p className="text-red-400 text-sm">{bar.error}</p>}
      <SaveBar {...bar} />
    </div>
  );
}

export default function AdminCMS() {
  const [tab, setTab] = useState("global");

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-white tracking-tight">Site Content</h1>
        <p className="text-text-muted text-sm mt-1">Edit everything your customers see — saved instantly to the live storefront.</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${active ? "bg-accent-blue/15 text-accent-blue" : "text-text-muted hover:text-text-secondary hover:bg-white/[0.03]"}`}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="glass-card p-5 md:p-6 rounded-3xl">
        {tab === "global" && <GlobalTab />}
        {tab === "promo" && <PromoTab />}
        {tab === "contact" && <ContactTab />}
        {tab === "pages" && <PagesTab />}
      </motion.div>
    </div>
  );
}