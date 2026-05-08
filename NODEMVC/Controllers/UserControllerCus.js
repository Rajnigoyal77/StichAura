var path = require("path");
var cloudinary = require("cloudinary").v2;
var CustProfColRef = require("../models/model_userCus");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


// ================= SIGNUP =================
async function doCustomerSignup(req, resp) {
  try {
    let fileUrl = "nopic.jpg";

    // If file exists
    if (req.files && req.files.profilepic) {

      const file = req.files.profilepic;

      // upload directly from temp file buffer (NO uploads folder)
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "customer_profiles",
      });

      fileUrl = result.secure_url;
    }

    req.body.picurl = fileUrl;

    let obj = new CustProfColRef(req.body);
    const doc = await obj.save();

    return resp.status(200).json({
      status: true,
      msg: "record saved",
      doc: doc,
    });

  } catch (err) {
    return resp.status(500).json({
      status: false,
      msg: err.message,
    });
  }
}


// ================= UPDATE =================
async function doCustomerUpdate(req, resp) {
  try {
    if (req.files && req.files.profilepic) {

      const file = req.files.profilepic;

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "customer_profiles",
      });

      req.body.picurl = result.secure_url;
    }

    const doc = await CustProfColRef.findOneAndUpdate(
      { emailid: req.body.emailid },
      { $set: req.body },
      { new: true }
    );

    return resp.status(200).json({
      status: true,
      msg: "Record updated",
      doc: doc,
    });

  } catch (err) {
    return resp.status(500).json({
      status: false,
      msg: err.message,
    });
  }
}


// ================= FIND =================
async function doCustomerFind(req, resp) {
  try {
    const doc = await CustProfColRef.findOne({ emailid: req.body.emailid });

    if (!doc) {
      return resp.status(404).json({
        status: false,
        msg: "Invalid id",
      });
    }

    return resp.status(200).json({
      status: true,
      msg: "Record found",
      doc: doc,
    });

  } catch (err) {
    return resp.status(500).json({
      status: false,
      msg: err.message,
    });
  }
}

module.exports = {
  doCustomerSignup,
  doCustomerUpdate,
  doCustomerFind,
};









































































































// var path=require("path");
// var cloudinary=require("cloudinary");
//  var CustProfColRef=require("../models/model_userCus")


// //  cloudinary.config({ 
// //             cloud_name: 'dgjpoywhd', 
// //             api_key: '645664418842857', 
// //             api_secret: 'AWkuP6-EnQ9dD6yFEV1WQQhJc04' // Click 'View API Keys' above to copy your API secret
// //         });
//    cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });


        
//  async  function doCustomerSignup(req,resp)
//  {

 
//     let fileName="nopic.jpg";

//     if(req.files!=null)
//     {
//      //fileName=req.files.profilepic.name;
     
//     let uploadsFolderPath=path.join(__dirname,"..","uploads",fileName);
//     req.files.profilepic.mv(uploadsFolderPath);
//     //****************Sending to cloudinary server******************* */
//         await cloudinary.uploader.upload(uploadsFolderPath).then(function(picUrlResult){
//             var fileNameUrlOnServer=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
//            // console.log(fileNameUrlOnServer);
//             fileName=fileNameUrlOnServer;
//       });
    
//     }
    
//     req.body.picurl=fileName;

//     let objCustProfColRef=new CustProfColRef(req.body);
//     objCustProfColRef.save().then((doc)=>{
//         console.log(doc)
//         resp.status(200).json({status:true,msg:"record saved",doc:doc})

//     }).catch((err)=>{
//         resp.status(200).json({status:false,msg:err.message})
//     })
   

//     }



//      async function doCustomerUpdate(req,resp)
//     {
//         let fileName="nopic.jpg";
//     if(req.files!=null)
//     {
//      fileName=req.files.profilepic.name;
//     let uploadsFolderPath=path.join(__dirname,"..","uploads",fileName);
//     req.files.profilepic.mv(uploadsFolderPath);
//     //****************Sending to cloudinary server******************* */
//         await cloudinary.uploader.upload(uploadsFolderPath).then(function(picUrlResult){
//             var fileNameUrlOnServer=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
//            // console.log(fileNameUrlOnServer);
//             fileName=fileNameUrlOnServer;
//               req.body.picurl=fileName;
            
//       });
//       console.log("File uploaded successfully");

//   }
//    await CustProfColRef.findOneAndUpdate({emailid:req.body.emailid},{$set:req.body}).then((doc)=>
//  {
//      resp.status(200).json({status:true,msg:"Record updated",doc:doc})
    
//   }).catch((err)=>
//  {
//    resp.status(200).json({status:false,msg:err.message});

//  })

//     }




    
//  async function doCustomerFind(req,resp)
// {
//     await CustProfColRef.findOne({emailid:req.body.emailid}).then((doc)=>
// {
//     if(doc!=null)
//     //  resp.status(200).json({status:true,msg:"Record updated ",doc:doc})
//      resp.status(200).json({status:true,msg:"Record found ",doc:doc})
//       else
//          resp.status(200).json({status:false,msg:"Invalid id"})
    

// }).catch((err)=>
// {
//     resp.status(200).json({status:false,msg:err.message});

// })

// }

 
//  module.exports={doCustomerSignup,doCustomerUpdate,doCustomerFind}