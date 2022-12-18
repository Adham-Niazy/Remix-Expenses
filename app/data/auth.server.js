import { prisma } from "./database.server";
import { hash, compare } from 'bcryptjs';

function throwError(message, status) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

export async function signup({ email, password }) {
  // Checking Uniqueness of email
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    throwError('A user with the provided email address exists already!', 422);
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.create({ data: { email, password: passwordHash } })
}

export async function login({ email, password }) {
  // Checking Email
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    throwError('Could not log you in, please check the provided credentials.', 401);
  }
  // Checking Password
  const passwordCorrect = await compare(password, existingUser.password);
  if (!passwordCorrect) {
    throwError('Could not log you in, please check the provided credentials.', 401);
  }
}