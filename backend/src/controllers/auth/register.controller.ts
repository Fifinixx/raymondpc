import { Request, Response } from "express";
import { RegisterService } from "../../services/auth/register.service.js";

import { userSchema } from "../../../../shared/schemas.js";
import SignInService from "../../services/auth/signin.service.js";

export async function RegisterController(req: Request, res: Response) {
  try {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid inputs",
        errors: result.error.issues,
      });
    }

    const user = await RegisterService(req.body);

     // if registration is succesfull, set cookies
    const { token } = await SignInService({
      email: req.body.email,
      password: req.body.password,
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ user: user });

  } catch (e: any) {

    if (e.message === "Email already in use") {
      return res.status(409).json({ errors:[{ message: "Email already in use", path:['email']}] });
    }
    console.error("Registration Error", e);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
}
