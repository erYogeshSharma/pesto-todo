import express from "express";

const router = express.Router();

import todoRoutes from "../routes/todo";
import authRoutes from "../routes/auth";

router.use("/todo", todoRoutes);
router.use("/auth", authRoutes);

export default router;
