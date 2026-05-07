require("dotenv").config();
const express = require("express");
const fileuploader = require("express-fileupload");
const cors = require("cors");

const userRouter = require("./routers/UserRouter");
const userRouterCus = require("./routers/UserRouterCus");
const UserRouterTail = require("./routers/UserRouterTail");
const UserRouterReviews = require("./routers/UserRouterReviews");

const { connectAtlasDB } = require("./config/dbatlas");

connectAtlasDB();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileuploader());

// ---------------- CORS FIX ----------------
app.use(
  cors({
    origin: [
      "https://stich-aura-1vwa.vercel.app",
      "https://stich-aura.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// 🔥 IMPORTANT FIX (NO "*")
app.options("*", cors());

// ---------------- ROUTES ----------------
app.use("/user", userRouter);
app.use("/customer", userRouterCus);
app.use("/tailor", UserRouterTail);
app.use("/review", UserRouterReviews);

// ---------------- TEST ----------------
app.get("/", (req, res) => {
  res.json({ message: "Backend Working 🚀" });
});

module.exports = app;