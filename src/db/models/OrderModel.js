const { model } = require('mongoose');
const { OrderSchema } = require('../schemas');

const Order = model('orders', OrderSchema);

class OrderModel {
  // userid에 대하여 자기가 주문한 내역을 가져온다.
  async findByUserId(userId) {
    return await Order.find({ userId }).lean();
  }

  // 주문 정보를 변경한다. (배송주소, 배송자명 등)
  async updateOrder(id, { address, receiver, receiverPhone }) {
    return await Order.updateOne({ id }, { $set: { address, receiver, receiverPhone } });
  }

  // 주문 상태를 변경한다. (관리자, 사용자 = status: "paid")
  async updateStatus(id, status) {
    return await Order.updateOne(id, { $set: status });
  }

  // 주문 정보를 저장한다.
  async createOrder(orderInfo) {
    return (await Order.create(orderInfo)).toObject();
  }

  // 주문 내역을 전체 조회한다. (관리자)
  async findOrders() {
    return await Order.find({}).lean();
  }
  // 주문 내역을 전체 조회한다. (사용자)
  async findOrdersByUserId(userId) {
    return await Order.find({ userId }).lean();
  }

  // 특정 사용자의 주문 내역을 조회한다. (관리자)
  async findOrderByUserId(id) {
    return await Order.find({ userId: id }).lean();
  }

  // 특정 주문에 대한 내역을 조회한다. (사용자)
  async findOrderById(userId, id) {
    return await Order.find({ userId, id }).lean();
  }

  async deleteOrder(id) {
    return await Order.deleteOne({ id });
  }
}

module.exports = new OrderModel();
