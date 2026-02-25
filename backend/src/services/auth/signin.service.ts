import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";

export default async function SignInService(data: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user || !bcrypt.compareSync(data.password, user.password)) {
    throw new Error("Invalid credentials!");
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}
