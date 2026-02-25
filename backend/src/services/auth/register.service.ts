import bcrypt from "bcryptjs";


import { prisma } from "../../lib/prisma.js";

export async function RegisterService(data: {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}) {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      middleName: data.middleName || "",
      lastName: data.lastName,
      password:hashedPassword
    },
  });
  return { ...data};
}
