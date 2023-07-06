const { model } = require("mongoose");
const UserSchema = require("../schemas/UserSchema");

const User = model("users", UserSchema);

class UserModel {
  async findById(id) {
    return await User.findOne({ id });
  }
}

module.exports = UserModel;

// export class UserModel {}

// export const userModel = new UserModel();
