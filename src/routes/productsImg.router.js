const {
  getAll,
  create,
  remove,
} = require("../controllers/productsImg.controllers");
const express = require("express");
const upload = require("../utils/multer");
const verifyJWT = require("../utils/verifyJWT");

const productsImgRouter = express.Router();

productsImgRouter.route("/")
  .get(verifyJWT ,getAll)
  .post(verifyJWT, upload.single("image"), create);

productsImgRouter.route("/:id").delete(verifyJWT, remove);

module.exports = productsImgRouter;
