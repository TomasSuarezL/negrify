import type { User, Ubicacion, Cliente } from "@prisma/client";

import { prisma } from "~/db.server";

export function createCliente({
  nombre,
  apellido,
  avatar,
  userId,
}: Omit<Cliente, "id"> & {
  userId: User["id"];
}) {
  return prisma.cliente.create({
    data: {
      nombre,
      apellido,
      avatar,
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
  latitud,
  clienteId
}: Omit<Ubicacion, "id">) {
  return prisma.ubicacion.create({
    data: {
      ciudad,
      pais,
      direccion,
      longitud,
      latitud,
      cliente: {
        connect: {
          id: clienteId,
        },
      },
    },
  });
}
