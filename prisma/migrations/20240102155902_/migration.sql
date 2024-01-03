/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz_question" ALTER COLUMN "answer" SET NOT NULL,
ALTER COLUMN "answer" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name";
