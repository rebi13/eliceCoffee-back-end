const { model } = require("mongoose");
const ProductSchema = require("../schemas/ProductSchema");

const Product = model("products", ProductSchema);

class ProductModel {
  async create(product) {
    return await Product.create(product);
  }
  async find() {
    return await Product.find();
  }
  async findOne(productId) {
    return await Product.findOne({id: productId});
  }
  async updateOne(product) {
    return await Product.updateOne(product);
  }
  async deleteOne(productId) {
    return await Product.deleteOne({id: productId});
  }
}

module.exports = new ProductModel();
