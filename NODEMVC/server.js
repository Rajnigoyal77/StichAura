require("dotenv").config();
const express = require("express");
const fileuploader = require("express-fileupload");
const cors = require("cors");

const userRouter = require("./routers/UserRouter");
const userRouterCus = require("./routers/UserRouterCus");
const UserRouterTail = require("./routers/UserRouterTail");
const UserRouterReviews = require("./routers/UserRouterReviews");

const { connectAtlasDB } = require("./config/dbatlas");

// DB connect
connectAtlasDB();

const app = express();

// ---------------- CORS (KEEP FIRST) ----------------
app.use(
  cors({
    origin: "https://stich-aura-1vwa.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// 🔥 THIS IS THE FIX (IMPORTANT)
app.options("*", cors());

// ---------------- MIDDLEWARE ----------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileuploader());

// ---------------- ROUTES ----------------
app.use("/user", userRouter);
app.use("/customer", userRouterCus);
app.use("/tailor", UserRouterTail);
app.use("/review", UserRouterReviews);

// ---------------- TEST ----------------
app.get("/", (req, res) => {
  res.send("Backend Successful 🚀");
});

module.exports = app;