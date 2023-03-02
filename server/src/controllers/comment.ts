require("dotenv").config();
import { RequestExtended, ResponseExtended } from "../types";
import db from "../models";

const { Comments } = db;

export const createComment = async (
  req: RequestExtended,
  res: ResponseExtended
) => {
  try {
    const resData = await Comments.create(req.body);
    return res.status(200).json({
      message: "success",
      status: 200,
      comment: resData,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getCommentByPostId = async (
  req: RequestExtended,
  res: ResponseExtended
) => {
  try {
    const id = Number(req.params.id);
    const comments = await Comments.findAll({ where: { PostId: id } });
    return res.status(200).json({
      message: "success",
      status: 200,
      comments,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteComment = async (
  req: RequestExtended,
  res: ResponseExtended
) => {
  try {
    const id = Number(req.body.id);
    await Comments.destroy({
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
