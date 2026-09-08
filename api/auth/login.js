import {
  handleCors,
  getAdminLogin,
  verifyPassword,
  signToken,
  safeAdminRecord,
  ensureAdminSeed,
} from "../_lib/auth.js";

export default async function handler(req, res) {
  if (handleCors(req, res, "POST, OPTIONS")) return;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Seed the single default admin (admin / 12345678) if none exists yet.
  await ensureAdminSeed();

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const admin = await getAdminLogin();
  if (!admin) {
    return res.status(503).json({
      error: "Admin account is not configured. Run the seed script or set BLOB_READ_WRITE_TOKEN.",
    });
  }

  // Constant-time-ish comparison guard: bcrypt.compare already resists timing.
  const ok = await verifyPassword(password, admin.password_hash);
  if (!ok || admin.username !== username) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({ username: admin.username, role: admin.role, sub: admin.id });
  return res.status(200).json({
    token,
    admin: safeAdminRecord(admin),
  });
}