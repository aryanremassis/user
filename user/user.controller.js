const Model = require("./user.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const getYmdhms = () =>
  new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

exports.addUser = async (req, res) => {
  const date = getYmdhms();
  const { name, email, mobile, user_id } = req.query;
  const rand = Math.random();
  const shashum = crypto.createHash("sha1");
  const salt = shashum.update(rand.toString()).digest("hex").substr(0, 9);
  console.log(salt);
  const password = await bcrypt.hash(salt, 10);
  let userId;
  const doctorId = user_id;
  Model.insertUser({ date }, (err, data) => {
    userId = data[1][0]["last_insert_id()"];
    Model.insertUserDetails({ userId, name, date }, (err, data) => {
      if (!err) {
        Model.insertRoleUser({ userId }, (err, data) => {
          if (!err) {
            Model.insertUserMap({ userId, doctorId, date }, (err, data) => {
              if (!err) {
                Model.insertUserLogin(
                  { userId, email, password, mobile, date, salt },
                  (err, data) => {
                    if (!err) {
                      Model.insertPatientAvailStatus(
                        { userId },
                        (err, data) => {
                          if (!err) {
                            res.json({
                              userId,
                              userTypeId: 6,
                              email,
                              userType: "patient",
                              roleId: 3,
                              firstname: name,
                              middlename: "",
                              lastname: "",
                              mobileno: mobile,
                              providerName: "",
                              firstLogin: "1",
                              loginType: "patient",
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  });
};
