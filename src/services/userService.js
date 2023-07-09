const userModel = require("../db/models");
const jwt = require("jsonwebtoken");
const { hashPassword, randomPassword } = require("../misc/utils");

class userService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async getUserToken(userInfo) {
    const { id, pw } = userInfo;
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error("가입되지 않은 ID입니다.");
    }
    console.log(user.pw);
    console.log(hashPassword(pw));
    const isPasswordCorrect = user.pw === hashPassword(pw);
    if (!isPasswordCorrect) {
      throw new Error("PW를 확인해 주세요.");
    }
    if (!user.isActivated) {
      throw new Error("탈퇴한 사용자입니다.");
    }
    const role = user.role;
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id, role }, secretKey, { expiresIn: "1h" });
    return { token };
  }

  async addUser(userInfo) {
    const { id, pw, name, email, phone } = userInfo;
    const user = await userModel.findByEmail(email);
    if (user) {
      if (!user.isActivated) {
        throw new Error("탈퇴한 사용자입니다.");
      }
      throw new Error("이미 사용중인 이메일입니다.");
    }
    const hashedPW = hashPassword(pw);
    const newUserInfo = { id, pw: hashedPW, name, email, phone };
    const newUser = await this.userModel.create(newUserInfo);
    return newUser;
  }

  async duplicateTest(id) {
    const user = await userModel.findById(id);
    if (user) {
      throw new Error("이미 사용중인 아이디입니다.");
    }
    if (!user.isActivated) {
      throw new Error("탈퇴한 사용자입니다.");
    }
    return true;
  }

  async getUserInfo(id) {
    const user = await userModel.findById(id);
    return user;
  }

  async findingId(email) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error("가입되지 않은 이메일입니다.");
    }
    if (!user.isActivated) {
      throw new Error("탈퇴한 사용자입니다.");
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
    if (!user.isActivated) {
      throw new Error("탈퇴한 사용자입니다.");
    }
    const randompw = randomPassword();
    const hashedRPW = hashPassword(randompw);
    await this.userModel.resetPassword({ id, hashedRPW });
    return randompw;
  }

  async editUser(userInfo) {
    const { userId, address, pw } = userInfo;
    const hashedPW = hashPassword(pw);
    return await this.userModel.editUser({ userId, address, hashedPW });
  }

  async deleteUser(userToken) {
    const userId = jwt.verify(userToken, process.env.JWT_SECRET_KEY).id;
    return await this.userModel.deleteUser(userId);
  }
}

module.exports = new userService(userModel);
