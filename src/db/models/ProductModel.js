const { model } = require('mongoose');
const { ProductSchema } = require('../schemas');

const Product = model('products', ProductSchema);

class ProductModel {
  async create(product) {
    return await Product.create(product);
  }
  async find() {
    return await Product.find();
  }
  async findOne(productId) {
    return await Product.findOne({ id: productId });
  }
  async findByCategoryId(categoryId) {
    return await Product.find({ categoryId });
  }
  async updateOne(product) {
    return await Product.updateOne(product);
  }
  async deleteOne(productId) {
    return await Product.deleteOne({ id: productId });
  }
  async findSix() {
    const products = (await Product.find().sort({ "createdAt": -1 })).slice(0, 6);
    return products;
  }
}

module.exports = new ProductModel();
