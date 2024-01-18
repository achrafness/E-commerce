const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("unAuthentication Invalid");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    console.log(error);
  }
};
const authorizePermissions = (...roles) => {
  return (req,res,next)=>{
    if (!roles.includes(req.user.role)){
      throw new CustomError.UnauthorizedError("Unauthorized to access");
    } 
    next();
  }
};
module.exports = { authenticateUser, authorizePermissions };
