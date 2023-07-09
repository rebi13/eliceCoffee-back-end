const { Schema } = require('mongoose');
const OrderSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  items: {
    type: Schema.Types.Array,
    items: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    // type: [Schema.Type.ObjectId],
    // ref: "Product",
  },
  itemTotal: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  status: {
    type: String,
    required: true,
    default: 'paid',
  },
});

module.exports = OrderSchema;
