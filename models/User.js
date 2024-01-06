const mongoose = require("mongoose");
const { isEmail } = require("validator");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    unique:true,
    required: [true, "please provide an email"],
    validate: {
      validator: isEmail,
      message: "please provide  valid email",
    },
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
module.exports = mongoose.model("User", UserSchema);
