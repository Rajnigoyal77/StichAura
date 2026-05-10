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

// ---------------- SIGNUP ----------------
async function doTailorSignup(req, resp) {
  try {

    console.log("🔥 SIGNUP BODY =>", req.body);
    console.log("FILES =>", req.files);

    let profilePic = "nopic.jpg";
    let aadharCard = "nopic.jpg";
    let aadharBack = "nopic.jpg"; // ✅ NEW

    // PROFILE
    if (req.files?.profilePic?.tempFilePath) {

      const result = await cloudinary.uploader.upload(
        req.files.profilePic.tempFilePath
      );

      profilePic = result.secure_url;
    }

    // AADHAR FRONT
    if (req.files?.aadharCard?.tempFilePath) {

      const result = await cloudinary.uploader.upload(
        req.files.aadharCard.tempFilePath
      );

      aadharCard = result.secure_url;
    }

    // ✅ AADHAR BACK
    if (req.files?.aadharBack?.tempFilePath) {

      const result = await cloudinary.uploader.upload(
        req.files.aadharBack.tempFilePath
      );

      aadharBack = result.secure_url;
    }

    const obj = new TailProfColRef({
      ...req.body,
      profilePic,
      aadharCard,
      aadharBack // ✅ NEW
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

    // PROFILE
    if (req.files?.profilePic?.tempFilePath) {

      const result = await cloudinary.uploader.upload(
        req.files.profilePic.tempFilePath
      );

      updateData.profilePic = result.secure_url;
    }

    // AADHAR FRONT
    if (req.files?.aadharCard?.tempFilePath) {

      const result = await cloudinary.uploader.upload(
        req.files.aadharCard.tempFilePath
      );

      updateData.aadharCard = result.secure_url;
    }

    // ✅ AADHAR BACK
    if (req.files?.aadharBack?.tempFilePath) {

      const result = await cloudinary.uploader.upload(
        req.files.aadharBack.tempFilePath
      );

      updateData.aadharBack = result.secure_url;
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

    // FRONT CHECK
    if (!req.files?.aadharCard?.tempFilePath) {
      return resp.status(400).json({
        status: false,
        msg: "Aadhaar front missing"
      });
    }

    // BACK CHECK
    if (!req.files?.aadharBack?.tempFilePath) {
      return resp.status(400).json({
        status: false,
        msg: "Aadhaar back missing"
      });
    }

    // FRONT UPLOAD
    const frontUpload = await cloudinary.uploader.upload(
      req.files.aadharCard.tempFilePath
    );

    // BACK UPLOAD
    const backUpload = await cloudinary.uploader.upload(
      req.files.aadharBack.tempFilePath
    );

    console.log("FRONT =>", frontUpload.secure_url);
    console.log("BACK =>", backUpload.secure_url);

    // AI FRONT
    const frontData = await genAi(frontUpload.secure_url);

    // AI BACK
    const backData = await genAi(backUpload.secure_url);

    // MERGE BOTH
    const finalData = {
      ...frontData,
      ...backData
    };

    return resp.status(200).json({
      status: true,
      data: finalData,
      frontImage: frontUpload.secure_url,
      backImage: backUpload.secure_url
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

    const data = await TailProfColRef.distinct(
      "speciality",
      {
        category: req.body.category
      }
    );

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
































































































































































// const cloudinary = require("cloudinary").v2;

// const TailProfColRef = require("../models/model_userTail");
// const { genAi } = require("../config/genai");

// // ---------------- CLOUDINARY CONFIG ----------------
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// console.log("☁️ Cloudinary Config Loaded");
// console.log(process.env.CLOUD_API_KEY);
// console.log(process.env.CLOUD_API_SECRET);

// // ---------------- SIGNUP ----------------
// async function doTailorSignup(req, resp) {
//   try {
//     console.log("🔥 SIGNUP BODY =>", req.body);
//     console.log("FILES =>", req.files);

//     let profilePic = "nopic.jpg";
//     let aadharCard = "nopic.jpg";

//     if (req.files && req.files.profilePic?.tempFilePath) {
//       const result = await cloudinary.uploader.upload(
//         req.files.profilePic.tempFilePath
//       );
//       profilePic = result.secure_url;
//     }

//     if (req.files && req.files.aadharCard?.tempFilePath) {
//       const result = await cloudinary.uploader.upload(
//         req.files.aadharCard.tempFilePath
//       );
//       aadharCard = result.secure_url;
//     }

//     const obj = new TailProfColRef({
//       ...req.body,
//       profilePic,
//       aadharCard
//     });

//     await obj.save();

//     return resp.status(200).json({
//       status: true,
//       msg: "Saved successfully",
//       doc: obj
//     });

//   } catch (err) {
//     console.log("🔥 SIGNUP ERROR =>", err);
//     return resp.status(500).json({
//       status: false,
//       msg: err.message
//     });
//   }
// }

// // ---------------- UPDATE ----------------
// async function doTailorUpdate(req, resp) {
//   try {
//     console.log("🔥 UPDATE HIT");
//     console.log("BODY =>", req.body);
//     console.log("FILES =>", req.files);

//     if (!req.body.emailid) {
//       return resp.status(400).json({
//         status: false,
//         msg: "emailid required"
//       });
//     }

//     let updateData = { ...req.body };

//     if (req.files?.profilePic?.tempFilePath) {
//       const result = await cloudinary.uploader.upload(
//         req.files.profilePic.tempFilePath
//       );
//       updateData.profilePic = result.secure_url;
//     }

//     if (req.files?.aadharCard?.tempFilePath) {
//       const result = await cloudinary.uploader.upload(
//         req.files.aadharCard.tempFilePath
//       );
//       updateData.aadharCard = result.secure_url;
//     }

//     const doc = await TailProfColRef.findOneAndUpdate(
//       { emailid: req.body.emailid },
//       { $set: updateData },
//       { new: true }
//     );

//     return resp.status(200).json({
//       status: true,
//       msg: "Updated successfully",
//       doc
//     });

//   } catch (err) {
//     console.log("🔥 UPDATE ERROR =>", err);
//     return resp.status(500).json({
//       status: false,
//       msg: err.message
//     });
//   }
// }

// // ---------------- FIND ----------------
// async function doTailorFind(req, resp) {
//   try {
//     console.log("🔍 FIND BODY =>", req.body);

//     if (!req.body.emailid) {
//       return resp.status(400).json({
//         status: false,
//         msg: "emailid required"
//       });
//     }

//     const doc = await TailProfColRef.findOne({
//       emailid: req.body.emailid
//     });

//     if (!doc) {
//       return resp.status(404).json({
//         status: false,
//         msg: "No record found"
//       });
//     }

//     return resp.status(200).json({
//       status: true,
//       doc
//     });

//   } catch (err) {
//     console.log("🔥 FIND ERROR =>", err);
//     return resp.status(500).json({
//       status: false,
//       msg: err.message
//     });
//   }
// }

// // ---------------- AADHAR OCR ----------------
// // async function doExtractAadhaar(req, resp) {
// //   try {
// //     console.log("📄 AADHAR HIT");

// //     if (!req.files?.aadharCard?.tempFilePath) {
// //       return resp.status(400).json({
// //         status: false,
// //         msg: "Aadhaar file missing"
// //       });
// //     }

// //     const result = await cloudinary.uploader.upload(
// //       req.files.aadharCard.tempFilePath
// //     );

// //     const aiResult = await genAi(result.secure_url);

// //     return resp.status(200).json({
// //       status: true,
// //       data: aiResult
// //     });

// //   } catch (err) {
// //     console.log("🔥 AADHAR ERROR =>", err);
// //     return resp.status(500).json({
// //       status: false,
// //       msg: err.message
// //     });
// //   }
// // }
// async function doExtractAadhaar(req, resp) {
//   try {
//     console.log("📄 AADHAR HIT");

//     if (!req.files?.aadharCard?.tempFilePath) {
//       return resp.status(400).json({
//         status: false,
//         msg: "Aadhaar file missing"
//       });
//     }

//     const result = await cloudinary.uploader.upload(
//       req.files.aadharCard.tempFilePath
//     );

//     const aiResult = await genAi(result.secure_url);

//     return resp.status(200).json({
//       status: true,
//       data: aiResult
//     });

//   } catch (err) {
//     console.log("🔥 AADHAR ERROR =>", err);

//     return resp.status(500).json({
//       status: false,
//       msg: err.message
//     });
//   }
// }
// // ---------------- CITY ----------------
// async function doSearchCity(req, resp) {
//   try {
//     const cities = await TailProfColRef.distinct("shopcity");
//     return resp.status(200).json({
//       status: true,
//       cities
//     });
//   } catch (err) {
//     return resp.status(500).json({
//       status: false,
//       msg: err.message
//     });
//   }
// }

// // ---------------- SPECIALITY ----------------
// async function doSearchSpeciality(req, resp) {
//   try {
//     const data = await TailProfColRef.distinct("speciality", {
//       category: req.body.category
//     });

//     return resp.status(200).json({
//       status: true,
//       speciality: data
//     });

//   } catch (err) {
//     return resp.status(500).json({
//       status: false,
//       msg: err.message
//     });
//   }
// }

// // ---------------- FULL SEARCH ----------------
// async function doFindFullRecord(req, resp) {
//   try {
//     const data = await TailProfColRef.find(req.body);

//     if (!data.length) {
//       return resp.status(404).json({
//         status: false,
//         msg: "No record found"
//       });
//     }

//     return resp.status(200).json({
//       status: true,
//       doc: data
//     });

//   } catch (err) {
//     console.log("MAIN SERVER RUNNING");
//     return resp.status(500).json({
//       status: false,
//       msg: err.message
//     });
//   }
// }

// // ---------------- EXPORT ----------------
// module.exports = {
//   doTailorSignup,
//   doTailorUpdate,
//   doTailorFind,
//   doExtractAadhaar,
//   doSearchCity,
//   doSearchSpeciality,
//   doFindFullRecord
// };





































































































































