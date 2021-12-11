/*
  Warnings:

  - You are about to drop the column `name` on the `SandboxUser` table. All the data in the column will be lost.
  - Added the required column `name` to the `Sandbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sandbox" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SandboxUser" DROP COLUMN "name";
