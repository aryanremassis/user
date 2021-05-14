const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "p@SSword123",
  database: "user",
  multipleStatements: true,
});

module.exports = connection;
