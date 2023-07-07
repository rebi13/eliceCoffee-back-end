const userModel = require("../db/models");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../middlewares");
const { randomPassword } = require("../middlewares");

class userService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async getUserToken(userInfo) {
    const { id, pw } = userInfo;
    if (!id || !pw) {
      throw new Error("ID 혹은 PW를 확인해 주세요.");
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error("가입되지 않은 ID입니다.");
    }
    const isPasswordCorrect = user.pw === hashPassword(pw);
    if (!isPasswordCorrect) {
      throw new Error("PW를 확인해 주세요.");
    }
    const role = user.role;
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id, role }, secretKey, { expiresIn: "1h" });
    return { token };
  }

  async addUser(userInfo) {
    const { id, pw, name, email, phone } = userInfo;
    if (!id || !pw || !name || !email || !phone) {
      throw new Error("필수 정보를 모두 입력해주세요.");
    }
    const user = await userModel.findByEmail(email);
    if (user) {
      throw new Error("이미 사용중인 이메일입니다.");
    }
    const hashedPW = await hashPassword(pw);
    const newUserInfo = { id, pw: hashedPW, name, email, phone };
    const newUser = await this.userModel.create(newUserInfo);
    return newUser;
  }

  async duplicateTest(id) {
    const user = await userModel.findById(id);
    if (user) {
      throw new Error("이미 사용중인 아이디입니다.");
    }
    return true;
  }

  async findingId(email) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error("가입되지 않은 이메일입니다.");
    }
    const userId = user.id;
    return { userId };
  }

  async resetPW(userInfo) {
    const { id, email } = userInfo;
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("가입되지 않은 아이디입니다.");
    }
    if (user.email !== email) {
      throw new Error("가입되지 않은 이메일입니다.");
    }
    const randompw = randomPassword();
    const hashedRPW = hashPassword(randompw);
    await this.userModel.resetPassword({ id, hashedRPW });
    return randompw;
  }
}

module.exports = new userService(userModel);
