/*
  Warnings:

  - The primary key for the `Quiz_question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Quiz_question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `quiz_id` column on the `Quiz_question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `user_id` column on the `quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Quiz_question" DROP CONSTRAINT "Quiz_question_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "quiz" DROP CONSTRAINT "quiz_user_id_fkey";

-- AlterTable
ALTER TABLE "Quiz_question" DROP CONSTRAINT "Quiz_question_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "quiz_id",
ADD COLUMN     "quiz_id" INTEGER,
ADD CONSTRAINT "Quiz_question_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quiz" DROP CONSTRAINT "quiz_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER,
ADD CONSTRAINT "quiz_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_question" ADD CONSTRAINT "Quiz_question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
