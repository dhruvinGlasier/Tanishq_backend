const User = require("../models/user.model");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const createUser = new User({
    userName,
    email,
    password: CryptoJs.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });
  try {
    const newUser = await createUser.save();
    // console.log(newUser);
    res.status(201).json({
      newUser,
      message: "User saved successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      data: {},
      message: error.message,
      success: false,
      error: true,
    });
  }
};

const login = async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(401).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    if (originalPassword !== req.body.password) {
      res.status(401).json({
        message: "Invalid password",
        success: false,
        error: true,
      });
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({
      data: { ...otherDetails, accessToken },
      message: "User logged in successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      data: {},
      message: error.message,
      success: false,
      error: true,
    });
  }
};

module.exports = {
  register,
  login,
};
