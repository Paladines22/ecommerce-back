const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const ProductsImg = sequelize.define("productsImg", {
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  publicId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //productId
});

module.exports = ProductsImg;
