import type { User, Cliente } from "@prisma/client";

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

export const getClienteByUserId = (userId: User["id"]) => {
  return prisma.cliente.findFirst({
    where: {
      userId,
    },
    include: {
      ubicacion: true,
    },
  });
};

export const updateCliente = (
  id: Cliente["id"],
  { nombre, apellido, avatar }: Omit<Cliente, "id" | "userId">
) => {
  return prisma.cliente.update({
    where: { id },
    data: { nombre, apellido, avatar },
  });
};