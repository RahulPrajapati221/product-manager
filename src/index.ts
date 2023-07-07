import express from "express";
import { connectDB } from "./db/database";
import userRouter from "./modules/users/users-route";
import productRoute from "./modules/product/product-route";
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRoute);

app.listen(port, (): void => {
  console.log(`server running on port ${port}`);
});
