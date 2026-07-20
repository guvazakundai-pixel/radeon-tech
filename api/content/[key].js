import * as defaultData from "../../src/content/data.js";
import { list, put, del } from "@vercel/blob";

const SECRET = "radeon-tech-admin-secret-2025";
const BLOB_PREFIX = "radeon-content/";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64url").toString());
    if (decoded.secret !== SECRET) return null;
    if (decoded.exp < Date.now()) return null;
    return decoded.data;
  } catch { return null; }
}

function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }
  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return null;
  }
  return payload;
}

const validKeys = [
  "heroStats", "heroText", "highlights", "aboutValues", "aboutText",
  "services", "builds", "buildReasons", "whyChooseUs", "processSteps",
  "testimonials", "galleryCategories", "gallery", "businessServices",
  "faqCategories", "contactInfo", "socialLinks", "footerServiceLinks",
  "stats", "knowledgeArticles", "featuredProducts", "brands",
];

function hasBlobToken() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function getFromBlob(key) {
  if (!hasBlobToken()) return null;
  try {
    const blobUrl = `${BLOB_PREFIX}${key}.json`;
    const blobs = await list({ prefix: blobUrl, limit: 1 });
    if (blobs.blobs.length === 0) return null;
    const res = await fetch(blobs.blobs[0].url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function saveToBlob(key, value) {
  if (!hasBlobToken()) return false;
  try {
    const pathname = `${BLOB_PREFIX}${key}.json`;
    await put(pathname, JSON.stringify(value), {
      contentType: "application/json",
      access: "public",
      addRandomSuffix: false,
    });
    return true;
  } catch {
    return false;
  }
}

async function deleteFromBlob(key) {
  if (!hasBlobToken()) return false;
  try {
    const blobs = await list({ prefix: `${BLOB_PREFIX}${key}.json`, limit: 1 });
    if (blobs.blobs.length > 0) {
      await del(blobs.blobs[0].url);
    }
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { key } = req.query;
  if (!validKeys.includes(key)) {
    return res.status(400).json({ error: "Invalid content key" });
  }

  if (req.method === "GET") {
    let value = await getFromBlob(key);
    if (value === null) {
      value = defaultData[key] || null;
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
    if (hasBlobToken()) {
      await deleteFromBlob(key);
    }
    return res.status(200).json({ key, deleted: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
