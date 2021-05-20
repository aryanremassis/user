const { Router } = require("express");
const validate = require("../validate");
const router = Router();
const Controller = require("./user.controller");

router.post(
  "/add",
  validate.addPatientRules(),
  validate.validate,
  validate.checkUnique,
  Controller.addUser
);

module.exports = router;
