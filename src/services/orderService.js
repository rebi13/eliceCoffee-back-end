const orderModel = require("../db/models");
const jwt = require("jsonwebtoken");

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async getOrderInfo(orderId) {
    return await this.orderModel.findByUserId(orderId);
  }
  async putOrderCancel(orderId) {
    return await this.orderModel.cancelOrder(orderId);
  }
  async putOrderAddress(orderId) {
    return await this.orderModel.updateAddress(orderId);
  }
}

module.exports = new OrderService(orderModel);
