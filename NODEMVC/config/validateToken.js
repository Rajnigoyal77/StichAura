
var jwt = require("jsonwebtoken");
function validateToken2(req, resp, next) {

    const full_token = req.headers['authorization'];

    console.log("🔥 TOKEN:", full_token);

    if (!full_token) {
        return resp.status(401).json({ status: false, msg: "No token" });
    }

    try {
        const token = full_token.split(" ")[1];

        const data = jwt.verify(token, process.env.SEC_KEY);

        console.log("✅ VALID TOKEN:", data);

        req.user = data;
        next();

    } catch (err) {
        console.log("❌ JWT ERROR:", err.message);

        return resp.status(401).json({
            status: false,
            msg: err.message
        });
    }
}

module.exports = { validateToken2 };











































// var jwt = require("jsonwebtoken");



// function validateToken2(req, resp, next) {
//     const full_token = req.headers['authorization'];

//     if (!full_token) {
//         return resp.json({ status: false, msg: "No token provided" });
//     }

//     if (!full_token.startsWith("Bearer ")) {
//         return resp.json({ status:false, msg:"Invalid Token Format" });
//     }

//     var ary = full_token.split(" ");
//     let actualToken = ary[1];

//     try {
//         let TokenValidObj = jwt.verify(actualToken, process.env.SEC_KEY);

//         req.user = TokenValidObj;   // 🔥 IMPORTANT

//         next();

//     } catch (err) {
//         resp.json({ status: false, msg: err.message });
//     }
// }

// module.exports = { validateToken2 };