import crypto from "crypto";
import bcrypt from "bcryptjs";
import { list, put } from "@vercel/blob";

const JWT_SECRET = process.env.JWT_SECRET || "radeon-tech-jwt-secret-change-me-in-production";
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const BCRYPT_ROUNDS = 12;

export const ADMIN_ROLE = "MASTER_ADMIN";

// ---------------------------------------------------------------------------
// Password hashing (bcrypt, 12 rounds per spec)
// ---------------------------------------------------------------------------

export async function hashPassword(plain) {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(plain, hash) {
  if (!plain || !hash) return false;
  return bcrypt.compare(plain, hash);
}

// ---------------------------------------------------------------------------
// JWT (HS256) — signed with crypto, no extra dependency
// ---------------------------------------------------------------------------

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64urlJson(obj) {
  return b64url(JSON.stringify(obj));
}

function sign(payload) {
  const header = b64urlJson({ alg: "HS256", typ: "JWT" });
  const body = b64urlJson(payload);
  const data = `${header}.${body}`;
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function signToken({ username, role, sub }) {
  const now = Date.now();
  return sign({
    sub: sub || username,
    username,
    role,
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + TOKEN_TTL_MS) / 1000),
  });
}

export function verifyToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expected = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${body}`)
      .digest("base64url");
    if (sig !== expected) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Auth middleware helpers (Unified Serverless API)
// ---------------------------------------------------------------------------

function setCors(res, methods = "GET, POST, PUT, DELETE, OPTIONS") {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", methods);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export function handleCors(req, res, methods) {
  setCors(res, methods);
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }
  return false;
}

export function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }
  const payload = verifyToken(authHeader.slice(7));
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return null;
  }
  return payload;
}

// ---------------------------------------------------------------------------
// Blob-backed JSON database
// ---------------------------------------------------------------------------

export function hasBlobToken() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function readJson(pathname) {
  if (!hasBlobToken()) return null;
  const { blobs } = await list({ prefix: pathname, limit: 1 });
  if (blobs.length === 0) return null;
  const res = await fetch(blobs[0].url);
  if (!res.ok) return null;
  return res.json();
}

export async function writeJson(pathname, value) {
  if (!hasBlobToken()) return false;
  await put(pathname, JSON.stringify(value), {
    contentType: "application/json",
    access: "public",
    addRandomSuffix: false,
  });
  return true;
}

// ---------------------------------------------------------------------------
// Single Admin account — lazy seed with default credentials
// ---------------------------------------------------------------------------

export const ADMIN_FILE = "radeon-db/admin.json";

export const DEFAULT_ADMIN = {
  username: "admin",
  password: "12345678",
  role: ADMIN_ROLE,
};

export async function getAdminLogin() {
  if (hasBlobToken()) {
    const admin = await readJson(ADMIN_FILE);
    if (admin && admin.password_hash) return admin;
  }
  // Fall back to an env-provided hash or seed on demand.
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (envHash) {
    return {
      id: "master",
      username: process.env.ADMIN_USERNAME || DEFAULT_ADMIN.username,
      password_hash: envHash,
      role: ADMIN_ROLE,
    };
  }
  return null;
}

/**
 * Ensure exactly one admin account exists. If the blob store is connected and
 * no admin record exists yet, create the default admin (admin / 12345678).
 */
export async function ensureAdminSeed({ quiet = true } = {}) {
  if (!hasBlobToken()) return { seeded: false, reason: "no-blob" };
  const existing = await readJson(ADMIN_FILE);
  if (existing && existing.id) return { seeded: false, reason: "exists" };

  const passwordHash = await hashPassword(DEFAULT_ADMIN.password);
  const admin = {
    id: "master",
    username: DEFAULT_ADMIN.username,
    password_hash: passwordHash,
    role: ADMIN_ROLE,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  await writeJson(ADMIN_FILE, admin);
  return { seeded: true, reason: "created" };
}

export function safeAdminRecord(admin) {
  return {
    id: admin.id,
    username: admin.username,
    role: admin.role,
    updated_at: admin.updated_at,
  };
}