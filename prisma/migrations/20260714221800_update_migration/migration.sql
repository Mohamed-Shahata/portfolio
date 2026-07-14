/*
  Warnings:

  - You are about to drop the column `calendlyUrl` on the `AboutContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutContent" DROP COLUMN "calendlyUrl";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "message" TEXT,
ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;
