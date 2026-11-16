import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined in environment variables.");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function clearProjectImages() {
  console.log("🔍 Checking existing projects in database...\n");

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      images: true,
    },
  });

  if (projects.length === 0) {
    console.log("ℹ️ No projects found in the database.");
    return;
  }

  let totalImagesCount = 0;
  for (const project of projects) {
    const imgs = Array.isArray(project.images) ? (project.images as string[]) : [];
    console.log(`- [${project.slug}] "${project.title}": ${imgs.length} image(s)`);
    if (imgs.length > 0) {
      imgs.forEach((img, idx) => console.log(`    ${idx + 1}: ${img}`));
    }
    totalImagesCount += imgs.length;
  }

  console.log(`\n📊 Total project images found: ${totalImagesCount}`);
  console.log("🗑️  Clearing images for all projects (setting images = [])...");

  const updateResult = await prisma.project.updateMany({
    data: {
      images: [],
    },
  });

  console.log(`✅ Successfully updated ${updateResult.count} project(s).`);

  // Verification step
  const remaining = await prisma.project.findMany({
    select: {
      slug: true,
      images: true,
    },
  });

  const stillHasImages = remaining.filter(
    (p) => Array.isArray(p.images) && (p.images as unknown[]).length > 0,
  );

  if (stillHasImages.length === 0) {
    console.log("✨ Verified: All projects now have 0 images in the database.");
  } else {
    console.warn("⚠️ Warning: Some projects still have images:", stillHasImages);
  }
}

clearProjectImages()
  .catch((err) => {
    console.error("❌ Error clearing project images:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
