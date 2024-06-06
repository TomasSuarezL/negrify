import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.dJ.create({
    data: {
      nombre: "Dj. Rachele",
      apellido: "Dela",
      rate: 23.4,
      avatar: "https://i.pravatar.cc/150",
      descripcion:
        "Aurum vobis nostrum tubineus ademptio supra cupiditas solum. Utrum colo ascit assentator volo. Crinis nulla trucido tabernus una minus cursim.",
      generos: {
        create: [
          { descripcion: "House" },
          { descripcion: "Electro" },
          { descripcion: "Disco" },
        ],
      },
      background: "backgraund url",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
