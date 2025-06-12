import express, { Application } from "express";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
const app: Application = express();

const port = process.env.PORT || "5000";
dotenv.config({
  path:'./.env'
})

app.use(express.json());
app.use(cookieParser())
//routes
import userRouter from "./routers/UserRoutes.js";
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log("App Started on Port", port);
});
