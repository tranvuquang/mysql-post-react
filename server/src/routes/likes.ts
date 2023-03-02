import express from "express";

import { validateToken } from "../middlewares/auth";
import { likePost } from "../controllers/like";

const router = express.Router();

//  like or unlike a post
router.post("/", validateToken, likePost);

export default router;
