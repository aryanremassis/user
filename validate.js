const { check, validationResult } = require("express-validator");

const addPatientRules = () => {
  return [
    check("email").isEmail().withMessage("Please enter a valid E-mail address"),
    check("name").not().isEmpty().withMessage("Name can not be empty"),
    check("dob")
      .isISO8601()
      .withMessage("Please enter a date format as YYYY-MM-DD"),
    check("gender").isInt().withMessage("Please enter a valid gender"),
    check("phone").not().isEmpty().withMessage("Phone can not be empty"),
  ];
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
};
