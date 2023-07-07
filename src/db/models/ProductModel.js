const { model } = require("mongoose");
const ProductSchema = require("../schemas/ProductSchema");

const Product = model("products", ProductSchema);

class ProductModel {
  async create(user) {
    return await Product.create(user);
  }
}

module.exports = new ProductModel();
