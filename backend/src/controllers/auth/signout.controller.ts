import { Request, Response } from "express";

async function SignOutController(req:Request, res: Response ){
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({message:"User has been signed out."})

}


export {SignOutController}