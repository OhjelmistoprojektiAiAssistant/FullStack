// src/lib/prisma.ts
// This is a helper file to prevent multiple instances of Prisma Client in development

import { PrismaClient } from "../app/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["warn", "error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
