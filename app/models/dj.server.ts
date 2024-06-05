import type { User, DJ, Prisma, Ubicacion } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { prisma } from "~/db.server";

export type DJWithRelations = Prisma.DJGetPayload<{
  include: {
    generos: true;
    artistasReferencias: true;
    ubicacion: true;
  };
}>;

export function createDJ({
  nombre,
  apellido,
  avatar,
  background,
  descripcion,
  generos,
  artistasReferencias,
  userId,
  rate,
}: Omit<DJ, "clientesFaveados" | "id" | "rate"> & {
  userId: User["id"];
  generos: string[];
  artistasReferencias: string[];
  rate: number;
}) {
  return prisma.dJ.create({
    data: {
      nombre,
      apellido,
      avatar,
      background,
      descripcion,
      rate: new Decimal(rate),
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

export function getDJs() {
  return prisma.dJ.findMany({
    include: {
      generos: true,
      artistasReferencias: true,
    },
  });
}

export function getDjByUserId(userId: User["id"]) {
  return prisma.dJ.findUnique({
    where: { userId },
    include: {
      generos: true,
      artistasReferencias: true,
      ubicacion: true,
    },
  });
}

export function getDjById(id: DJ["id"]) {
  return prisma.dJ.findUnique({
    where: { id },
    include: {
      generos: true,
      artistasReferencias: true,
      ubicacion: true,
    },
  });
}

export function updateDj(
  id: DJ["id"],
  data: Partial<
    Omit<DJ, "rate"> & {
      rate: number;
      ubicacion: Partial<Ubicacion>;
      generos: string[];
      artistasReferencias: string[];
    }
  >,
) {
  return prisma.dJ.update({
    where: { id },
    data: {
      ...data,
      ...(data?.rate && { rate: new Decimal(data.rate) }),
      generos: {
        set: [],
        connectOrCreate: data?.generos?.map((g) => ({
          where: { descripcion: g },
          create: { descripcion: g },
        })),
      },
      artistasReferencias: {
        set:[],
        connectOrCreate: data?.artistasReferencias?.map((a) => ({
          where: { nombre: a },
          create: { nombre: a },
        })),
      },
      ubicacion: {
        update: {
          where: {
            djId: id,
          },
          data: {
            ...data.ubicacion,
          },
        },
      },
    },
    include: {
      generos: true,
      artistasReferencias: true,
      ubicacion: true,
    },
  });
}
