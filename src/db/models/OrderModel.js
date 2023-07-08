const { model } = require("mongoose");
const OrderSchema = require("../schemas/orderSchema");

const Order = model("orders", OrderSchema);

class OrderModel {
  // userid에 대하여 자기가 주문한 내역을 가져온다.
  async findByUserId(userId) {
    return await Order.find({ userId });
  }
  // 주문id에 대하여 정보를 취소한다. (상태를 취소대기중으로 변경한다)
  async cancelOrder(orderId, status) {
    return await Order.updateOne(orderId, {status});
  }

  // 주문 정보를 저장한다.
  async postOrder(orderInfo) {
    return await Order.create(orderInfo);
  }

  // 주문 정보를 수정한다 (주문 취소 or 배송지 변경)
  async putOrder(orderId, param) {
    return await Order.updateOne({id: orderId}, { $set: param });
  }

  // 주문 내역을 전체 조회한다. (관리자)
  async getOrders() {
    return await Order.find({});
  }

  // 특정 사용자의 주문 내역을 조회한다. (관리자)
  async getOrder(id) {
    return await Order.find({userId: id});
  }

  async deleteOrder(id) {
    return await Order.deleteOne({ id });
  }

  // 주문 상태를 변경한다. (관리자)
  async putStatus(id, status) {
    return await Order.updateOne({id}, { status });
  }
}

module.exports = new OrderModel();
