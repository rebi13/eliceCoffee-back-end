const { validationResult, body, param } = require('express-validator');

const idCheck = body('id')
  .notEmpty()
  .matches(/^[a-z0-9]{8,12}$/)
  .withMessage('Id: 최소 8자, 최대 12자, 영소문자 및 숫자만 포함되어야 합니다');

const passwordCheck = body('pw')
  .notEmpty()
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .withMessage('Pw: 최소 8자, 하나 이상의 대소문자 및 하나의 숫자, 하나의 특수문자로 구성되어야 합니다');

const nameCheck = body("name", "이름을 입력해주세요.").notEmpty();

const emailCheck = body("email", "Email 유효성 검증 오류").notEmpty().isEmail();

const phoneCheck = body("phone", "Phone 유효성 검증 오류").notEmpty().isMobilePhone();

const addressCheck = body("address", "Address 유효성 검증 오류").notEmpty();

const paramIdCheck = param("id", "ID 유효성 검증 오류").notEmpty();

const loginCheck = [
  idCheck,
  passwordCheck
];

const registerCheck = [
  idCheck,
  passwordCheck,
  nameCheck,
  emailCheck,
  phoneCheck
];
const resetpwCheck = [
  idCheck,
  emailCheck
];

const meCheck = [
  addressCheck,
  passwordCheck
];


const validatorError = (req, res, next) => {
  const errors = validationResult(req).errors;
  if (Object.keys(errors).length !== 0) {
    let messages = errors.map((e) => e.msg);
    res.status(400).json({
      result: "Validation Error",
      reason: messages
    })
    return;
  }
  next();
};


module.exports = {
  loginCheck,
  registerCheck,
  idCheck,
  nameCheck,
  emailCheck,
  resetpwCheck,
  meCheck,
  paramIdCheck,
  validatorError
}
