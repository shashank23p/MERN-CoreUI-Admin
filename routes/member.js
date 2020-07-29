const express = require("express");
const router = express.Router();
const { loginChecker } = require("../libs/jwtLib");
require("dotenv/config");
//check if user is logged in
router.use(loginChecker);
router.get("/", async (req, res) => {
  res.json({ message: "you are in member" });
});

module.exports = router;
