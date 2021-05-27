const Model = require("./user.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const getRand = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

exports.addUser = async (req, res) => {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const { name, email, mobile, doctor_id, gender, dob, blood_group, image } =
    req.query;
  const rand = Math.random();
  const shashum = crypto.createHash("sha1");
  const salt = shashum.update(rand.toString()).digest("hex").substr(0, 9);
  const password = await bcrypt.hash(salt, 10);
  const doctorId = doctor_id;
  const filename = getRand().toString() + image;
  Model.addUser(
    {
      doctorId,
      date,
      email,
      name,
      password,
      salt,
      mobile,
      gender,
      blood_group,
      dob,
      image,
      filename,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      } else {
        return res.json({ message: "success" });
      }
    }
  );
};

exports.getUsers = async (req, res) => {
  const { doctor_id } = req.params;
  Model.getUsers({ doctor_id }, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    } else {
      data = data.map((el) => ({
        ...el,
        mobile: "*******" + el.mobile.slice(7, 10),
      }));
      return res.json(data);
    }
  });
};
