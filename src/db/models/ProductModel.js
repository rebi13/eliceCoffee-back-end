const { model } = require("mongoose");
const ProductSchema = require("../schemas/ProductSchema");

const Product = model("products", ProductSchema);

class ProductModel {
  async create(user) {
    return await Product.create(user);
  }
  async find() {
    return await Product.find();
  }
  async findOne(productId) {
    return await Product.findOne({id: productId});
  }
}

module.exports = new ProductModel();
