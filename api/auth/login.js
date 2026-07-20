const SECRET = "radeon-tech-admin-secret-2025";
const ADMIN_EMAIL = "admin@radeon.co.zw";
const ADMIN_PASSWORD = "RadeonTech2025!";

function sign(data) {
  return Buffer.from(JSON.stringify({ data, secret: SECRET, exp: Date.now() + 86400000 })).toString("base64url");
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body || {};
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = sign({ email, role: "admin" });
  const admin = { email, role: "admin", name: "Radeon Admin" };

  return res.status(200).json({ token, admin });
}
