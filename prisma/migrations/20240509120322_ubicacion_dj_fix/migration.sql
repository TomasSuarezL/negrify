-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ubicacion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "latitud" TEXT,
    "longitud" TEXT,
    "djId" TEXT,
    "clienteId" TEXT,
    CONSTRAINT "Ubicacion_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ubicacion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ubicacion" ("ciudad", "clienteId", "direccion", "djId", "id", "latitud", "longitud", "pais") SELECT "ciudad", "clienteId", "direccion", "djId", "id", "latitud", "longitud", "pais" FROM "Ubicacion";
DROP TABLE "Ubicacion";
ALTER TABLE "new_Ubicacion" RENAME TO "Ubicacion";
CREATE UNIQUE INDEX "Ubicacion_djId_key" ON "Ubicacion"("djId");
CREATE UNIQUE INDEX "Ubicacion_clienteId_key" ON "Ubicacion"("clienteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
