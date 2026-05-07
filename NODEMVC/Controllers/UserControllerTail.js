var path = require("path");
var cloudinary = require("cloudinary");
const fs = require("fs");

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
        let profilePic = "nopic.jpg";
        let aadharCard = "nopic.jpg";

        // PROFILE PIC
        if (req.files && req.files.profilePic) {
            const fileName = req.files.profilePic.name;
            const uploadPath = path.join(__dirname, "..", "uploads", fileName);

            await req.files.profilePic.mv(uploadPath);

            const result = await cloudinary.uploader.upload(uploadPath);
            profilePic = result.url;

            fs.unlinkSync(uploadPath);
        }

        // AADHAR CARD
        if (req.files && req.files.aadharCard) {
            const fileName = req.files.aadharCard.name;
            const uploadPath = path.join(__dirname, "..", "uploads", fileName);

            await req.files.aadharCard.mv(uploadPath);

            const result = await cloudinary.uploader.upload(uploadPath);
            aadharCard = result.url;

            fs.unlinkSync(uploadPath);
        }

        req.body.profilePic = profilePic;
        req.body.aadharCard = aadharCard;

        let obj = new TailProfColRef(req.body);
        await obj.save();

        return resp.status(200).json({
            status: true,
            msg: "Tailor profile saved ✅",
            doc: obj
        });

    } catch (err) {
        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// UPDATE /////////////////////
async function doTailorUpdate(req, resp) {
    try {
        if (req.files) {

            if (req.files.profilePic) {
                const fileName = req.files.profilePic.name;
                const uploadPath = path.join(__dirname, "..", "uploads", fileName);

                await req.files.profilePic.mv(uploadPath);

                const result = await cloudinary.uploader.upload(uploadPath);
                req.body.profilePic = result.url;

                fs.unlinkSync(uploadPath);
            }

            if (req.files.aadharCard) {
                const fileName = req.files.aadharCard.name;
                const uploadPath = path.join(__dirname, "..", "uploads", fileName);

                await req.files.aadharCard.mv(uploadPath);

                const result = await cloudinary.uploader.upload(uploadPath);
                req.body.aadharCard = result.url;

                fs.unlinkSync(uploadPath);
            }
        }

        const doc = await TailProfColRef.findOneAndUpdate(
            { emailid: req.body.emailid },
            { $set: req.body },
            { new: true }
        );

        return resp.status(200).json({
            status: true,
            msg: "Record updated",
            doc
        });

    } catch (err) {
        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// FIND /////////////////////
async function doTailorFind(req, resp) {
    try {
        const doc = await TailProfColRef.findOne({ emailid: req.body.emailid });

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
        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// AADHAR EXTRACT /////////////////////
async function doExtractAadhaar(req, resp) {
    try {
        if (!req.files || !req.files.aadharCard) {
            return resp.status(400).json({
                status: false,
                msg: "No file uploaded"
            });
        }

        const file = req.files.aadharCard;
        const fileName = file.name;
        const uploadPath = path.join(__dirname, "..", "uploads", fileName);

        await file.mv(uploadPath);

        const result = await cloudinary.uploader.upload(uploadPath);

        fs.unlinkSync(uploadPath);

        const jsonAdhaarData = await genAi(result.url);

        return resp.status(200).json({
            status: true,
            data: jsonAdhaarData
        });

    } catch (err) {
        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// SPECIALITY /////////////////////
async function doSearchSpeciality(req, resp) {
    try {
        const doc = await TailProfColRef.distinct("speciality", {
            category: req.body.category
        });

        return resp.status(200).json({
            status: true,
            speciality: doc
        });

    } catch (err) {
        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// FULL SEARCH /////////////////////
async function doFindFullRecord(req, resp) {
    try {
        const doc = await TailProfColRef.find({
            shopcity: req.body.shopcity,
            category: req.body.category,
            speciality: req.body.speciality
        });

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
        return resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

///////////////////// CITY /////////////////////
async function doSearchCity(req, resp) {
    try {
        const cities = await TailProfColRef.distinct("shopcity", {
            shopcity: { $ne: "" }
        });

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

module.exports = {
    doTailorSignup,
    doTailorUpdate,
    doTailorFind,
    doExtractAadhaar,
    doSearchSpeciality,
    doFindFullRecord,
    doSearchCity
};