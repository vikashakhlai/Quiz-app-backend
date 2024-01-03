/*
  Warnings:

  - The `answer` column on the `Quiz_question` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Quiz_question" DROP COLUMN "answer",
ADD COLUMN     "answer" TEXT[];
