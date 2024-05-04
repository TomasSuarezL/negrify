import type { User, Ubicacion, Cliente } from "@prisma/client";

import { prisma } from "~/db.server";

export function createCliente({
  nombre,
  apellido,
  avatar,
  ubicacionId,
  userId,
}: Omit<Cliente, "id"> & {
  userId: User["id"];
}) {
  return prisma.cliente.create({
    data: {
      nombre,
      apellido,
      avatar,
      ubicacion: {
        connect: {
          id: ubicacionId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function createUbicacion({
  ciudad,
  pais,
  direccion,
  longitud,
  latitud
}: Omit<Ubicacion, "id">) {
  return prisma.ubicacion.create({
    data: {
      ciudad,
      pais,
      direccion,
      longitud,
      latitud
    },
  });
}
