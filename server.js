import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import cors from "cors";
import categoryRouter from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";

// config env
dotenv.config();

// connecting to database
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ message: "hey Welcome to Ecommer app " });
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRoutes);

// port

const port = process.env.PORT || 8000;

// run listen

app.listen(port, () => {
  console.log(
    `serve is running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
