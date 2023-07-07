const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      type: String,
    },
    createDate: {
      type: Date,
      default: new Date(),
    },
    orderList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    point: {
      type: Number,
      default: 0,
    },
    rank: {
      type: String,
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
  }
);

module.exports = UserSchema;
