const { check, validationResult } = require("express-validator");
const Model = require("./user/user.model");

const addPatientRules = () => {
  return [
    check("email").isEmail().withMessage("Please enter a valid E-mail address"),
    check("name").not().isEmpty().withMessage("Name can not be empty"),
    check("dob")
      .isISO8601()
      .withMessage("Please enter a date format as YYYY-MM-DD"),
    check("gender").isInt().withMessage("Please enter a valid gender"),
    check("mobile")
      .not()
      .isEmpty()
      .withMessage("Mobile number can not be empty"),
  ];
};

const checkUnique = (req, res, next) => {
  let errors = [];
  const { email, mobile } = req.query;
  Model.getByEmail({ email }, (err, emailData) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }
    if (emailData.length !== 0) {
      errors.push({ email: "E-mail already exists" });
    }
    Model.getByMobile({ mobile }, (err, mobileData) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }
      if (mobileData.length !== 0) {
        errors.push({ email: "Mobile number already exists" });
      }
      if (errors.length === 0) {
        return next();
      } else {
        return res.status(422).json({ errors });
      }
    });
  });
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  addPatientRules,
  validate,
  checkUnique,
};
