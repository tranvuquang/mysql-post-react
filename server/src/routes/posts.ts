import express from "express";

import { validateToken } from "../middlewares/auth";
import { createPost, getPostById, getPosts } from "../controllers/post";

const router = express.Router();

//  get posts
router.get("/", validateToken, getPosts);

// get post by id
router.get("/getPostById/:id", validateToken, getPostById);

// create post
router.post("/create", validateToken, createPost);

export default router;
