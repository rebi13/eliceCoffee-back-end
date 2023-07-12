const { userModel } = require('../db/models');
const jwt = require('jsonwebtoken');
const { hashPassword, randomPassword } = require('../misc/utils');
const bcrypt = require('bcrypt');

class userService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async getUserToken(userInfo) {
    const { id, pw } = userInfo;
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('가입되지 않은 ID입니다.');
    }
    if (!user.isActivated) {
      throw new Error('사용할 수 없는 ID입니다.');
    }
    const isPasswordCorrect = bcrypt.compareSync(pw, user.pw);
    if (!isPasswordCorrect) {
      throw new Error('PW를 확인해 주세요.');
    }
    const role = user.role;
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id, role }, secretKey, { expiresIn: '1h' });
    return { token };
  }

  async postUser(userInfo) {
    const { id, pw, name, email, phone } = userInfo;
    const user = await userModel.findByEmail(email);
    if (user) {
      if (!user.isActivated) {
        throw new Error('사용할 수 없는 ID입니다.');
      }
      throw new Error('이미 사용중인 이메일입니다.');
    }
    const hashedPW = await hashPassword(pw);
    const newUser = await this.userModel.create({ id, pw: hashedPW, name, email, phone });
    return newUser;
  }

  async isDuplicated(id) {
    const user = await userModel.findById(id);
    if (user) {
      // if (!user.isActivated) {
      //   throw new Error('사용할 수 없는 ID입니다.');
      // }
      // throw new Error('이미 사용중인 아이디입니다.');
      return false;
    }
    return true;
  }

  async getUserInfo(id) {
    const user = await userModel.findById(id);
    return user;
  }

  async getId(email) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error('가입되지 않은 이메일입니다.');
    }
    if (!user.isActivated) {
      throw new Error('사용할 수 없는 ID입니다.');
    }
    const userId = user.id;
    return { userId };
  }

  async postPW(userInfo) {
    const { id, email } = userInfo;
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error('가입되지 않은 아이디입니다.');
    }
    if (user.email !== email) {
      throw new Error('가입되지 않은 이메일입니다.');
    }
    if (!user.isActivated) {
      throw new Error('사용할 수 없는 ID입니다.');
    }
    const randompw = randomPassword();
    const hashedRPW = await hashPassword(randompw);
    await this.userModel.updatePassword({ id, hashedRPW });
    return randompw;
  }

  async putUser(userInfo) {
    const { userId, email, address, phone, newPw } = userInfo;
    if (newPw === undefined) {
      return await this.userModel.updateUser(userId, { email, address, phone });
    }
    else {
      const hashedPW = await hashPassword(newPw);
      return await this.userModel.updateUser(userId, { email, address, phone, hashedPW });
    }
  }

  async deleteUser(userToken) {
    const userId = jwt.verify(userToken, process.env.JWT_SECRET_KEY).id;
    return await this.userModel.deleteUser(userId);
  }

  async putTotal(info) {
    return await this.userModel.updateTotal(info);
  }

  async putRank(id) {
    return await this.userModel.updateRank(id);
  }

  // 관리자 계정 생성
  // async postAdmin(userInfo) {
  //   const { id, pw, name, email, phone } = userInfo;
  //   const user = await userModel.findByEmail(email);
  //   if (user) {
  //     if (!user.isActivated) {
  //       throw new Error('사용할 수 없는 ID입니다.');
  //     }
  //     throw new Error('이미 사용중인 이메일입니다.');
  //   }
  //   const hashedPW = await hashPassword(pw);
  //   const newUser = await this.userModel.create({ id, pw: hashedPW, name, email, phone, role: "admin" });
  //   return newUser;
  // }
}

module.exports = new userService(userModel);
