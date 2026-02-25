import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import cookieParser from "cookie-parser";

dotenv.config();

import { authRouter } from "./routes/auth/auth.route.js";
import { validateTokenRouter } from "./routes/auth/validate-token.route.js";
import validateToken from "./middlewares/token/validateToken.js";
import { AdminProductRouter } from "./routes/admin/admin-product.route.js";


const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(express.json());

// products
app.use("/api/products", () => {} )

//validate token
app.use("/api/me", validateToken, (req, res) => {
  res.status(200).json({ user: req.user, message: "AUTH_SUCCESS" });
});

//Signin and Registration
app.use("/api/auth", authRouter);

//Admin routes
app.use("/api/admin", validateToken, AdminProductRouter);


app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.listen(4000, () => {
  console.log("Express app is running");
});
