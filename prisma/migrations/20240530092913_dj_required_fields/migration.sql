/*
  Warnings:

  - Made the column `apellido` on table `DJ` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rate` on table `DJ` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DJ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "rate" DECIMAL NOT NULL,
    CONSTRAINT "DJ_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DJ" ("apellido", "avatar", "background", "descripcion", "id", "nombre", "rate", "userId") SELECT "apellido", "avatar", "background", "descripcion", "id", "nombre", "rate", "userId" FROM "DJ";
DROP TABLE "DJ";
ALTER TABLE "new_DJ" RENAME TO "DJ";
CREATE UNIQUE INDEX "DJ_userId_key" ON "DJ"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
