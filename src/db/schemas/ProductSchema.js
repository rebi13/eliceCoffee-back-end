const { Schema } = require('mongoose');
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
    type: String,
    // type: Schema.Types.ObjectId,
    required: true,
    // ref: "category",
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: false,
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
},
  {
    timestamps: { currentTime: () => new Date(new Date().getTime() + 1000 * 60 * 60 * 9) },
  });

module.exports = ProductSchema;
