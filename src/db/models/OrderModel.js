const { model } = require("mongoose");
const OrderSchema = require("../schemas/orderSchema");

const Order = model("orders", OrderSchema);

class OrderModel {
  // id에 대하여 자기가 주문한 내역을 가져온다.
  async findByUserId(id) {
    return await Order.find({ id });
  }
  async cancelOrder(id) {
    // return await Order.update();
  }
}

module.exports = new OrderModel();
