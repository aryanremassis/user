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

router.get("/get/:doctor_id", Controller.getUsers);

module.exports = router;
