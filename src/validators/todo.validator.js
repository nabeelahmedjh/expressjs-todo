import Joi from "joi";

const createTodoValidationSchema = Joi.object({
  content: Joi.string().required(),
  isCompleted: Joi.boolean(),
});

const updatedTodoValidationSchema = Joi.object({
  // id: Joi.string().required(),
  content: Joi.string().required(),
  isCompleted: Joi.boolean(),
});

// const getTodoIdValidationSchema = Joi.object({
//   id: Joi.string().required(),
// });

// const deleteTodoValidationSchema = Joi.object({
//   id: Joi.string().required(),
// });

export { createTodoValidationSchema, updatedTodoValidationSchema };
