require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

// DB
const { connectAtlasDB } = require("./config/dbatlas");
connectAtlasDB();

// 🔥 CORS FIRST
app.use(cors({
  origin: "https://stich-aura-1vwa.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 🔥 IMPORTANT: preflight handle
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// ROUTERS
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