var express = require("express");
var fileuploader = require("express-fileupload");
require("dotenv").config();

var userRouter = require("./routers/UserRouter");
var userRouterCus = require("./routers/UserRouterCus");
const UserRouterTail = require("./routers/UserRouterTail");
const UserRouterReviews = require("./routers/UserRouterReviews");

const {connectAtlasDB} = require("./config/dbatlas");

connectAtlasDB();

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var cors = require("cors");
// app.use(cors());   // ✅ keep only this
var cors = require("cors");
// app.use(cors({
//   origin: "*"
//   
// }));



//const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));
app.use(fileuploader());

app.use("/user", userRouter);
app.use("/customer", userRouterCus);
app.use("/tailor", UserRouterTail);
app.use("/review", UserRouterReviews);
//app.use("/tailor", UserRouterFind);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

module.exports = app;





























// var express = require("express");
// var fileuploader = require("express-fileupload");
// require("dotenv").config();

// var userRouter = require("./routers/UserRouter");
// var userRouterCus = require("./routers/UserRouterCus");  // ✅ alag variable name

// const UserRouterTail = require("./routers/UserRouterTail");
// const UserRouterReviews = require("./routers/UserRouterReviews");
// // const { connectoMongoDB } = require("./config/dbconnect");
// const {connectAtlasDB} = require("./config/dbatlas");
// connectAtlasDB();

// var app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());   // ✅ important for axios JSON

// var cors = require("cors");

// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST"],
//   credentials: true
// }));

// app.use(fileuploader());
// app.use(cors());

// //connectoMongoDB();

// app.use("/user", userRouter);
// app.use("/customer", userRouterCus);  // ✅ correct variable

// app.use("/tailor", UserRouterTail);
// app.use("/review", UserRouterReviews);

// app.listen(2007, () => {
//   console.log("Server Started on :" + 2007);
// });
