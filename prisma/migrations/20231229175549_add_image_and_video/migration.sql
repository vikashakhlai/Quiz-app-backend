/*
  Warnings:

  - Added the required column `image` to the `Quiz_question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `Quiz_question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz_question" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;
