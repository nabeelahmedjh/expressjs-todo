const axios = require("axios");

const BASE_URL = "http://localhost:5000/todo/";
const requestBody = {
  content: "TESTING FROM JEST",
};

describe("Todo", () => {
  // testing the getTodos function
  it("should return all todos", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.status).toBe(200);
  });

  // testing the addTodo function
  it("should add a new todo", async () => {
    const response = await axios.post(BASE_URL, requestBody);
    console.log(response);
    expect(response.status).toBe(201);
    expect(response.data.content).toBe("TESTING FROM JEST");
    expect(response.data.isCompleted).toBe(false);
  });

  // testing the deleteTodo function
  it("should delete a todo", async () => {
    const postResponse = await axios.post(BASE_URL, requestBody);
    expect(postResponse.status).toBe(201);

    const resourceId = postResponse.data._id;
    const response = await axios.delete(`${BASE_URL}${resourceId}`);
    expect(response.status).toBe(200);
  });

  // testing the updateTodo function
  it("should update a todo", async () => {
    const postResponse = await axios.post(BASE_URL, requestBody);
    expect(postResponse.status).toBe(201);

    const resourceId = postResponse.data._id;
    const response = await axios.put(`${BASE_URL}${resourceId}`, {
      content: "Updated Todo",
      isCompleted: true,
    });
    expect(response.data.content).toBe("Updated Todo");
    expect(response.data.isCompleted).toBe(true);
    expect(response.status).toBe(200);
  });

  // testing the getTodo function
  it("should get a todo", async () => {
    const postResponse = await axios.post(BASE_URL, requestBody);
    expect(postResponse.status).toBe(201);

    const resourceId = postResponse.data._id;
    const response = await axios.get(`${BASE_URL}${resourceId}`);
    expect(response.data.content).toBe(postResponse.data.content);
    expect(response.data.isCompleted).toBe(postResponse.data.isCompleted);
    expect(response.status).toBe(200);
  });
});
