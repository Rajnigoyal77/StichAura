// var express = require("express");
// var router = express.Router();
// var userController = require("../Controllers/UserControllerReviews");

// // Use the functions from your controller
// router.post("/tailorreview", userController.doSaveReview);
// router.post("/tailornamesearch", userController.doSearchTailor);   // <-- fix here


// module.exports = router;


var express = require("express");
var router = express.Router();

var userController = require("../Controllers/UserControllerReviews");
var { validateToken2 } = require("../config/validatetoken");

// 🔐 PROTECTED ROUTE (JWT REQUIRED)
router.post(
  "/tailorreview",
  validateToken2,
  userController.doSaveReview
);

// PUBLIC ROUTE
router.post("/tailornamesearch", userController.doSearchTailor);

module.exports = router;