const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser,checkPermission } = require("../utils");
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("email name _id");
  res.status(StatusCodes.OK).json({ count: users.length, users });
};
const getSingleUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }).select("email name _id");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${id}`);
  }
  checkPermission(req.user,user._id)
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("please provide name or email");
  }
  const user = await User.findOneAndUpdate(
    {_id: req.user.userId,},
    {email: email,name: name,},
    {new: true,runValidators: true,}
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user });
};
const updateUserPassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  if (!newPassword || !oldPassword) {
    throw new CustomError.BadRequestError("please provide both value");
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new CustomError.UnauthenticatedError("Invalid information");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Succes !! password updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
