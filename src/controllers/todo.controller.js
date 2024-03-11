import mongoose from "mongoose";
import { Todo } from "../models/todo.models.js";

const getTodos = async (req, res) => {
  try {
    const user = req.user;
    const todos = await Todo.find({
      user: user.userId,
    });
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTodo = async (req, res) => {
  try {
    const { content, isCompleted } = req.body;

    // console.log(req.userId);
    const todo = await Todo.create({
      content: content,
      isCompleted: isCompleted,
      user: req.user.userId,
    });
    return res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  if (!mongoose.isValidObjectId(todoId)) {
    res.status(400).json({
      message: "id is not valid",
    });
  }

  try {
    const todo = await Todo.findById(todoId);

    if (todo === null) {
      res.status(400).json({
        message: "todo with given id doesn't exist",
      });
    }

    // console.log("Todo.user: ", todo.user);
    // console.log("req.user.userId: ", req.user.userId);

    if (todo.user != req.user.userId) {
      res.status(401).json({
        message: "Not allowed to access",
      });
    }

    const response = await Todo.findByIdAndDelete(todoId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.json(error).status(500);
  }
};

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { content } = req.body;
  const { isCompleted } = req.body;

  if (!mongoose.isValidObjectId(todoId)) {
    res.status(400).json({
      message: "id is not valid",
    });
  }

  try {
    const todo = await Todo.findById(todoId);

    if (todo === null) {
      res.status(400).json({
        message: "todo with given id doesn't exist",
      });
    }

    if (todo.user != req.user.userId) {
      res.status(401).json({
        message: "Not allowed to access",
      });
    }

    todo.content = content;
    todo.isCompleted = isCompleted;
    todo.save();

    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);

    if (todo === null) {
      res
        .status(404)
        .json({ message: `Todo with id: ${todoId} doesn't exists` });
    }

    if (todo.user != req.user.userId) {
      res.status(401).json({
        message: "Not allowed to access",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteTodos = async (req, res) => {
  try {
    const response = await Todo.deleteMany({
      user: req.user.userId,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { getTodos, addTodo, deleteTodo, getTodo, updateTodo, deleteTodos };
