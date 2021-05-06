const { Router } = require("express");
const validate = require("../validate");
const router = Router();

router.post(
  "/addPatient",
  validate.addPatientRules(),
  validate.validate,
  (req, res) => res.send("success")
);

module.exports = router;
