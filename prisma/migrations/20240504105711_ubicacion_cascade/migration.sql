-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DJ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacionId" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    CONSTRAINT "DJ_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DJ_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "Ubicacion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DJ" ("avatar", "background", "descripcion", "id", "nombre", "ubicacionId", "userId") SELECT "avatar", "background", "descripcion", "id", "nombre", "ubicacionId", "userId" FROM "DJ";
DROP TABLE "DJ";
ALTER TABLE "new_DJ" RENAME TO "DJ";
CREATE UNIQUE INDEX "DJ_userId_key" ON "DJ"("userId");
CREATE UNIQUE INDEX "DJ_ubicacionId_key" ON "DJ"("ubicacionId");
CREATE TABLE "new_Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "ubicacionId" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cliente_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "Ubicacion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("apellido", "avatar", "id", "nombre", "ubicacionId", "userId") SELECT "apellido", "avatar", "id", "nombre", "ubicacionId", "userId" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_userId_key" ON "Cliente"("userId");
CREATE UNIQUE INDEX "Cliente_ubicacionId_key" ON "Cliente"("ubicacionId");
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rate" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "dJId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    CONSTRAINT "Review_dJId_fkey" FOREIGN KEY ("dJId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("clienteId", "contenido", "dJId", "id", "rate") SELECT "clienteId", "contenido", "dJId", "id", "rate" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
