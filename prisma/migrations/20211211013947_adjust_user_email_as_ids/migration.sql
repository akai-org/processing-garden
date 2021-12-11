/*
  Warnings:

  - You are about to drop the column `userId` on the `Progress` table. All the data in the column will be lost.
  - The primary key for the `SandboxUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `SandboxUser` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `SandboxUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "SandboxUser" DROP CONSTRAINT "SandboxUser_userId_fkey";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SandboxUser" DROP CONSTRAINT "SandboxUser_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD CONSTRAINT "SandboxUser_pkey" PRIMARY KEY ("userEmail", "sandboxId");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxUser" ADD CONSTRAINT "SandboxUser_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
