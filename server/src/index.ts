require("dotenv").config();
import express from "express";
import cors from "cors";
import db from "./models";
import postRoutes from "./routes/posts";
import authRoutes from "./routes/auth";
import likeRoutes from "./routes/likes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3002"] }));

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
