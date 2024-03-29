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

router.get("/getDoctors/:doctor_ids", Controller.getDoctors);

router.get("/getUsersByIds/:user_ids", Controller.getUsersByIds);

module.exports = router;
