const crypto = require("crypto");

module.exports = (pw) => crypto.createHash("sha256").update(pw).digest("hex");
