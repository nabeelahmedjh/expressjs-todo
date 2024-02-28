import { Todo } from "../models/todo.models.js";

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

const addTodo = async (req, res) => {
  const { content } = req.body;
  try {
    const todo = await Todo.create({
      content: content,
    });

    return res.json(todo);
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    const response = await Todo.findByIdAndDelete(todoId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { content } = req.body;
  try {
    const response = await Todo.findByIdAndUpdate(
      todoId,
      {
        content: content,
      },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const response = await Todo.findById(todoId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export { getTodos, addTodo, deleteTodo, getTodo, updateTodo };
