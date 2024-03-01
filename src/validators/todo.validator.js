import Joi from "joi";

const createTodoValidationSchema = Joi.object({
  content: Joi.string().required(),
  isCompleted: Joi.boolean(),
});

const updatedTodoValidationSchema = Joi.object({
  content: Joi.string().required(),
  isCompleted: Joi.boolean(),
});

const getTodoIdValidationSchema = Joi.object({
  id: Joi.string().required(),
});

export {
  createTodoValidationSchema,
  updatedTodoValidationSchema,
  getTodoIdValidationSchema,
};
