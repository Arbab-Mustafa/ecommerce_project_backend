import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

//App config...

const app = express();
const port = process.env.PORT || 4000;

// database connection
connectDB();
connectCloudinary();

// middlewares;

app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(port, () => {
  console.log(`App running successfully on http://localhost:${port}`);
});

//7.09.55
