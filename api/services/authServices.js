import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { response } from "express";
import { ResponseError } from "../error/error.js";

const register = async (data) => {
  const { username, email, password } = data;

  // CHECK IF USER ALREADY EXIST
  const isExist = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
    },
  });

  if (isExist) {
    throw new ResponseError(
      409,
      "Cannot use respective username or email, user already exist"
    );
  }

  // HASH THE PASSWORD
  const hashedPasswd = await bcrypt.hash(password, 10);

  // CREATE A NEW USER & SAVE IT TO DB
  return prisma.user.create({
    data: {
      username,
      email,
      password: hashedPasswd,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

const login = async (data) => {
  const { username, password } = data;

  // CHECK IF USER EXIST
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Invalid credentials");
  }

  // CHECK IF PASSWORD MATCH
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ResponseError(401, "Invalid credentials");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
  };
};

export default { login, register };
