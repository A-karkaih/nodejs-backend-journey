/** @type {import('mongoose').Model} */
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//Register*************************************************************
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    //  Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    //  Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    //  Check if user exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this username or email",
      });
    }

    //  Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    //  Save (save() itself throws on error)
    await newUser.save();

    //  Return response (without password!)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};

//Login*************************************************************
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //  Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    //  Check if user exists
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //comapring password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfuly",
      accessToken,
      user: {
        id: user._id,
        username: user.username.toLowerCase(),
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

//exporting functions
module.exports = { registerUser, loginUser };
