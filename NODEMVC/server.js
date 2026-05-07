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

// ✅ middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileuploader());

// ✅ CORS FIX (important)
app.use(cors({
  origin: "https://stich-aura-1vwa.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors());

// ❌ REMOVE THIS (it is invalid and will crash)
// api.post("/user/login", data);

// ✅ routes
app.use("/user", userRouter);
app.use("/customer", userRouterCus);
app.use("/tailor", UserRouterTail);
app.use("/review", UserRouterReviews);

// test route
app.get("/", (req, res) => {
  res.send("Backend Successful 🚀");
});

module.exports = app;