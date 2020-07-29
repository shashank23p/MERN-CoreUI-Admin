const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { loginChecker, hashPassword } = require("../libs/jwtLib");
const User = require("../models/User");
require("dotenv/config");
const { changepassValidator } = require("../validators/auth.js");
//check if user is logged in
router.use(loginChecker);
router.get("/", async (req, res) => {
  res.json({ message: "you are in member" });
});
router.post("/changepass", async (req, res) => {
  try {
    //validate
    const { error } = changepassValidator(req.body);
    if (error) return res.json({ error: error.details[0].message });
    //check if email exits
    const user = await User.findOne({ _id: req.session.id });
    if (!user) return res.json({ error: "Unknown User", noLogin: true });
    //match password
    const validPass = await bcrypt.compare(
      req.body.current_password,
      user.password
    );
    if (!validPass) return res.json({ error: "Invalid Password" });
    //create new hased password
    hashedPassword = await hashPassword(req.body.new_password);
    //changing password
    updated = await User.updateOne(
      { _id: req.session.id },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    if (updated.nModified == 0) {
      res.json({ message: "Password Was Same" });
    } else if (updated.nModified > 0) {
      res.json({ message: "Password Updated Successfully" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
