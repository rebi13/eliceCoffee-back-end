const orderModel = require("../db/models");
const jwt = require("jsonwebtoken");

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async getOrderInfo(orderId) {
    return await this.orderModel.findByUserId(orderId);
  }


}

module.exports = new OrderService(orderModel);
