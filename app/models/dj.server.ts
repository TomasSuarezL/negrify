import type { User, DJ, Genero, Ubicacion } from "@prisma/client";

import { prisma } from "~/db.server";

export function createDJ({
  nombre,
  avatar,
  background,
  descripcion,
  generos,
  ubicacion,
  userId,
}: Omit<DJ, "clientesFaveados"> & {
  userId: User["id"];
  generos: Genero[];
  ubicacion: Ubicacion;
}) {
  return prisma.dJ.create({
    data: {
      nombre,
      avatar,
      background,
      descripcion,
      ubicacion: {
        create: ubicacion,
      },
      generos: {
        connectOrCreate: generos.map(g => ({
          where: { descripcion: g.descripcion },
          create: g,
        }))
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      generos: true,
    },
  });
}