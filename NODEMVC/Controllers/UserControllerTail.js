var path=require("path");
// const Tesseract = require("tesseract.js");
var cloudinary=require("cloudinary");
const fs = require("fs");
 var TailProfColRef=require("../models/model_userTail")
 
var {genAi} =require("../config/genai");




 cloudinary.config({ 
            cloud_name: 'dgjpoywhd', 
            api_key: '645664418842857', 
            api_secret: 'AWkuP6-EnQ9dD6yFEV1WQQhJc04' // Click 'View API Keys' above to copy your API secret
        });
/////////////////////signup////////////////////
async function doTailorSignup(req, resp) {
  try {
    // ---- PROFILE PIC ----
    let profilePic = "nopic.jpg";
    if (req.files && req.files.profilePic) {
      const fileName = req.files.profilePic.name;
      const uploadsFolderPath = path.join(__dirname, "..", "uploads", fileName);
      await req.files.profilePic.mv(uploadsFolderPath);

      await cloudinary.uploader.upload(uploadsFolderPath).then((picUrlResult) => {
        profilePic = picUrlResult.url; // Cloudinary URL
        fs.unlinkSync(uploadsFolderPath); // delete local file
      });
    }

    // ---- AADHAR CARD ----
    let aadharCard = "nopic.jpg";
    if (req.files && req.files.aadharCard) {
      const fileName = req.files.aadharCard.name;
      const uploadsFolderPath = path.join(__dirname, "..", "uploads", fileName);
      await req.files.aadharCard.mv(uploadsFolderPath);

      await cloudinary.uploader.upload(uploadsFolderPath).then((picUrlResult) => {
        aadharCard = picUrlResult.url; // Cloudinary URL
        fs.unlinkSync(uploadsFolderPath); // delete local file
      });
    }

    // ---- ADD FILE URLS TO REQ.BODY ----
    req.body.profilePic = profilePic;
    req.body.aadharCard = aadharCard;

    // ---- SAVE TO DB ----
    let objTailProf = new TailProfColRef(req.body);
    objTailProf.save()
      .then((doc) => {
        console.log(doc);
        resp.status(200).json({ status: true, msg: "Tailor profile saved ✅", doc });
      })
      .catch((err) => {
        console.error(err);
        resp.status(500).json({ status: false, msg: err.message });
      });

  } catch (err) {
    console.error(err);
    resp.status(500).json({ status: false, msg: err.message });
  }
}

/////////////finish////////////////////////


////////////update
 async function doTailorUpdate(req,resp)
{
    let profilePic="nopic.jpg";
    let aadharCard="nopic.jpg";

    if(req.files!=null)
    {
        if(req.files.profilePic)
        {
            profilePic=req.files.profilePic.name;
            let uploadsFolderPath=path.join(__dirname,"..","uploads",profilePic);
            req.files.profilePic.mv(uploadsFolderPath);

            await cloudinary.uploader.upload(uploadsFolderPath).then(function(picUrlResult){
                profilePic=picUrlResult.url;
                req.body.profilePic=profilePic;   // 🔥 MAIN FIX
            });
        }

        if(req.files.aadharCard)
        {
            aadharCard=req.files.aadharCard.name;
            let uploadsFolderPath=path.join(__dirname,"..","uploads",aadharCard);
            req.files.aadharCard.mv(uploadsFolderPath);

            await cloudinary.uploader.upload(uploadsFolderPath).then(function(picUrlResult){
                aadharCard=picUrlResult.url;
                req.body.aadharCard=aadharCard;   // 🔥 MAIN FIX
            });
        }
    }

    await TailProfColRef.findOneAndUpdate(
        {emailid:req.body.emailid},
        {$set:req.body}
    ).then((doc)=>
    {
        resp.status(200).json({status:true,msg:"Record updated",doc:doc})
    }).catch((err)=>
    {
        resp.status(200).json({status:false,msg:err.message});
    })
}

///////////////find //////////////////////

 async function doTailorFind(req,resp)
{
    await TailProfColRef.findOne({emailid:req.body.emailid}).then((doc)=>
{
    if(doc!=null)
    //  resp.status(200).json({status:true,msg:"Record updated ",doc:doc})
     resp.status(200).json({status:true,msg:"Record found ",doc:doc})
      else
         resp.status(200).json({status:false,msg:"Invalid id"})
    

}).catch((err)=>
{
    resp.status(200).json({status:false,msg:err.message});

})




}

////////////gen aii 
async function doExtractAadhaar(req, resp)
{
    console.log("#####");

    let fileName = "nopic.jpg";

    if (req.files != null && req.files.aadharCard)
    {
        fileName = req.files.aadharCard.name;

        let uploadsFolderPath = path.join(__dirname, "..", "uploads", fileName);

        await req.files.aadharCard.mv(uploadsFolderPath);

        await cloudinary.uploader.upload(uploadsFolderPath)
        .then(async function(picUrlResult){

            var fileNameUrlOnServer = picUrlResult.url;

            fileName = fileNameUrlOnServer;

            let jsonAdhaarData = await genAi(picUrlResult.url);

            console.log("******************************");
            console.log(jsonAdhaarData);
            console.log("******************************");

            resp.json({
                status: true,
                data: jsonAdhaarData
            });

        });
    }
    else
    {
        return resp.json({ status: false, msg: "No file uploaded" });
    }
}


 //////////finish genai
////////////////////adhar card function 



///////////////FIND TAILOR
async function doSearchSpeciality(req, resp) {
  try {

    let doc = await TailProfColRef.distinct("speciality", {
      category: req.body.category
    });

    resp.status(200).json({
      status: true,
      speciality: doc
    });

  } catch (err) {
    resp.status(500).json({ status: false, msg: err.message });
  }
}
////////////////Full
async function doFindFullRecord(req,resp)
{
    await TailProfColRef.find({
        shopcity:req.body.shopcity,
        category:req.body.category,
        speciality:req.body.speciality
    }).then((doc)=>
    {
        if(doc.length>0)
         resp.status(200).json({status:true, msg:"Record Found✅", doc:doc})
        else
         resp.status(200).json({status:false,msg:"Record doesn't found❌"});
    
    }).catch((err)=>
    {
        resp.status(200).json({status:false,msg:err.message});
    })
}


/////////////////////////////////////////////City?/////////////////////////////////
async function doSearchCity(req,resp)
{
     const cities = await TailProfColRef.distinct("shopcity", { shopCity: { $ne: "" } });
     resp.status(200).json({ status: true, cities:cities });
}





// module.exports = { doTailorSignup,doTailorSearch,doTailorUpdate,doSearchCity,doSearchSpeciality,doFindFullRecord};

    module.exports={doTailorSignup,doTailorUpdate,doTailorFind,doExtractAadhaar,doSearchSpeciality,doFindFullRecord,doSearchCity};        