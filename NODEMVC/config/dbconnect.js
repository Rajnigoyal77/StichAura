let mongoose=require("mongoose")

function connectoMongoDB()
{

let url="mongodb://localhost:27017/2026jan"
mongoose.connect(url).then(()=>
{


    console.log("Connected to MongoDB")
}).catch((err)=>
{


   console.log(err) 
})
}

module.exports={connectoMongoDB}







