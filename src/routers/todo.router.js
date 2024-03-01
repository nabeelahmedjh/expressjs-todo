import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
} from "../controllers/todo.controller.js";
import { createTodoValidator } from "../middlewares/todo.middleware.js";
const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", createTodoValidator, addTodo);
todoRouter.get("/:id", getTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export { todoRouter };
