const { Schema } = require("mongoose");
const OrderSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  items: {
    type: [Schema.Type.ObjectId],
    ref: "Product",
  },
  userId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    requied: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export { OrderSchema }; 