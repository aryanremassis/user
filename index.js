const express = require("express");
const user = require("./user/user.route");

const app = express();

app.use("/user", user);

app.listen(5000, () => console.log("Server running"));
