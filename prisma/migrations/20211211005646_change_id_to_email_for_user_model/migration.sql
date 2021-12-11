/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "SandboxUser" DROP CONSTRAINT "SandboxUser_userId_fkey";

-- AlterTable
ALTER TABLE "Progress" ALTER COLUMN "points" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxUser" ADD CONSTRAINT "SandboxUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
