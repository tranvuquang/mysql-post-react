import express from "express";

import { validateToken } from "../middlewares/auth";
import { createComment, getCommentByPostId } from "../controllers/comment";

const router = express.Router();

//  create comment
router.post("/create", validateToken, createComment);

//  get comment by post id
router.get("/:id", validateToken, getCommentByPostId);

export default router;
