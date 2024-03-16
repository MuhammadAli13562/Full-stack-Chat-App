/*
  Warnings:

  - You are about to alter the column `content` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - Added the required column `passHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "content" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passHash" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
