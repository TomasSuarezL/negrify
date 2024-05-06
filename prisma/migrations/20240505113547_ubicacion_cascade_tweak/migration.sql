/*
  Warnings:

  - You are about to drop the column `dJId` on the `Artista` table. All the data in the column will be lost.
  - You are about to drop the column `dJId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacionId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `dJId` on the `RedSocial` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `Ubicacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `djId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ubicacion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "latitud" TEXT,
    "longitud" TEXT,
    "clienteId" TEXT NOT NULL,
    CONSTRAINT "Ubicacion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ubicacion" ("ciudad", "direccion", "id", "latitud", "longitud", "pais") SELECT "ciudad", "direccion", "id", "latitud", "longitud", "pais" FROM "Ubicacion";
DROP TABLE "Ubicacion";
ALTER TABLE "new_Ubicacion" RENAME TO "Ubicacion";
CREATE UNIQUE INDEX "Ubicacion_clienteId_key" ON "Ubicacion"("clienteId");
CREATE TABLE "new_Artista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "djId" TEXT,
    CONSTRAINT "Artista_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Artista" ("id", "nombre") SELECT "id", "nombre" FROM "Artista";
DROP TABLE "Artista";
ALTER TABLE "new_Artista" RENAME TO "Artista";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rate" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "djId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    CONSTRAINT "Review_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("clienteId", "contenido", "id", "rate") SELECT "clienteId", "contenido", "id", "rate" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("apellido", "avatar", "id", "nombre", "userId") SELECT "apellido", "avatar", "id", "nombre", "userId" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_userId_key" ON "Cliente"("userId");
CREATE TABLE "new_RedSocial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "djId" TEXT,
    CONSTRAINT "RedSocial_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RedSocial" ("id", "nombre") SELECT "id", "nombre" FROM "RedSocial";
DROP TABLE "RedSocial";
ALTER TABLE "new_RedSocial" RENAME TO "RedSocial";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
