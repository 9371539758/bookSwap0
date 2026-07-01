const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const redis = require("../config/cache");
const register = async (req, res) => {
  try {
    const { username, fullName, email, password, phone, location } = req.body;

    // Validate input
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({
        message: "username, full name, email, and password are required",
      });
    }

    console.log("Register attempt with email:", email, "username:", username);

    const userAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userAlreadyExist) {
      return res.status(400).json({
        message: "username or email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: username.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
      password: hashedPassword,
      phone: phone?.trim(),
      location: location?.trim(),
    });

    if (!user || !user._id) {
      throw new Error("Failed to save user to database");
    }

    console.log(
      "User registered successfully:",
      user.username,
      "ID:",
      user._id,
    );

    res.status(201).json({
      message: "user created successfully",
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `${field} already exists`,
      });
    }

    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};
// login controller
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validate input
    if (!identifier || !password) {
      return res.status(400).json({
        message: "identifier and password are required",
      });
    }

    console.log("Login attempt with identifier:", identifier);

    const user = await userModel
      .findOne({
        $or: [{ username: identifier }, { email: identifier }],
      })
      .select("+password");

    if (!user) {
      console.log("User not found for identifier:", identifier);
      return res.status(400).json({
        message: "invalid user or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password for user:", identifier);
      return res.status(400).json({
        message: "invalid user or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        user: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "login successfully",
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
        token: token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
const getme = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("username fullName email phone location");
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// logout controller
const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    res.clearCookie("token");

    await redis.set(token, Date.now().toString());

    res.status(200).json({
      message: "logged out successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {
  register,
  login,
  getme,
  logout,
};
