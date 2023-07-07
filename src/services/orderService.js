const orderModel = require("../db/models/OrderModel");
const jwt = require("jsonwebtoken");

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async getOrderInfo(userId) {
    return await this.orderModel.findByUserId(userId);
  }
  async putOrderCancel(orderId) {
    return await this.orderModel.cancelOrder(orderId);
  }
  async putOrderAddress(orderId) {
    return await this.orderModel.updateAddress(orderId);
  }
  async postOrder(orderInfo) {
    return await this.orderModel.putOrder(orderInfo);
  }
}

module.exports = new OrderService(orderModel);
