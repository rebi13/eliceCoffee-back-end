const productModel = require("../db/models/ProductModel");
const orderModel = require("../db/models/OrderModel");
const categoryModel = require("../db/models/CategoryModel");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../middlewares");

class AdminService {
  constructor(productModel, orderModel, categoryModel) {
    this.productModel = productModel;
    this.orderModel = orderModel;
    this.categoryModel = categoryModel;
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

  async deleteOrder(id) {
    const result = await this.orderModel.deleteOrder(id);
    return result;
  }
  //카테고리 추가
  async addCategory(categoryInfo) {
    const { id, name } = categoryInfo;
    if (!id || !name) {
      throw new Error("필수 정보를 모두 입력해 주세요.");
    }
    const category = await this.categoryModel.findById(id);
    if (category) {
      throw new Error("이미 존재하는 카테고리ID입니다.")
    }
    const category2 = await this.categoryModel.findByName(name);
    if (category2) {
      throw new Error("이미 존재하는 카테고리 이름입니다.")
    }
    const result = await this.categoryModel.create({ id, name });
    return result;
  }
  //카테고리 조회
  async getCategory(id) {
    if (!id) {
      throw new Error("필수정보를 입력해주세요.");
    }
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new Error("존재하지 않는 카테고리입니다.");
    }
    const result = await this.categoryModel.findById(id);
    return result;
  }
  //카테고리 수정
  async putCategory(categoryInfo) {
    const { id, name } = categoryInfo;
    if (!id || !name) {
      throw new Error("필수정보를 입력해주세요.");
    }
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new Error("존재하지 않는 카테고리입니다.");
    }
    const result = await this.categoryModel.update(categoryInfo);
    return result;
  }

  //카테고리 삭제
  async deleteCategory(id) {
    if (!id) {
      throw new Error("필수정보를 입력해주세요");
    }
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new Error("존재하지 않는 카테고리입니다.");
    }
    const result = await this.categoryModel.deleteCategory(id);
    return result;
  }
}

module.exports = new AdminService(productModel, orderModel, categoryModel);
