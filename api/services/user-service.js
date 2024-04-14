import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

const getUsers = async () => {
  return prisma.user.findMany();
};

const getUser = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });
};

const updateUser = async (id, body) => {
  const { password, avatar, ...inputs } = body;

  let updatedPassword = null;

  if (password) {
    updatedPassword = await bcrypt.hash(password, 10);
  }

  return prisma.user.update({
    where: { id },
    data: {
      ...inputs,
      ...(updatedPassword && { password: updatedPassword }),
      ...(avatar && { avatar: avatar }),
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });
};

const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

export default { getUser, getUsers, updateUser, deleteUser };
