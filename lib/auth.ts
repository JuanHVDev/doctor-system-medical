import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "PATIENT",
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) =>
        {
          if (user.role === "PATIENT")
          {
            await prisma.patient.create({
              data: {
                userId: user.id,
                fullName: user.name,
              },
            });
          } else if (user.role === "DOCTOR")
          {
            await prisma.doctor.create({
              data: {
                userId: user.id,
                fullName: user.name,
              },
            });
          }
        },
      },
    },
  },
});