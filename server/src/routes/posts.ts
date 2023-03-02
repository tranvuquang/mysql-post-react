import express from "express";

import { validateToken } from "../middlewares/auth";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post";

const router = express.Router();

//  get posts
router.get("/", validateToken, getPosts);

// get post by id
router.get("/getPostById/:id", validateToken, getPostById);

// create post
router.post("/create", validateToken, createPost);

//update post
router.post("/update/:id", validateToken, updatePost);

//delete post
router.delete("/delete/:id", validateToken, deletePost);

export default router;
