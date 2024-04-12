-- DropForeignKey
ALTER TABLE "ShortenedUrl" DROP CONSTRAINT "ShortenedUrl_userId_fkey";

-- AlterTable
ALTER TABLE "ShortenedUrl" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ShortenedUrl" ADD CONSTRAINT "ShortenedUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
