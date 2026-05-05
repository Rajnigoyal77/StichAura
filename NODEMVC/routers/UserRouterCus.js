var express = require("express");          // 1️⃣ express ko require karo
var router = express.Router();             // 2️⃣ router banao
var userController = require("../Controllers/UserControllerCus");   // 3️⃣ controller lo

//// signup function

router.post("/customerprofilesignup", userController.doCustomerSignup);
router.post("/customerprofileupdate", userController.doCustomerUpdate);
router.post("/customerprofilesearch", userController.doCustomerFind);


module.exports = router;                   // 4️⃣ export karo
