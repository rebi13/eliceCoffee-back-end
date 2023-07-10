const { model } = require('mongoose');
const { UserSchema } = require('../schemas');

const User = model('users', UserSchema);

class UserModel {
  async findById(id) {
    return await User.findOne({ id }).lean();
  }
  async findByEmail(email) {
    return await User.findOne({ email }).lean();
  }
  async create(user) {
    return (await User.create(user)).toObject();
  }
  async updatePassword(userInfo) {
    const { id, hashedRPW } = userInfo;
    return await User.updateOne({ id: id }, { $set: { pw: hashedRPW } });
  }
  async updateUser(userInfo) {
    const { userId, address, hashedPW } = userInfo;
    return await User.updateOne({ id: userId }, { $set: { address: address, pw: hashedPW } });
  }
  async deleteUser(id) {
    return await User.updateOne({ id: id }, { $set: { isActivated: false } });
  }
}

module.exports = new UserModel();
