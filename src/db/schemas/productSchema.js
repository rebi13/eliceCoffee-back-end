const { Schema } = require("mongoose");
const ProductSchema = new Schema({
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
  keyword: {
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

export { ProductSchema };
