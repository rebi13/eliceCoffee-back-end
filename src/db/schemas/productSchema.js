const { Schema } = require("mongoose");
const productSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
  price: {
    type: Number,
    required: true,
  },
  kewword: {
    type: [String],
  },
  description: {
    type: String,
  },
  mainImage: {
    type: String,
    required: true,
  },
  subImage: [String],
  option: String,
});

mudule.exports = productSchema;
