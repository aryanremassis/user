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
      console.log("DATA", data);
      data = data.map((el) => ({
        ...el,
        mobile: "*******" + el.mobile.slice(7, 10),
        email: encryptEmail(el.email),
      }));
      return res.json(data);
    }
  });
};

exports.getDoctors = (req, res) => {
  let idList = JSON.parse(req.params.doctor_ids);
  idList = idList.map((el) => parseInt(el));
  if (idList.length === 0) {
    Model.getAllDoctors({}, (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      } else {
        return res.json({ data });
      }
    });
  } else {
    Model.getDoctors({ idList }, (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      } else {
        return res.json({ data });
      }
    });
  }
};

const encryptEmail = (email) => {
  let emailData = email.split("@");
  let username = "";
  let provider = emailData[1];

  if (emailData[0].length >= 8) {
    const start = emailData[0].slice(0, 2);
    const end = emailData[0].slice(
      emailData[0].length - 3,
      emailData[0].length
    );
    username += start;
    for (let i = 2; i < emailData[0].length - 3; i++) {
      username += "*";
    }
    username += end;
  } else {
    username = emailData[0].slice(0, 2);
    for (let i = 2; i < emailData[0].length; i++) {
      username += "*";
    }
  }
  username += "@" + provider;
  return username;
};
