const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse  } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email:email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const isFirst = (await User.countDocuments({})) === 0;
  const role = isFirst ? "admin" : "user";
  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({res,user:tokenUser});
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
const login = async (req, res) => {
  const {email , password } = req.body
  if(!password || !email){
    throw new CustomError.BadRequestError("please provide email and password");
  }
  const user = await User.findOne({email:email})
  if(!user){
    throw new CustomError.UnauthenticatedError("Invalid information");
  }
  const isMatch = await user.comparePassword(password)
  if(!isMatch){
    throw new CustomError.UnauthenticatedError("Invalid information");
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({res,user:tokenUser});
  res.status(StatusCodes.CREATED).json({user:tokenUser})
};
const logout = async (req, res) => {
  res.cookie('token',"logout",{
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({msg:"user logout"})
};


module.exports = {
  login,
  register,
  logout,
};
