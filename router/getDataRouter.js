const express = require("express");
const router = express.Router();
const { quotationData } = require("../controller/contact-controller");
const { getContactData } = require("../controller/contact-controller");
const { technicalPdf } = require("../controller/contact-controller");
const { quotationPdf } = require("../controller/contact-controller");
const { reqForCallBack } = require("../controller/contact-controller");
const { arrangeMeeting } = require("../controller/contact-controller");
const { passwordResetLink } = require("../controller/contact-controller");

router.get("/quotation/:id", quotationData);
router.post("/technical/pdf", technicalPdf);
router.post("/quotation/pdf", quotationPdf);
router.post("/quotation/callback", reqForCallBack);
router.post("/quotation/arrangemeeting", arrangeMeeting);
router.post("/login/passwordResetLink", passwordResetLink);

router.get("/getData", getContactData);

module.exports = router;
