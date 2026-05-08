require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

// ROUTERS
const userRouter = require("./routers/UserRouter");
const userRouterCus = require("./routers/UserRouterCus");
const UserRouterTail = require("./routers/UserRouterTail");
const UserRouterReviews = require("./routers/UserRouterReviews");

// DB
const { connectAtlasDB } = require("./config/dbatlas");
connectAtlasDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// CORS (ONLY ONCE)

    app.use(cors({
  origin: "https://stich-aura-1vwa.vercel.app",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
 

// ROUTES
app.use("/user", userRouter);
app.use("/customer", userRouterCus);
app.use("/tailor", UserRouterTail);
app.use("/review", UserRouterReviews);

// TEST
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Running 🚀"
  });
});

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

module.exports = app;