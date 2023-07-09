const { model } = require('mongoose');
const { UserSchema } = require('../schemas');

const User = model('users', UserSchema);

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
  async editUser(userInfo) {
    const { userId, address, hashedPW } = userInfo;
    return await User.updateOne({ id: userId }, { $set: { address: address, pw: hashedPW } });
  }

  async deleteUser(id) {
    return await User.updateOne({ id: id }, { $set: { isActivated: false } });
  }
}

module.exports = new UserModel();