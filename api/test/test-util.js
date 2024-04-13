import { prisma } from "../lib/prisma.js";

const deleteUsers = async () => {
  await prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createUser = async () => {
  return prisma.user.create({
    data: {
      username: "test",
      email: "test@gmail.com",
      password: "pass",
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export { createUser, deleteUsers };
