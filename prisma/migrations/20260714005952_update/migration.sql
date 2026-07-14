-- AlterTable
ALTER TABLE "AboutContent" ADD COLUMN     "calendlyUrl" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "results" TEXT,
ADD COLUMN     "resultsAr" TEXT;

-- CreateTable
CREATE TABLE "AvailabilityStatus" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "status" TEXT NOT NULL DEFAULT 'available',
    "availableFrom" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailabilityStatus_pkey" PRIMARY KEY ("id")
);
