const connection = require("../config/db");

function executeQuery(query, params, callback) {
  // Use the connection
  connection.query(query, params, function (error, results, fields) {
    // And done with the connection.
    // Handle error after the release.
    if (error) {
      console.log(error);
      callback(true, {});
    } else callback(false, results);
    // Don't use the connection here, it has been returned to the pool.
  });
}

let user = {
  addUser: function (params, callback) {
    executeQuery(
      "call AddUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        params.doctorId,
        params.date,
        params.email,
        params.name,
        params.password,
        params.salt,
        params.mobile,
        params.gender,
        params.blood_group,
        params.dob,
      ],
      callback
    );
  },
  getUsers: function (params, callback) {
    executeQuery(
      "select d.user_id, d.firstname, d.gender_id, d.dob, d.blood_group, l.email, l.mobile, l.date_created from user_map as m inner join user_details as d on m.user_child_id = d.user_id inner join user_login as l on m.user_child_id = l.user_id where m.user_parent_id = ?",
      [params.doctor_id],
      callback
    );
  },
  getByEmail: function (params, callback) {
    executeQuery(
      "select * from user_login where email=?",
      [params.email],
      callback
    );
  },
  getByMobile: function (params, callback) {
    executeQuery(
      "select * from user_login where mobile=?",
      [params.mobile],
      callback
    );
  },
};

module.exports = user;
