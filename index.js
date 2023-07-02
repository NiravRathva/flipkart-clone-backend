import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = 8080;
dotenv.config();

//connecting to the database
const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO);
  console.log("conntected to MongoDB");
};

app.listen(port, () => {
  connectToMongo();
  console.log(`app is running on ${port} `);
});

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoutes);
