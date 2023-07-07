const productModel = require("../db/models/ProductModel");
const orderModel = require("../db/models/OrderModel");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../middlewares");

class AdminService {
  constructor(productModel, orderModel) {
    this.productModel = productModel;
    this.orderModel = orderModel;
  }

  // 상품 등록 관리자
  async addProduct(product) {
    const { id, name,
        categoryId,
        price,
        subImage,
        keyWord,
        description,
        mainImage } = product;
        console.log(id, name, categoryId,
            price,
            subImage,
            keyWord,
            description,
            mainImage);
    if (!id || !name || !categoryId || !price || !subImage || !keyWord || !description || !mainImage) {
      throw new Error("필수 정보를 모두 입력해주세요.");
    }
    console.log("service model 접근전");
    const data = await this.productModel.create(product);
    return data;
  }
}

module.exports = new AdminService(productModel, orderModel);