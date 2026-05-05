
var mongoose=require("mongoose");

let colDesign={
    emailid:{type: String, required: true, index: true, unique: true},
    password:String,
    usertype:String,
        otp:Number,
         isVerified:Boolean
  
    
}
var ver = {
  versionKey: false, // to avoid __v field in table come by default
};

let ScheemaClass=mongoose.Schema;
let collectionObj=new ScheemaClass(colDesign,ver);
let UserColRef=mongoose.model("UsersCollectionnew",collectionObj);

 module.exports=UserColRef;