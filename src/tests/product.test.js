const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductsImg = require("../models/ProductsImg");
require("../models");

let token;
let productId;

beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "testuser",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST/ product should create a news", async () => {
  const category = await Category.create({ name: "tech" });
  const product = {
    title: "MacBook Air",
    description: "Lorem sishs havsas uashas",
    brand: "Apple",
    price: 1.4,
    categoryId: category.id,
  };
  const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  productId = res.body.id;
  await category.destroy();

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /products", async () => {
  const res = await request(app)
    .get("/products")
    .set("Authorization", `Bearer ${token}`);

  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

// -> update test
// -> delete test

test("POST/news/:id/images should set the news images", async () => {
  const image = await ProductsImg.create({
    url: "http://miimage.com",
    publicId: "falseId",
  });

  const res = await request(app)
    .post(`/products/${productId}/images`)
    .send([image.id]).set('Authorization', `Bearer ${token}`);

  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT/ products/:id", async () => {
  const productUpdated = {
    title: "MackBook updated",
  };
  const res = await request(app)
    .put(`/products/${productId}`)
    .send(productUpdated)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.title).toBe(productUpdated.title);
});

test("DELETE/products/:id", async () => {
  const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
