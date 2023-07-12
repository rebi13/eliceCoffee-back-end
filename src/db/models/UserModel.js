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

  async updateUser(userId, userInfo) {
    const { email, address, phone, hashedPW } = userInfo;
    if (hashedPW === undefined) {
      return await User.updateOne({ id: userId }, { $set: { email, address, phone } });
    }
    else return await User.updateOne({ id: userId }, { $set: { email, address, phone, pw: hashedPW } });
  }
  async deleteUser(id) {
    return await User.updateOne({ id: id }, { $set: { isActivated: false } });
  }

  async updateTotal(info) {
    const { id, price } = info;
    const user = await User.findOne({ id: id })
    const updatedTotal = user.totalPurchase + price;
    return await User.updateOne({ id }, { $set: { totalPurchase: updatedTotal } });
  }

  async updateRank(id) {
    const user = await User.findOne({ id });
    if (user.totalPurchase >= 100000) {
      await User.updateOne({ id }, { $set: { rank: "gold" } });
    }
    else if (user.totalPurchase >= 50000) {
      await User.updateOne({ id }, { $set: { rank: "silver" } });
    }
    return user.rank;
  }
}

module.exports = new UserModel();
