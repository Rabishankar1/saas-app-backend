const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const { isEmail } = require("../util/isEmail");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up user" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!(email || username) && !password) {
      return res.status(404).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(404).json({ message: "Incorrect username or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(404).json({ message: "Incorrect password" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    await res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log("Logout triggered");
    res.status(200).json({ message: "User logged out successfully" });
    next()
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};
