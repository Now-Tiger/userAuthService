import { PrismaClient } from "@prisma/client";
import { users } from "../src/data/users";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "TigerHere",
      email: "tiger@hotmail.com",
      password: "tigerpassword",
    },
  });

  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
