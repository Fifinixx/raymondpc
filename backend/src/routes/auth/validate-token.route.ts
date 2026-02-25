import express from "express";

import validateToken from "../../middlewares/token/validateToken.js";

const validateTokenRouter = express.Router();

validateTokenRouter.get("/validateToken", validateToken);

export {validateTokenRouter}