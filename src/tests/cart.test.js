const request = require("supertest");
const app = require("../app");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
require("../models");

let token;
let cartId;

beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "testuser",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST/carts should create a cart", async () => {
  const product = await Product.create({
    title: "My product test",
    description: "Lorems disdgsd sugdshdu ssdihs",
    brand: "brand test",
    price: 1400,
  });
  const cart = {
    productId: product.id,
    quantity: 2,
  };
  const res = await request(app)
    .post("/carts")
    .send(cart)
    .set("Authorization", `Bearer ${token}`);

  await product.destroy();
  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/carts", async () => {
  const res = await request(app)
    .get("/carts")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT/carts/:id", async () => {
  const cartUpdated = {
    quantity: 100,
  };
  const res = await request(app)
    .put(`/carts/${cartId}`)
    .send(cartUpdated)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(cartUpdated.quantity);
});

test("DELETE/carts/:id", async () => {
  const res = await request(app)
    .delete(`/carts/${cartId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
