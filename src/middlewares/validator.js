const { validationResult, body } = require('express-validator');

const idCheck = body("id", "Id: 최소 8자, 최대 12자, 영소문자 및 숫자만 포함되어야 합니다.").notEmpty().matches(/^[a-z0-9]{8,12}$/);

const passwordCheck = body("pw", "Pw: 최소 8자, 하나 이상의 대소문자 및 하나의 숫자, 하나의 특수문자로 구성되어야 합니다.").notEmpty().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

const loginCheck = [
    idCheck,
    passwordCheck
];

const registerCheck = [
    idCheck,
    passwordCheck,
    body("name", "이름을 입력해주세요.").notEmpty(),
    body("email", "Email 유효성 검증 오류").notEmpty().isEmail(),
    body("phone", "Phone 유효성 검증 오류").notEmpty().isMobilePhone(),
];
const emailCheck = [
    body("email", "Email 유효성 검증 오류").notEmpty().isEmail()
];

const resetpwCheck = [
    idCheck,
    body("email", "Email 유효성 검증 오류").notEmpty().isEmail()
];

const meCheck = [
    body("address", "Address 유효성 검증 오류").notEmpty(),
    passwordCheck
];

const validatorError = (req, res, next) => {
    const Err = validationResult(req);
    if (!Err.isEmpty()) {
        throw new Error(Err.errors[0].msg);
    }
    next();
}



module.exports = {
    loginCheck,
    registerCheck,
    idCheck,
    emailCheck,
    resetpwCheck,
    meCheck,
    validatorError
}