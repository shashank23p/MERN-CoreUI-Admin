const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { registerValidator, loginValidator } = require("../validators/auth.js");
const {
  createAuthJWT,
  createRefreshJWT,
  getJWTFromRefreshJWT,
  hashPassword,
} = require("../libs/jwtLib");
//default route
router.get("/", async (req, res) => {
  res.json({ routeName: "auth" });
});

//to register new user
router.post("/register", async (req, res) => {
  try {
    //validate
    const { error } = registerValidator(req.body);
    if (error) return res.json({ error: error.details[0].message });

    //check if already register email
    const emailExits = await User.findOne({ email: req.body.email });
    if (emailExits) return res.json({ error: "Email already exists" });

    //hash password
    const hashedPassword = await hashPassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.json({ user: savedUser });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  //validate
  const { error } = loginValidator(req.body);
  if (error) return res.json({ error: error.details[0].message });
  //check if email exits
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ error: "Email is not register" });
  //match password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.json({ error: "Invalid Password" });
  //create jwt
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_admin: user.is_admin,
  };
  const auth_token = createAuthJWT(payload);
  const refresh_token = createRefreshJWT(payload);
  if (auth_token) {
    res.cookie("refresh_token", refresh_token, { httpOnly: true });
    res.header("auth-token", auth_token).json({
      message: "Login Successful",
      payload: payload,
      refresh_token: refresh_token,
    });
  } else res.json({ error: "Something went wrong" });
});
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    res.json({ message: "cookie cleared" });
  } catch (error) {
    res.json({ error: "failed while logging out" });
  }
});
router.get("/refresh", async (req, res) => {
  try {
    if (req.cookies.refresh_token) {
      const { auth_token, payload } = getJWTFromRefreshJWT(
        req.cookies.refresh_token
      );
      if (auth_token) {
        res
          .header("auth-token", auth_token)
          .json({ message: "Refresh Successful", payload: payload });
      } else res.json({ error: "You have to login again" });
    } else {
      res.json({ error: "No refrsh token found, You have to login again" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
