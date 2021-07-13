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
      "call AddUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        params.image,
        params.filename,
      ],
      callback
    );
  },
  getUsers: function (params, callback) {
    executeQuery(
      "select d.user_id, d.firstname, d.gender_id, d.dob, d.blood_group, l.mobile, l.date_created, l.email, i.image, i.filename from user_map as m inner join user_details as d on m.user_child_id = d.user_id inner join user_login as l on m.user_child_id = l.user_id inner join user_image as i on m.user_child_id = i.user_id where m.user_parent_id = ?",
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
  getDoctors: function (params, callback) {
    executeQuery(
      "select d.experience, d.firstname, d.user_id from user as u inner join user_details as d on u.user_id = d.user_id where u.user_id in (?) and u.user_type_id = 7",
      [params.idList],
      callback
    );
  },
  getAllDoctors: function (params, callback) {
    executeQuery(
      "select d.experience, d.firstname, d.user_id from user as u inner join user_details as d on u.user_id = d.user_id where u.user_type_id = 7",
      callback
    );
  },
  getUsersByIds: function (params, callback) {
    executeQuery(
      "select user_id, firstname, gender_id, dob from user_details where user_id in (?)",
      [params.user_ids],
      callback
    );
  },
};

module.exports = user;
