const { model } = require("mongoose");
const UserSchema = require("../schemas/UserSchema");

const User = model("users", UserSchema);

class UserModel {
  async findById(id) {
    return await User.findOne({ id });
  }
  async findByEmail(email) {
    return await User.findOne({ email });
  }
  async create(user) {
    return await User.create(user);
  }
  async resetPassword(userInfo) {
    const { id, hashedRPW } = userInfo;
    return await User.updateOne({ id: id }, { $set: { pw: hashedRPW } });
  }
}

module.exports = new UserModel();
