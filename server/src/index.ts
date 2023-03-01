require("dotenv").config();
import express from "express";
import db from "./models";
import postRoutes from "./routes/posts";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/posts", postRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
