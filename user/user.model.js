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
  insertUser: function (params, callback) {
    executeQuery(
      'insert into user (user_type_id, date_created, status_id, is_deleted) values (6, ?, "1", "0"); select last_insert_id();',
      [params.date],
      callback
    );
  },
  insertUserDetails: function (params, callback) {
    executeQuery(
      'insert into user_details (user_id, firstname, date_created, date_modified, status_id, is_deleted) values (?, ?, ?, ?, "1", "0")',
      [parseInt(params.userId), params.name, params.date, params.date],
      callback
    );
  },
  insertRoleUser: function (params, callback) {
    executeQuery(
      "insert into role_user (role_id, user_id) values (3, ?)",
      [parseInt(params.userId)],
      callback
    );
  },
  insertUserLogin: function (params, callback) {
    executeQuery(
      'insert into user_login (user_id, email, password, salt, mobile, date_created, date_modified, status_id, is_deleted) values (?, ?, ?, ?, ?, ?, ?, "1", "0")',
      [
        parseInt(params.userId),
        params.email,
        params.password,
        params.salt,
        params.mobile,
        params.date,
        params.date,
      ],
      callback
    );
  },
  insertPatientAvailStatus: function (params, callback) {
    executeQuery(
      'insert into patient_available_status (patient_user_id, status) values (?, "0")',
      [parseInt(params.userId)],
      callback
    );
  },
  insertUserMap: function (params, callback) {
    executeQuery(
      "insert into user_map (user_child_id, user_parent_id, date_created, date_modified) values (?, ?, ?, ?)",
      [
        parseInt(params.userId),
        parseInt(params.doctorId),
        params.date,
        params.date,
      ],
      callback
    );
  },
};

module.exports = user;
