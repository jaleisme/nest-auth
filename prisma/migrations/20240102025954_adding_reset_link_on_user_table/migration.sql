-- AlterTable
ALTER TABLE "User" ADD COLUMN "reset_token" TEXT;

-- CreateTable
CREATE TABLE "Boards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
