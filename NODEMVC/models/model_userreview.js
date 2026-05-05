var mongoose=require("mongoose");

let colDesign={
    contact:{type:Number, required:true},   // ✅ now required
    name:{type:String},
    rating:{type:Number},
    review:{type:String}
}

var ver = {
  versionKey: false
};

let ScheemaClass=mongoose.Schema;
let collectionObj=new ScheemaClass(colDesign,ver);
let ReviewColRef=mongoose.model("UsersCollectionreviews",collectionObj);

module.exports=ReviewColRef;