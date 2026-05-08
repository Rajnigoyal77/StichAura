var cloudinary = require("cloudinary");

var TailProfColRef = require("../models/model_userTail");
var { genAi } = require("../config/genai");

cloudinary.config({
    cloud_name: 'dgjpoywhd',
    api_key: '645664418842857',
    api_secret: 'AWkuP6-EnQ9dD6yFEV1WQQhJc04'
});

///////////////////// SIGNUP /////////////////////
async function doTailorSignup(req, resp) {

    try {

        console.log("SIGNUP API HIT");

        let profilePic = "nopic.jpg";
        let aadharCard = "nopic.jpg";

        console.log("BODY:", req.body);

        // PROFILE PIC
        if (req.files && req.files.profilePic) {

            console.log("PROFILE PIC FOUND");

            const result = await cloudinary.uploader.upload(
                req.files.profilePic.tempFilePath
            );

            profilePic = result.secure_url;

            console.log("PROFILE PIC URL:", profilePic);
        }

        // AADHAR CARD
        if (req.files && req.files.aadharCard) {

            console.log("AADHAR FOUND");

            const result = await cloudinary.uploader.upload(
                req.files.aadharCard.tempFilePath
            );

            aadharCard = result.secure_url;

            console.log("AADHAR URL:", aadharCard);
        }

        req.body.profilePic = profilePic;
        req.body.aadharCard = aadharCard;

        let obj = new TailProfColRef(req.body);

        await obj.save();

        console.log("PROFILE SAVED");

        return resp.status(200).json({
            status: true,
            msg: "Tailor profile saved ✅",
            doc: obj
        });

    } catch (err) {

        console.log("SIGNUP ERROR:", err);

        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// UPDATE /////////////////////
async function doTailorUpdate(req, resp) {

    try {

        console.log("UPDATE API HIT");

        console.log("BODY:", req.body);

        if (req.files) {

            console.log("FILES FOUND");

            if (req.files.profilePic) {

                console.log("UPDATING PROFILE PIC");

                const result = await cloudinary.uploader.upload(
                    req.files.profilePic.tempFilePath
                );

                req.body.profilePic = result.secure_url;
            }

            if (req.files.aadharCard) {

                console.log("UPDATING AADHAR");

                const result = await cloudinary.uploader.upload(
                    req.files.aadharCard.tempFilePath
                );

                req.body.aadharCard = result.secure_url;
            }
        }

        const doc = await TailProfColRef.findOneAndUpdate(
            { emailid: req.body.emailid },
            { $set: req.body },
            { new: true }
        );

        console.log("UPDATED DOC:", doc);

        return resp.status(200).json({
            status: true,
            msg: "Record updated",
            doc
        });

    } catch (err) {

        console.log("UPDATE ERROR:", err);

        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// FIND /////////////////////
async function doTailorFind(req, resp) {

    try {

        console.log("SEARCH API HIT");

        console.log("SEARCH BODY:", req.body);

        const doc = await TailProfColRef.findOne({
            emailid: req.body.emailid
        });

        console.log("FOUND DOC:", doc);

        if (!doc) {

            return resp.status(404).json({
                status: false,
                msg: "Invalid id"
            });
        }

        return resp.status(200).json({
            status: true,
            msg: "Record found",
            doc
        });

    } catch (err) {

        console.log("SEARCH ERROR:", err);

        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// AADHAR EXTRACT /////////////////////
async function doExtractAadhaar(req, resp) {

    try {

        console.log("AADHAR EXTRACT API HIT");

        if (!req.files || !req.files.aadharCard) {

            console.log("NO FILE");

            return resp.status(400).json({
                status: false,
                msg: "No file uploaded"
            });
        }

        console.log("AADHAR FILE FOUND");

        const result = await cloudinary.uploader.upload(
            req.files.aadharCard.tempFilePath
        );

        console.log("CLOUDINARY URL:", result.secure_url);

        const jsonAdhaarData = await genAi(result.secure_url);

        console.log("GEN AI RESPONSE:", jsonAdhaarData);

        return resp.status(200).json({
            status: true,
            data: jsonAdhaarData
        });

    } catch (err) {

        console.log("AADHAR ERROR:", err);

        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// SPECIALITY /////////////////////
async function doSearchSpeciality(req, resp) {

    try {

        console.log("SPECIALITY API HIT");

        const doc = await TailProfColRef.distinct(
            "speciality",
            {
                category: req.body.category
            }
        );

        return resp.status(200).json({
            status: true,
            speciality: doc
        });

    } catch (err) {

        console.log("SPECIALITY ERROR:", err);

        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// FULL SEARCH /////////////////////
async function doFindFullRecord(req, resp) {

    try {

        console.log("FULL SEARCH API HIT");

        console.log("BODY:", req.body);

        const doc = await TailProfColRef.find({
            shopcity: req.body.shopcity,
            category: req.body.category,
            speciality: req.body.speciality
        });

        console.log("FULL SEARCH RESULT:", doc);

        if (doc.length === 0) {

            return resp.status(404).json({
                status: false,
                msg: "Record doesn't found ❌"
            });
        }

        return resp.status(200).json({
            status: true,
            msg: "Record Found ✅",
            doc
        });

    } catch (err) {

        console.log("FULL SEARCH ERROR:", err);

        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// CITY /////////////////////
async function doSearchCity(req, resp) {

    try {

        console.log("CITY API HIT");

        const cities = await TailProfColRef.distinct(
            "shopcity",
            {
                shopcity: { $ne: "" }
            }
        );

        console.log("CITIES:", cities);

        return resp.status(200).json({
            status: true,
            cities
        });

    } catch (err) {

        console.log("CITY ERROR:", err);

        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

module.exports = {
    doTailorSignup,
    doTailorUpdate,
    doTailorFind,
    doExtractAadhaar,
    doSearchSpeciality,
    doFindFullRecord,
    doSearchCity
};