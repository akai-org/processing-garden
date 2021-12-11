/*
  Warnings:

  - You are about to drop the column `stepNumber` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `stepId` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "stepNumber",
DROP COLUMN "task",
ADD COLUMN     "stepId" INTEGER NOT NULL,
ADD COLUMN     "taskId" TEXT NOT NULL;
