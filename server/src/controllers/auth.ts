require("dotenv").config();
import jwt from "jsonwebtoken";
import { RequestExtended, ResponseExtended } from "../types";
import db from "../models";

const { Users } = db;

export const register = async (req: RequestExtended, res: ResponseExtended) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (user) {
      return res.status(500).json({
        message: "User already exists!",
        status: 500,
      });
    }
    const userData = await Users.create({
      username,
      password,
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      user: userData,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req: RequestExtended, res: ResponseExtended) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }
    if (password !== user.password) {
      return res.status(400).json({
        message: "Wrong username or password!",
        status: 400,
      });
    }
    const userData = {
      id: user.id,
      username,
    };
    const accessToken = jwt.sign(userData, process.env.JWT as string);
    return res.status(200).json({
      message: "success",
      status: 200,
      user: userData,
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
