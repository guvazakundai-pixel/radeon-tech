import * as defaultData from "../../src/content/data.js";
import { list as blobList, del } from "@vercel/blob";
import { handleCors, requireAuth, hasBlobToken, readJson, writeJson } from "../_lib/auth.js";

const BLOB_PREFIX = "radeon-content/";

const validKeys = [
  // Existing site sections (full list preserved for backward compatibility)
  "heroStats", "heroText", "highlights", "aboutValues", "aboutText",
  "services", "builds", "buildReasons", "whyChooseUs", "processSteps",
  "testimonials", "galleryCategories", "gallery", "businessServices",
  "faqCategories", "contactInfo", "socialLinks", "footerServiceLinks",
  "stats", "knowledgeArticles", "featuredProducts", "brands",
  // New CMS keys
  "global",
  "promoBanners",
  "pages",
];

const DEFAULTS = {
  global: {
    announcement: "Same-day delivery in Harare | Nationwide shipping across Zimbabwe",
    announcementEnabled: true,
    copyrightYear: "2026",
    businessName: "Radeon Tech Investments",
    currencySymbol: "$",
  },
  promoBanners: [],
  pages: {
    aboutUs: "",
    warrantyReturns: "",
    termsOfService: "",
    deliveryRates: "",
  },
};

async function getFromBlob(key) {
  if (!hasBlobToken()) return null;
  const blobUrl = `${BLOB_PREFIX}${key}.json`;
  const value = await readJson(blobUrl);
  return value ?? null;
}

async function saveToBlob(key, value) {
  if (!hasBlobToken()) return false;
  await writeJson(`${BLOB_PREFIX}${key}.json`, value);
  return true;
}

export default async function handler(req, res) {
  if (handleCors(req, res)) return;

  const { key } = req.query;
  if (!validKeys.includes(key)) {
    return res.status(400).json({ error: "Invalid content key" });
  }

  if (req.method === "GET") {
    let value = await getFromBlob(key);
    if (value === null) {
      value = defaultData[key] ?? DEFAULTS[key] ?? null;
    }
    return res.status(200).json({ key, value, source: hasBlobToken() ? "blob" : "default" });
  }

  if (req.method === "POST" || req.method === "PUT") {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { value } = req.body || {};
    if (value === undefined) {
      return res.status(400).json({ error: "Value is required" });
    }
    if (hasBlobToken()) {
      const saved = await saveToBlob(key, value);
      if (saved) {
        return res.status(200).json({ key, value, updated: true, source: "blob" });
      }
    }
    return res.status(200).json({ key, value, updated: true, source: "memory", note: "Blob store not connected" });
  }

  if (req.method === "DELETE") {
    const auth = requireAuth(req, res);
    if (!auth) return;
    // Restore a section to its default by removing the override file.
    try {
      const blobUrl = `${BLOB_PREFIX}${key}.json`;
      const { blobs } = await blobList({ prefix: blobUrl, limit: 1 });
      if (blobs.length > 0) await del(blobs[0].url);
      return res.status(200).json({ key, deleted: true });
    } catch {
      return res.status(500).json({ error: "Failed to reset content" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}