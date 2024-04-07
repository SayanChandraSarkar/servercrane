const express = require("express");
const router = express.Router();

const adminLogin = require("../controller/admin-controller");

router.post("/adminLogin", adminLogin);

module.exports = router;
