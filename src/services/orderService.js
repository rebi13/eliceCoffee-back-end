const orderModel = require("../db/models/OrderModel");
const jwt = require("jsonwebtoken");

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async getOrderInfo(userId) {
    return await this.orderModel.findByUserId(userId);
  }
  async putOrder(orderId, param) {
    return await this.orderModel.putOrder(orderId, param);
  }
  // async putOrderCancel(orderId) {
  //   return await this.orderModel.cancelOrder(orderId);
  // }
  // async putOrderAddress(orderId) {
  //   return await this.orderModel.updateAddress(orderId);
  // }
  async postOrder(orderInfo) {
    return await this.orderModel.postOrder(orderInfo);
  }
}

module.exports = new OrderService(orderModel);
