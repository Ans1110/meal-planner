import { PrismaClient } from "$/generated/prisma";

const PrismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prisma: ReturnType<typeof PrismaClientSingleton> | undefined;
} & typeof global;

const db = globalThis.prisma || PrismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
