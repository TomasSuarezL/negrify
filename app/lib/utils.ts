import { DJ, Ubicacion } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ubicacionToString = (ubicacion: Ubicacion) => {
  return `${ubicacion.direccion}, ${ubicacion.ciudad}, ${ubicacion.pais}`;
};

export const isDj = (dj: unknown): dj is DJ => {
  return dj !== null && typeof dj === "object" && "descripcion" in dj;
};
