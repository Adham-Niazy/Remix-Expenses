import { prisma } from "./database.server";
import { hash } from 'bcryptjs';

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst( { where: {email} });
  console.log(existingUser);

  if ( existingUser ) {
    const error = new Error('A user with the provided email address exists already!');
    error.status = 422;
    throw error;
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({ data: { email, password: passwordHash } })
}