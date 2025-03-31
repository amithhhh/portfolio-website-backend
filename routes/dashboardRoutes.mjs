import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.mjs";
import { findUser } from "../controllers/dashboardController.mjs";

const productRoute = Router();

productRoute.get("/dashboard", authMiddleware, findUser);

export default productRoute;
