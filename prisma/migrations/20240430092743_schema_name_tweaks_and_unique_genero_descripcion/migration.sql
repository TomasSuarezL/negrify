/*
  Warnings:

  - A unique constraint covering the columns `[descripcion]` on the table `Genero` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Genero_descripcion_key" ON "Genero"("descripcion");
