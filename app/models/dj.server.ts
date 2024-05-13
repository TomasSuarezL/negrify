import type { User, DJ } from "@prisma/client";

import { prisma } from "~/db.server";

export function createDJ({
  nombre,
  avatar,
  background,
  descripcion,
  generos,
  artistasReferencias,
  userId,
}: Omit<DJ, "clientesFaveados" | "id"> & {
  userId: User["id"];
  generos: string[];
  artistasReferencias: string[];
}) {
  return prisma.dJ.create({
    data: {
      nombre,
      avatar,
      background,
      descripcion,
      generos: {
        connectOrCreate: generos.map((g) => ({
          where: { descripcion: g },
          create: { descripcion: g },
        })),
      },
      artistasReferencias: {
        connectOrCreate: artistasReferencias.map((a) => ({
          where: { nombre: a },
          create: { nombre: a },
        })),
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      generos: true,
      artistasReferencias: true,
    },
  });
}
