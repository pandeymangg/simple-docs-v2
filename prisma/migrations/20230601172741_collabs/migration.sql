-- CreateEnum
CREATE TYPE "APPROVED_STATUS" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- CreateTable
CREATE TABLE "Collaboration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "docId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "approvedStatus" "APPROVED_STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Collaboration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
