// const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI = new GoogleGenerativeAI("AIzaSyDjVp2GX6Kjxn6wQWXa4LBSQLFSGpFAp2I");

// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//--------------------------------------------------------


async function genAi(imgurl)
{
//const myprompt = "Read the text on picture and tell all the information in adhaar card and give output STRICTLY in JSON format {adhaar_number:'', name:'', city:'', address: ''}. Dont give output as string."  
const myprompt = "Read the text on Aadhaar card image and extract ALL details. Give STRICT JSON only in this format: {\"adhaar_number\":\"\",\"name\":\"\",\"address\":\"\",\"city\":\"\"}. Address must be full address. City must be only city name (e.g. Zeropur, India → city = Zeropur). Do not skip any field."; 
    const imageResp = await fetch(imgurl)
        .then((response) => response.arrayBuffer());


    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        myprompt,
    ]);
    console.log("KEY EXISTS => ", !!process.env.GEMINI_API_KEY);
    console.log(result.response.text())

            
            const cleaned = result.response.text().replace(/```json|```/g, '').trim();
            const jsonData = JSON.parse(cleaned);
            console.log(jsonData);


    return jsonData


}


   module.exports={genAi} //sending fx by wrapping in object
