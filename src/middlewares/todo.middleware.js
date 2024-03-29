import express from "express";
import {
  createTodoValidationSchema,
  updatedTodoValidationSchema,
} from "../validators/todo.validator.js";

const createTodoValidator = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }

    // the validateAsync method is built into Joi
    await createTodoValidationSchema.validateAsync(req.body);

    next();
  } catch (error) {
    // if validation fails we send the message generated by Joi
    res.status(400).send({ message: error.message });
  }
};

// const getTodoIdValidator = async (req, res, next) => {
//   try {
//     await getTodoIdValidationSchema.validateAsync(req.params);
//     next();
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// };

const updateTodoValidator = async (req, res, next) => {
  try {
    await updatedTodoValidationSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { createTodoValidator, updateTodoValidator };
