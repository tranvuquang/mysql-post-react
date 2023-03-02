require("dotenv").config();
import { RequestExtended, ResponseExtended } from "../types";
import db from "../models";

const { Likes } = db;

export const likePost = async (req: RequestExtended, res: ResponseExtended) => {
  try {
    let { PostId } = req.body;
    PostId = Number(PostId);
    let { id } = req.headers.user as any;
    id = Number(id);
    const found = await Likes.findOne({
      where: { PostId: PostId, UserId: id },
    });
    if (!found) {
      await Likes.create({
        PostId,
        UserId: id,
      });
      return res.status(200).json({
        message: "success",
        status: 200,
        liked: true,
      });
    }

    await Likes.destroy({
      where: { PostId: PostId, UserId: id },
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      likes: false,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
