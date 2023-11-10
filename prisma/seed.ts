import { PrismaClient as PrismaClient1 } from "../prisma/generated/client1";
import { PrismaClient as PrismaClient2 } from "../prisma/generated/client2";
import bcrypt from "bcrypt";
const prisma = new PrismaClient1();
const prisma2 = new PrismaClient2();

async function run() {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("12345", salt);
  console.log("password", password);
  const user = await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      email: "user@gmail.com",
      name: "khant min kyi",
      password: password,
    },
  });
  const user2 = await prisma2.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      email: "user@gmail.com",
      name: "khant min kyi",
      password: password,
    },
  });

  console.log({ user1: user, user2: user2 });
}

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
