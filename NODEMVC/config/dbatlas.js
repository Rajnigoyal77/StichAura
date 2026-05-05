require('dotenv').config();
const mongoose = require("mongoose");

const connectAtlasDB = async () => {
    try {
        console.log("URI =>", process.env.MONGO_URI);  // 🧪 test
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Atlas Connected ✅");
    }
    catch(err){
        console.log("Atlas Connection Error ❌", err);
    }
}

module.exports = { connectAtlasDB }