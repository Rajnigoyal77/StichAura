require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

// DB
const { connectAtlasDB } = require("./config/dbatlas");
connectAtlasDB();

// 🔥 CORS FIRST
// app.use(cors({
//   origin: "https://stich-aura-1vwa.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // 🔥 IMPORTANT: preflight handle
// app.options("*", cors());

const cors = require("cors");

const corsOptions = {
  origin: "https://stich-aura-1vwa.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// 🔥 MUST for preflight
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://stich-aura-1vwa.vercel.app");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});





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