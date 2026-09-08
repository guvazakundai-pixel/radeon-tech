import {
  handleCors,
  requireAuth,
  getAdminLogin,
  verifyPassword,
  hashPassword,
  safeAdminRecord,
  writeJson,
  ADMIN_FILE,
} from "../_lib/auth.js";

export default async function handler(req, res) {
  if (handleCors(req, res, "POST, OPTIONS")) return;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = requireAuth(req, res);
  if (!payload) return;

  const { currentPassword, newUsername, newPassword } = req.body || {};

  if (!currentPassword) {
    return res.status(400).json({ error: "Current password is required" });
  }

  const admin = await getAdminLogin();
  if (!admin) {
    return res.status(503).json({ error: "Admin account is not configured." });
  }

  // 1. Verify the CURRENT password before allowing any change.
  const ok = await verifyPassword(currentPassword, admin.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "Current password is incorrect" });
  }

  // 2. Validate new username / password.
  if (newUsername && (newUsername.length < 3 || newUsername.length > 64)) {
    return res.status(400).json({ error: "Username must be between 3 and 64 characters" });
  }
  if (newPassword && newPassword.length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters" });
  }
  if (newPassword && newPassword === currentPassword) {
    return res.status(400).json({ error: "New password must be different from the current password" });
  }

  // 3. Build updated record. Never mutate the password hash unless a new password provided.
  const updated = {
    ...admin,
    username: newUsername || admin.username,
    password_hash: newPassword ? await hashPassword(newPassword) : admin.password_hash,
    role: admin.role,
    updated_at: new Date().toISOString(),
  };

  // 4. Persist to blob store (or env-var fallback stays read-only).
  const saved = await writeJson(ADMIN_FILE, updated);
  if (!saved) {
    return res.status(503).json({
      error: "Could not persist credential change. Connect the Blob store.",
    });
  }

  return res.status(200).json({
    admin: safeAdminRecord(updated),
    message: newPassword ? "Credentials updated. Use them on your next login." : "Username updated.",
  });
}