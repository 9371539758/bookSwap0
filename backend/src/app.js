const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bookswap.vercel.app"
  ],
  credentials: true
}));

// all routes
const authRouter = require("./routes/auth.routes"); 
app.use("/api/auth",authRouter);
module.exports = app;