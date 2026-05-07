var userController=require("../Controllers/UserController");
var app=require("express");
var router=app.Router();

//////////////jsx
// var {valdateToken2}=require("../config/validatetoken");

var {validateToken2}=require("../config/validateToken");

//// signupp function

router.post("/signupaxios",userController.doSignup)
router.post("/loginaxios",userController.doLogin)



//////////////customer/////////////

module.exports=router;

















