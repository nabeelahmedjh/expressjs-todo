const axios = require("axios");

const BASE_URL = "http://localhost:5000/todo/";
const LOGIN_URL = "http://localhost:5000/auth/login";
const requestBody = {
  content: "TESTING FROM JEST",
};
let requestConfig;

describe("Todo", () => {
  let userToken;
  beforeAll(async () => {
    // Adjust username and password based on your test environment
    const response = await axios.post(LOGIN_URL, {
      username: "dabu",
      password: "123456",
    });

    // console.log(response.data.token);

    requestConfig = {
      headers: {
        Authorization: response.data.token,
      },
    };
  });

  // testing the getTodos function
  it("should return all todos of the user", async () => {
    const response = await axios.get(BASE_URL, requestConfig);
    expect(response.status).toBe(200);
  });

  // testing the addTodo function
  it("should add a new todo for user", async () => {
    const response = await axios.post(BASE_URL, requestBody, requestConfig);
    // console.log(response);
    expect(response.status).toBe(201);
    expect(response.data.content).toBe("TESTING FROM JEST");
    expect(response.data.isCompleted).toBe(false);
  });

  // testing the deleteTodo function
  it("should delete a todo for user", async () => {
    const postResponse = await axios.post(BASE_URL, requestBody, requestConfig);
    expect(postResponse.status).toBe(201);

    const resourceId = postResponse.data._id;
    const response = await axios.delete(
      `${BASE_URL}${resourceId}`,
      requestConfig
    );
    expect(response.status).toBe(200);
  });

  // testing the updateTodo function
  it("should update a todo for user", async () => {
    const postResponse = await axios.post(BASE_URL, requestBody, requestConfig);
    expect(postResponse.status).toBe(201);

    const resourceId = postResponse.data._id;
    const response = await axios.put(
      `${BASE_URL}${resourceId}`,
      {
        content: "Updated Todo",
        isCompleted: true,
      },
      requestConfig
    );
    expect(response.data.content).toBe("Updated Todo");
    expect(response.data.isCompleted).toBe(true);
    expect(response.status).toBe(200);
  });

  // testing the getTodo function
  it("should get a todo for user", async () => {
    const postResponse = await axios.post(BASE_URL, requestBody, requestConfig);
    expect(postResponse.status).toBe(201);

    const resourceId = postResponse.data._id;
    const response = await axios.get(`${BASE_URL}${resourceId}`, requestConfig);
    expect(response.data.content).toBe(postResponse.data.content);
    expect(response.data.isCompleted).toBe(postResponse.data.isCompleted);
    expect(response.status).toBe(200);
  });
});
