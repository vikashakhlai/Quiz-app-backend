/*
  Warnings:

  - You are about to drop the `friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "friends" TEXT[];

-- DropTable
DROP TABLE "friends";
