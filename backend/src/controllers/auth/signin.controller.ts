import { signInSchema } from "../../../../shared/schemas.js";
import SignInService from "../../services/auth/signin.service.js";

import { Request, Response, NextFunction } from "express";

export default async function SignInController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = signInSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid credentials!",
      });
    }
    const { user, token } = await SignInService(req.body);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      user: {
        firstName: user.firstName,
        email: user.email,
        userId: user.id,
        role: user.role,
      },
      message: "Login Successful",
    });
  } catch (e: any) {
    if (e.message === "Invalid credentials!") {
      return res.status(401).json({ message: e.message });
    }
    console.error("Signing in error", e);
    return res.status(500).json({ message: "Server error please try again!" });
  }
}
