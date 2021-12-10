/*
  Warnings:

  - You are about to drop the column `taskNumber` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `task` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "taskNumber",
DROP COLUMN "type",
ADD COLUMN     "task" TEXT NOT NULL;
