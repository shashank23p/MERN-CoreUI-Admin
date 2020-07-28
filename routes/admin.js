const express = require("express");
const router = express.Router();
const { loginChecker } = require("../libs/jwtLib");
require("dotenv/config");
//check if user is logged in
router.use(loginChecker);
router.use((req, res, next) => {
  try {
    if (req.session.is_admin) next();
    else res.json({ error: "Not Authorized" });
  } catch (error) {}
});
router.get("/", async (req, res) => {
  res.json({ message: "you are in admin" });
});

module.exports = router;
