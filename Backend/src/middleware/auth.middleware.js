const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function protectRoute(req, res, next) {
  try {
    // FLAG 1: Check cookie
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        flag: "AUTH_01_NO_COOKIE",
        message: "Token cookie is missing",
      });
    }

    // FLAG 2: Verify JWT
    let info = jwt.verify(token, process.env.JWT_SECRET);

    if (!info) {
      return res.status(401).json({
        flag: "AUTH_02_INVALID_PAYLOAD",
        message: "JWT payload is missing",
      });
    }
    console.log(info);
    // FLAG 3: Find user in database
    let user = await userModel.findById(info.user);

    if (!user) {
      return res.status(401).json({
        flag: "AUTH_03_USER_NOT_FOUND",
        message: "Token is valid but user does not exist",
      });
    }

    // FLAG 4: Authentication successful
    req.user = {
      _id: info.user,
      username: user.username,
      email: user.email,
    };

    return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        flag: "AUTH_05_INVALID_TOKEN",
        message: "JWT signature or format is invalid",
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        flag: "AUTH_06_TOKEN_EXPIRED",
        message: "JWT has expired",
      });
    }

    return res.status(500).json({
      flag: "AUTH_07_SERVER_ERROR",
      message: err.message,
    });
  }
}

module.exports = protectRoute;
