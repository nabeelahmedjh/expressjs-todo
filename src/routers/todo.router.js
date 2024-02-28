import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
} from "../controllers/todo.controller.js";
const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", addTodo);
todoRouter.get("/:id", getTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export { todoRouter };
