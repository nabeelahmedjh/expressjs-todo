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
const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", createTodoValidator, addTodo);
todoRouter.get("/:id", getTodo);
todoRouter.put("/:id", updateTodoValidator, updateTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.delete("/", deleteTodos);

export { todoRouter };
