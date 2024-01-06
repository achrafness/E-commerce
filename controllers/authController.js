const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  const { name,email,  password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const isFirst = (await User.countDocuments({})) === 0;
  const role = isFirst ? "admin" : "user";

  const user = await User.create({name, email, password, role});
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send("login");
};
const logout = async (req, res) => {
  res.send("logout");
};
const deleteAll = async (req, res) => {
  const user = await User.deleteMany({});
  res.status(StatusCodes.ACCEPTED).json({ user });
};
module.exports = {
  login,
  register,
  logout,
  deleteAll,
};
