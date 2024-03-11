import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  deleteTodos,
} from "../controllers/todo.controller.js";
import {
  createTodoValidator,
  updateTodoValidator,
} from "../middlewares/todo.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const todoRouter = express.Router();

todoRouter.get("/", verifyToken, getTodos);
todoRouter.post("/", verifyToken, createTodoValidator, addTodo);
todoRouter.get("/:id", verifyToken, getTodo);
todoRouter.put("/:id", verifyToken, updateTodoValidator, updateTodo);
todoRouter.delete("/:id", verifyToken, deleteTodo);
todoRouter.delete("/", verifyToken, deleteTodos);

export { todoRouter };
