

const cloudinary = require("cloudinary").v2;

const TailProfColRef = require("../models/model_userTail");
const { genAi } = require("../config/genai");

// ---------------- CLOUDINARY CONFIG ----------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

console.log("☁️ Cloudinary Config Loaded");
console.log(process.env.CLOUD_API_KEY);
console.log(process.env.CLOUD_API_SECRET);

// ---------------- SIGNUP ----------------
async function doTailorSignup(req, resp) {
  try {
    console.log("🔥 SIGNUP BODY =>", req.body);
    console.log("FILES =>", req.files);

    let profilePic = "nopic.jpg";
    let aadharCard = "nopic.jpg";

    if (req.files && req.files.profilePic?.tempFilePath) {
      const result = await cloudinary.uploader.upload(
        req.files.profilePic.tempFilePath
      );
      profilePic = result.secure_url;
    }

    if (req.files && req.files.aadharCard?.tempFilePath) {
      const result = await cloudinary.uploader.upload(
        req.files.aadharCard.tempFilePath
      );
      aadharCard = result.secure_url;
    }

    const obj = new TailProfColRef({
      ...req.body,
      profilePic,
      aadharCard
    });

    await obj.save();

    return resp.status(200).json({
      status: true,
      msg: "Saved successfully",
      doc: obj
    });

  } catch (err) {
    console.log("🔥 SIGNUP ERROR =>", err);
    return resp.status(500).json({
      status: false,
      msg: err.message
    });
  }
}

// ---------------- UPDATE ----------------
async function doTailorUpdate(req, resp) {
  try {
    console.log("🔥 UPDATE HIT");
    console.log("BODY =>", req.body);
    console.log("FILES =>", req.files);

    if (!req.body.emailid) {
      return resp.status(400).json({
        status: false,
        msg: "emailid required"
      });
    }

    let updateData = { ...req.body };

    if (req.files?.profilePic?.tempFilePath) {
      const result = await cloudinary.uploader.upload(
        req.files.profilePic.tempFilePath
      );
      updateData.profilePic = result.secure_url;
    }

    if (req.files?.aadharCard?.tempFilePath) {
      const result = await cloudinary.uploader.upload(
        req.files.aadharCard.tempFilePath
      );
      updateData.aadharCard = result.secure_url;
    }

    const doc = await TailProfColRef.findOneAndUpdate(
      { emailid: req.body.emailid },
      { $set: updateData },
      { new: true }
    );

    return resp.status(200).json({
      status: true,
      msg: "Updated successfully",
      doc
    });

  } catch (err) {
    console.log("🔥 UPDATE ERROR =>", err);
    return resp.status(500).json({
      status: false,
      msg: err.message
    });
  }
}

// ---------------- FIND ----------------
async function doTailorFind(req, resp) {
  try {
    console.log("🔍 FIND BODY =>", req.body);

    if (!req.body.emailid) {
      return resp.status(400).json({
        status: false,
        msg: "emailid required"
      });
    }

    const doc = await TailProfColRef.findOne({
      emailid: req.body.emailid
    });

    if (!doc) {
      return resp.status(404).json({
        status: false,
        msg: "No record found"
      });
    }

    return resp.status(200).json({
      status: true,
      doc
    });

  } catch (err) {
    console.log("🔥 FIND ERROR =>", err);
    return resp.status(500).json({
      status: false,
      msg: err.message
    });
  }
}

// ---------------- AADHAR OCR ----------------
async function doExtractAadhaar(req, resp) {
  try {
    console.log("📄 AADHAR HIT");

    if (!req.files?.aadharCard?.tempFilePath) {
      return resp.status(400).json({
        status: false,
        msg: "Aadhaar file missing"
      });
    }

    const result = await cloudinary.uploader.upload(
      req.files.aadharCard.tempFilePath
    );

    const aiResult = await genAi(result.secure_url);

    return resp.status(200).json({
      status: true,
      data: aiResult
    });

  } catch (err) {
    console.log("🔥 AADHAR ERROR =>", err);
    return resp.status(500).json({
      status: false,
      msg: err.message
    });
  }
}

// ---------------- CITY ----------------
async function doSearchCity(req, resp) {
  try {
    const cities = await TailProfColRef.distinct("shopcity");
    return resp.status(200).json({
      status: true,
      cities
    });
  } catch (err) {
    return resp.status(500).json({
      status: false,
      msg: err.message
    });
  }
}

// ---------------- SPECIALITY ----------------
async function doSearchSpeciality(req, resp) {
  try {
    const data = await TailProfColRef.distinct("speciality", {
      category: req.body.category
    });

    return resp.status(200).json({
      status: true,
      speciality: data
    });

  } catch (err) {
    return resp.status(500).json({
      status: false,
      msg: err.message
    });
  }
}

// ---------------- FULL SEARCH ----------------
async function doFindFullRecord(req, resp) {
  try {
    const data = await TailProfColRef.find(req.body);

    if (!data.length) {
      return resp.status(404).json({
        status: false,
        msg: "No record found"
      });
    }

    return resp.status(200).json({
      status: true,
      doc: data
    });

  } catch (err) {
    console.log("MAIN SERVER RUNNING");
    return resp.status(500).json({
      status: false,
      msg: err.message
    });
  }
}

// ---------------- EXPORT ----------------
module.exports = {
  doTailorSignup,
  doTailorUpdate,
  doTailorFind,
  doExtractAadhaar,
  doSearchCity,
  doSearchSpeciality,
  doFindFullRecord
};






































































































































// const cloudinary = require("cloudinary");

// var TailProfColRef = require("../models/model_userTail");
// var { genAi } = require("../config/genai");

// cloudinary.config({
//     cloud_name: "dgjpoywhd",
//     api_key: "645664418842857",
//     api_secret: "AWkuP6-EnQ9dD6yFEV1WQQhJc04"
// });

// ///////////////////// SIGNUP /////////////////////
// async function doTailorSignup(req, resp) {

//     try {

//         console.log("BODY => ", req.body);
//         console.log("FILES => ", req.files);

//         let profilePic = "nopic.jpg";
//         let aadharCard = "nopic.jpg";

//         // PROFILE PIC
//         if (req.files && req.files.profilePic) {

//             console.log("Uploading profile pic...");

//             const result = await cloudinary.uploader.upload(
//                 req.files.profilePic.tempFilePath
//             );

//             console.log("PROFILE RESULT => ", result);

//             profilePic = result.secure_url;
//         }

//         // AADHAR CARD
//         if (req.files && req.files.aadharCard) {

//             console.log("Uploading aadhaar...");

//             const result = await cloudinary.uploader.upload(
//                 req.files.aadharCard.tempFilePath
//             );

//             console.log("AADHAR RESULT => ", result);

//             aadharCard = result.secure_url;
//         }

//         req.body.profilePic = profilePic;
//         req.body.aadharCard = aadharCard;

//         const obj = new TailProfColRef(req.body);

//         await obj.save();

//         return resp.status(200).json({
//             status: true,
//             msg: "Tailor profile saved ✅",
//             doc: obj
//         });

//     } catch (err) {

//         console.log("SIGNUP ERROR => ", err);

//         return resp.status(500).json({
//             status: false,
//             msg: err.message,
            
//         });
//     }
// }

// ///////////////////// UPDATE /////////////////////
// async function doTailorUpdate(req, resp) {

//     try {

//         console.log("UPDATE BODY => ", req.body);
//         console.log("UPDATE FILES => ", req.files);

//         if (req.files) {

//             // PROFILE PIC
//             if (req.files.profilePic) {

//                 console.log("Updating profile pic...");

//                 const result = await cloudinary.uploader.upload(
//                     req.files.profilePic.tempFilePath
//                 );

//                 console.log("PROFILE UPDATE RESULT => ", result);

//                 req.body.profilePic = result.secure_url;
//             }

//             // AADHAR CARD
//             if (req.files.aadharCard) {

//                 console.log("Updating aadhaar...");

//                 const result = await cloudinary.uploader.upload(
//                     req.files.aadharCard.tempFilePath
//                 );

//                 console.log("AADHAR UPDATE RESULT => ", result);

//                 req.body.aadharCard = result.secure_url;
//             }
//         }

//         const doc = await TailProfColRef.findOneAndUpdate(
//             { emailid: req.body.emailid },
//             { $set: req.body },
//             { returnDocument: "after" }
//         );

//         return resp.status(200).json({
//             status: true,
//             msg: "Record updated ✅",
//             doc
//         });

//     } catch (err) {

//         console.log("UPDATE ERROR => ", err);

//         return resp.status(500).json({
//             status: false,
//             msg: err.message,
//             error: err
//         });
//     }
// }

// ///////////////////// FIND /////////////////////
// async function doTailorFind(req, resp) {

//     try {

//         console.log("FIND BODY => ", req.body);

//         const doc = await TailProfColRef.findOne({
//             emailid: req.body.emailid
//         });

//         if (!doc) {

//             return resp.status(404).json({
//                 status: false,
//                 msg: "No Record Found ❌"
//             });
//         }

//         return resp.status(200).json({
//             status: true,
//             msg: "Record found ✅",
//             doc
//         });

//     } catch (err) {

//         console.log("FIND ERROR => ", err);

//         return resp.status(500).json({
//             status: false,
//             msg: err.message,
//             error: err
//         });
//     }
// }

// ///////////////////// AADHAR EXTRACT /////////////////////
// async function doExtractAadhaar(req, resp) {

//     try {

//         console.log("AADHAR FILES => ", req.files);
//         console.log("FILES =>", req.files);

//         if (!req.files) {

//             return resp.status(400).json({
//                 status: false,
//                 msg: "req.files missing"
//             });
//         }

//         if (!req.files.aadharCard) {

//             return resp.status(400).json({
//                 status: false,
//                 msg: "aadharCard missing"
//             });
//         }

//         console.log(
//             "TEMP FILE PATH => ",
//             req.files.aadharCard.tempFilePath
//         );
//         console.log("AADHAR FILE => ", req.files.aadharCard);

// console.log(
//     "TEMP FILE PATH => ",
//     req.files.aadharCard.tempFilePath
// );

// if (!req.files.aadharCard.tempFilePath) {

//     return resp.status(400).json({
//         status: false,
//         msg: "tempFilePath missing"
//     });
// }

// const result = await cloudinary.uploader.upload(
//     req.files.aadharCard.tempFilePath
// );

      
//         console.log("CLOUDINARY RESULT => ", result);

//         const jsonAdhaarData = await genAi(result.secure_url);

//         console.log("GEN AI RESULT => ", jsonAdhaarData);

//         return resp.status(200).json({
//             status: true,
//             data: jsonAdhaarData
//         });

//     } catch (err) {

//         console.log("AADHAR ERROR => ", err);

//         return resp.status(500).json({
//             status: false,
//             msg: err.message,
//             error: err
//         });
//     }
// }

// ///////////////////// SPECIALITY /////////////////////
// async function doSearchSpeciality(req, resp) {

//     try {

//         const doc = await TailProfColRef.distinct(
//             "speciality",
//             {
//                 category: req.body.category
//             }
//         );

//         return resp.status(200).json({
//             status: true,
//             speciality: doc
//         });

//     } catch (err) {

//         console.log("SPECIALITY ERROR => ", err);

//         return resp.status(500).json({
//             status: false,
//             msg: err.message,
//             error: err
//         });
//     }
// }

// ///////////////////// FULL SEARCH /////////////////////
// async function doFindFullRecord(req, resp) {

//     try {

//         console.log("FULL SEARCH BODY => ", req.body);

//         const doc = await TailProfColRef.find({
//             shopcity: req.body.shopcity,
//             category: req.body.category,
//             speciality: req.body.speciality
//         });

//         if (doc.length === 0) {

//             return resp.status(404).json({
//                 status: false,
//                 msg: "Record doesn't found ❌"
//             });
//         }

//         return resp.status(200).json({
//             status: true,
//             msg: "Record Found ✅",
//             doc
//         });

//     } catch (err) {

//         console.log("FULL SEARCH ERROR => ", err);

//         return resp.status(500).json({
//             status: false,
//             msg: err.message,
//             error: err
//         });
//     }
// }

// ///////////////////// CITY /////////////////////
// async function doSearchCity(req, resp) {

//     try {

//         const cities = await TailProfColRef.distinct(
//             "shopcity",
//             {
//                 shopcity: { $ne: "" }
//             }
//         );

//         return resp.status(200).json({
//             status: true,
//             cities
//         });

//     } catch (err) {

//         console.log("CITY ERROR => ", err);

//         return resp.status(500).json({
//             status: false,
//             msg: err.message,
//             error: err
//         });
//     }
// }

// module.exports = {
//     doTailorSignup,
//     doTailorUpdate,
//     doTailorFind,
//     doExtractAadhaar,
//     doSearchSpeciality,
//     doFindFullRecord,
//     doSearchCity
// };