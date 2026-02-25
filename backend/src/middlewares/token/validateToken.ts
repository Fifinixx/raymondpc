import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// since user does not exist in the request object by default, we need to declare it in the global namespace of express. This way we can access req.user in our controllers without typescript errors.
declare global {
  namespace Express {
    interface Request {
      user?: {
        firstName: string;
        lastName: string;
        email: string;
        role: string;
      }; 
    }
  }
}

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.auth_token;

  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token provided!" });
    }
    req.user = decoded;
    next();
  });
}
