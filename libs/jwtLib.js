const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginChecker = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.json({ error: "access denied", noLogin: true });
  try {
    const session = jwt.verify(token, process.env.TOKEN_SEC);
    req.session = session;
    next();
  } catch (err) {
    return res.json({ error: err.message, noLogin: true });
  }
};
//verifyJWT
const verifyJWT = (token, sec) => {
  try {
    const session = jwt.verify(token, sec);
    if (session) return true;
    else return false;
  } catch (err) {
    return false;
  }
};

const createAuthJWT = (data) => {
  const payload = {
    id: data.id,
    name: data.name,
    groups: data.groups,
    subjects: data.subjects,
    email: data.email,
    is_admin: data.is_admin,
  };
  try {
    const token = jwt.sign(payload, process.env.TOKEN_SEC, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });
    if (token) return token;
    else return false;
  } catch (err) {
    return false;
  }
};
const createRefreshJWT = (data) => {
  const payload = {
    id: data.id,
    name: data.name,
    groups: data.groups,
    subjects: data.subjects,
    email: data.email,
    is_admin: data.is_admin,
  };
  try {
    const token = jwt.sign(payload, process.env.REFRESH_SEC, {
      expiresIn: "1y",
    });
    if (token) return token;
    else return false;
  } catch (err) {
    return false;
  }
};
const getJWTFromRefreshJWT = (refresh_token) => {
  try {
    const data = jwt.verify(refresh_token, process.env.REFRESH_SEC);
    auth_token = createAuthJWT(data);
    return { auth_token, payload };
  } catch (error) {
    return false;
  }
};
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    return false;
  }
};
module.exports.loginChecker = loginChecker;
module.exports.verifyJWT = verifyJWT;
module.exports.createAuthJWT = createAuthJWT;
module.exports.createRefreshJWT = createRefreshJWT;
module.exports.getJWTFromRefreshJWT = getJWTFromRefreshJWT;
module.exports.hashPassword = hashPassword;
