import type { User, DJ, Genero, Ubicacion, Artista } from "@prisma/client";

import { prisma } from "~/db.server";

export function createDJ({
  nombre,
  avatar,
  background,
  descripcion,
  generos,
  artistasReferencias,
  userId,
}: Omit<DJ, "clientesFaveados"> & {
  userId: User["id"];
  generos: Genero[];
  artistasReferencias: Artista[]
}) {
  return prisma.dJ.create({
    data: {
      nombre,
      avatar,
      background,
      descripcion,
      generos: {
        connectOrCreate: generos.map(g => ({
          where: { descripcion: g.descripcion },
          create: g,
        }))
      },
      artistasReferencias: {
        connectOrCreate: artistasReferencias.map(a => ({
          where: { nombre: a.nombre },
          create: a,
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
