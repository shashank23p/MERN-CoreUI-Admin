const jwt = require("jsonwebtoken");

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

const createAuthJWT = (payload) => {
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
const createRefreshJWT = (payload) => {
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
    payload = {
      id: data.id,
      name: data.name,
      is_admin: data.is_admin,
    };
    auth_token = createAuthJWT(payload);
    return { auth_token, payload };
  } catch (error) {
    return false;
  }
};
module.exports.loginChecker = loginChecker;
module.exports.verifyJWT = verifyJWT;
module.exports.createAuthJWT = createAuthJWT;
module.exports.createRefreshJWT = createRefreshJWT;
module.exports.getJWTFromRefreshJWT = getJWTFromRefreshJWT;
