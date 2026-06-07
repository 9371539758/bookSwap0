const express = require("express");
const authRouter = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {register, login, getme, logout} = require('../controllers/user.controller');

// auth router 
authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/getme",verifyToken,getme);
authRouter.post("/logout",logout);
module.exports = authRouter;