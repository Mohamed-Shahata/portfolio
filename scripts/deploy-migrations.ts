import "dotenv/config";
import { execSync } from "node:child_process";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.log("ℹ️ No DATABASE_URL found. Skipping database migration step.");
    return;
  }

  try {
    console.log("🚀 Running database migrations: npx prisma migrate deploy...");
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
    console.log("✅ Database migrations applied successfully.");
  } catch (error) {
    console.warn("⚠️ prisma migrate deploy warning (continuing build):", error);
  }
}

main();
