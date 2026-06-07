import express from "express";
import cors from "cors";
import dotenv from "dotenv";


const app = express();

// neccesary middlewares and configurations
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World!");
});


// 404 handler - for unmatched routes
app.use((err, req, res, next) => {
  res.status(404).send("path not found!");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
