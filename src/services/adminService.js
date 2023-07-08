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
    const { id, name, categoryId, price, subImage, keyWord, description, mainImage } = product;
    if (!id || !name || !categoryId || !price || !subImage || !keyWord || !description || !mainImage) {
      throw new Error("필수 정보를 모두 입력해주세요.");
    }
    const result = await this.productModel.create(product);
    return result;
  }

  // 상품 단건 조회 관리자
  async getProduct(productId) {
    const product = await this.productModel.findOne(productId);
    return product;
  }

  // 상품 단건 수정 관리자
  async putProduct(product) {
    const { id, name, categoryId, price, subImage, keyWord, description, mainImage } = product;
    if (!id || !name || !categoryId || !price || !subImage || !keyWord || !description || !mainImage) {
      throw new Error("필수 정보를 모두 입력해주세요.");
    }
    const result = await this.productModel.update(product);
    return result;
  }
  
  // 상품 단건 삭제 관리자
  async deleteProduct(productId) {
    const result = await this.productModel.deleteOne(productId);
    return result;
  }

  // 주문 내역 전체 조회 관리자
  async getOrders() {
    const orders = await this.orderModel.getOrders();
    return orders;
  }

  // 주문 내역 특정 사용자 조회 관리자
  async getOrder(id) {
    const order = await this.orderModel.getOrder(id);
    return order;
  }

  // 주문 내역 삭제 관리자
  async deleteOrder(id) {
    const result = await this.orderModel.deleteOrder(id);
    return result;
  }

  // 주문 내역 주문상태 변경 관리자
  async putStatus(id, status) {
    const result = await this.orderModel.putStatus(id, status);
    return result;
  }
}

module.exports = new AdminService(productModel, orderModel);
