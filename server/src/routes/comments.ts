import express from "express";

import { validateToken } from "../middlewares/auth";
import { createComment, deleteComment, getCommentByPostId } from "../controllers/comment";

const router = express.Router();

//  create comment
router.post("/create", validateToken, createComment);

//  get comment by post id
router.get("/:id", validateToken, getCommentByPostId);

//  delete comment 
router.delete("/delete", validateToken, deleteComment);

export default router;
