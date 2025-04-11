import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import "./model/applicationmodel";
import Application from "./routes/application";
import cros from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7008;
const MongoDb_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cros());

if (!MongoDb_URL) {
  throw new Error(" MONGO_URL not found in .env file");
}

mongoose
  .connect(MongoDb_URL)
  .then((client) => {
    console.log(" MongoDB connected successfully");
  })
  .catch((err) => {
    console.error(" Failed to connect to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

app.use("/Application", Application);
