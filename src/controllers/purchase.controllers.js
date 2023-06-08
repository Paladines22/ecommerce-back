const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const ProductsImg = require("../models/ProductsImg");

const getAll = catchError(async (req, res) => {
  const logedUserId = req.user.id;
  const results = await Purchase.findAll({
    include: [{
      model:Product,
      include: [ProductsImg]
    }],
    where: { userId: logedUserId },
  });
  return res.json(results);
});

const buyCart = catchError(async (req, res) => {
  const userId = req.user.id;
  const cartProducts = await Cart.findAll({
    where: { userId },
    attributes: ["userId", "productId", "quantity"],
    raw: true,
  });
  await Purchase.bulkCreate(cartProducts);
  await Cart.destroy({ where: { userId } });
  return res.json(cartProducts);
});

module.exports = {
  getAll,
  buyCart,
};
