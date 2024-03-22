import request from "supertest";
import { app } from "../src/index";
import { getTodos } from "../src/controllers/todo.controller";
import { MongoDBContainer } from "@testcontainers/mongodb";
import mongoose from "mongoose";

const requestBody = {
  content: "TESTING FROM JEST",
};
let requestConfig;

describe("Todo", () => {
  beforeAll(async () => {
    // register a user
    await request(app).post("/auth/register").send({
      username: "dabu",
      password: "123456",
    });

    const res = await request(app).post("/auth/login").send({
      username: "dabu",
      password: "123456",
    });

    requestConfig = {
      authorization: res.body.token,
    };
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return all todos of the user", async () => {
    const response = await request(app).get("/todo").set(requestConfig);
    expect(response.status).toBe(200);
  });

  // testing the addTodo function
  it("should add a new todo for user", async () => {
    const response = await request(app)
      .post("/todo")
      .set(requestConfig)
      .send(requestBody);
    // const response = await axios.post(BASE_URL, requestBody, requestConfig);
    // console.log(response);
    expect(response.status).toBe(201);
    expect(response.body.content).toBe("TESTING FROM JEST");
    expect(response.body.isCompleted).toBe(false);
  });

  // testing the deleteTodo function
  it("should delete a todo for user", async () => {
    const todo = await request(app)
      .post("/todo")
      .set(requestConfig)
      .send(requestBody);

    expect(todo.status).toBe(201);

    const resourceId = todo.body._id;

    const response = await request(app)
      .delete(`/todo/${resourceId}`)
      .set(requestConfig);

    expect(response.status).toBe(200);
  });

  // testing the updateTodo function
  it("should update a todo for user", async () => {
    const createResponse = await request(app)
      .post("/todo")
      .set(requestConfig)
      .send(requestBody);
    expect(createResponse.status).toBe(201);

    const resourceId = createResponse.body._id;

    const response = await request(app).post("/todo").set(requestConfig).send({
      content: "Updated Todo",
      isCompleted: true,
    });
    expect(response.body.content).toBe("Updated Todo");
    expect(response.body.isCompleted).toBe(true);
    expect(response.status).toBe(201);
  });

  // testing the getTodo function
  it("should get a todo for user", async () => {
    const postResponse = await request(app)
      .post("/todo")
      .set(requestConfig)
      .send(requestBody);
    expect(postResponse.status).toBe(201);

    const resourceId = postResponse.body._id;
    const response = await request(app)
      .get(`/todo/${resourceId}`)
      .set(requestConfig);

    console.log(response.body);
    expect(response.body.content).toBe(postResponse.body.content);
    expect(response.body.isCompleted).toBe(postResponse.body.isCompleted);
    expect(response.status).toBe(200);
  });
});
