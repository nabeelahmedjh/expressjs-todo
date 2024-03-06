import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { DBConnection } from "./db/db.js";
import { Todo } from "./models/todo.models.js";
import bodyParser from "body-parser";
import { todoRouter } from "./routers/todo.router.js";
// import { authRouter } from "./routers/auth.router.js";

DBConnection();

const app = express();
app.use(bodyParser.json()); // parse json data

app.use("/todo", todoRouter);
// app.use("/auth", authRouter);

app.listen(process.env.POST || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
