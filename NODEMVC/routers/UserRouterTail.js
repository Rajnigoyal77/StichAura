


var express = require("express");
var router = express.Router();

var userController = require("../Controllers/UserControllerTail");
var { validateToken2 } = require("../config/validateToken");


// PUBLIC
router.post("/getcities", userController.doSearchCity);
router.post("/getspeciality", userController.doSearchSpeciality);

 router.post("/tailorfullrecord",userController.doFindFullRecord);


// protected
router.post("/tailorprofilesignup", validateToken2, userController.doTailorSignup);
router.post("/tailorprofileupdate", validateToken2, userController.doTailorUpdate);
router.post("/tailorprofilesearch", validateToken2, userController.doTailorFind);
router.post("/extractaadhaar", validateToken2, userController.doExtractAadhaar);
console.log("TAILOR ROUTE UPDATED");

module.exports = router;