import type { Password, Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    dj?: {
      include: {
        clientesFaveados: true;
        ubicacion: true;
        reviews: true;
        artistasReferencias: true;
        generos: true;
        redes: true;
        descripcion: true
      };
    };
    cliente?: {
      include: {
        clientesFaveados: true;
        ubicacion: true;
        reviews: true;
      };
    };
  };
}>;

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    where: { id },
    include: { dj: true, cliente: true },
  });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
