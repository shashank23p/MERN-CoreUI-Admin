const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv/config");
//routes
const authRoute = require("./routes/auth.js");
const adminRoute = require("./routes/admin.js");
const memberRoute = require("./routes/member.js");
//middleweres
//converting body into json using body parser
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", express.static("public"));
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/member", memberRoute);

//connect to mongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to mongo")
);

//starting express server
app.listen(5000, () => {
  console.log("listning on port 5000");
});
