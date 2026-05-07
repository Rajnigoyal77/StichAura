var path=require("path");
const nodemailer = require("nodemailer");
var jwt=require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;//for cloudnary add


 cloudinary.config({ 
            cloud_name: 'dgjpoywhd', 
            api_key: '645664418842857', 
            api_secret: 'AWkuP6-EnQ9dD6yFEV1WQQhJc04' // Click 'View API Keys' above to copy your API secret
        });
var UserColRef=require("../models/model_user");///export model



/////////////////thenconnect to mongo****************
/////////////////Signup ??????????????????????
  async function doSignup(req,res)
{
 try{

    let otp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", otp);

    // 👉 req.body me OTP add karo
    req.body.otp = otp;
    req.body.isVerified = false;

    let objUserColRef = new UserColRef(req.body);

    // 👉 Ab OTP ke saath save hoga
    let doc = await objUserColRef.save();

    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"goyaljanvi77196@gmail.com",
            pass:"laavjabmmpfbxyyb"
        }
    });
let mailOptions = {
    from: "goyaljanvi77196@gmail.com",
    to: req.body.emailid,
    subject: "Signup Successful",
    
    text: `Hello User,
    
 Congrats! You have successfully signed up as ${req.body.usertype}.

Welcome to StichAura ✨`
};

    await transporter.sendMail(mailOptions);

     let jtoken = jwt.sign(
        { emailid: req.body.emailid },
        process.env.SEC_KEY,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        status:true,
        msg:"Record saved & OTP sent",
        doc:doc,
        token:jtoken   // 🔥 SEND TOKEN
    });  

 }
 catch(err){
    console.log("ERROR =>", err); 
    res.status(500).json({
        status:false,
        msg:err.message
    });
 }
}

         
//***************Login*************************** */
async function doLogin(req, resp) {
  try {
    console.log("LOGIN HIT");
    console.log("DATA:", req.body);

    // ✅ sanitize input
    let email = req.body.emailid?.toLowerCase().trim();
    let pass = req.body.password?.trim();

    // ✅ validation
    if (!email || !pass) {
      return resp.json({
        status: false,
        msg: "Email and Password are required"
      });
    }

    // ✅ find user
    let user = await UserColRef.findOne({ emailid: email });

    console.log("USER FROM DB:", user);

    // ❌ user not found
    if (!user) {
      return resp.json({
        status: false,
        msg: "Invalid Email"
      });
    }

    // ❌ wrong password
    if (user.password !== pass) {
      return resp.json({
        status: false,
        msg: "Wrong Password"
      });
    }

    // ✅ LOGIN SUCCESS
    let token = jwt.sign(
      {
        id: user._id,
        emailid: user.emailid,
        role: user.usertype
      },
      process.env.SEC_KEY,
      { expiresIn: "7d" }
    );

   
    return resp.json({
  status: true,
  msg: "Login Successful ✅",

  token: token,

  user: {
    _id: user._id,
    emailid: user.emailid,
    usertype: user.usertype
  }
});

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    return resp.status(500).json({
      status: false,
      msg: "Server Error",
      error: err.message
    });
  }
}


module.exports={doSignup,doLogin}