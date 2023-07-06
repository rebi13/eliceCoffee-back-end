const { userModel } = require("../db/models");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async getUserToken(userInfo) {
    const { id, pw } = userInfo;
    if (!id || !pw) {
      throw new Error("ID 혹은 PW를 확인해 주세요.");
    }
    const user = await userModel.findById({ id });
    if (!user) {
      throw new Error("가입되지 않은 ID입니다.");
    }
    const isPasswordCorrect = await bcyrpt.compare(pw, user.pw);
    if (!isPasswordCorrect) {
      throw new Error("PW를 확인해 주세요.");
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    return { token };
  }
}

module.exports = userService;
