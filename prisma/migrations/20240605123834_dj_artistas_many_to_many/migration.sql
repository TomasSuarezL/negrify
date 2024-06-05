/*
  Warnings:

  - You are about to drop the column `djId` on the `Artista` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ArtistaToDJ" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ArtistaToDJ_A_fkey" FOREIGN KEY ("A") REFERENCES "Artista" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArtistaToDJ_B_fkey" FOREIGN KEY ("B") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);
INSERT INTO "new_Artista" ("id", "nombre") SELECT "id", "nombre" FROM "Artista";
DROP TABLE "Artista";
ALTER TABLE "new_Artista" RENAME TO "Artista";
CREATE UNIQUE INDEX "Artista_nombre_key" ON "Artista"("nombre");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistaToDJ_AB_unique" ON "_ArtistaToDJ"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistaToDJ_B_index" ON "_ArtistaToDJ"("B");
