-- DropForeignKey
ALTER TABLE "Quiz_question" DROP CONSTRAINT "Quiz_question_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "quiz" DROP CONSTRAINT "quiz_user_id_fkey";

-- AlterTable
ALTER TABLE "Quiz_question" ALTER COLUMN "quiz_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "quiz" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_question" ADD CONSTRAINT "Quiz_question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
