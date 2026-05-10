let mongoose = require("mongoose");

let collDesign = {

    emailid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    name: String,
    contact: Number,
    address: String,
    city: String,

    aadharno: Number,

    // IMAGES
    profilePic: String,

    // FRONT
    aadharCard: String,

    // BACK
    aadharBack: String,

    // PROFESSIONAL
    category: String,
    speciality: String,
    social: String,
    since: String,
    worktype: String,
    shopadr: String,
    shopcity: String,
    otherinfo: String,
};

var ver = {
    versionKey: false,
};

let SchemaClass = mongoose.Schema;

let collectionObj = new SchemaClass(collDesign, ver);

let TailProfColRef = mongoose.model(
    "Tailorprofiles",
    collectionObj
);

module.exports = TailProfColRef;


























// let mongoose=require("mongoose");
// let collDesign={
  
//      emailid: {type:String,required:true,index:true,unique:true},
//       name: String,
//       contact:Number,
//       address:String,
//       city: String,
//       aadharno:Number,
//       profilePic:String,
//       aadharCard:String,
//        category:String,
//       speciality:String,
//       social:String,
//       since:String,
//       worktype:String,
//       shopadr: String,
//       shopcity: String,
//       otherinfo:String,
//     }
 
// var ver={versionkey:false,};
// let SchemaClass=mongoose.Schema;
// let collectionObj=new SchemaClass(collDesign,ver);
// let TailProfColRef=mongoose.model("Tailorprofiles",collectionObj);
// module.exports=TailProfColRef