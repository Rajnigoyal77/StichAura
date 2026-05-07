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
async function doSignup(req, res) {
  try {
    console.log("BODY =>", req.body);

    const email = req.body.emailid?.toLowerCase().trim();
    const pass = req.body.password?.trim();
    const usertype = req.body.usertype;

    if (!email || !pass || !usertype) {
      return res.status(400).json({
        status: false,
        msg: "All fields required"
      });
    }

    const existingUser = await UserColRef.findOne({ emailid: email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        msg: "User already exists"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newUser = new UserColRef({
      emailid: email,
      password: pass,
      usertype,
      otp,
      isVerified: false
    });

    const doc = await newUser.save();

    // ⚠️ email NOT blocking signup (important fix)
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Signup Successful",
        text: `Welcome to StitchAura ✨`
      });

    } catch (mailErr) {
      console.log("MAIL ERROR (ignored):", mailErr.message);
    }

    const token = jwt.sign(
      { emailid: email },
      process.env.SEC_KEY || "default_secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: true,
      msg: "Signup Successful",
      doc,
      token
    });

  } catch (err) {
    console.log("SIGNUP ERROR =>", err);

    return res.status(500).json({
      status: false,
      msg: err.message
    });
  }
}    
//async function doLogin(req, res) {
  try {
    console.log("LOGIN HIT", req.body);

    const email = req.body.emailid?.toLowerCase().trim();
    const pass = req.body.password?.trim();

    if (!email || !pass) {
      return res.status(400).json({
        status: false,
        msg: "Email & Password required"
      });
    }

    const user = await UserColRef.findOne({ emailid: email });

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User not found"
      });
    }

    if (user.password !== pass) {
      return res.status(401).json({
        status: false,
        msg: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        emailid: user.emailid,
        role: user.usertype
      },
      process.env.SEC_KEY || "default_secret",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: true,
      msg: "Login Successful",
      token,
      user
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    return res.status(500).json({
      status: false,
      msg: err.message
    });
  }



module.exports={doSignup,doLogin}