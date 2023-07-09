const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const Token = req.cookies.loginToken.token;
    if (!Token || Token === 'null') {
      res.json('로그인이 필요한 서비스입니다.');
      return;
    }
    const jwtDecoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
    const userId = jwtDecoded.id;
    req.userId = userId;
    next();
  } catch (error) {
    res.json('정상적인 토큰이 아닙니다.');
  }
};
