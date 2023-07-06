const { userModel } = require("../db/models");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  static async getUserToken(userInfo) {
    const { id, pw } = userInfo;
    /******  로그인용 코드 ******/
    // if (!id || !pw) {
    //   throw new Error("ID 혹은 PW를 확인해 주세요.");
    // }
    // const user = await userModel.findById({ id });
    // if (!user) {
    //   throw new Error("가입되지 않은 ID입니다.");
    // }
    // const isPasswordCorrect = await bcyrpt.compare(pw, user.pw);
    // if (!isPasswordCorrect) {
    //   throw new Error("PW를 확인해 주세요.");
    // }
    // const role = user.role;
    /****** 테스트용 코드 ******/ //id: elicecoffee pw:3
    if (id !== "elicecoffee" || pw !== "3") {
      throw new Error("ID 혹은 PW를 확인해주세요.");
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id }, secretKey, { expiresIn: "1h" });
    return { token };
  }

  static async addUser(userInfo) {
    const { id, pw, name, email, phone, address, profile } = userInfo;
    if (!id || !pw || !name || !email || !phone || !address) {
      throw new Error("필수 정보를 모두 입력해주세요.");
    }
    const user = await userModel.fineByEmail(email);
    if (user) {
      throw new Error("이미 사용중인 이메일입니다.");
    }
  }
}

module.exports = userService;
