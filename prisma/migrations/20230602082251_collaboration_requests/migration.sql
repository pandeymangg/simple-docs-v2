/*
  Warnings:

  - You are about to drop the column `approvedStatus` on the `Collaboration` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ACCESS_LEVEL" AS ENUM ('READ', 'WRITE');

-- AlterTable
ALTER TABLE "Collaboration" DROP COLUMN "approvedStatus",
ADD COLUMN     "accessLevel" "ACCESS_LEVEL" NOT NULL DEFAULT 'READ';

-- CreateTable
CREATE TABLE "CollaborationRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "docId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "approvedStatus" "APPROVED_STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "CollaborationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollaborationRequest" ADD CONSTRAINT "CollaborationRequest_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaborationRequest" ADD CONSTRAINT "CollaborationRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
