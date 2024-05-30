import { Ubicacion } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DJWithRelations } from "~/models/dj.server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ubicacionToString = (ubicacion: Ubicacion) => {
  return `${ubicacion.direccion}, ${ubicacion.ciudad}, ${ubicacion.pais}`;
};

export const isDj = (dj: unknown): dj is DJWithRelations => {
  return dj !== null && typeof dj === "object" && "descripcion" in dj;
};
