const orderModel = require('../db/models/OrderModel');

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  // async getOrderInfo(userId) {
  //   return await this.orderModel.findByUserId(userId);
  // }
  // 주문 내역 전체 조회 사용자
  async getOrders(userId) {
    const orders = await this.orderModel.findOrders(userId);
    return orders;
  }

  // 주문 내역 특정 내역 조회 사용자
  async getOrder(userId, id) {
    const order = await this.orderModel.findOrder(userId, id);
    return order;
  }

  async putOrder(orderId, param) {
    return await this.orderModel.putOrder(orderId, param);
  }
  // 주문 내역 주문상태 변경 사용자
  async putStatus(id, status) {
    const result = await this.orderModel.updateStatus(id, status);
    return result;
  }

  // async putOrderCancel(orderId) {
  //   return await this.orderModel.cancelOrder(orderId);
  // }
  // async putOrderAddress(orderId) {
  //   return await this.orderModel.updateAddress(orderId);
  // }
  async postOrder(orderInfo) {
    return await this.orderModel.createOrder(orderInfo);
  }
}

module.exports = new OrderService(orderModel);
