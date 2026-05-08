var jwt = require("jsonwebtoken");


function validateToken2(req, resp, next) {

    if (req.method === "OPTIONS") {
        return next();
    }

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return resp.status(401).json({
            status: false,
            msg: "No token provided"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return resp.status(401).json({
            status: false,
            msg: "Invalid token format"
        });
    }

    const token = parts[1];

    try {
        const data = jwt.verify(token, process.env.SEC_KEY);

        req.user = data;
        next();

    } catch (err) {
        return resp.status(401).json({
            status: false,
            msg: "Token invalid or expired",
            error: err.message
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