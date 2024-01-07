const jwt = require("jsonwebtoken");
const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ user });
  const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure:process.env.NODE_ENV === 'production',
    signed:true,
  });
};

module.exports = {
  attachCookiesToResponse,
  createJWT,
  isTokenValid,
};
