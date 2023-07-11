const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const Token = req.cookies.loginToken.token;
        if (!Token || Token === 'null') {
            res.json('관리자 로그인이 필요한 서비스입니다.');
            return;
        }
        jwt.verify(Token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (decoded.role !== 'admin') {
                res.json("접근 권한이 없습니다.");
            }
        });
        next();
    } catch (error) {
        res.json('정상적인 토큰이 아닙니다.');
    }
};
