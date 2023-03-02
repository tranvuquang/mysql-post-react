require("dotenv").config();
import { RequestExtended, ResponseExtended } from "../types";
import db from "../models";

const { Posts, Likes } = db;

export const getPosts = async (req: RequestExtended, res: ResponseExtended) => {
  try {
    const posts = await Posts.findAll();
    const { id } = req.headers.user as any;
    const likesByUserId = await Likes.findAll({ where: { UserId: id } });
    const allLikes = await Likes.findAll();
    return res.status(200).json({
      message: "success",
      status: 200,
      posts,
      likesByUserId,
      allLikes,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const createPost = async (
  req: RequestExtended,
  res: ResponseExtended
) => {
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
};

export const getPostById = async (
  req: RequestExtended,
  res: ResponseExtended
) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByPk(id);
    return res.status(200).json({
      message: "success",
      post,
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (
  req: RequestExtended,
  res: ResponseExtended
) => {
  try {
    const { id } = req.params;
    const { title, postText } = req.body;
    await Posts.update({ title, postText }, { where: { id: id } });
    return res.status(200).json({
      message: "success",
      post: {
        id: Number(id),
        title,
        postText,
      },
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (
  req: RequestExtended,
  res: ResponseExtended
) => {
  try {
    const { id } = req.params;
    await Posts.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
