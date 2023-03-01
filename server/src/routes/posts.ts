import express from "express";
import db from "../models";

const { Posts } = db;
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const posts = await Posts.findAll();
    return res.status(200).json({
      message: "success",
      status: 200,
      posts,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// create post
router.post("/create", async (req: any, res: any) => {
  try {
    const post = req.body;
    const resData = await Posts.create(post);
    return res.status(200).json({
      message: "success",
      data: resData,
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
