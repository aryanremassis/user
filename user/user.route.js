const { Router } = require("express");
const validate = require("../validate");
const router = Router();
const Controller = require("./user.controller");

router.post(
  "/addPatient",
  validate.addPatientRules(),
  validate.validate,
  (req, res) => res.send("success")
);
router.post("/add", Controller.addUser);

module.exports = router;
