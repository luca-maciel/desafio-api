import { prisma } from "../lib/prisma";

export async function createVerificationCode(
  email: string,
  code: string,
  expiresAt: Date
) {
  return await prisma.passwordReset.create({
    data: {
      email,
      code,
      expiresAt,
    },
  });
}

export async function deleteVerificationCode(
  id: string
) {
  return await prisma.passwordReset.delete({
    where: {
      id,
    },
  });
}

export async function deleteVerificationCodes(
  email: string
) {
  return await prisma.passwordReset.deleteMany({
    where: {
      email,
    },
  });
}

export async function getVerificationCode(
  email: string,
  code: string
) {
  return await prisma.passwordReset.findFirst({
    where: {
      email,
      code,
    },
  });
}