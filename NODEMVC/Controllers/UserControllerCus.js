var path=require("path");
var cloudinary=require("cloudinary");
 var CustProfColRef=require("../models/model_userCus")


//  cloudinary.config({ 
//             cloud_name: 'dgjpoywhd', 
//             api_key: '645664418842857', 
//             api_secret: 'AWkuP6-EnQ9dD6yFEV1WQQhJc04' // Click 'View API Keys' above to copy your API secret
//         });
   cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


        
 async  function doCustomerSignup(req,resp)
 {

 
    let fileName="nopic.jpg";

    // if(req.files!=null)
    // {
    //  //fileName=req.files.profilepic.name;
    //  fileName = req.files.profilepic.name.replace(/[^a-zA-Z0-9.]/g, "_");
    // let uploadsFolderPath=path.join(__dirname,"..","uploads",fileName);
    // req.files.profilepic.mv(uploadsFolderPath);
    // //****************Sending to cloudinary server******************* */
    //     //await cloudinary.uploader.upload(uploadsFolderPath).then(function(picUrlResult){
    //     await cloudinary.uploader.upload(req.files.profilepic.tempFilePath).then(function(picUrlResult){
    //         var fileNameUrlOnServer=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
    //        // console.log(fileNameUrlOnServer);
    //         fileName=fileNameUrlOnServer;
    //   }
    if (req.files != null) {

  fileName = req.files.profilepic.name.replace(/[^a-zA-Z0-9.]/g, "_");

  let uploadsFolderPath = path.join(__dirname, "..", "uploads", fileName);

  // WAIT for file to save properly
  await req.files.profilepic.mv(uploadsFolderPath);

  // Upload to Cloudinary
  const picUrlResult = await cloudinary.uploader.upload(uploadsFolderPath);

  fileName = picUrlResult.secure_url;
}

    
    }

    
    req.body.picurl=fileName;

    let objCustProfColRef=new CustProfColRef(req.body);
    objCustProfColRef.save().then((doc)=>{
        console.log(doc)
        resp.status(200).json({status:true,msg:"record saved",doc:doc})

    }).catch((err)=>{
        resp.status(200).json({status:false,msg:err.message})
    })
   

    



     async function doCustomerUpdate(req,resp)
    {
        let fileName="nopic.jpg";
    if(req.files!=null)
    {
     fileName=req.files.profilepic.name;
    let uploadsFolderPath=path.join(__dirname,"..","uploads",fileName);
    req.files.profilepic.mv(uploadsFolderPath);
    //****************Sending to cloudinary server******************* */
        await cloudinary.uploader.upload(uploadsFolderPath).then(function(picUrlResult){
            var fileNameUrlOnServer=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
           // console.log(fileNameUrlOnServer);
            fileName=fileNameUrlOnServer;
              req.body.picurl=fileName;
            
      });
      console.log("File uploaded successfully");

  }
   await CustProfColRef.findOneAndUpdate({emailid:req.body.emailid},{$set:req.body}).then((doc)=>
 {
     resp.status(200).json({status:true,msg:"Record updated",doc:doc})
    
  }).catch((err)=>
 {
   resp.status(200).json({status:false,msg:err.message});

 })

    }




    
 async function doCustomerFind(req,resp)
{
    await CustProfColRef.findOne({emailid:req.body.emailid}).then((doc)=>
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

 
 module.exports={doCustomerSignup,doCustomerUpdate,doCustomerFind}