const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const validator = require("validator");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Name Validation
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        message:
          "Name must be at least 3 characters",
      });
    }

    // Email Validation
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // Password Validation
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    // Existing User Check
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name: name.trim(),

      email: email.trim(),

      password: hashedPassword,
    });

    // Response
    res.status(201).json({
      message:
        "Registration successful",

      token: generateToken(user),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

exports.login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    // Email Validation
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Password Validation
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Find User
    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    // Password Match
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    // Response
    res.status(200).json({
      message: "Login successful",

      token: generateToken(user),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};