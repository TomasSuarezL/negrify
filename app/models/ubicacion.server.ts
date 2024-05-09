import { Ubicacion } from "@prisma/client";
import { prisma } from "~/db.server";

export function createUbicacion({
  ciudad,
  pais,
  direccion,
  longitud,
  latitud,
  clienteId,
  djId,
}: Omit<Ubicacion, "id">) {
  if (clienteId) {
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
  } else if (djId) {
    return prisma.ubicacion.create({
      data: {
        ciudad,
        pais,
        direccion,
        longitud,
        latitud,
        dj: {
          connect: {
            id: djId,
          },
        },
      },
    });
  }

  // ...(clienteId && { cliente: { connect: { id: clienteId } } }),
  // ...(djId && { dj: { connect: { id: djId } } }),
}
