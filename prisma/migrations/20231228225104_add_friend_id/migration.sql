/*
  Warnings:

  - A unique constraint covering the columns `[friendId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - The required column `friendId` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "friendId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_friendId_key" ON "user"("friendId");
