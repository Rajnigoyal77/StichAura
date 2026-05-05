var ReviewColRef = require("../models/model_userreview");
var TailProfColRef = require("../models/model_userTail");

// 🔐 SAVE REVIEW
function doSaveReview(req, resp)
{
    try {

        if (!req.user) {
            return resp.status(401).json({
                status: false,
                msg: "Unauthorized"
            });
        }

        let obj = new ReviewColRef({
            contact: req.body.contact,
            name: req.body.name,
            rating: req.body.rating,
            review: req.body.review,

            userId: req.user._id,
            userEmail: req.user.email
        });

        obj.save()
        .then((doc) => {
            resp.status(200).json({
                status: true,
                msg: "Review Saved",
                doc: doc
            });
        })
        .catch((err) => {
            console.log("SAVE ERROR:", err);

            resp.status(500).json({
                status: false,
                msg: err.message
            });
        });

    } catch (err) {
        console.log("SERVER CRASH:", err);

        resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

// 🔓 SEARCH TAILOR
async function doSearchTailor(req, resp)
{
    let doc = await TailProfColRef.findOne({ contact: req.body.contact });

    if (doc)
        resp.status(200).json({ status: true, name: doc.name });
    else
        resp.status(200).json({ status: false });
}

module.exports = { doSaveReview, doSearchTailor };