import { Todo } from "../models/todo.models.js";

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTodo = async (req, res) => {
  const { content } = req.body;
  try {
    const todo = await Todo.create({
      content: content,
    });
    console.log("201");
    return res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
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
  try {
    const response = await Todo.findByIdAndUpdate(
      todoId,
      {
        content: content,
        isCompleted: isCompleted,
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const response = await Todo.findById(todoId);

    if (response === null) {
      res
        .status(404)
        .json({ message: `Todo with id: ${todoId} doesn't exists` });
    }

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

export { getTodos, addTodo, deleteTodo, getTodo, updateTodo };
