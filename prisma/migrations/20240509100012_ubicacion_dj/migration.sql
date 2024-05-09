/*
  Warnings:

  - You are about to drop the column `ubicacionId` on the `DJ` table. All the data in the column will be lost.
  - Added the required column `url` to the `RedSocial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `djId` to the `Ubicacion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RedSocial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "djId" TEXT,
    CONSTRAINT "RedSocial_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RedSocial" ("djId", "id", "nombre") SELECT "djId", "id", "nombre" FROM "RedSocial";
DROP TABLE "RedSocial";
ALTER TABLE "new_RedSocial" RENAME TO "RedSocial";
CREATE TABLE "new_DJ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    CONSTRAINT "DJ_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DJ" ("avatar", "background", "descripcion", "id", "nombre", "userId") SELECT "avatar", "background", "descripcion", "id", "nombre", "userId" FROM "DJ";
DROP TABLE "DJ";
ALTER TABLE "new_DJ" RENAME TO "DJ";
CREATE UNIQUE INDEX "DJ_userId_key" ON "DJ"("userId");
CREATE TABLE "new_Ubicacion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "latitud" TEXT,
    "longitud" TEXT,
    "djId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    CONSTRAINT "Ubicacion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ubicacion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ubicacion" ("ciudad", "clienteId", "direccion", "id", "latitud", "longitud", "pais") SELECT "ciudad", "clienteId", "direccion", "id", "latitud", "longitud", "pais" FROM "Ubicacion";
DROP TABLE "Ubicacion";
ALTER TABLE "new_Ubicacion" RENAME TO "Ubicacion";
CREATE UNIQUE INDEX "Ubicacion_djId_key" ON "Ubicacion"("djId");
CREATE UNIQUE INDEX "Ubicacion_clienteId_key" ON "Ubicacion"("clienteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
