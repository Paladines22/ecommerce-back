const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductsImg = require("./ProductsImg");
const Purchase = require("./Purchase");
const User = require("./User");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductsImg);
ProductsImg.belongsTo(Product);
//tabla pibote Cart
Product.hasMany(Cart);
Cart.belongsTo(Product); // el belongsTo es el que produce la llave foranea en este caso a Cart

User.hasMany(Cart);
Cart.belongsTo(User);
//tabla pibote Purchases

User.hasMany(Purchase);
Purchase.belongsTo(User);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);
