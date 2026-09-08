import {
  handleCors,
  requireAuth,
  getAdminLogin,
  safeAdminRecord,
} from "../_lib/auth.js";

export default async function handler(req, res) {
  if (handleCors(req, res, "GET, OPTIONS")) return;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = requireAuth(req, res);
  if (!payload) return;

  const admin = await getAdminLogin();
  if (!admin || admin.username !== payload.username) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  return res.status(200).json({ admin: safeAdminRecord(admin) });
}