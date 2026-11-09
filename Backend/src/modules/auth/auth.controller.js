const bcrypt = require("bcrypt");
const userModel = require("./user.model");
const jwt = require("jsonwebtoken");

async function logout (req,res){
  res.clearCookie(
    "token",
  {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
})
  res.status(200).json({
    message:"logged out successfully"
  })
}






async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hashedPassword });
    let token = jwt.sign({username:user.username,email:user.email,userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
    res.cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    })
    return res.status(201).json({ username, email });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(409).json({
        message: "user already exists",
      });
    }
    return res.status(500).json({
      message: "something went wrong",
    });
  }
}

function getMe(req,res){
  res.status(200).json(
    {
      user: req.user,
      success: true
    }
  )
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        let token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          message: "login successful",
          user: user.username,
        });
      } else {
        return res.status(401).json({
          message: "email or password is wrong",
        });
      }
    } else {
      return res.status(401).json({
        message: "incorrect email and password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = { register, login, logout,getMe};
