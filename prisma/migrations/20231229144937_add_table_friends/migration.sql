/*
  Warnings:

  - You are about to drop the column `friends` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "friends";

-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "friendId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
