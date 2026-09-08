// Seed script — creates exactly ONE admin account (admin / 12345678).
//
// Usage:
//   npm run db:seed            # against the deployed Blob store
//   node prisma/seed.mjs       # same
//
// The account is bcrypt-hashed (12 rounds) and stored in the Vercel
// Blob JSON store under radeon-db/admin.json. If a DATABASE_URL is
// present, it seeds the AdminUser row in PostgreSQL instead.

import bcrypt from "bcryptjs";
import { list, put } from "@vercel/blob";

export const ADMIN_FILE = "radeon-db/admin.json";
const DEFAULT_ADMIN = {
  username: "admin",
  password: "12345678",
  role: "MASTER_ADMIN",
};

function hasBlobToken() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function seedAdmin() {
  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN.password, 12);

  if (hasBlobToken()) {
    const { blobs } = await list({ prefix: ADMIN_FILE, limit: 1 });
    const exists = blobs.length > 0;
    if (exists) {
      console.log(`Admin account already exists — skipping (${ADMIN_FILE}).`);
      return { created: false };
    }
    const admin = {
      id: "master",
      username: DEFAULT_ADMIN.username,
      password_hash: passwordHash,
      role: DEFAULT_ADMIN.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await put(ADMIN_FILE, JSON.stringify(admin), {
      contentType: "application/json",
      access: "public",
      addRandomSuffix: false,
    });
    console.log(`Admin seeded → username "admin" / password "12345678"`);
    return { created: true };
  }

  // eslint-disable-next-line no-undef
  if (typeof process.env.DATABASE_URL === "string") {
    // PostgreSQL path: import PrismaClient conditionally.
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const existing = await prisma.adminUser.findUnique({ where: { id: "master" } });
    if (existing) {
      console.log("Admin account already exists in PostgreSQL — skipping.");
      await prisma.$disconnect();
      return { created: false };
    }
    await prisma.adminUser.create({
      data: {
        id: "master",
        username: DEFAULT_ADMIN.username,
        password_hash: passwordHash,
        role: "MASTER_ADMIN",
      },
    });
    console.log(`Admin seeded into PostgreSQL → username "admin" / password "12345678"`);
    await prisma.$disconnect();
    return { created: true };
  }

  console.error("No BLOB_READ_WRITE_TOKEN or DATABASE_URL configured. Nothing seeded.");
  return { created: false };
}

// Allow running directly: node prisma/seed.mjs
// eslint-disable-next-line no-undef
if (import.meta.url === `file://${process.argv[1]}`) {
  await seedAdmin();
}