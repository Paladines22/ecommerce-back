const request = require("supertest");
const app = require("../app");

let token;
let categoryId;

beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "testuser",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST/ categories should create one category", async () => {
  const category = {
    name: "Mac",
  };

  const res = await request(app)
    .post("/categories")
    .send(category)
    .set("Authorization", `Bearer ${token}`);
  categoryId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/categories", async () => {
  const res = await request(app)
    .get("/categories")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT/categories/:id", async () => {
  const categoryUpdated = {
    name: "Mac updated",
  };
  const res = await request(app)
    .put(`/categories/${categoryId}`)
    .send(categoryUpdated)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(categoryUpdated.name);
});

test("DELETE/ categories/:id", async () => {
  const res = await request(app)
    .delete(`/categories/${categoryId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
