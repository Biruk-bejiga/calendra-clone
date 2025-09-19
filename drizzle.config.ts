import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

export default defineConfig({
    schema: "./drizzel/schema.ts",
    out: "./drizzel/migrations",
    dialect: "postgresql",
    strict: true,
    dbCredentials: {
        url: databaseUrl,
    },
    verbose: true,
});