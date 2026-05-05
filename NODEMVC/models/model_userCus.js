let mongoose=require("mongoose");
let collDesign={
    emailid:{type:String,required:true,index:true,unique:true},
    
  picurl:String,
  // pic:null|File
  name:String,
  address:String,
  city:String,
  state:String,
  gender:String,
  dos:String,
     
    
}
var ver={versionkey:false,};
let SchemaClass=mongoose.Schema;
let collectionObj=new SchemaClass(collDesign,ver);
let CustProfColRef=mongoose.model("custProfiles",collectionObj);
module.exports=CustProfColRef