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


const connectDB = require("./config/dbatlas");

connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ONLY THIS FILEUPLOAD
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// CORS
app.use(cors({
    origin: ["https://stich-aura.vercel.app", "https://stich-aura-1vwa.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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

module.exports = app;