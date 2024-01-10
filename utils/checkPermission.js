const CustomError = require("../errors");

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  if (requestUser.role === "admin") return;
  throw new CustomError.UnauthorizedError("Unauthorized to access");
};
module.exports = checkPermission;
