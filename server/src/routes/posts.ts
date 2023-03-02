import express from "express";

import { validateToken } from "../middlewares/auth";
import { createPost, getPosts } from "../controllers/post";

const router = express.Router();

//  get posts
router.get("/", validateToken, getPosts);

// create post
router.post("/create", validateToken, createPost);

export default router;
