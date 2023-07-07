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

  async putOrder(orderInfo) {
    return await Order.create(orderInfo);
  }
}

module.exports = new OrderModel();
