const express = require("express");

const router = express.Router();

const authControllers = require("../controller/auth-controller");

const { signupSchema } = require("../validator/auth-validator");
const { loginSchema } = require("../validator/auth-validator");
const validate = require("../middleware/validate-middleware");

const authMiddleware = require("../middleware/auth-middleware");

router.post("/register", validate(signupSchema), authControllers.register);

router.post("/login", validate(loginSchema), authControllers.login);

router.post("/update", authControllers.updatePassword);

router.get("/user", authMiddleware, authControllers.user);
module.exports = router;
