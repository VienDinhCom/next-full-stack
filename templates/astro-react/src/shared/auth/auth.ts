import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { database } from "@src/shared/database";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    enabled: true,
  },
});
