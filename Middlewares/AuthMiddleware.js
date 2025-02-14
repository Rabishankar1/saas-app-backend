const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false });
    } else {
      const user = await User.findById(data.id);
      req.user = {
        id: data.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        subscriptionPlan: user.subscriptionPlan,
      };
      if (user) {
        req.user = user;
        // res.json({ status: true, user: user.username });
        next();
      } else {
        return res.status(401).json({ status: false });
      }
    }
  });
};
