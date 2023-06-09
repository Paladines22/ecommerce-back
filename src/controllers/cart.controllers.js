const catchError = require("../utils/catchError");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductsImg = require("../models/ProductsImg");

const getAll = catchError(async (req, res) => {
  const logedUserId = req.user.id;
  const results = await Cart.findAll({
    include: [
      {
        model: Product,
        include: [ProductsImg],
      },
    ],
    where: { userId: logedUserId },
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const { productId, quantity } = req.body;
  const result = await Cart.create({
    productId,
    quantity,
    userId: req.user.id,
  });
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Cart.findByPk(id, {
    include: [
      {
        model: Product,
        include: [ProductsImg],
      },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Cart.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Cart.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
