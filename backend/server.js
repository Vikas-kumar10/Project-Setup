import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();


import adminRoutes from "./routes/adminRoutes.js";

// middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running ");
});

// routes are created
app.use("/api/admin", adminRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));